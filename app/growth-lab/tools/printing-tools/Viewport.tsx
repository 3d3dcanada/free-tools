import { useT } from "../../shared/locale";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

export type ViewName = "iso" | "top" | "front" | "side";
export type ViewApi = { view: (name: ViewName) => void; capture: () => string };
type Scene = {
  renderer: THREE.WebGLRenderer;
  labels: CSS2DRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  bed: THREE.Group;
  mesh: THREE.Group;
  box: THREE.Group;
  draw: () => void;
};
const directions: Record<ViewName, THREE.Vector3> = {
  iso: new THREE.Vector3(1.1, -1.5, 1.05),
  top: new THREE.Vector3(0, -0.02, 1),
  front: new THREE.Vector3(0, -1, 0.22),
  side: new THREE.Vector3(1, 0, 0.22),
};
const ground = 0x0e1213;

function clear(group: THREE.Group) {
  for (const child of [...group.children]) {
    group.remove(child);
    child.traverse((o) => {
      const item = o as THREE.Mesh;
      item.geometry?.dispose();
      for (const m of Array.isArray(item.material) ? item.material : item.material ? [item.material] : [])
        m.dispose();
    });
  }
}
function lines(points: number[], colour: number, opacity = 1) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  return new THREE.LineSegments(
    geometry,
    new THREE.LineBasicMaterial({ color: colour, transparent: opacity < 1, opacity }),
  );
}
function label(text: string, className: string, at: THREE.Vector3) {
  const element = document.createElement("span");
  element.className = className;
  element.textContent = text;
  const object = new CSS2DObject(element);
  object.position.copy(at);
  return object;
}

/**
 * the model on a real printer's bed. The plate, its 10 mm grid and the
 * build volume come from the picked printer; the part is dropped onto the
 * plate and centred, the way a slicer places it. Renders only on change.
 */
export default function Viewport({
  positions,
  bed,
  bedLabel,
  fits,
  dims,
  accent,
  api,
  cover,
  colour,
  section,
}: {
  positions: Float32Array | null;
  bed: number[];
  bedLabel: string;
  fits: boolean | null;
  dims: [string, string, string] | null;
  accent: string;
  api: MutableRefObject<ViewApi | null>;
  /** Pixels covered at the stage's left, bottom and top (the card, the chip); the part is framed in the rest. */
  cover: [number, number, number];
  colour: string;
  section: number;
}) {
  const tr = useT();
  const host = useRef<HTMLDivElement>(null);
  const world = useRef<Scene | null>(null);
  const size = useRef(new THREE.Vector3());
  const covered = useRef(cover);
  covered.current = cover;
  const [error, setError] = useState("");
  // Shift the picture away from the card so the part sits in the open part of the stage.
  const offset = () => {
    const w = world.current,
      element = host.current;
    if (!w || !element) return { width: 1, height: 1 };
    const width = Math.max(1, element.clientWidth),
      height = Math.max(1, element.clientHeight);
    const [left, bottom, top] = covered.current;
    w.camera.setViewOffset(width, height, -left / 2, (bottom - top) / 2, width, height);
    return { width: Math.max(1, width - left), height: Math.max(1, height - bottom - top) };
  };
  const reframe = useRef<() => void>(() => {});
  // Until the visitor turns the camera, the part is re-framed whenever the open area changes.
  const moved = useRef(false);
  const view = useRef<ViewName>("iso");
  const frame = (name: ViewName = view.current) => {
    const w = world.current;
    if (!w) return;
    view.current = name;
    const [bx, by, bz] = bed;
    const s = size.current;
    const target = s.lengthSq()
      ? { centre: new THREE.Vector3(0, 0, s.z / 2), radius: s.length() / 2 }
      : { centre: new THREE.Vector3(0, 0, bz * 0.2), radius: Math.hypot(bx, by, bz * 0.4) / 2 };
    const open = offset();
    const v = (w.camera.fov * Math.PI) / 180;
    // The open area, not the whole canvas, decides how far back the camera sits.
    const vv = 2 * Math.atan(Math.tan(v / 2) * (open.height / Math.max(1, host.current!.clientHeight)));
    const h = 2 * Math.atan(Math.tan(v / 2) * w.camera.aspect * (open.width / Math.max(1, host.current!.clientWidth)));
    const distance = (Math.max(target.radius, 1) / Math.sin(Math.min(vv, h) / 2)) * 1.25;
    w.camera.position.copy(target.centre).add(directions[name].clone().normalize().multiplyScalar(distance));
    w.camera.near = distance / 200;
    w.camera.far = distance * 50;
    w.camera.updateProjectionMatrix();
    w.controls.target.copy(target.centre);
    w.controls.update();
    moved.current = false;
    w.draw();
  };
  reframe.current = () => frame();

  useEffect(() => {
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    } catch {
      setError("WebGL is unavailable. Dimensions and the JSON report still work.");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(ground);
    renderer.domElement.setAttribute(
      "aria-label",
      tr("Interactive model preview. Drag to orbit; use arrow keys to pan and the wheel or pinch to zoom."),
    );
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.tabIndex = 0;
    const labels = new CSS2DRenderer();
    labels.domElement.className = "pw-labels";
    element.appendChild(renderer.domElement);
    element.appendChild(labels.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 1e6);
    camera.up.set(0, 0, 1);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x2b3236, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(1, -1.6, 2.4);
    const rim = new THREE.DirectionalLight(0xbff8f1, 0.9);
    rim.position.set(-1.4, 1.2, 0.8);
    scene.add(key, rim);
    const bedGroup = new THREE.Group(),
      meshGroup = new THREE.Group(),
      boxGroup = new THREE.Group();
    scene.add(bedGroup, meshGroup, boxGroup);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.listenToKeyEvents(renderer.domElement);
    const draw = () => {
      renderer.render(scene, camera);
      labels.render(scene, camera);
    };
    controls.addEventListener("change", draw);
    controls.addEventListener("start", () => (moved.current = true));
    world.current = { renderer, labels, scene, camera, controls, bed: bedGroup, mesh: meshGroup, box: boxGroup, draw };
    let shown = false;
    const resize = () => {
      const width = Math.max(1, element.clientWidth),
        height = Math.max(1, element.clientHeight);
      // A phone opens on the Edit view, so the stage can first measure 0 × 0: frame it once it is seen.
      const first = !shown && width > 1 && height > 1;
      if (first) shown = true;
      renderer.setSize(width, height);
      labels.setSize(width, height);
      camera.aspect = width / height;
      const [left, bottom, top] = covered.current;
      camera.setViewOffset(width, height, -left / 2, (bottom - top) / 2, width, height);
      camera.updateProjectionMatrix();
      if (first) reframe.current();
      else draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    return () => {
      observer.disconnect();
      controls.dispose();
      for (const group of [bedGroup, meshGroup, boxGroup]) clear(group);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      labels.domElement.remove();
      world.current = null;
    };
    // The scene is built once; tr only labels the canvas.
  }, []);

  // The printer: plate, 10 mm grid, 50 mm major lines, border and the volume it can print.
  const [bx, by, bz] = bed;
  useEffect(() => {
    const w = world.current;
    if (!w) return;
    clear(w.bed);
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(bx, by, 2),
      new THREE.MeshStandardMaterial({ color: 0x1a2124, roughness: 0.92, metalness: 0.05 }),
    );
    plate.position.z = -1.01;
    const minor: number[] = [],
      major: number[] = [];
    for (let x = 0; x <= bx + 1e-6; x += 10)
      (Math.round(x) % 50 ? minor : major).push(x - bx / 2, -by / 2, 0.02, x - bx / 2, by / 2, 0.02);
    for (let y = 0; y <= by + 1e-6; y += 10)
      (Math.round(y) % 50 ? minor : major).push(-bx / 2, y - by / 2, 0.02, bx / 2, y - by / 2, 0.02);
    const edge = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].flatMap(([a, b], i, all) => {
      const [c, d] = all[(i + 1) % 4];
      return [(a * bx) / 2, (b * by) / 2, 0.04, (c * bx) / 2, (d * by) / 2, 0.04];
    });
    const volume = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(bx, by, bz)),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.13 }),
    );
    volume.position.z = bz / 2;
    w.bed.add(
      plate,
      lines(minor, 0x263036),
      lines(major, 0x3b4b53),
      lines(edge, new THREE.Color(accent).getHex(), 0.95),
      volume,
      label(bedLabel, "pw-bed-label", new THREE.Vector3(0, -by / 2 - Math.max(bx, by) * 0.05, 0)),
    );
    if (!size.current.lengthSq()) frame();
    else w.draw();
  }, [bx, by, bz, bedLabel, accent]);

  // The part: centred on the plate and dropped onto it.
  useEffect(() => {
    const w = world.current;
    if (!w) return;
    clear(w.mesh);
    size.current.set(0, 0, 0);
    if (positions) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.computeVertexNormals();
      geometry.computeBoundingBox();
      const b = geometry.boundingBox!;
      b.getSize(size.current);
      const centre = b.getCenter(new THREE.Vector3());
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({
          color: 0xe8e4dc,
          roughness: 0.55,
          metalness: 0.02,
          flatShading: true,
          side: THREE.DoubleSide,
        }),
      );
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 32),
        new THREE.LineBasicMaterial({ color: 0x0e1213, transparent: true, opacity: 0.45 }),
      );
      for (const o of [mesh, edges]) o.position.set(-centre.x, -centre.y, -b.min.z);
      w.mesh.add(mesh, edges);
    }
    frame();
  }, [positions]);

  // Clipping is visual only; measurements always use the complete imported mesh.
  useEffect(() => {
    const w = world.current;
    if (!w) return;
    w.renderer.localClippingEnabled = true;
    const planes = section < 100 ? [new THREE.Plane(new THREE.Vector3(0, 0, -1), size.current.z * section / 100)] : [];
    w.mesh.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) {
        const materials = Array.isArray(o.material) ? o.material : [o.material];
        for (const material of materials) {
          material.clippingPlanes = planes;
          material.needsUpdate = true;
          if (material instanceof THREE.MeshStandardMaterial) material.color.set(colour);
        }
      }
    });
    w.draw();
  }, [positions, colour, section]);

  // When the card changes size (another tab, a phone): frame again, or once the visitor
  // has turned the camera, only slide the picture so their view stays.
  const coverKey = cover.join(",");
  useEffect(() => {
    const w = world.current;
    if (!w) return;
    if (!moved.current) return frame();
    offset();
    w.camera.updateProjectionMatrix();
    w.draw();
  }, [coverKey]);

  // Its bounding box and the three measurements, in whatever units are showing.
  const dimsKey = dims?.join("|") ?? "";
  useEffect(() => {
    const w = world.current;
    if (!w) return;
    clear(w.box);
    const { x, y, z } = size.current;
    if (positions && dims && x + y + z > 0) {
      const colour = new THREE.Color(fits === false ? "#ff2d92" : accent).getHex();
      const corners = [
        [-x / 2, -y / 2],
        [x / 2, -y / 2],
        [x / 2, y / 2],
        [-x / 2, y / 2],
      ];
      const points = corners.flatMap(([a, b], i) => {
        const [c, d] = corners[(i + 1) % 4];
        return [a, b, 0, c, d, 0, a, b, z, c, d, z, a, b, 0, a, b, z];
      });
      const pad = Math.max(x, y, z) * 0.06 + 2;
      w.box.add(
        lines(points, colour, 0.9),
        label(`X ${dims[0]}`, "pw-dim", new THREE.Vector3(0, -y / 2 - pad, 0)),
        label(`Y ${dims[1]}`, "pw-dim", new THREE.Vector3(x / 2 + pad, 0, 0)),
        label(`Z ${dims[2]}`, "pw-dim", new THREE.Vector3(x / 2 + pad * 0.5, -y / 2 - pad * 0.5, z / 2)),
      );
    }
    w.draw();
  }, [positions, dimsKey, fits, accent]);

  api.current = {
    view: (name) => frame(name),
    capture: () => {
      const w = world.current;
      if (!w) throw new Error("Wait for the 3D view, or use the measurement report.");
      w.draw();
      // The labels are page text, so they are painted onto the picture here.
      const source = w.renderer.domElement,
        ratio = source.width / Math.max(1, source.clientWidth);
      const out = document.createElement("canvas");
      out.width = source.width;
      out.height = source.height;
      const ctx = out.getContext("2d")!;
      ctx.drawImage(source, 0, 0);
      ctx.font = `600 ${12 * ratio}px "Geist Mono Variable", ui-monospace, monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      w.scene.traverse((o) => {
        if (!(o instanceof CSS2DObject) || !o.element.textContent) return;
        const p = o.getWorldPosition(new THREE.Vector3()).project(w.camera);
        if (p.z > 1) return;
        const px = ((p.x + 1) / 2) * out.width,
          py = ((1 - p.y) / 2) * out.height;
        const text = o.element.textContent,
          width = ctx.measureText(text).width + 16 * ratio,
          height = 22 * ratio;
        ctx.fillStyle = "rgba(10, 12, 13, 0.82)";
        ctx.beginPath();
        ctx.roundRect(px - width / 2, py - height / 2, width, height, 6 * ratio);
        ctx.fill();
        ctx.fillStyle = "#f4f4f4";
        ctx.fillText(text, px, py);
      });
      return out.toDataURL("image/png");
    },
  };

  return (
    <div className="pw-viewport" ref={host}>
      {error && <p className="pw-webgl" role="status">{tr(error)}</p>}
    </div>
  );
}

import { BufferGeometry, Matrix4, Mesh, Vector3 } from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import JSZip, { type JSZipObject } from "jszip";
import { maxTriangles } from "./geometry";
export type Model = { name: string; positions: Float32Array; nativeUnits: string; fixedUnits: boolean };
function fail(message: string): never {
  throw new Error(message);
}
function positions(geometry: BufferGeometry, transform = new Matrix4()) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  try {
    const a = g.getAttribute("position");
    if (!a || a.count % 3 || a.count / 3 > maxTriangles)
      fail("Mesh is empty or exceeds 150,000 triangles. Simplify it in your modeller.");
    const result = new Float32Array(a.count * 3),
      v = new Vector3();
    for (let i = 0; i < a.count; i++) {
      v.fromBufferAttribute(a, i).applyMatrix4(transform);
      if (!Number.isFinite(v.x + v.y + v.z)) fail("Model contains invalid coordinates (NaN or infinity).");
      result.set([v.x, v.y, v.z], i * 3);
    }
    return result;
  } finally {
    if (g !== geometry) g.dispose();
  }
}
async function xmlFile(entry: JSZipObject, budget: { bytes: number }) {
  const chunks: Uint8Array[] = [];
  let length = 0;
  await new Promise<void>((resolve, reject) => {
    // JSZip documents this browser streaming API; its bundled declarations omit it.
    const stream = (
      entry as unknown as {
        internalStream(type: "uint8array"): {
          on(event: "data", handler: (chunk: Uint8Array) => void): void;
          on(event: "error", handler: (error: Error) => void): void;
          on(event: "end", handler: () => void): void;
          pause(): void;
          resume(): void;
        };
      }
    ).internalStream("uint8array");
    stream.on("data", (chunk: Uint8Array) => {
      length += chunk.length;
      budget.bytes += chunk.length;
      if (length > 30_000_000 || budget.bytes > 40_000_000) {
        stream.pause();
        reject(new Error("3MF XML exceeds 30 MB per part or 40 MB combined."));
      } else chunks.push(chunk);
    });
    stream.on("error", reject);
    stream.on("end", resolve);
    stream.resume();
  });
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  const text = new TextDecoder().decode(bytes);
  if (/<!DOCTYPE|<!ENTITY/i.test(text)) fail("XML entities and document types are not supported.");
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) fail("Invalid 3MF XML.");
  return doc;
}
const elements = (e: Document | Element, name: string) => Array.from(e.getElementsByTagNameNS("*", name));
function path(value: string, base = "") {
  if (/[\\?#:]/.test(value)) fail("3MF external references are not supported.");
  const parts = (value.startsWith("/") ? value : base.slice(0, base.lastIndexOf("/") + 1) + value).split("/");
  const result: string[] = [];
  for (const p of parts) {
    if (!p || p === ".") continue;
    if (p === "..") {
      if (!result.length) fail("Invalid 3MF path.");
      result.pop();
    } else result.push(p);
  }
  return result.join("/");
}
function transform(e: Element) {
  const raw = e.getAttribute("transform");
  if (!raw) return new Matrix4();
  const a = raw.trim().split(/\s+/).map(Number);
  if (a.length !== 12 || a.some((n) => !Number.isFinite(n))) fail("Invalid 3MF transform.");
  return new Matrix4().set(
    a[0],
    a[3],
    a[6],
    a[9],
    a[1],
    a[4],
    a[7],
    a[10],
    a[2],
    a[5],
    a[8],
    a[11],
    0,
    0,
    0,
    1,
  );
}
async function threeMf(buffer: ArrayBuffer) {
  const budget = { bytes: 0 };
  const zip = await JSZip.loadAsync(buffer);
  if (Object.keys(zip.files).length > 1000) fail("3MF contains too many package parts (maximum 1,000).");
  const rel = zip.file("_rels/.rels");
  if (!rel) fail("3MF root relationship is missing.");
  const relations = elements(await xmlFile(rel, budget), "Relationship"),
    modelRel = relations.find((e) => e.getAttribute("Type")?.endsWith("/3dmodel"));
  if (!modelRel || modelRel.getAttribute("TargetMode") === "External")
    fail("3MF must contain a local build model.");
  const rootPath = path(modelRel.getAttribute("Target") ?? "");
  const docs = new Map<string, { doc: Document; unit: string; objects: Map<string, Element> }>();
  async function read(key: string) {
    if (docs.has(key)) return docs.get(key)!;
    if (docs.size >= 20) fail("Use at most 20 linked 3MF model parts.");
    const entry = zip.file(key);
    if (!entry) fail("A referenced 3MF model part is missing.");
    const doc = await xmlFile(entry!, budget),
      model = doc.documentElement,
      unit = model.getAttribute("unit") ?? "millimeter";
    for (const prefix of (model.getAttribute("requiredextensions") ?? "").split(/\s+/).filter(Boolean)) {
      const namespace = model.lookupNamespaceURI(prefix) ?? "";
      if (!/\/3dmanufacturing\/(production|material)\//.test(namespace))
        fail("This 3MF requires an unsupported extension. Export a triangle mesh from your slicer.");
    }
    if (elements(doc, "beam").length)
      fail("Beam lattices need a slicer. Export a triangle mesh to use this viewer.");
    const objects = new Map(elements(doc, "object").map((e) => [e.getAttribute("id") ?? "", e]));
    const value = { doc, unit, objects };
    docs.set(key, value);
    return value;
  }
  const root = await read(rootPath),
    scales: Record<string, number> = {
      micron: 0.001,
      millimeter: 1,
      centimeter: 10,
      inch: 25.4,
      foot: 304.8,
      meter: 1000,
    };
  const scale = scales[root.unit];
  if (!scale) fail("Unsupported 3MF unit.");
  const output: number[] = [];
  let instances = 0;
  const meshCache = new Map<string, { v: number[][]; f: number[][] }>();
  async function build(key: string, id: string, matrix: Matrix4, ancestors: string[]) {
    const ref = `${key}#${id}`;
    if (++instances > 1000 || ancestors.length > 20 || ancestors.includes(ref))
      fail("Cyclic or excessive 3MF component references.");
    const model = await read(key);
    if (model.unit !== root.unit)
      fail("Linked 3MF parts must use the same units. Export a unified mesh first.");
    const object = model.objects.get(id);
    if (!object) fail("3MF refers to a missing object.");
    const mesh = elements(object!, "mesh")[0];
    if (mesh) {
      let cached = meshCache.get(ref);
      if (!cached) {
        const vertices = elements(mesh, "vertex"),
          triangles = elements(mesh, "triangle");
        if (vertices.length > 450000 || triangles.length > maxTriangles)
          fail("3MF exceeds the 150,000 triangle limit.");
        const v = vertices.map((e) =>
          ["x", "y", "z"].map((k) => {
            const n = e.getAttribute(k);
            if (n === null || !Number.isFinite(Number(n))) fail("Invalid 3MF vertex.");
            return Number(n);
          }),
        );
        const f = triangles.map((e) =>
          ["v1", "v2", "v3"].map((k) => {
            const n = Number(e.getAttribute(k));
            if (!e.hasAttribute(k) || !Number.isInteger(n) || n < 0 || n >= v.length)
              fail("Invalid 3MF triangle index.");
            return n;
          }),
        );
        cached = { v, f };
        meshCache.set(ref, cached);
      }
      if (output.length + cached.f.length * 9 > maxTriangles * 9)
        fail("Instanced model exceeds 150,000 triangles.");
      for (const face of cached.f)
        for (const i of face) {
          const v = new Vector3(...cached.v[i]).applyMatrix4(matrix).multiplyScalar(scale);
          output.push(v.x, v.y, v.z);
        }
    } else {
      const components = elements(object!, "component");
      if (!components.length) fail("3MF object has no triangle mesh or components.");
      for (const component of components) {
        const external = Array.from(component.attributes).find((a) => a.localName === "path")?.value;
        await build(
          external ? path(external, key) : key,
          component.getAttribute("objectid") ?? "",
          matrix.clone().multiply(transform(component)),
          [...ancestors, ref],
        );
      }
    }
  }
  const buildElement = elements(root.doc, "build")[0];
  if (!buildElement) fail("3MF contains no build list.");
  for (const item of elements(buildElement, "item")) {
    if (item.getAttribute("printable") === "0") continue;
    await build(rootPath, item.getAttribute("objectid") ?? "", transform(item), []);
  }
  return { positions: new Float32Array(output), nativeUnits: root.unit, fixedUnits: true };
}
export async function importModel(file: File): Promise<Model> {
  if (file.size > 20_000_000) fail("Choose a model under 20 MB; simplify larger meshes first.");
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!["stl", "obj", "3mf"].includes(extension ?? "")) fail("Choose an STL, OBJ or 3MF file.");
  const buffer = await file.arrayBuffer();
  if (extension === "3mf") return { name: file.name, ...(await threeMf(buffer)) };
  if (extension === "stl") {
    if (buffer.byteLength >= 84) {
      const count = new DataView(buffer).getUint32(80, true);
      if (84 + count * 50 === buffer.byteLength && count > maxTriangles)
        fail("STL exceeds 150,000 triangles.");
    }
    const g = new STLLoader().parse(buffer);
    try {
      return { name: file.name, positions: positions(g), nativeUnits: "unspecified", fixedUnits: false };
    } finally {
      g.dispose();
    }
  }
  const text = new TextDecoder().decode(buffer);
  if (
    text
      .split(/^f\s/m)
      .reduce(
        (n, line, i) => (i ? n + Math.max(0, line.split("\n")[0].trim().split(/\s+/).length - 2) : 0),
        0,
      ) > maxTriangles
  )
    fail("OBJ exceeds 150,000 triangles.");
  const group = new OBJLoader().parse(text),
    arrays: Float32Array[] = [];
  let length = 0;
  try {
    group.updateMatrixWorld(true);
    group.traverse((o) => {
      if (o instanceof Mesh) {
        const p = positions(o.geometry, o.matrixWorld);
        length += p.length;
        if (length > maxTriangles * 9) fail("OBJ exceeds 150,000 triangles.");
        arrays.push(p);
      }
    });
    if (!length) fail("OBJ contains no triangles.");
    const combined = new Float32Array(length);
    let offset = 0;
    for (const a of arrays) {
      combined.set(a, offset);
      offset += a.length;
    }
    return { name: file.name, positions: combined, nativeUnits: "unspecified", fixedUnits: false };
  } finally {
    group.traverse((o) => {
      if (o instanceof Mesh) {
        o.geometry.dispose();
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) m.dispose();
      }
    });
  }
}

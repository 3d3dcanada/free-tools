export const maxTriangles = 150_000;
export type Analysis = ReturnType<typeof analyse>;
export function analyse(p: Float32Array | Float64Array) {
  if (!p.length || p.length % 9 || p.length / 9 > maxTriangles)
    throw new Error(`Use a triangle mesh with at most ${maxTriangles.toLocaleString()} triangles.`);
  const min = [Infinity, Infinity, Infinity],
    max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i++) {
    if (!Number.isFinite(p[i]) || Math.abs(p[i]) > 1e7)
      throw new Error("Model coordinates are invalid or too large.");
    const d = i % 3;
    min[d] = Math.min(min[d], p[i]);
    max[d] = Math.max(max[d], p[i]);
  }
  const dimensions = max.map((v, i) => v - min[i]),
    centre = min.map((v, i) => (v + max[i]) / 2);
  const tolerance = Math.max(1e-6, Math.max(...dimensions) * 1e-7);
  const vertices = new Map<string, number>(),
    incident: number[][] = [],
    faces: number[][] = [];
  const edges = new Map<string, { count: number; direction: number; faces: number[] }>();
  let surface = 0,
    signedVolume = 0,
    degenerate = 0;
  for (let i = 0; i < p.length; i += 9) {
    const points = [0, 3, 6].map((o) => [
      p[i + o] - centre[0],
      p[i + o + 1] - centre[1],
      p[i + o + 2] - centre[2],
    ]);
    const [a, b, c] = points,
      u = b.map((v, j) => v - a[j]),
      v = c.map((v, j) => v - a[j]);
    const cross = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const area = Math.hypot(...cross) / 2;
    surface += area;
    signedVolume +=
      (a[0] * (b[1] * c[2] - b[2] * c[1]) +
        a[1] * (b[2] * c[0] - b[0] * c[2]) +
        a[2] * (b[0] * c[1] - b[1] * c[0])) /
      6;
    const ids = points.map((point) => {
      const key = point.map((n) => Math.round(n / tolerance)).join(",");
      let id = vertices.get(key);
      if (id === undefined) {
        id = vertices.size;
        vertices.set(key, id);
        incident.push([]);
      }
      return id;
    });
    const f = faces.length;
    faces.push(ids);
    for (const id of new Set(ids)) incident[id].push(f);
    if (new Set(ids).size < 3 || area <= tolerance * tolerance) degenerate++;
    for (let j = 0; j < 3; j++) {
      const a = ids[j],
        b = ids[(j + 1) % 3],
        key = a < b ? `${a}:${b}` : `${b}:${a}`;
      const e = edges.get(key) ?? { count: 0, direction: 0, faces: [] };
      e.count++;
      e.direction += a < b ? 1 : -1;
      e.faces.push(f);
      edges.set(key, e);
    }
  }
  let boundaryEdges = 0,
    nonManifoldEdges = 0,
    windingErrors = 0;
  const neighbours = faces.map(() => [] as number[]);
  for (const e of edges.values()) {
    if (e.count === 1) boundaryEdges++;
    if (e.count > 2) nonManifoldEdges++;
    if (e.count === 2 && e.direction !== 0) windingErrors++;
    if (e.faces.length === 2) {
      neighbours[e.faces[0]].push(e.faces[1]);
      neighbours[e.faces[1]].push(e.faces[0]);
    }
  }
  const visited = new Set<number>();
  let components = 0;
  for (let f = 0; f < faces.length; f++)
    if (!visited.has(f)) {
      components++;
      const stack = [f];
      visited.add(f);
      while (stack.length) {
        for (const n of neighbours[stack.pop()!])
          if (!visited.has(n)) {
            visited.add(n);
            stack.push(n);
          }
      }
    }
  let nonManifoldVertices = 0;
  for (const fs of incident) {
    const allowed = new Set(fs),
      seen = new Set([fs[0]]),
      stack = [fs[0]];
    while (stack.length)
      for (const n of neighbours[stack.pop()!])
        if (allowed.has(n) && !seen.has(n)) {
          seen.add(n);
          stack.push(n);
        }
    if (seen.size !== fs.length) nonManifoldVertices++;
  }
  const closed =
    boundaryEdges === 0 &&
    nonManifoldEdges === 0 &&
    nonManifoldVertices === 0 &&
    windingErrors === 0 &&
    degenerate === 0;
  const warnings: string[] = [];
  if (boundaryEdges) warnings.push(`${boundaryEdges} boundary edges: the mesh is open.`);
  if (nonManifoldEdges || nonManifoldVertices)
    warnings.push(
      `${nonManifoldEdges} non-manifold edges and ${nonManifoldVertices} disconnected vertex fans.`,
    );
  if (windingErrors) warnings.push(`${windingErrors} edges have inconsistent face winding.`);
  if (degenerate) warnings.push(`${degenerate} zero-area or collapsed triangles.`);
  if (components > 1)
    warnings.push(
      `${components} separate shells: overlapping solids and nested cavities need a slicer's volume check.`,
    );
  if (!closed) warnings.push("Volume is unavailable until topology is repaired.");
  return {
    dimensions,
    min,
    max,
    triangles: p.length / 9,
    vertices: vertices.size,
    surfaceMm2: surface,
    volumeMm3: closed && components === 1 ? Math.abs(signedVolume) : null,
    boundaryEdges,
    nonManifoldEdges,
    nonManifoldVertices,
    windingErrors,
    degenerate,
    components,
    closed,
    toleranceMm: tolerance,
    warnings,
  };
}
export function cube(x = 50, y = 40, z = 30) {
  const v = [
    [0, 0, 0],
    [x, 0, 0],
    [x, y, 0],
    [0, y, 0],
    [0, 0, z],
    [x, 0, z],
    [x, y, z],
    [0, y, z],
  ];
  return new Float32Array(
    [
      [0, 2, 1],
      [0, 3, 2],
      [4, 5, 6],
      [4, 6, 7],
      [0, 1, 5],
      [0, 5, 4],
      [1, 2, 6],
      [1, 6, 5],
      [2, 3, 7],
      [2, 7, 6],
      [3, 0, 4],
      [3, 4, 7],
    ].flatMap((f) => f.flatMap((i) => v[i])),
  );
}

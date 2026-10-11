/**
 * The 3D3D site counts a tool export with its own cookieless analytics. This repository
 * counts nothing: the tools call `track`, and this is where it ends.
 */
export function track(_event: string, _props: Record<string, unknown> = {}): void {}

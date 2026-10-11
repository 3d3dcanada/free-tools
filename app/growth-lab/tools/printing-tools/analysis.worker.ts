import { analyse } from "./geometry";
self.onmessage = (event: MessageEvent<Float32Array>) => {
  try {
    self.postMessage({ analysis: analyse(event.data) });
  } catch (e) {
    self.postMessage({ error: (e as Error).message });
  }
};

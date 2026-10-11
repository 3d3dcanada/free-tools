U2NETP background-removal model, used by the Remove Background tool.

  File:      u2netp-webgl.onnx
  SHA-256:   8cf4d7b1e5faba47daef8a44a436081772535977f35161637d0a117eb326360c
  Licence:   Apache-2.0 (see U2NET-LICENSE.txt)
  Authors:   Xuebin Qin and the U-2-Net contributors
  Project:   https://github.com/xuebinqin/U-2-Net
  ONNX:      converted by the rembg project,
             https://github.com/danielgatis/rembg/releases/tag/v0.0.0

Modification by 3D3D (2026-10-08): the 2x2 stride-2 MaxPool nodes that use ceil_mode were
rewritten with equivalent SAME_UPPER padding so the model runs on the WebGL backend of
onnxruntime-web. The trained weights are unchanged. The conversion script is not part of
this repository; the unmodified source model is at the links above.

The result is an automatic segmentation estimate. Check edges and transparent objects.
The tool downloads this file only when the visitor presses Remove Background, from the same
origin the page came from.

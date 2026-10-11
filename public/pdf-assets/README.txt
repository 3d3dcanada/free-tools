PDF.js 6.4.299 static assets, used by the PDF tools to read and draw pages.
Only same-origin requests are made for them.

  LICENSE_PDFJS               PDF.js, Apache-2.0
  cmaps/                      Adobe character maps (BSD-3-Clause, notice in the directory)
  iccs/                       ICC profile, CC0
  wasm/                       QCMS (MIT), OpenJPEG and JBIG2 (BSD), with their notices
  standard_fonts/Foxit*       Foxit fonts, notice in LICENSE_FOXIT
  standard_fonts/Liberation*  Liberation Sans 2.1.5, four unmodified files, OFL-1.1
                              (LICENSE_LIBERATION_2)

The Liberation fonts that ship inside the pdfjs-dist package carry a GPLv2 notice, so they are
not used here. The four files above are the OFL-1.1 release of the same family. Do not
overwrite them with the pdfjs-dist copies when updating PDF.js.
The PDF.js scripting sandbox (QuickJS files) is not copied or used.

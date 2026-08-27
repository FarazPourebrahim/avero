---
"@avero/tokens": patch
---

`base.css`: pages no longer shift sideways while a dialog, drawer or other overlay locks scrolling, in either direction. While scrolling is locked, the viewport keeps the space of the hidden scrollbar on whichever side the browser draws it, instead of the library's right-hand margin, which moved right-to-left pages in browsers that put their scrollbar on the left.

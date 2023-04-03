---
title: "How does CSS Work?"
description: "browser-load-HTML-convert-DOM-fetch-other-resources-parsing-structure-display1 Browser loads HTML2 Browser convers HTML into DOM. (DOM represents doc."
date: 2022-09-28T04:36:00.621Z
tags: []
---
### Process
browser-load-HTML-convert-DOM-fetch-other-resources-parsing-structure-display

![](/images/09cbea45-7f0c-4d63-8402-6b46b9abaef6-image.png)

1 Browser loads HTML
2 Browser convers HTML into DOM. (DOM represents doc. in computer's memory)
3 Browser fetches most resources linked to by HTML doc. (img, video, linked css)
4 Browser parses fetched CSS (sorts different rules by selector types - element, class, ID )
5 render tree has applied rules to its structure
6 painting of the display page

### DOM
- each element, attribute, text in markup becomes DOM node in tree structure. 

### Example of Conversion
```html
<p>
  Let's use:
  <span>Cascading</span>
  <span>Style</span>
  <span>Sheets</span>
</p>
```
--> DOM Conversion
```
P
├─ "Let's use:"
├─ SPAN
|  └─ "Cascading"
├─ SPAN
|  └─ "Style"
└─ SPAN
    └─ "Sheets"
```

CSS
```css
span {
  border: 1px solid black;
  background-color: lime;
}
```

Display
![](/images/c2e0486e-837c-420e-bef6-878d536153ea-image.png)

### Rule
If browser reaches incomprehensible CSS it ignore and goes to next one

### CheatSheet
![](/images/de887d1b-82eb-499e-b794-96635976801d-image.png)




### REF
https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works

https://dom.spec.whatwg.org/#concept-node

https://htmlcheatsheet.com/css/
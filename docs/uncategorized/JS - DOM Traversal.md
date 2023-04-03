---
title: "JS - DOM Traversal"
description: "https&#x3A;//www.javascripttutorial.net/javascript-dom/javascript-get-child-element/The firstChild and lastChild return the first and last child of a "
date: 2021-12-22T06:57:48.006Z
tags: ["DOM","js"]
---
https://www.javascripttutorial.net/javascript-dom/javascript-get-child-element/

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Get Child Elements</title>
</head>
<body>
  <ul id="menu">
    <li class="first">Home</li>
    <li>Products</li>
    <li class="current">Customer Support</li>
    <li>Careers</li>
    <li>Investors</li>
    <li>News</li>
    <li class="last">About Us</li>
  </ul>
</body>
</html>
```

### Get the first child element
```js
let content = document.getElementById('menu');
let firstChild = content.firstChild.nodeName;
console.log(firstChild);

let content = document.getElementById('menu');
console.log(content.firstElementChild);
```

### Get last child Element
```js
let menu = document.getElementById('menu');
console.log(main.lastElementChild);

```

### Get All Child
```js
let menu = document.getElementById('menu');
let children = menu.children;
console.log(children);
```
![](/images/3747809a-e5f0-4104-9763-8a34342db458-image.png)

### Summary
- The firstChild and lastChild return the first and last child of a node, which can be any node type including text node, comment node, and element node.

- The firstElementChild and lastElementChild return the first and last child Element node.

- The childNodes returns a live NodeList of all child nodes of any node type of a specified node. The children return all child Element nodes of a specified node.

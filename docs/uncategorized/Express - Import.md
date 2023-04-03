---
title: "Express - Import"
description: "To make objects available outside of a module you just need to expose them as additional properties on the exports object. 1 Create square.js that exp"
date: 2021-09-11T01:34:23.198Z
tags: []
---
### Import Module
To make objects available outside of a module you just need to expose them as additional properties on the exports object. 

1 Create square.js that exports methods.
```js
exports.area = function(width) { return width * width; };
exports.perimeter = function(width) { return 4 * width; };
```
2 Import this on express app.js
``` js
const square = require('./square'); // Here we require() the name of the file without the (optional) .js file extension
console.log('The area of a square with a width of 4 is ' + square.area(4));
```
3 Result
![](/images/677dd7a3-9713-4e51-bae5-6ffc3d632faf-image.png)

### Import Module 2
If you want to export a complete object in one assignment instead of building it one property at a time, assign it to module.exports

``` js
module.exports = {
  area: function(width) {
    return width * width;
  },

  perimeter: function(width) {
    return 4 * width;
  }
};

```


### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
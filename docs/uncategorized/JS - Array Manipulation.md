---
title: "JS - Array Manipulation"
description: "https&#x3A;//stackoverflow.com/questions/48770408/javascript-remove-object-from-array-if-object-contains-string"
date: 2022-03-21T07:19:51.310Z
tags: []
---
## Extract values from json string javascript
```js
var obj = [{"id":"tag1","text":"tag1"},{"id":"tag2","text":"tag2"}] ;

for (var i =0; i< obj.length ;i++) {
   console.log(obj[i].id);
}
```

## Remove object from array if object contains string
```js

const data = [{ id: "11", name: "Car", symbol: "CA" },{ id: "13", name: "Cycle", symbol: "CY" },{ id: "15", name: "Train", symbol: "TA" },{ id: "3", name: "Ufo", symbol: "UF" }]

const result = data.filter(({name}) => !name.includes('Car'))
console.log(result)

[
  {
    "id": "13",
    "name": "Cycle",
    "symbol": "CY"
  },
  {
    "id": "15",
    "name": "Train",
    "symbol": "TA"
  },
  {
    "id": "3",
    "name": "Ufo",
    "symbol": "UF"
  }
]
```

## Merge items in JSON Array Object
```js
var array = [{
  name: "foo1",
  value: "val1"
}, {
  name: "foo1",
  value: ["val2", "val3"]
}, {
  name: "foo2",
  value: "val4"
}];

var output = [];

array.forEach(function(item) {
  var existing = output.filter(function(v, i) {
    return v.name == item.name;
  });
  if (existing.length) {
    var existingIndex = output.indexOf(existing[0]);
    output[existingIndex].value = output[existingIndex].value.concat(item.value);
  } else {
    if (typeof item.value == 'string')
      item.value = [item.value];
    output.push(item);
  }
});

console.log(output);
```

## Break out of forEach
```js
// Prints "1, 2, 3"
[1, 2, 3, 4, 5].every(v => {
  if (v > 3) {
    return false;
  }

  console.log(v);
  // Make sure you return true. If you don't return a value, `every()` will stop.
  return true;
});
```

## Filter Values
```js
// Prints "1, 2, 3"
const arr = [1, 2, 3, 4, 5];

// Instead of trying to `break`, slice out the part of the array that `break`
// would ignore.
arr.slice(0, arr.findIndex(v => v > 3)).forEach(v => {
  console.log(v);
});
```
## 출처 
https://stackoverflow.com/questions/48770408/javascript-remove-object-from-array-if-object-contains-string

https://masteringjs.io/tutorials/fundamentals/foreach-break
---
title: "JS - Map 사용"
description: "https&#x3A;//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
date: 2022-02-25T00:08:38.818Z
tags: []
---
## Basic
```js
const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a'));
// expected output: 1

map1.set('a', 97);

console.log(map1.get('a'));
// expected output: 97

console.log(map1.size);
// expected output: 3

map1.delete('b');

console.log(map1.size);
// expected output: 2
```
## Array
```js
const myMap = new Map()
myMap.set(0, 'zero')
myMap.set(1, 'one')

for (const [key, value] of myMap) {
  console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one

for (const key of myMap.keys()) {
  console.log(key)
}
// 0
// 1

for (const value of myMap.values()) {
  console.log(value)
}
// zero
// one

for (const [key, value] of myMap.entries()) {
  console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one
```

## 출처
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
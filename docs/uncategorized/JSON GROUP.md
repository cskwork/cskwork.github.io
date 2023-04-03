---
title: "JSON GROUP"
description: "GET Count of all Objects  Sum all Values in Json Object "
date: 2022-02-25T03:03:39.970Z
tags: []
---
### GET Count of all Objects
```js
"use strict";
let a = [
    { "name": "ankit", "DOB": "23/06" },
    { "name": "kapil", "DOB": "26/06" },
    { "name": "ankit", "DOB": "27/06" }
];
let count = 0;
a.forEach(item => {
    if (item.name === "ankit") {
        count++;
    }
});
console.log(count); // 2
```

### Sum all Values in Json Object
```js
// Person array with name and Age
const person = [
  {
    name: 'Jim',
    color: 'blue',
    age: 22,
  },
  {
    name: 'Sam',
    color: 'blue',
    age: 33,
  },
  {
    name: 'Eddie',
    color: 'green',
    age: 77,
  },
];

// Add their sum of ages
const sumOfAges = person.reduce((sum, currentValue) => {
  return sum + currentValue.age;
}, 0);

console.log(sumOfAges); // 132
```

## 출처
https://learnwithparam.com/blog/how-to-group-by-array-of-objects-using-a-key/
---
title: "JS - 다른 배열하고 일치여부 확인"
description: "JS 솔루션"
date: 2022-01-12T01:59:56.350Z
tags: []
---
JS 솔루션

### 일부 일치
```js
let str1="a;b";
let arr1 =[];
arr1 = str1.split(";");
console.log(arr1);

let str2="a;b";
let arr2 =[];
arr2 = str2.split(";");
console.log(arr1);

// 일부 일치
let foundSome = arr1.some(r=> arr2.indexOf(r) >= 0);
```
![](/images/ab3ee86e-f233-4016-a70f-76af91755047-image.png)

### 전체 일치 

```js
let str1="a;b";
let arr1 =[];
arr1 = str1.split(";");
console.log(arr1);

let str2="c;b";
let arr2 =[];
arr2 = str2.split(";");
console.log(arr1);

// 전체 일치
let foundAll = arr1.every(r=> arr2.indexOf(r) >= 0);

console.log(foundSome); 
console.log(foundAll); 
```
![](/images/5c09230a-004a-4110-9a70-6d969e4240b3-image.png)
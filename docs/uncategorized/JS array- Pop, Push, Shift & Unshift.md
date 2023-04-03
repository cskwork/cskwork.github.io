---
title: "JS array- Pop, Push, Shift & Unshift"
description: "Pop, Push, Shift and Unshift 배열 제어 push, shift - queue (FIFO) push, pop - stack (LIFO)  pop() : 배열 앞에 마지막으로 추가했던 아이템을 제거한다.  push() : 배열 마지막 순서로 아이템을 "
date: 2021-04-25T06:04:00.937Z
tags: ["JavaScript","알고리즘"]
---
## Pop, Push, Shift and Unshift
#### 배열 제어
push, shift - queue (FIFO)
push, pop - stack (LIFO)

#### 요약
END OF ARRAY
\+ push - [1,2] -> push ([3]) -> [1,2,3]
\- pop - [1,2,3] -> pop -> [1,2]

BEGINNING OF ARRAY
\+ unshift - [1,2] -> unshift([3]) -> [3,1,2]
\- shift - [3,1,2] -> shift -> [1,2] 


### pop()
: 배열 뒤에 ***마지막으로*** 추가했던 아이템을 제거한다.
```js
let cats = ['Bob', 'Willy', 'Mini'];
let poppedCat = cats.pop(); // ['Bob', 'Willy']

console.log(poppedCat);
console.log(cats);

// 결과
"Mini"
["Bob", "Willy"]

```
### push()
: 배열 ***마지막*** 순서로 아이템을 추가한다.
```js
let cats = ['Bob'];
cats.push('Willy'); // ['Bob', 'Willy']

cats.push('Puff', 'George'); // ['Bob', 'Willy', 'Puff', 'George']
push() // 리턴 - 배열 길이
```

---

### shift()
: 가장 최근에 추가했던 아이템을 제거한다.

```js
let cats = ['Bob', 'Willy', 'Mini'];

cats.shift(); // ['Willy', 'Mini']
shift() 제거한 아이템 갖고 있다.
```

### unshift()
: 최근에 추가했던 아이템 앞에 새로운 아이템을 추가한다.
```js
let cats = ['Bob'];

cats.unshift('Willy'); // ['Willy', 'Bob']

cats.unshift('Puff', 'George'); // ['Puff', 'George', 'Willy', 'Bob']
unshift() // 리턴 - 배열 길이
```

### 참고 
https://alligator.io/js/push-pop-shift-unshift-array-methods/
https://medium.com/@songjaeyoung92/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-javascript-stack-%EC%9D%B4%EB%9E%80-31f9bbb84897
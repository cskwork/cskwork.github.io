---
title: "JS - 객체 동적 생성"
description: "https&#x3A;//sassun.tistory.com/148객체 생성과 동시에 동적인 key값 설정객체 생성 후 동적인 key값 설정"
date: 2021-11-25T13:02:16.136Z
tags: []
---
https://sassun.tistory.com/148

1. 객체 생성과 동시에 동적인 key값 설정
``` js
let keyname = 'Name';
let something = {
    [keyname + 'postfix'] : 'value'
};
```



2. 객체 생성 후 동적인 key값 설정
```js
let keyname = 'Name';
let something = { };
 
something[keyname + 'postfix'] = 'value';
```
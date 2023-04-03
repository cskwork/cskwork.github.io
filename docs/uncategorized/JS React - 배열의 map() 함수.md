---
title: "JS React - 배열의 map() 함수"
description: "arr.map(callback, thisArg)callback: 새로운 배열 요소를 생성하는 함수.currentValue : 현재 처리하는 요소index : 현재 처리하는 요소의 indexarray : 현재 처리하는 원본 배열thisArg(선택) : callback함수"
date: 2021-04-19T06:58:13.597Z
tags: ["JavaScript","React"]
---
### 문법
arr.map(callback, [thisArg])
- callback: 새로운 배열 요소를 생성하는 함수.
  - currentValue : 현재 처리하는 요소
  - index : 현재 처리하는 요소의 index
  - array : 현재 처리하는 원본 배열
- thisArg(선택) : callback함수 내부에서 사용할 this 레퍼런스.

```js
var numbers = [1,2,3,4,5];
var processed = numbers.map(function(num){
  return num * num;
});
console.log(processed);
//RESULT
[1,4,9,16,25]
```

### REACT 응용
```js
import React, { useState } from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id:1 , text: '눈사람' },
    { id:2 , text: '얼음' },
    { id:3 , text: '눈' },
    { id:4 , text: '바람' },
]);
  const [inputIndex, setInputIndex] = useState('');
  const [nextId, setNextId] = useState(5); //새로운 항목 추가시 사용하는 id
  
  const onChange = e => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId, //nextId값을 id로 설정
      text : inputText
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  };
  
  const namesList = names.map(name => <li key={name.id}> {name.text} </li>);

return (
  <>
  <input value = {inputText} onChange={onChange} />
  <button onClick={onClick}>추가</button>
  <ul>{namesList}</ul>
  </>
);
};
export default IterationSample;
```
   
 
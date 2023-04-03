---
title: "JS - regex"
description: "1 | Operatorhttps&#x3A;//developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressionshttps&#x3A;//www.programiz.com/javascript/regex"
date: 2022-05-19T05:22:56.735Z
tags: []
---
### Usage
1 | Operator
```js
var str = '#this #is__ __#a test###__';
str.replace(/#|_/g,''); // result: "this is a test"
```

2 character class (contains)
```js
str.replace(/[#_]/g,'');
```
3 for opening & closing special char use \
```js
let regex = '/[^-+_.~!@#$%^&*()=+\[{\]}:?,<>]/g' ;
```
4 예제
```js
let str = "...!@BaT#*..y.abcdefghijklm";
let regex = /[^a-zA-Z0-9-_./]/g
// 의미 여기에 해당되는 거 아니면 제거 : a-z, A-Z, 0-9 그외 특수문자 
str = str.replace(regex,''); 
// result: "...BaT..y.abcdefghijklm"
console.log(str);
```


### Reference
```js
// Javascript Regex Reference
//  /abc/	A sequence of characters
//  /[abc]/	Any character from a set of characters
//  /[^abc]/	Any character not in a set of characters
//  /[0-9]/	Any character in a range of characters
//  /x+/	One or more occurrences of the pattern x
//  /x+?/	One or more occurrences, nongreedy
//  /x*/	Zero or more occurrences
//  /x?/	Zero or one occurrence
//  /x{2,4}/	Two to four occurrences
//  /(abc)/	A group
//  /a|b|c/	Any one of several patterns
//  /\d/	Any digit character
// /\w/	An alphanumeric character (“word character”)
//  /\s/	Any whitespace character
//  /./	Any character except newlines
//  /\b/	A word boundary
//  /^/	Start of input
//  /$/	End of input
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

https://www.programiz.com/javascript/regex



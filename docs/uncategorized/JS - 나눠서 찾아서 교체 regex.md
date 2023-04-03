---
title: "JS - 나눠서 찾아서 교체 regex"
description: "https&#x3A;//developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replacehttps&#x3A;//regex101.com/r/sH8aR8/56https&#x3A;//sta"
date: 2022-01-09T02:20:34.966Z
tags: ["js","regex"]
---
## REF
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace
https://regex101.com/r/sH8aR8/56
https://stackoverflow.com/questions/27916055/whats-the-meaning-of-gi-in-a-regex/27916089
https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings

## Regex
- g modifier: global. All matches (don't return on first match)

- i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])

i is immaterial if you dont capture [a-zA-Z].

For input like !@#$ if g modifier is not there regex will return first match !

If g is there it will return the whole or whatever it can match.

예제)
```js
// i만 사용
let p = `The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?`;
console.log(p.replace('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"

let regex = /dog/i;
console.log(p.replace(regex, 'ferret'));
// expected output: "The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?"
//=========================================================
// gi 사용
let p = `The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?`;
console.log(p.replace('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"

let regex = /dog/gi;
console.log(p.replace(regex, 'ferret'));
// expected output: "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"
```

## String To Array
``` js
// StringToArray
let string = `The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?`;
let array = p.split(".");
console.log(array);
```

## Sting To Array And Replace With Regex
#### Variant 1
``` js

// StringToArray
let regex = /dog/gi;
let string = `The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?`;
let array = string.split(".");
console.log(array);

for(let i=0; i < array.length; i++){
  let replacedText = array[i].replace(regex, 'ferret');
  console.log(replacedText);
  /*
  "The quick brown fox jumps over the lazy ferret"
  " If the ferret reacted, was it really lazy?"
  */
  array[i] = array[i].replace(regex, 'ferret');
}
console.log(array);
/*
["The quick brown fox jumps over the lazy ferret", " If the ferret reacted, was it really lazy?"]
*/

newString = array.join(".");
console.log(newString);
/*
"The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"
*/
```

#### Variant 2
``` js
// StringToArray
let regex = /dog/gi;
let string = `The quick brown fox jumps over the lazy dog. 
If the dog reacted, was it really lazy?`;
let array = string.split("\n");
console.log(array);

for(let i=0; i < array.length; i++){
  let replacedText = array[i].replace(regex, 'ferret');
  console.log(replacedText);
  /*
  "The quick brown fox jumps over the lazy ferret"
  " If the ferret reacted, was it really lazy?"
  */
  array[i] = array[i].replace(regex, 'ferret');
}
console.log(array);
/*
["The quick brown fox jumps over the lazy ferret", " If the ferret reacted, was it really lazy?"]
*/

newString = array.join("\n");
console.log(newString);
/*
"The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"
*/
```

## Multi-Replace
```js
var str = "Elit integer porta a eros, lacus, tempor ut hac enim est, pulvinar urna lorem elit! Penatibus quis placerat! Porta dolor nec, sed? Nisi tincidunt pulvinar rhoncus rhoncus? Nascetur! Scelerisque, nascetur auctor cum pellentesque, ac sit dictumst! Sagittis dignissim amet. Diam";

var mapObj = {
   elit:"----------",
   integer:"----------",
   porta:"----------"

};
var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
console.log(re);
// /elit|integer|porta/gi

str = str.replace(re, function(matched){
  return mapObj[matched.toLowerCase()];
});

console.log(str);
/*
---------- ---------- ---------- a eros, lacus, tempor ut hac enim est, pulvinar urna lorem ----------! Penatibus quis placerat! ---------- dolor nec, sed? Nisi tincidunt pulvinar rhoncus rhoncus? Nascetur! Scelerisque, nascetur auctor cum pellentesque, ac sit dictumst! Sagittis dignissim amet. Diam
*/
```




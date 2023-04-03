---
title: "Javascript - for vs while vs forEach array loop 성능 차이"
description: "for > while > forEach단 브라우저 별 차이가 있을 수 있다. 직접 테스트 해보는 걸 권장! 가독성 그리고 속도를 따지면 while loop가 아닐까https&#x3A;//stackoverflow.com/questions/5349425/whats-the-"
date: 2022-03-09T09:51:07.775Z
tags: []
---
## 요약
> **for > while > forEach**

단 브라우저 별 차이가 있을 수 있다. 직접 테스트 해보는 걸 권장! Stackoverflow에 nullqube님이 구현해두었다.

## while
가독성 그리고 속도를 따져서 필자는 while loop를 default로 사용할 예정! 
```js  
let i = 0, len = myArray.length;
while (i < len) {
  // your code
  i++
}
```

## for
```js
for (let i = 0; i < arr.length; i++) {
  // Do stuff with arr[i] or i
}
```

## forEach
```js
arr.forEach(function(value, index) {
  // Do stuff with value or index
});
```

## 성능 테스트
```html
<html>
<style>

body { color:#fff; background:#333; font-family:helvetica; }
body > div > div {  clear:both   }
body > div > div > span {
  float:left;
  width:43%;
  margin:3px 0;
  text-align:right;
}
body > div > div > span:nth-child(2) {
  text-align:left;
  background:darkorange;
  animation:showup .37s .111s;
  -webkit-animation:showup .37s .111s;
}
@keyframes showup { from { width:0; } }
@-webkit-keyframes showup { from { width:0; } }
</style>


<div id="container"> </div>


<script>
var arr = arr = new Array(11111111).fill(255);
var benches =     
[ [ "empty", () => {
  for(var a = 0, l = arr.length; a < l; a++);
}]
, ["for-loop", () => {
  for(var a = 0, l = arr.length; a < l; ++a)
    var b = arr[a] + 1;
}]
, ["for-loop++", () => {
  for(var a = 0, l = arr.length; a < l; a++)
    var b = arr[a] + 1;
}]
, ["for-loop - arr.length", () => {
  for(var a = 0; a < arr.length; ++a )
    var b = arr[a] + 1;
}]
, ["reverse for-loop", () => {
  for(var a = arr.length - 1; a >= 0; --a )
    var b = arr[a] + 1;
}]
,["while-loop", () => {
  var a = 0, l = arr.length;
  while( a < l ) {
    var b = arr[a] + 1;
    ++a;
  }
}]
, ["reverse-do-while-loop", () => {
  var a = arr.length - 1; // CAREFUL
  do {
    var b = arr[a] + 1;
  } while(a--);   
}]
, ["forEach", () => {
  arr.forEach( a => {
    var b = a + 1;
  });
}]
, ["for const..in (only 3.3%)", () => {
  var ar = arr.slice(0,arr.length/33);
  for( const a in ar ) {
    var b = a + 1;
  }
}]
, ["for let..in (only 3.3%)", () => {
  var ar = arr.slice(0,arr.length/33);
  for( let a in ar ) {
    var b = a + 1;
  }
}]
, ["for var..in (only 3.3%)", () => {
  var ar = arr.slice(0,arr.length/33);
  for( var a in ar ) {
    var b = a + 1;
  }
}]
, ["Duff's device", () => {
  var len = arr.length;
  var i, n = len % 8 - 1;

  if (n > 0) {
    do {
      var b = arr[len-n] + 1;
    } while (--n); // n must be greater than 0 here
  }
  n = (len * 0.125) ^ 0;
  if (n > 0) { 
    do {
      i = --n <<3;
      var b = arr[i] + 1;
      var c = arr[i+1] + 1;
      var d = arr[i+2] + 1;
      var e = arr[i+3] + 1;
      var f = arr[i+4] + 1;
      var g = arr[i+5] + 1;
      var h = arr[i+6] + 1;
      var k = arr[i+7] + 1;
    }
    while (n); // n must be greater than 0 here also
  }
}]];
function bench(title, f) {
  var t0 = performance.now();
  var res = f();
  return performance.now() - t0; // console.log(`${title} took ${t1-t0} msec`);
}
var globalVarTime = bench( "for-loop without 'var'", () => {
  // Here if you forget to put 'var' so variables'll be global
  for(a = 0, l = arr.length; a < l; ++a)
     var b = arr[a] + 1;
});
var times = benches.map( function(a) {
                      arr = new Array(11111111).fill(255);
                      return [a[0], bench(...a)]
                     }).sort( (a,b) => a[1]-b[1] );
var max = times[times.length-1][1];
times = times.map( a => {a[2] = (a[1]/max)*100; return a; } );
var template = (title, time, n) =>
  `<div>` +
    `<span>${title} &nbsp;</span>` +
    `<span style="width:${3+n/2}%">&nbsp;${Number(time.toFixed(3))}msec</span>` +
  `</div>`;

var strRes = times.map( t => template(...t) ).join("\n") + 
            `<br><br>for-loop without 'var' ${globalVarTime} msec.`;
var $container = document.getElementById("container");
$container.innerHTML = strRes;
	
</script>
</html>
```
![](/images/7483087b-a169-48f3-8f65-60fa6fd3f904-image.png)

### 출처
https://stackoverflow.com/questions/5349425/whats-the-fastest-way-to-loop-through-an-array-in-javascript
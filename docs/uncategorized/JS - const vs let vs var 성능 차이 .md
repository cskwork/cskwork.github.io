---
title: "JS - const vs let vs var 성능 차이 "
description: "const vs let vs var 성능 차이 "
date: 2022-03-09T09:57:05.816Z
tags: []
---
### 요약
> **const >= let > var**

- let vs var 성능 차이 궁금해서 확인했는데 stack에 Joeytje50님이 구현해 둔 걸 조금 수정해서 올렸다
- 미세한 성능 차이 (조건문 밖에서는 오히려 차이가 없어 보인다) 보다 중요한 건 scope (사용 범위), mutability (변경 여부) 를 줄여서 유지보수 편의성 개선과 버그 최소화를 위해 const, let을 최대한 사용하길 권장하는 시각이 있다. 값을 변경하지 않는 경우 const 사용을 권장한다. (const로 array push 등은 가능, = assignment 만 불가하다). 

### 직접 테스트
```
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


<output id="out" style="font-family: monospace;white-space: pre-wrap;"></output>

<script>
/**
 * Finds the performance for a given function
 * function fn the function to be executed
 * int n the amount of times to repeat
 * return array [time for n iterations, average execution frequency (executions per second)]
 */
function getPerf(fn, n) {
  var t0, t1;
  t0 = performance.now();
  for (var i = 0; i < n; i++) {
    fn(i)
  }
  t1 = performance.now();
  return [parseFloat((t1 - t0).toFixed(3)), parseFloat((repeat * 1000 / (t1 - t0)).toFixed(3))];
}

var repeat = 100000000;
var msg = '';

//-------inside a scope------------
var letperf1 = getPerf(function(i) {
  if (true) {
    let a = i;
  }
}, repeat);
msg += '<code>let</code> inside an if() takes ' + letperf1[0] + ' ms for ' + repeat + ' iterations (' + letperf1[1] + ' per sec).<br>'

var varperf1 = getPerf(function(i) {
  if (true) {
    var a = i;
  }
}, repeat);
msg += '<code>var</code> inside an if() takes ' + varperf1[0] + ' ms for ' + repeat + ' iterations (' + varperf1[1] + ' per sec).<br>'

var constperf1 = getPerf(function(i) {
  if (true) {
    var a = i;
  }
}, repeat);
msg += '<code>const</code> inside an if() takes ' + constperf1[0] + ' ms for ' + repeat + ' iterations (' + constperf1[1] + ' per sec).<br>'

//-------outside a scope-----------

var letperf2 = getPerf(function(i) {
  if (true) {}
  let a = i;
}, repeat);
msg += '<br><code>let</code> outside an if() takes ' + letperf2[0] + ' ms for ' + repeat + ' iterations (' + letperf2[1] + ' per sec).<br>'

var varperf2 = getPerf(function(i) {
  if (true) {}
  var a = i;
}, repeat);
msg += '<code>var</code> outside an if() takes ' + varperf2[0] + ' ms for ' + repeat + ' iterations (' + varperf2[1] + ' per sec).<br>'

var constperf2 = getPerf(function(i) {
  if (true) {}
  var a = i;
}, repeat);
msg += '<code>const</code> inside an if() takes ' + constperf2[0] + ' ms for ' + repeat + ' iterations (' + constperf2[1] + ' per sec).<br>'

document.getElementById('out').innerHTML = msg
</script>
</html>
```
![](/images/3bf972bc-ca50-40f8-86f1-53037a111140-image.png)

### 출처
https://stackoverflow.com/questions/21467642/is-there-a-performance-difference-between-let-and-var-in-javascript

https://medium.com/coding-at-dawn/are-let-and-const-faster-than-var-in-javascript-2d0b7f22a66

https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
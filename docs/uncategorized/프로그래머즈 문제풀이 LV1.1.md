---
title: "프로그래머즈 문제/풀이 LV1.1"
description: "Level 1 1번~10번new Date에서 month가 0부터 시작(1월이 0이고, 12월이 11)한다는 것을 알고, getDay가 요일을 가져오는 메서드라는 것을 이용하면 쉽게 풀 수 있습니다.짧은 리스트는 위와 같이 배열로 그냥 하드코딩하는 게 편하기도 합니다.a"
date: 2021-05-10T21:45:30.171Z
tags: ["알고리즘"]
---
Level 1 1번~10번

### 2021년 a월 b일은 무슨 요일일까요?

new Date에서 month가 0부터 시작(1월이 0이고, 12월이 11)한다는 것을 알고, getDay가 요일을 가져오는 메서드라는 것을 이용하면 쉽게 풀 수 있습니다.

```js
/*
q
2021년 a월 b일은 무슨 요일일까요?
p
1 new Date로 새로운 날짜 값 오브젝트를 만들고
2 getDay()로 해당 날짜를 불러와서
3 하드코딩한 요일 2차원 배열의 위치값을 리턴
( getDay - 0 = SUN, new Date month 도 0 에서 시작)
*/

function solution(a, b) {
  return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][new Date(2021, a - 1, b).getDay()];
}

console.log(solution(5,11));//"TUE"
console.log(new Date(2021, 5 - 1, 11));//"2021-05-10T15:00:00.000Z"
console.log(new Date(2021, 5 - 1, 11).getDay());//2
console.log(new Date(2021, 5 - 1, 9).getDay());//0
```
짧은 리스트는 위와 같이 배열로 그냥 하드코딩하는 게 편하기도 합니다.

### 가운데 글자 가져오기
abcde에서는 c를 가져오고 qwer에서는 we 두 글자를 가져오는 문제입니다.

보통 이런 문제는 글자를 자르면 됩니다. 인덱스를 구하면 되죠.

```js
/*
q
abcde에서는 c를 가져오고 qwer에서는 we 두 글자를 가져오는 문제입니다.
p
1 전체 값의 길이 / 2 위치가 짝수로 나눠지면
2 해당 위치 두 글자 리턴. 홀수면 한 글자 만 리턴
*/
function solution(s) {
  return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
```
substr(from,until)

substr로 문자열을 자를 수 있고, 시작 인덱스를 적절히 찾으면 됩니다. 중간점을 찾으려면 보통 s.length / 2를 내림하거나 올림하면 됩니다.

### 같은 숫자는 싫어
[1,1,3,3,0,1,1]이면 [1,3,0,1]로 연속되는 중복을 제거하는 문제죠.

이런 문제는 필연적으로 반복문이 최소 한 번은 들어가게 됩니다. 어떻게 중복을 제거할 지를 생각해봐도 좋을 것 같습니다. 저라면 지금 숫자랑 다음 숫자랑 같으면 그 숫자는 없애는 방식을 택하겠습니다. 1, 1, 3, 3, 0, 1, 1
```js
/*
q
[1,1,3,3,0,1,1]이면 [1,3,0,1]로 연속되는 중복을 제거
p
1 현재 요소와 그 다음 요소를 비교해서 같지 않은 건 배열에서 제거
2 multiple pointer 방식도 있고 filter함수로 한번에 처리도 가능
*/
function solution(arr) {
  return arr.filter((v, i) => v !== arr[i + 1]);
}
```

filter( (element, element_index) => filter_codition 

반복문을 돌면서 숫자를 없앨 수 있는 메서드가 있습니다. 바로 filter죠. 그것을 사용하면 쉽게 다음 숫자랑 같은 숫자를 제거할 수 있습니다.

filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.

arr.filter(callback(element[, index[, array]])[, thisArg])

element - 처리할 현재 요소.
index (Optional) - 처리할 현재 요소의 인덱스.
array (Optional) - filter를 호출한 배열.
thisArg (Optional) - callback을 실행할 때 this로 사용하는 값
```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

```

### 나누어 떨어지는 숫자 배열 
[5,9,7,10]과 5가 주어지면 [5, 10]을 리턴해야 합니다. 아무것도 없으면 [-1]을 리턴합니다.

역시나 filter로 쉽게 필터링할 수 있습니다. 근데 [-1]을 리턴해야하는 조항 때문에 한 줄로 못 끝내서 짜증이 나네요(한 줄로 하면 코드가 너무 지저분해집니다)
```js
function solution(arr, divisor) {
  const answer = arr.filter(el => el % divisor === 0);
  return answer.length ? answer.sort((p, c) => p - c) : [-1];
}
```
마지막에 정답 배열의 개수로 오름차순 정렬을 할지, [-1]을 리턴할지 결정하고 있습니다.

### 두 정수 사이의 합 
3과 5가 주어지면 3+4+5를 해서 리턴하면 됩니다.

```js
function solution(a, b) {
  a > b && ([a, b] = [b, a]);
  return Array(b - a + 1).fill().map((v, i) => v + i).reduce((a, c) => a + c);
}
```

**fill() **메서드는 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채웁니다.
```js
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]
// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]
console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```
fill(fill_with, from, until) 

**map()** 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

map(each_element => execute_equation)

**reduce()** 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

reduce(accumulator, currentValue => accumulator + currentValue)

5, 3과 같이 역순으로 주어지는 경우만 추가적으로 고려하면 됩니다. [a, b] = [b, a]는 두 숫자를 바꾸는 편리한 문법이므로 알아두시면 좋습니다. Array부터 시작해서 fill, map까지 이어지는 과정도 [1,2,3,4,5]이런 순차적인 숫자 배열을 만드는 방식이므로 알아두시면 좋습니다.

이렇게 풀고 짧게 끝냈다며 좋아하고 있었는데, 다른 사람의 풀이를 보는 순간 벙 쪘습니다. 가우스 방식(가우스가 1부터 100까지를 순식간에 더했던 일화)을 사용하신 분들이 있었던 거죠. 

가우스 sum 기본 공식:
n(n+1)/2
연속 제곱 기본 공식:
n(n+1)(2n+1)/6

```js
function solution(a, b) {
  return (a + b) * ((a > b ? a - b : b - a) + 1) / 2;
}
```

양쪽 두 수를 더한 것에, 두 수 사이의 숫자 수 + 1을 곱하고 나누기 2를 하는 게 가우스 방식입니다. a와 b 대소관계 때문에 좀 지저분하네요.

### 문자열 내 마음대로 정렬하기 
['abce', 'abcd', 'cdx']와 2가 주어지면 2번째 인덱스 글자(c, c, x)를 기준으로 정렬합니다. 만약 2번째 인덱스 글자가 서로 같다면(c, c처럼) 사전순으로 정렬합니다. abce와 abcd를 사전순으로 정렬하는 것이죠.

따라서 같을 때와 다를 때 정렬 방법이 달라집니다. 정렬이기 때문에 당연히 sort 메서드가 들어가고요. sort 시 -1이면 순서가 유지되고, 1이면 순서가 서로 바뀐다는 것 이용하면 됩니다.

```js
function solution(strings, n) {
  return strings.sort((p, c) => p[n] === c[n] ? p.localeCompare(c) : p[n].localeCompare(c[n]))
}
```
여기서 꿀팁! localeCompare로 사전순으로 정렬할 수 있습니다! sort 메서드 안에서 return a.localeCompare(b)하면 됩니다. localeCompare 없이도 사전순으로 정렬하는 것을 직접 구현하셔도 되겠죠. 키워드도 하나 알려드립니다. lexicographic order가 사전순 정렬입니다.

문자열 내 p와 y의 개수 
문자열 내의 p와 y의 개수가 같으면(대소문자 구분 없음) true 아니면 false를 리턴하면 됩니다. Ppayay는 true입니다.

해답은 간단하죠. 개수를 세서 하면 됩니다.

```js
function solution(s) {
  const p = s.split('').filter(v => ['p', 'P'].includes(v));
  const y = s.split('').filter(v => ['y', 'Y'].includes(v));
  return p.length === y.length;
}
```

문자열을 배열로 만들어서 각 단어가 p나 P인지, 또는 y나 Y인지를 찾아서 필터링 후, 개수를 비교합니다.

이 문제도 제 함수형에 대한 집착(고정관념)을 반성하게 해준 문제입니다. 정규표현식보다 함수형 메서드를 우선 시하여 생각하는 문제가 있는 거죠. 정규표현식으로 하면 엄청 간단한 문제였습니다.

```js
function solution(s) {
  return s.match(/p/gi).length === s.match(/y/gi).length;
}
```
정규표현식에 걸리는 것들의 개수를 세면 됐습니다. g는 모두 찾는 거고, i는 대소문자 구분 안 한다는 뜻입니다. 그런데 이게 에러가 납니다. (p와 y가 없는 경우 문제가 됩니다)

```js
function solution(s){
  return s.replace(/p/gi, '').length == s.replace(/y/gi, '').length;
}
```
이렇게 replace에도 정규식을 써서 풀 수 있습니다. 위에 match는 왜 안 되는지 잘 모르겠네요.

문자열 내림차순으로 배치하기 
문자열을 역순으로 정렬합니다. 대문자는 소문자보다 뒤에 위치해야 합니다. 예를 들어 Zbcdefg는 gfedcbZ가 됩니다.

당연히 정렬(sort)을 하게 되고요. localeCompare는 여기서 못 씁니다. 대문자가 소문자보다 뒤에 위치해야 해서요.

```js
function solution(s) {
  return s.split('').sort((prev, cur) => cur.charCodeAt() - prev.charCodeAt()).join('');
}
```

제가 좋아하는 split, sort(또는 map) join(또는 reduce)으로 이어지는 메서드입니다. split-apply-combine 기법이라고도 불리는 3단 콤보입니다. 문자열을 split으로 배열로 바꿔서 원하는 처리를 하고 다시 join으로 문자열로 되돌립니다. charCodeAt은 문자의 숫자코드를 알려주는 메서드입니다. 이걸 사용해서 정렬하면 됩니다. 대소문자 정렬에서 localeCompare과 다른 결과를 보여줍니다.

문자열 다루기 기본
문자열의 길이가 4 또는 6이고 숫자로만 구성되어 있는지 확인합니다.

숫자로만 되어있는지와(AND) 길이가 4 또는(OR) 6인지를 확인하면 되겠네요.

```js
function solution(s) {
  return /^[0-9]+$/.test(s) && [4,6].includes(s.length);
}
```

프로그래머스에서 \d 정규표현식을 지원하지 않아 저렇게 숫자로 했습니다. OR 조건에서 (s.length === 4 || s.length === 6) 대신 includes로 짧게 줄일 수 있다는 것 알아두세요.

### 서울에서 김서방 찾기 
속담으로 이름을 지은 문제인 것 같네요. ['Jane', 'Kim']이란 배열이 있으면 Kim의 위치를 찾으면 됩니다.

간단하게 indexOf로 끝내버립시다.

```js
function solution(seoul) {
  return '김서방은 ' + seoul.indexOf('Kim') + '에 있다';
}
```

### 출처
https://www.zerocho.com/category/Algorithm/post/5b79898d337215001b3a18eb
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

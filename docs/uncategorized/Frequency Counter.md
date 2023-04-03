---
title: "Frequency Counter"
description: "https&#x3A;//codepen.io/cskwork/pen/KKWwwKe?editors=0011"
date: 2021-05-06T23:09:50.975Z
tags: ["알고리즘"]
---
Compare Two Arrays Frequency
```js
/*
Q:
Write a function called same, that accepts two arrays.

The function should return true if every value in the 
array has it's corresponding value squared in the second
array. The frequency of values must be the same.

P:
1 배열값 갯수가 일치하는지 확인
2 횟수 카운트 배열 2개 초기화
3 동일한 문자가 있으면 카운트해서 횟수 카운터 배열에 각각 넣기
4 두번째 배열의 값이 첫번째 배열 ^2 조건을 충족하는지 확인
*/

function same(arr1, arr2){

  //---------------------------------
  //배열값 갯수가 일치하는지 확인
  if(arr1.length !== arr2.length){
	  return false;
	}
  //---------------------------------
  //배열값 카운트에 사용하는 배열 2개 초기화
	let frequencyCounter1 = {};
	let frequencyCounter2 = {};
  //---------------------------------

  //---------------------------------
  //동일한 문자가 있으면 카운트해서 횟수 카운터 배열에 각각 넣기 
	for(let val of arr1){
	  frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1; //frequency counting. 
	}
  //---------------------------------

	for(let val of arr2){
	  frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
	}

  //---------------------------------
  //두번째 배열의 값이 첫번째 배열 ^2 조건을 충족하는지 확인
  for(let key in frequencyCounter1){
    if(!(key ** 2 in frequencyCounter2)){
	return false;
    }
    if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
	return false;
    }
   }
	//console.log(frequencyCounter1);
	//console.log(frequencyCounter2);
	return true;
  //---------------------------------
}

console.log(same([1,2,3] , [1,4,5])); //false
console.log(same([1,2,3] , [1,4,9])); //true
```

https://codepen.io/cskwork/pen/KKWwwKe?editors=0011

Compare Strings (Anagram)
```js
/*
Q:
Given two strings, write a function to determine 
if the second string is an anagram of the first.

(Anagram is a word, phrase, or name formed by
rearranging the letters of another, 
such as cinema, formed from iceman.)

P:
1 2개의 문자열 길이가 일치하는지 확인
2 1번째 문자 횟수 카운트 배열 선언
3 횟수 카운트 1번째 배열에 문자를 넣어 반복 횟수 카운트 
4 두번째 문자열의 각 문자가 발생한 횟수를 문자 횟수 카운트 배열로 확인. 
없으면 false, 있으면 문자가 반복된 횟수만큼 -1 카운트.
*/
function validAnagram(first, second){
  //--------------------------------
  //2개의 문자열 길이가 일치하는지 확인
	if(first.length !== second.length){
		return false;
	}
  //--------------------------------
	
  //--------------------------------
  //1번째 문자 횟수 카운트 배열 선언
	const lookup = {}; //obj as freq.counter
  //--------------------------------

  //--------------------------------
  //횟수 카운트 1번째 배열에 문자를 넣어 반복 횟수 카운트 
	//Break down the first string.
	for(let i=0; i < first.length ; i++){
	  let letter = first[i];
	  //if letter exists, increment, otherwise set to 1
	  lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
	}
  //--------------------------------

  //--------------------------------
  //두번째 문자열의 각 문자가 발생한 횟수를 문자 횟수 카운트 배열로 확인. 
  //없으면 false, 있으면 문자가 반복된 횟수만큼 -1 카운트.
	//Break down the second string
	//then check to first string.
	for(let i=0; i < second.length; i++){
	  let letter = second[i];
	  //can't find letter or letter is zero then not anagram.
	  if(!lookup[letter]){
	    return false;
	  }else{
	    lookup[letter] -= 1;
	  }	
	}
	return true;
  //--------------------------------
}

console.log(validAnagram('anagram','nagaram'));
console.log(validAnagram('anagram','nagparam'));


```
---
title: "Multiple Pointer"
description: "위치 기록 변수 활용  배열의 고유 값 횟수 찾기  REFACTORED "
date: 2021-05-06T23:34:13.547Z
tags: ["알고리즘"]
---
## 위치 기록 변수 활용

### 배열의 고유 값 횟수 찾기
```js
/*
NAIVE
Q:
Write a function called sumZero which accepts 
a sorted array of integers.

The function should find the first pair where the sum is 0. 
Return an array that includes both values that sum to zero 
or undefined if a pair does not exist.
*/
function countUniqueValues(arr){
  //-----------------------------------
  // 포인터 변수 2 개 초기화
  let left = 0;
  let right = 1;
  //-----------------------------------
  
  if (arr.length < 1){
    return 0;
  }
  
  //-----------------------------------
  //현재 위치와 다음 위치(+1)에 있는 값을 비교해서 일치하는 경우 다음 위치를 한칸 더 우측으로 이동. 다른 경우에는 좌측 값을 우측으로 이동. 좌측 값이 고유값인지 확인하는 기준
  while(right < arr.length){
    if(arr[left] === arr[right]){ //check all for unique
      right++;
    }else if (arr[left] !== arr[right]){ //if unique check next left
      arr[left+1] = arr[right];
      left++;
      right++;
    }
  }
  return left+1;
  //-----------------------------------
}

console.log(countUniqueValues([1,2,2,5,7,7,99]))
```

### REFACTORED
```js
/*
Q:
Write a function called sumZero which accepts 
a sorted array of integers.

The function should find the first pair where the sum is 0. 
Return an array that includes both values that sum to zero 
or undefined if a pair does not exist.

P:
1 배열 값이 있는지 확인
2 배열 값을 비교할 위치를 0과 1로 나누고 값이 일치할 경우 1번째 위치만 증가. 
  일치하지 않을 경우 둘 다 증가하고 0번째 위치 값은 동일하게 만들어서 
  카운트 중복 제거 
*/
function countUniqueValues(arr){
    //배열 값이 있는지 확인
    if(arr.length === 0) return 0;
    var i = 0;
  //------------------------------------
    //배열 값을 비교할 위치를 0과 1로 나누고 값이 일치할 경우 1번째 위치만 증가. 
    //일치하지 않을 경우 둘 다 증가하고 0번째 위치 값은 동일하게 만들어서 
    //카운트 중복 제거
    for(var j = 1; j < arr.length; j++){
        if(arr[i] !== arr[j]){
            i++;
            arr[i] = arr[j]
        }
    }
    return i + 1;
  //------------------------------------
}
console.log(countUniqueValues([1,2,2,5,7,7,99]))
```



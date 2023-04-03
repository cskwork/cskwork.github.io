---
title: "Sliding Window"
description: "Multiple Pointer Application -> Sliding Pointers첫번째와 마지막 위치를 기준으로 누적된 합을 이동시키고 비교하는 방법. "
date: 2021-05-07T00:16:31.740Z
tags: ["알고리즘"]
---
Multiple Pointer Application -> Sliding Pointers

첫번째와 마지막 위치를 기준으로 누적된 합을 이동하면서 비교하는 방법. 

```js
/*
Q:
Write function called maxSubArraySum - accepts array of integers 
and number n.

This function calculates max. sum of n. 
consecutive elements in array. 
(largest sum in array)

P:
1 maxSum을 보관할 변수, 임시 Sum을 보관할 변수 선언
2 Input validity 확인
3 0번째 위치에서 순차적으로 지정된 횟수만큼 더한 합을 maxSum에 보관 
4 0번째 위치 누적합 다음의 누적합을 0번째 누적합과 비교해서 더 큰 값 리턴.
0번째 누적합 위치와 그 다음 n번째 누적합의 위치 이동.
*/
//O(N)
function maxSubArraySum(arr, num){
    //maxSum을 보관할 변수, 임시 Sum을 보관할 변수 선언
    let maxSum = 0;
    let tempSum = 0;
    //Input validity 확인
    if(arr.length < num) return null; 
    //------------------------------------------
    //0번째 위치에서 순차적으로 지정된 횟수만큼 더한 합을 maxSum에 보관 
    for(let i=0; i< num; i++){
        maxSum += arr[i]; 
    }
    tempSum = maxSum;
    //------------------------------------------
    
    //------------------------------------------
    //0번째 위치 누적합 다음의 누적합을 0번째 누적합과 비교해서 더 큰 값 리턴 
    for(let i= num; i < arr.length; i++){
        //------------------------------------------
        //첫번째 누적합 - 배열의 최초 위치 값 + 누작합이 끝나는 위치 값
        //누적합이 그대로 우측으로 이동한다. (sliding window) 
        tempSum = tempSum - arr[i - num] + arr[i]; //Init input window
			  //------------------------------------------	
      
        //Add by init num. - first array value of window = only the sum of window.   
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
    //------------------------------------------
} 
console.log(maxSubArraySum([2,6,9,2,1,8,5,6,3], 3)); //19
```

## 참고
https://medium.com/swlh/sliding-window-a-common-technique-for-solving-algorithmic-problems-involving-string-array-44adf35e2d5d
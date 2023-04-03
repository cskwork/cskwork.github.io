---
title: "Divide And Conquer"
description: ""
date: 2021-05-07T00:25:41.383Z
tags: ["알고리즘"]
---
```js
/*
Q:
Given a sorted array of integers, write a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1
*/
//binary search
function searchB(array, val){
	let min=0; //Init left
	let max=array.length - 1; //Init right

	while(min <= max){
	    let middle = Math.floor((min + max) / 2); //INIT Middle
	    let currentElement = array[middle];

	    if(array[middle] < val){ //Check input search value to middle. 
	        min = middle + 1; //Init new min
	    }else if (array[middle] > val){
	        max = middle - 1; //Init new max
	    }else{
	        return middle;
	    }
	}
	return -1;

}


console.log(searchB([1,2,3,4,5,6], 8));
console.log(searchB([1,2,3,4,8,6], 8));
```
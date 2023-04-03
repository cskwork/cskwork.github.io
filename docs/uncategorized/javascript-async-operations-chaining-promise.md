---
title: "javascript-async-operations-chaining-promise"
description: "pendingfulfilledrejectedHandle more than one async. task one after anotherthen() syntaxcatch() exampleRECOMMENDED!https&#x3A;//www.programiz.com/javas"
date: 2022-10-16T11:34:33.407Z
tags: []
---
## Promise State types
- pending
- fulfilled
- rejected

![](/images/dee47809-877e-4c6f-b9e3-2ab6c54a6809-image.png)

### Example
```js
const count = true;

let countValue = new Promise(function (resolve, reject) {
    if (count) {
        resolve("There is a count value.");
    } else {
        reject("There is no count value");
    }
});
console.log(countValue);
// Promise {<resolved>: "There is a count value."}
```
## Promise Chaining
Handle more than one async. task one after another

### Promise Chaining Syntax
```js
api().then(function(result) {
    return api2() ;
}).then(function(result2) {
    return api3();
}).then(function(result3) {
    // do work
}).catch(function(error) {
    //handle any error that may occur before this point 
});
```
### then() syntax
```js
promiseObject.then(onFulfilled, onRejected);
```
### then() example
```js
// returns a promise
let countValue = new Promise(function (resolve, reject) {
  resolve("Promise resolved");
});

// executes when promise is resolved successfully
countValue
  .then(function successValue(result) {
    console.log(result);
  })
  .then(function successValue1() {
    console.log("You can call multiple functions this way.");
  });
```

### catch() example
```js
// returns a promise
let countValue = new Promise(function (resolve, reject) {
   reject('Promise rejected'); 
});
// executes when promise is resolved successfully
countValue.then(
    function successValue(result) {
        console.log(result);
    },
 )
  // executes if there is an error
    .catch(
    function errorValue(result) {
      console.log(result);
    }
  );
```
![](/images/70c9468f-ceda-4aa1-a29e-bcc92d1b1881-image.png)

![](/images/feae354b-c1a2-48a7-b13d-26b4daba4221-image.png)


### REF
RECOMMENDED!
https://www.programiz.com/javascript/promise
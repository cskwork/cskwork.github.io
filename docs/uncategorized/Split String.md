---
title: "Split String"
description: "BASIC  ADVANCED "
date: 2021-10-19T03:38:06.722Z
tags: []
---
### BASIC
``` js
// 파라미터 파싱 
var space = ' ';
var comma = ',';

function splitString(stringToSplit, separator){
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings;
}

console.log(splitString('division period', ' ')[0]);
console.log(splitString('division period', ' ')[1]);
```

### BASIC 2
``` js
var space = ' ';
var comma = ',';

function splitString(stringToSplit, separator){
  var arrayOfStrings = stringToSplit.split(separator);
  var obj = new Object();
  obj.division = arrayOfStrings[0];
  obj.subjectId = arrayOfStrings[1];
  return obj;
}

var getReporting = splitString('123 peri2323od', ' ');

console.log(getReporting.division);
console.log(getReporting.subjectId);
```

### ADVANCED
```js
let data = "Child 1 First Name: Ali\nChild 1 Gender: Female\nChild 1 Hair Color: Blonde\nChild 1 Hair Style: Wavy\nChild 1 Skin Tone: Tan\nChild 2 First Name: Morgan \nChild 2 Gender: Female\nChild 2 Hair Color: Brown\nChild 2 Hair Style: Ponytail\nChild 2 Skin Tone: Light\nRelationship 1 to 2: Brother\nRelationship 2 to 1: Brother\n";
//let data = JSON.stringify(rawNoteData);  <-- Don't do this. order.customer.note is not an object.

let foo = data.split("\n").reduce(function(obj, str, index) {
  let strParts = str.split(":");
  if (strParts[0] && strParts[1]) { //<-- Make sure the key & value are not undefined
    obj[strParts[0].replace(/\s+/g, '')] = strParts[1].trim(); //<-- Get rid of extra spaces at beginning of value strings
  }
  return obj;
}, {});

console.log(foo);
```
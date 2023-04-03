---
title: "JSON 데이터 생성기 - JS"
description: "결과"
date: 2022-02-04T10:12:18.950Z
tags: []
---
### 날짜 키 랜덤 숫자 값 JSON 오브젝트 객체 생성
```html
<script> 
// Generate random data
var data = [];
var value = 50;
for(var i = 0; i < 300; i++){
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({date:date, value: value});
}
console.log(data);
</script>
```
결과
![](/images/5045505e-8004-4cc2-87d8-da1834bfe96a-image.png)

### 날짜 키 랜덤 숫자 값 JSON 오브젝트 객체 생성
```js
<script> 
// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  //am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

var data = generateDatas(5);
console.log(data);   
</script>
```
![](/images/60fc289f-bc73-44d9-b2f6-8e7dc40d0ed7-image.png)
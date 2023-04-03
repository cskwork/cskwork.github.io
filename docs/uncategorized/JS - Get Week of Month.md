---
title: "JS - Get Week of Month"
description: "get week of month "
date: 2022-03-02T09:27:22.593Z
tags: []
---
### Simple
```js
let dateStartTag = document.querySelector('#start');
let dateEndTag = document.querySelector('#end');
const today = new Date();
// ACTION
let parseDateToInput = (date)=>{
  let parsedDate = date.getFullYear().toString() + '-' + (date.getMonth() +     1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
  console.log(parsedDate);
  return parsedDate;
};
let actionBindId = (tagId, actionFunction) => {
 let tagIdEvent = document.getElementById(tagId);
 tagIdEvent != null ? tagIdEvent.addEventListener("click", actionFunction) : '';
};
// /ACTION

let eventBindDateInput = ()=>{
  actionBindId('today', setTodayBtn);
  actionBindId('yesterday', setYesterdayBtn);
  actionBindId('thisWeek', setThisWeekBtn);
  actionBindId('thisMnt', setThisMntBtn);
};

// TODAY
let setTodayBtn=()=>{
  //console.log(today)
  dateStartTag.value =parseDateToInput(today);
  dateEndTag.value =parseDateToInput(today);
};

// YESTERDAY
let setYesterdayBtn=()=>{
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  //console.log(yesterday);
  dateStartTag.value =parseDateToInput(yesterday);
}
//
// WEEK
let setThisWeekBtn=()=>{
  let weekStart = new Date(today);
  let weekEnd = new Date(today); 
  let toMonday = 1-weekStart.getDay();
  weekStart.setDate(weekStart.getDate()+toMonday);
  weekEnd.setDate(weekStart.getDate()+4);
  //console.log(weekStart)
  //console.log(weekEnd);
  dateStartTag.value =parseDateToInput(weekStart);
  dateEndTag.value =parseDateToInput(weekEnd);
}
// MONTH
let setThisMntBtn=()=>{
 let getMnt = new Date(today);
 let currentMnt = getMnt.getMonth()  ; // 0 = Jan
 let firstDay = new Date(getMnt.getFullYear(), currentMnt, 1);
 let lastDay = new Date(getMnt.getFullYear(), currentMnt + 1, 0);
 //console.log(firstDay);
 //console.log(lastDay);
 dateStartTag.value =parseDateToInput(firstDay);
 dateEndTag.value =parseDateToInput(lastDay);
}

eventBindDateInput();
```
### Get week of month
```js
  Date.prototype.getWeekOfMonth = function(exact) {
        var month = this.getMonth()
            , year = this.getFullYear()
            , firstWeekday = new Date(year, month, 1).getDay()
            , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
            , offsetDate = this.getDate() + firstWeekday - 1
            , index = 1 // start index at 0 or 1, your choice
            , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
            , week = index + Math.floor(offsetDate / 7)
        ;
        if (exact || week < 2 + index) return week;
        return week === weeksInMonth ? index + 5 : week;
    };
    
    // Simple helper to parse YYYY-MM-DD as local
    function parseISOAsLocal(s){
      var b = s.split(/\D/);
      return new Date(b[0],b[1]-1,b[2]);
    }

    // Tests
    console.log('Date          Exact|expected   not exact|expected');
    [   ['2022-03-31', 1, 1],['2013-02-05', 2, 2],['2013-02-14', 3, 3],
        ['2013-02-23', 4, 4],['2013-02-24', 5, 6],['2013-02-28', 5, 6],
        ['2013-03-01', 1, 1],['2013-03-02', 1, 1],['2013-03-03', 2, 2],
        ['2013-03-15', 3, 3],['2013-03-17', 4, 4],['2013-03-23', 4, 4],
        ['2013-03-24', 5, 5],['2013-03-30', 5, 5],['2013-03-31', 6, 6]
    ].forEach(function(test){
      var d = parseISOAsLocal(test[0])
      console.log(test[0] + '        ' + 
      d.getWeekOfMonth(true) + '|' + test[1] + '                  ' +
      d.getWeekOfMonth() + '|' + test[2]); 
    });
```

### HTML TEST
```html
<label for="start">Start date:</label>
<input type="date" id="start" name="trip-start"
       value="2022-06-15"
       min="2022-01-01" max="2022-12-31">
~
<label for="end">Start date:</label>
<input type="date" id="end" name="trip-end"
       value="2022-07-22"
       min="2022-01-01" max="2022-12-31">

<button id='today' value="오늘">오늘</button>
<button id='yesterday' value="어제">어제</button>
<button id='thisWeek' value="이번주">이번주</button>
<button id='thisMnt' value="이번달">이번달</button>

<script>
let dateStartTag = document.querySelector('#start');
let dateEndTag = document.querySelector('#end');
const today = new Date();
// ACTION
let parseDateToInput = (date)=>{
  let parsedDate = date.getFullYear().toString() + '-' + (date.getMonth() +     1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
  console.log(parsedDate);
  return parsedDate;
};
let actionBindId = (tagId, actionFunction) => {
 let tagIdEvent = document.getElementById(tagId);
 tagIdEvent != null ? tagIdEvent.addEventListener("click", actionFunction) : '';
};
// /ACTION

let eventBindDateInput = ()=>{
  actionBindId('today', setTodayBtn);
  actionBindId('yesterday', setYesterdayBtn);
  actionBindId('thisWeek', setThisWeekBtn);
  actionBindId('thisMnt', setThisMntBtn);
};

// TODAY
let setTodayBtn=()=>{
  //console.log(today)
  dateStartTag.value =parseDateToInput(today);
  dateEndTag.value =parseDateToInput(today);
};

// YESTERDAY
let setYesterdayBtn=()=>{
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  //console.log(yesterday);
  dateStartTag.value =parseDateToInput(yesterday);
}
//
// WEEK
let setThisWeekBtn=()=>{
  let weekStart = new Date(today);
  let weekEnd = new Date(today); 
  let toMonday = 1-weekStart.getDay();
  weekStart.setDate(weekStart.getDate()+toMonday);
  weekEnd.setDate(weekStart.getDate()+4);
  //console.log(weekStart)
  //console.log(weekEnd);
  dateStartTag.value =parseDateToInput(weekStart);
  dateEndTag.value =parseDateToInput(weekEnd);
}
// MONTH
let setThisMntBtn=()=>{
 let getMnt = new Date(today);
 let currentMnt = getMnt.getMonth()  ; // 0 = Jan
 let firstDay = new Date(getMnt.getFullYear(), currentMnt, 1);
 let lastDay = new Date(getMnt.getFullYear(), currentMnt + 1, 0);
 //console.log(firstDay);
 //console.log(lastDay);
 dateStartTag.value =parseDateToInput(firstDay);
 dateEndTag.value =parseDateToInput(lastDay);
}

eventBindDateInput();
</script>
```
### USE
```js
let getWeekOfMonth = (exact)=>{
        var month = exact.getMonth()
            , year = exact.getFullYear()
            , firstWeekday = new Date(year, month, 1).getDay()
            , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
            , offsetDate = exact.getDate() + firstWeekday - 1
            , index = 1 // start index at 0 or 1, your choice
            , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
            , week = index + Math.floor(offsetDate / 7)
        ;
        if (exact || week < 2 + index) return week;
        return week === weeksInMonth ? index + 5 : week;
};

console.log(getWeekOfMonth(new Date('2022-06-29')));
```
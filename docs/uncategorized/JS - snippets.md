---
title: "JS - snippets"
description: "Event Binding "
date: 2022-04-21T01:35:06.995Z
tags: []
---
### Event Bind HTML TAG
```js
let eventBinding =  () => {
	this.clickBindHtmlIdTag("subjectType", this.changeSort);	
};
    
 let changeSort = () => {	 
	console.log('changesort');
};

// ACTION
let actionBindId = (tagId, actionFunction) => {
	let tagIdEvent = document.getElementById(tagId);
	tagIdEvent != null ? tagIdEvent.addEventListener("input", actionFunction) : '';
};
let actionBindClass= (tagClass, actionFunction) => {
	let tagHtmls = document.getElementsByClassName(tagClass);
	Array.from(tagHtmls).forEach(tagHtml => {
	tagHtml != null ? tagHtml.addEventListener("click", actionFunction) : '';
	});
},

// VALUE
let valueBindId= (tagId, value) => {
   let tagHtml = document.getElementById(tagId);
   tagHtml != null ? tagHtml.innerHTML = value : '';
};
let valueBindClass= (tagId, value) => {
  let tagHtmls = document.getElementsByClassName(tagId);
  Array.from(tagHtmls).forEach(tagHtml => {
    tagHtml != null ? tagHtml.innerHTML = value : '';
  });
},

// STYLE  
let setTagStyle = (e) => {
   if (e) styleBind(e.currentTarget);
}           
let styleBind = (tagElement) => {
  let onTags = tagElement.parentNode.parentNode.children;
  onTags.forEach(tag => {
    tag.classList.remove('on')
  });
  tagElement.parentNode.classList.add('on');
};

```

### SELECTBOX
```js
// CREATE OPTION TAGS
 object.forEach( (tag)=>{
   if(tag){
     let opt = document.createElement('option');
     opt.value = tag;
     opt.innerHTML = tag;
     selectBox.appendChild(opt);
   }
 })

// GET SELECTED OPTION VALUE
let selectBox = document.getElementById("selectBox");
let optionValue = selectBox.options[selectBox.selectedIndex].text; //selectedOption
if(selectBox.value){
 consokle.log(optionValue);
}	
```
### GROUP BY WITH JSON
```js
var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

var groubedByTeam = groupBy(startData, 'SECTION')

// GROUP BY WITH JSON
groupByMONTHWEEKBySection : (jsonArr, sectionName)=>{
		    let tempArr = [];
        	let tempObj = {};
		      jsonArr.forEach(elem => {
		           if(elem.SECTION == sectionName){
                 let monthweek = elem.MONTHWEEK;
	                     if (!tempObj[monthweek] ) {
	                         tempObj[monthweek] = 
                            {
	                            "MONTHWEEK": monthweek, KEYWORD_CNT: 0
	                         };
                           //tempArr = { ...tempArr, ...tempArr[monthweek] };
	                         tempArr.push(tempObj[monthweek]);
	                    };
	                    tempObj[monthweek].KEYWORD_CNT += elem.KEYWORD_CNT;
               		}
		      }, {});
	      console.log(tempArr)
	      console.log('--------------')
	      return tempArr;
},
```
### EventListener
```js
// CSS로도 checkbox on off 가능 
// input[type=checkbox].class:checked
sendEventBinding : function(){
		let multiBtn = document.querySelectorAll('.multiBtn');
		multiBtn.forEach(btn => {
		  btn.addEventListener('click', 
		  	function handleClick(event) {
				//e.preventDefault(); //prevent double click 
				for (const item of multiBtn) {
					item.classList.remove('active');
				} 
				btn.classList.add('active');
		  	});
		});
},
```

### SWTICH CASE STRING
```js
	convertDayNameEngToKor : (day) =>
	({
	    'Monday' 	: '월',
	    'Tuesday'	: '화',
	    'Wednesday'	: '수',
	    'Thursday'	: '목',
	    'Friday'	: '금',
	    'Saturday'	: '토',
	    'Sunday'	: '일'
	})[day] ,
```

### SWITCH CASE FUNCTION with Sort
```js
let subjTypeTag = 'DESC'
let itemList = [{year:1 , smstrCd:1},{year:2 , smstrCd:2},{year:3 , smstrCd:3}] ;

let sortedList = {
  'ASC': function (itemList) {
	itemList.sort((a, b) => a.year < b.year ? -1 : a.year > b.year ? 1 : 0) 
	itemList.sort((a, b) => a.smstrCd < b.smstrCd ? -1 : a.smstrCd > b.smstrCd ? 1 : 0) 
    return itemList;
  },
  'DESC': function (itemList) {
	itemList.sort((a, b) => a.year > b.year ? -1 : a.year < b.year ? 1 : 0)
	itemList.sort((a, b) => a.smstrCd > b.smstrCd ? -1 : a.smstrCd < b.smstrCd ? 1 : 0) 
    return itemList;
  },
};

itemList = sortedList[subjTypeTag](itemList);
console.log(itemList)
```

### Check If Empty
```js
let isEmpty = (value) => { 
	if( value == "" || value == null || value == undefined 
		|| (value != null && typeof value == "object"	&& !Object.keys(value).length) ){ 
		return true 
	}else{
	  return false 
	} 
};
```

### SHOW TAG
```js
showTagId : function(tagId){
  let tagIdEvent = document.getElementById(tagId);
  tagIdEvent ? tagIdEvent.style.display = "block" : ''; // inline
},

```

### IS !ACTIVE
```js
if(!selectedTag.classList.contains('active')){
	 console.log('isNotActive');
}
```

### DEEP COPY OBJECT
```js
let resultEach = structuredClone(DEFAULT_DATA); // deep clone
```

### Mouse Click Event
```js
var mouseClick = function (elem) {
	if(!elem) return;
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};
```

### Show Hide If Class Exist
```js
var showHideInputIfClassExist =  (inputTag, elementClasses, className) =>{
	if(!elementClasses) return;
	elementClasses.forEach( (item) =>{
		if(item.includes(className)){
			if( inputTag != ''){
				//$(searchIcon).show();   
				document.querySelector('.'+item).style.display = "inline-block";
			}else{
				//$(searchIcon).hide(); 
				document.querySelector('.'+item).style.display = "none";  
			}	
		};    
	});	
}
```
### Get Sunday of Current Week
```js
getSundayOfCurrentWeek:()=>{
	  const today = new Date();
	  const first = today.getDate() - today.getDay() + 1;
	  const last = first + 6;
	  const sunday = new Date(today.setDate(last));
	  
	  const year = sunday.getFullYear();
	  const month = sunday.getMonth() + 1;
	  const date = sunday.getDate();
	  let formatDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
	  return formatDate;
	}
```

### Get Sunday of previous Week
```js
getPreviousSunday:()=>{
  const date = new Date();
  const previousMonday = new Date();
  previousMonday.setDate(date.getDate() - date.getDay());
  const year = previousMonday.getFullYear().toString().substring(2);
  const month = previousMonday.getMonth() + 1;
  const dateF = previousMonday.getDate();
  let formatDate = `${year}.${month >= 10 ? month : '0' + month}.${dateF >= 10 ? dateF : '0' + dateF}`;
  return formatDate;
}
```
### Use console.table()

### 출처
https://velog.io/@joilnam/%EB%8B%B9%EC%8B%A0%EC%9D%84-%EB%8D%94-%EB%82%98%EC%9D%80-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EB%A1%9C-%EB%A7%8C%EB%93%A4%EC%96%B4-%EC%A4%84-%EC%88%98-%EC%9E%88%EB%8A%94-8%EA%B0%80%EC%A7%80-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%8A%B8%EB%A6%AD
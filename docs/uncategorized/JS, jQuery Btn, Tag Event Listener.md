---
title: "JS, jQuery Btn, Tag Event Listener"
description: "버튼 이벤트 active+ JS 액션에 적용 가능한 공통 함수 "
date: 2022-03-22T03:58:19.154Z
tags: []
---
## 버튼 이벤트 active+ JS 액션에 적용 가능한 공통 함수

```js
 btnEventListener: function() {
     $('button.btn_outlined').on("click",function(e){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		handleClick(e);
	});
    function handleClick(event) {
        event = event || window.event;
        event.target = event.target || event.srcElement;

        var element = event.target;

        // Climb up the document tree from the target of the event
        while (element) {
            if (element.nodeName === "BUTTON" && /btn_outlined/.test(element.className)) {
                // The user clicked on a <button> or clicked on an element inside a <button>
                // with a class name called "foo"
                //console.log(element);
                for(clsNm of element.classList){
					if(/class 추가/.test(clsNm)){
						//console.log(clsNm);
						initStat(common.Map.get(clsNm));
						return;
					}
				}
                initStat(element.innerText);
                break;
            }

            element = element.parentNode;
        }
    }
    function initStat(btnEventNm) {
        object.initChart(btnEventNm);
        //}
    }
},
```

## 체크박스 값 전체 가져오기
```js
// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByClassName("itemClass");
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        //checkboxesChecked.push(checkboxes[i].value);
        list.push(checkboxes[i].value); 
     }
  }
  // Return the array if it is non-empty, or null
  return list.length > 0 ? list : null;
}
```
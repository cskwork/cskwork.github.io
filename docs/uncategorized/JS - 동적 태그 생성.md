---
title: "JS - 동적 태그 생성"
description: "https&#x3A;//ludeno-studying.tistory.com/82https&#x3A;//blog.naver.com/PostView.nhn?blogId=isaac7263&logNo=221719273728HTMLJS"
date: 2021-11-25T12:59:08.717Z
tags: []
---
https://ludeno-studying.tistory.com/82

https://blog.naver.com/PostView.nhn?blogId=isaac7263&logNo=221719273728

1번
HTML
```html
HTML CSS JSResult Skip Results Iframe
EDIT ON
<div id = "tagArea">
</div>
<input type="button" value="add_hTag" onclick="create_hTag();">
<input type="button" value="add_pTag" onclick="create_pTag();">
```
JS
```js
let pTagCount = 1;
let hTagCount = 1;
function create_pTag(){
  let tagArea = document.getElementById('tagArea');
  let new_pTag = document.createElement('p');
  
  new_pTag.setAttribute('class', 'pTag');
  new_pTag.innerHTML = pTagCount+". 추가된 p태그";
  
  tagArea.appendChild(new_pTag);
  
  pTagCount++;
}
function create_hTag(){
  let tagArea = document.getElementById('tagArea');
  let new_hTag = document.createElement('h'+hTagCount);
  
  new_hTag.innerHTML = "추가된 h"+hTagCount+"태그";
  
  tagArea.appendChild(new_hTag);
  
  if(hTagCount < 6)
    hTagCount++;
}
```

2번
HTML
```html
<html>
  <body id="parent">
    <a href="javascript:createDIV()">DIV 생성</a>
  </body>
</html>
```
JS
```js
function createDIV(){
  var obj = document.getElementById("parent");
  var newDIV = document.createElement("div");
  newDIV.innerHTML="NEW CREATED";
  newDIV.setAttribute("id","myDiv");
  newDIV.style.backgroundColor="yellow";
  newDIV.onclick = function(){
    var p = this.parentElement;
    p.removeChild(this);
  };
  obj.appendChild(newDIV);
}
```
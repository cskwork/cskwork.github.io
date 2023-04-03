---
title: "JS 복붙 방지"
description: "하단에 추가하면된다.단 JS DISABLE하면 이건 해제 가능! "
date: 2021-04-17T13:58:22.207Z
tags: ["JavaScript"]
---
하단에 추가하면된다.


- 복사 이벤트 듣고 있다가 값을 '' 클립보드 데이터를 (blank)로 대체한다. 
- 단 개발자도구에서 JS DISABLE하면 해제됨 
```
document.addEventListener('copy', function(e){
     var text = window.getSelection().toString().replace(/[\n\r]+/g, '');
     e.clipboardData.setData('text/plain', '');
     e.preventDefault();
    });
 ```
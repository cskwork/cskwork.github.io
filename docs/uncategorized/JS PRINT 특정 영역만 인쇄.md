---
title: "JS PRINT 특정 영역만 인쇄"
description: "안되면"
date: 2021-12-23T06:50:29.221Z
tags: []
---
## PRINT 방법 1

 
```html
 // 이걸로 print.css (인쇄에 적용될 css) 조정
 <link rel="stylesheet" type="text/css" media="print" href="/css/print.css" /> 
 <input type="button" value="인쇄하기" id="print" class="a_btn a_btn_white" onclick="window.print()"/>
 
<script>
 function printCV(){
     var initBody = document.body.innerHTML;
     // printTag는 인쇄할 영역
     if(document.getElementById('printTag')){
       console.log(document.getElementById('printTag'));
       console.log(document.getElementById('printTag').innerHTML);
     }
     window.onbeforeprint = function(){
       document.innerHTML = document.getElementById('printTag').innerHTML;
     }
     //window.onafterprint = function(){
     //    document.body.innerHTML = initBody;
     //}
     window.print();       		 
 }
</script>
```

안되면

## PRINT 방법 2 
``` html
<!-- 인쇄 미리보기  -->
<iframe name=PRINT style="visible:false"></iframe>

 <input type="button" value="인쇄하기" id="print" class="a_btn a_btn_white" onclick="PrintElem()"/>

<div id="printCVTag">
 프린트 내용  
 </div>

<script>
function PrintElem()
{
  	// iframe = Print 사용
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    // 스타일 적용 방법 1
    mywindow.document.write('<th:block layout:fragment="css"> ');  
    mywindow.document.write('<link rel="stylesheet" href="/css/print.css" type="text/css" />');
    mywindow.document.write(' </th:block> ');
  
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById('printTag').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
	
    // 필요 - style loading is async
    setTimeout(function() {
    mywindow.print();
    }, 10);
    mywindow.close();
}
</script>
```

### 결과
![](/images/7123dd48-bf3e-460e-be51-61e7642be701-image.png)
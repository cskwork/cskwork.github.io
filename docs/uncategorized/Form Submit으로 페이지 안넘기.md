---
title: "Form Submit으로 페이지 안넘기"
description: "JS"
date: 2021-11-26T04:38:58.439Z
tags: []
---
JS
```js
var $form = $('form');
$form.submit(function(){


  $.post(
    $(this).attr('action'), $(this).serialize(), 

    function(response){
      // do something here on success
    },'application/json');
  return false;


});
```
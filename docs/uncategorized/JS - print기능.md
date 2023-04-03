---
title: "JS - print기능"
description: " css html"
date: 2021-12-02T08:11:30.862Z
tags: []
---
 css
 ```css
 #menu, .cont_breadcrumb, .header_wrap, .chatbot_wrap, .chatbot_box, #footer { 
	display: none; 
} 

#wrapper, 
#content { 
	width: auto; 
	border: 0; 
	margin: 0 5%; 
	padding: 0; 
	float: none !important; 
}
 ```

 html
 ```html
 <link rel="stylesheet" type="text/css" media="print" href="/css/print.css" />

 <input type="button" value="인쇄하기" id="print" class="a_btn a_btn_white" onclick="window.print()"/>
		
 ```

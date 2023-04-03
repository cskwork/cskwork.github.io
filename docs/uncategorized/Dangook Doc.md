---
title: "Dangook Doc"
description: "VIEW 계층 High-Level -> Low Level(DB) 경로SRC PATHdani/src/main/resourfces/templates/path1/path2.htmlUses ThymeleafContains \*\*Service.js inits service c"
date: 2021-10-17T12:53:01.686Z
tags: []
---
## 정리 규칙 
VIEW 계층 High-Level -> Low Level(DB) 경로
### 테스트 규칙
1 POSTMAN CALL REST
2 DEBUGGER JS
3 FILENAME, PATH CHECK
### shortcut eclipse
ctrl+shif+f = neat format
ctrl+shift+x = uppercase

## dani
### API TEST
```
GET 
http://localhost:8080/rest/getLectureOpinion.do?subjectId=399810&division=1&year=2021

POST
http://localhost:8080/rest/addLectureOpinion.do?subjectId=399810&division=1&year=2021&userId=32172556&smstrCd=1&comment=123&period=1

DEL
http://localhost:8080/rest/delLectureOpinion.do?seq=18&userId=32172556
```
##  JS

### Hide if empty
``` js
if(!this.data){
  $('#qna_cnt').empty().text('0')
  $('#qna_empty').attr("style","")
  $('#modal_tab_box1 > .inquiry_tbl_wrap').hide()
  $('#qna_pagination').parent().hide()
  // $('#qna_area').attr("style","display:none")
  $('#btn_deleteAll').hide()
  return
}
```

### SORT ALIGN
``` js

$("#object_Toggle").on("click", function (){
  object.ListDraw();
});

/**
     * 채용 리스트
     * @param page
     */
ListDraw: function (page) {
  var self = this;
  page = page === undefined? 1 : page;

  $("#object_Size").text(this.objectList? this.objectList.length: "0");

  if(!(self.objectList && self.objectList.length)){
    $("#objectList").empty();
    $("#objectList").append(`
<p class="sub_tab_none">
<span>
정보가 없습니다.<br/>
</span>
</p>
`);
    return;
  }
  //정렬
  var format = 'YYYY-MM-DD HH:mm:ss.SSSS'
  if(self.objectList && self.objectList.length > 1){
    // IF active sort ASC else SORT DESC
    $("#object_Toggle").hasClass("active")
      ? self.objectList.sort((a, b) => moment(a.regDate, format) - moment(b.regDate, format)) // 오름차순
    : self.objectList.sort((a, b) => moment(b.regDate, format) - moment(a.regDate, format)) // 내림차순
  }


  $("#objectList").empty();
  var html = ""
  if(this.objectList){
    for (let scrap of this.objectList.slice((page - 1) * 20, page * 20)) {
      var dataList = [
        this.object.groupName === "영웅스토리 추천채용" && scrap.scrapInfo4 ? `<strong>캠퍼스</strong> ${scrap.scrapInfo4}` : '',
        scrap.scrapInfo1 ? `<strong>근무지역</strong> ${scrap.scrapInfo1}` : '',
        scrap.scrapInfo3 ? `<strong>마감일</strong> ${scrap.scrapInfo3}` : ''
      ]

      html +=`<li>
<div class="scrap_hd">
<span class="date">${scrap.regDate.replace(/-/gi,'/').substr(0,16)}</span>
<button type="button" class="btn_icon btn_scrap_colse" onclick="object.deleteClick(this,'명칭');" data-item = ${scrap.seq}><span>삭제</span></button>
</div>
<div class="scrap_bd scrap_bd01">
<a href="${common.regUrlType(scrap.url)?scrap.url:'javascript:void(0);'}" target="${common.regUrlType(scrap.url)?"_blank":""}" title="스크랩 상세 페이지로 이동">
<span class="category">${self.gubunFormat(self.recruite.groupName)}</span>
<p>
<strong class="p_sub_title">${scrap.scrapInfo2}</strong>
<strong class="p_main_title">${scrap.scrapNm}</strong>
<span class="p_sub_title">${common.join(dataList, ' | ')}</span>
</p>
</a>
</div>
</li>`
    }
  }
  //if(!html) html = `<tr><td colspan="7">조회된 결과가 없습니다.</td></tr>`
  $("#objectList").append(html);
  common.load_chatbox();
  //NavigationBar
  if(this.objectList && this.objectList.length > 0){
    common.navigationBar(this.objectList.length, page, 20, $("#objectPagination"), "scrap.object")
  }
},
```
### Pagination
``` js
navigationBar: function (totalElementCount, currentPage, pageSize, selectorPagination, sectionName) {

  selectorPagination.parent().prev().children().last().removeClass('pag_none')

  if (totalElementCount <= pageSize) {
    selectorPagination.hide()
    selectorPagination.html('')
    selectorPagination.parent().prev().children().last().addClass('pag_none')
    return
  }

  var blockSize = 5
  var totalBlock = Math.ceil(totalElementCount / pageSize)
  var lastBlock = 1
  var firstBlock = 1

  if (totalBlock > 1) {
    var mod = totalBlock % blockSize
    lastBlock = totalBlock

    if (totalBlock - mod >= currentPage) {
      lastBlock = Math.ceil(currentPage / blockSize) * blockSize
      firstBlock = lastBlock - (blockSize - 1)
    } else {
      firstBlock = Math.ceil(currentPage / blockSize) * blockSize - (blockSize - 1)
    }
  }

  var nextBlock = lastBlock + 1
  var prevBlock = firstBlock - 1

  let pagination = ''
  if (prevBlock > 0) {
    pagination += `<li class="page_prev"><a href="javascript:void(0)" onclick="${sectionName}.pagination(${prevBlock})">
<span class="icon">이전 페이지로 이동</span></a></li>`
    // pagination += `<a href="javascript:void(0)" onclick="${sectionName}.pagination(${prevBlock})">&laquo;</a>`
  }

  for (var block = firstBlock; block <= lastBlock; block++) {
    pagination += block == currentPage
      ? `<li class="active"><a href="javascript:void(0)" onclick="${sectionName}.pagination(${block})">${block}</a></li>`
    : `<li><a href="javascript:void(0)" onclick="${sectionName}.pagination(${block})">${block}</a></li>`
  }

  if (nextBlock <= totalBlock) {
    pagination += `<li class="page_next"><a href="javascript:void(0)" onclick="${sectionName}.pagination(${nextBlock})"><span class="icon">다음 페이지로 이동</span></a></li>`
  }
  selectorPagination.html(pagination)
  selectorPagination.show()
  selectorPagination.parent().prev().children().last().animate({
    scrollTop: 0
  }, 300)
  // selectorPagination.parent().prev().children().last().scrollTop(0, 0)

},
```
### AJAX POST
```js
addSubmit:function (){
  var self = this;
  var inputVal = $('#inquiry_box').val()

  $.ajax({
    url: `/addLectureOpinion.do?userId=${common.getUserId()}&comment=${inputVal}`,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json'
  }).done(function (rs) {
    if (rs.retCode === "FAIL") return
    self.callAjax();
    common.callAlert('등록되었습니다.')
    $('#inquiry_box').val('')
    $('#inquiry_submit_btn').prop("disabled","disabled")
  }).fail(function (error) {
    console.log(error)
  })
},
```

### AJAX GET / REDRAW LIST
``` js
callAjax:function (){
  var self = this;
  $.ajax({
    url: `/rest/qna?userId=${common.getUserId()}`,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json'
  }).done(function (rs) {
    if (rs.retCode === "FAIL") return
    self.data = rs.data;
    self.drawQnaList();
  }).fail(function (error) {
    console.log(error)
  })
},
```

### THYMELEAF SYNTAX to use VAR
```
X url ="`/addLectureOpinion.do?userId=${common.getUserId()}";
O url =`/addLectureOpinion.do?userId=${common.getUserId()}`;
```
### CSS
- SRC PATH
dani/src/main/resources/static/css/common.css
- List Design
- REF
```css
/* reporting */
.scrap_area{}
.scrap_title_area{display:inline-block; vertical-align:top; width:100%; margin-bottom:20px; position:relative;}
.scrap_title_area .list_count{float:left; line-height:40px;}
.scrap_title_area .filter_wrap{float:right;}
.lectureOpinion_list{}
.lectureOpinion_list > li{margin-top:10px; border:1px solid #d4d4d4;}
.lectureOpinion_list > li:first-child{margin-top:0;}
.lectureOpinion_list > li > p{}
.lectureOpinion_list > li > .scrap_hd{padding:12px 40px 12px 15px; overflow:hidden; position:relative; border-bottom:1px solid #d4d4d4;}
.lectureOpinion_list > li > .scrap_hd > span{display:block; font-size:12px;}
.lectureOpinion_list > li > .scrap_hd > button{position:absolute; right:15px; top:50%; margin-top:-5.5px;}
.lectureOpinion_list > li > .scrap_hd > button > span{width:11px; height:11px; background-position:-200px -160px;}
.lectureOpinion_list > li > .scrap_bd{}
.lectureOpinion_list > li > .scrap_bd > a{display:block; padding:15px;}
.lectureOpinion_list > li > .scrap_bd .p_sub_title{color:#333;}
.lectureOpinion_list > li > .scrap_bd .p_sub_title > strong{color:#888; font-weight:400;}
.lectureOpinion_list > li > .scrap_bd01{}
.lectureOpinion_list > li > .scrap_bd01 > a{display:block; padding:15px 15px 15px 105px; font-size:0;}
.lectureOpinion_list > li > .scrap_bd01 > a .category{display:inline-block; vertical-align:middle; width:90px; margin-left:-90px; font-size:12px; font-weight:500; color:#555; padding:5px 15px; background-color:#fff; border:1px solid #555; border-radius:12px; text-align:center;}
.lectureOpinion_list > li > .scrap_bd01 > a p{display:inline-block; vertical-align:middle; width:100%; padding-left:10px;}
.lectureOpinion_list > li > .scrap_ft{padding:7px 15px; background-color:#f5f5f5; border-top:1px solid #d4d4d4;}
.lectureOpinion_list > li > .scrap_ft .keyword{display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex;}
.lectureOpinion_list > li > .scrap_ft .keyword > strong{flex-shrink:0; width:70px; height:24px; line-height:22px; text-align:center; font-size:12px; color:#555; background-color:#fff; border:1px solid #555; border-radius:12px;}
.lectureOpinion_list > li > .scrap_ft .keyword > span{flex-grow:1; line-height:24px; font-size:14px; padding-left:10px;}
```
### HTML
- SRC PATH
dani/src/main/resourfces/templates/path1/path2.html
- Uses Thymeleaf
- Contains **Service.js 
- inits service 
- config.html is common to ALL
Contains common css, jquery, session data, etc
- data-taget links to html popup
```html
<li data-target="Pop_Name.html" data-type="E">#Name인</li>
```
- header.html Contains top nav
- data-tab has eventbinding in ***Service.js to display tab
```js
$(".tab-link").on("click",function (){
  var tab_id = $(this).attr('data-tab');
  $('.tab-link').removeClass('current');
  $('.tab-content').removeClass('current');

  $(this).addClass('current');
  $("#"+tab_id).addClass('current');
});

```
- data-href Button click event in common.js
```js
$(document).on("click", "[data-href]", function (e) {
  var href = $(this).attr("data-href") || $(this).attr("href");
  var anchor = document.createElement("a");
  if (!anchor.click) {
    //console.log("click", !anchor.click);
    location.href = href;
  } else {
    anchor.setAttribute("href", href);
    anchor.style.display = "none";
    $("head, body").first().append(anchor);
    //console.log("click", anchor.parentNode.tagName);
    anchor.click();
  }
});
``` 
- data-popup-get Even in common.js
```js
$(document).on("click", "[data-popup-get]", function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  var url = $(this).attr("data-popup-get") || this.href;
  var params = $(this).attr("data-params");
  // Promise object represents the eventual completion (or failure) of an 
  // asynchronous operation and its resulting value
  $.get(url, function (html) {
    $("#Modal").data("url", url).html(html).promise().done(function () {
      $("#Modal").attr("data-params",params).modal("show");
    });
  });
});
```



### (Control Route to HTML) Controller
- SRC PATH
dani/src/main/java/com/eduai/dani/controller/***Contorller
- Link EX
``` java
@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/URICallpath")
public class ***Controller extends BaseController  {

    /**
     * FUNCTION
     * @param device
     * @return
     */
    @GetMapping
    public String MathodName(Device device) {
    return getView(device, "path1/path2");
    }
    // URICallpath Links to path1/path2
    // dani/srwc/main/resources/templates/path1/path2.html
}
```

### (Data-Access) Service 
- SRC PATH:
dani/src/main/java/com/eduai/dani/***Service 
- REST CALL URI to application.yml
@Value("${gateway.dani.***.***Uri}")

### DTO
- SRC PATH:
dani/src/main/java/com/eduai/model/***
- Has getter, setter. Uses lombok. (Lombok requires separate Install 


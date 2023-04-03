---
title: "Django Admin 폼 작성 권한 수정"
description: "Django Admin 폼 작성 권한 수정 "
date: 2021-04-15T05:48:24.520Z
tags: ["django"]
---
### Django Admin 폼 작성 권한 수정
```
    
    def get_form(self, request, obj=None, **kwargs):
        #if obj.type == "1":
       
        # 항목 표시 안하기 
        self.exclude = ("upload_filename", "hits", "is_push" )
        form = super(NoticeAdmin, self).get_form(request, obj, **kwargs)
       
        #폼 작성 권한 수정
        form.base_fields['writer'].widget.can_add_related = False
        form.base_fields['writer'].widget.can_change_related = False
        form.base_fields['writer'].widget.can_delete_related = False
        return form
```


### 화면 결과
- 작성자 옆에 쓰기, 수정, 삭제 권한이 표시되지 않음.

![](/images/4ceae625-32cd-461f-884d-9f2e5d6e0523-image.png)
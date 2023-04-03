---
title: "Django Action Push"
description: "현상 : 장고 관리자에서 푸시 발송 우선 폼 작성시 곧바로 그리고 자동으로 푸시 발송을 하려고 노력했지만 방법이 없었다. 그래서 수동으로 푸시를 발송하는 방법을 찾았다. (오히려 같은 항목으로 여러번 발송해야 하는 경우 더 직관적인 방법일 수 있다는 생각이 지금 든다."
date: 2021-04-14T16:24:36.603Z
tags: ["django","push notification"]
---
### 현상 : 장고 관리자에서 푸시 발송
우선 폼 작성시 곧바로 그리고 자동으로 푸시 발송을 하려고 노력했지만 방법이 없었다. 그래서 수동으로 푸시를 발송하는 방법을 찾았다. (오히려 같은 항목으로 여러번 발송해야 하는 경우 더 직관적인 방법일 수 있다는 생각이 지금 든다.)

### 해결 방안 :
action make published를 이용해서 queryset으로 전부 가져와 react native에서 deep link 가능한 url을 발송하는 방법이다. rn에서는 이미 url을 받아 json parsing한 후 listener가 듣고 있다가 열 수 있는 방식을 구현했다.

##### 소스 코드
```python
from django.utils.translation import ngettext
from django.contrib import messages

    actions = ['make_published'] 
    def make_published(self, request, queryset):
        updated = False
        data = queryset.all()
        for item in data:
            # 푸시 발송
            # ------------------------------------------------------------------
            if(not item.is_push):
                pk = item.pk 
                category = item.category
                url = "/notice/"+category+"/"+str(pk)
                title = item.title
                body = item.content
                message = strip_tags(body)[:100] # 푸시 바디 제한됨
                try:
                    job = django_rq.get_queue('default', default_timeout=3000)  
                    job = django_rq.enqueue(send_to_all, title, message, url)
                    updated = queryset.update(is_push=True)
                except:
                    pass
            # ------------------------------------------------------------------
        self.message_user(request, ngettext(
            '%d개 정상 발송되었습니다.',
            '%d개 정상 발송되었습니다.',
            updated,
        ) % updated, messages.SUCCESS)
    make_published.short_description = "푸시 발송"

```
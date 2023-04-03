---
title: "Nginx STATIC 설정 해석"
description: "/2static이란 서버로 들어오는 모든 서버ip/2static 호출을 alias /home/.staticfiles;로 포워딩한다는 의미다.http&#x3A;//cheng.logdown.com/posts/2015/01/29/deploy-django-nginx-gunic"
date: 2021-04-16T02:28:41.978Z
tags: ["Nginx"]
---
```
    location /2static {
        #autoindex on;
         alias /home/.staticfiles;
        #root /home/.staticfiles/;


```
/2static의미
- 서버로 들어오는 모든 서버ip/2static 호출을 alias /home/.staticfiles; 경로로 포워딩한다는 의미다.


### 참고
http://cheng.logdown.com/posts/2015/01/29/deploy-django-nginx-gunicorn-on-mac-osx-part-2
https://cheat.readthedocs.io/en/latest/django/static_files.html
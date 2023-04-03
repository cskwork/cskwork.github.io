---
title: "CSS 파일 수정이 반영 안되는 현상"
description: "Django에서 collectstatic을 날리면 debug = True의 경우는 css 변경사항이 바로 반영된다.하지만 debug =False 에서는 안되는 걸 봐서는 static을 serve하는 nginx측의 문제로 보인다.우선 시도해 본건 Nginx expires"
date: 2021-04-16T01:14:34.616Z
tags: ["Cache","Nginx","django"]
---
### Nginx
Django에서 collectstatic을 날리면 debug = True의 경우는 css 변경사항이 바로 반영된다.
하지만 debug =False 에서는 안되는 걸 봐서는 static을 serve하는 nginx측의 문제로 보인다.

### 시도 :
우선 시도해 본건 
- Nginx expires 값 조정 css -1, expires off;
- proxy_cache_bypass $http_cachepurge
- proxy_cache_path /home/gcadmin/nginxcache 값 전부 삭제

### 현상 :
```bash
        ## CACHE FILES
        #----------------
        location /2static/ {
                 alias /sitedir/.staticfiles/;
                 try_files $uri =404;
                 expires $expires;
                 #expires 60; # 60
                 access_log off;
        }
```
```
curl -I "https://siteurl/CACHE/css/output.9291a1ea98ad.css"
```
확인해본 결과 Cache-Control : no-cache
즉 캐시 사용자체를 안하는데. 그럼 Nginx문제는 일단 아니다. 

그럼 장고에서 찾아주는 과정에서 문제가 발생한건가?
  ## CACHE FILES
        #----------------
        location /2static/ {
        #         autoindex on;
                 alias /home/gcadmin/mainsite/.staticfiles/;
여기서 serve는 맞는데

해결중 :
django-compress가 해싱한 css js 파일을 다시 한번 압축시키는데 파일명 뒤에 해싱값이 들어간 파일을 nginx에서 찾지만 실제 파일값이 수정된 상황이 반영되지 않는다.
그래서 현재는 원본 스태틱 수정과 STATIC_ROOT 에 있는 해싱값으로 출력된 값을 수정하고 있다




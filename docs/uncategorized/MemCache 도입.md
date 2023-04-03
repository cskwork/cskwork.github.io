---
title: "MemCache 도입"
description: "설치 방법  1 memcache 설치 sudo apt-get install memcached 2 python-memcached 패키지 설치 pip install python-memcached 3 memcache 상태 확인 service memcached status 4"
date: 2021-04-12T02:49:00.011Z
tags: ["Cache","django"]
---
## 설치 방법

### 1 memcache 설치
sudo apt-get install memcached
### 2 python-memcached 패키지 설치
pip install python-memcached
### 3 memcache 상태 확인
service memcached status
### 4 특정 페이지 캐싱 
from django.views.decorators.cache import cache_page
path("", cache_page(60 * 15)(views.HomeListView.as_view()), name='home'),

memcache 재시작 명령어
```
sudo service memcached stop
sudo service memcached start
sudo service memcached restart
```

### 5 Nginx와 연결
```
server {
    location / {
        set            $memcached_key "$uri?$args";
        memcached_pass host:11211;
        error_page     404 502 504 = @fallback;
    }

    location @fallback {
        proxy_pass     http://backend;
    }
}
```
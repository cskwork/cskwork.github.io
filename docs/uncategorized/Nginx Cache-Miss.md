---
title: "Nginx Cache-Miss"
description: "X-Cache-Status : Miss캐시 처리가 안되고 있다.이렇게 캐시 경로와 캐시 처리하라는 명령어로 처리했는데도 안되고 있다."
date: 2021-04-14T01:25:53.086Z
tags: ["Cache","Nginx"]
---
### 현상 :
X-Cache-Status : Miss
캐시 처리가 안되고 있다.
```
Server: nginx
Date: Wed, 14 Apr 2021 01:18:04 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 33999
Connection: keep-alive
Vary: Accept-Encoding
Vary: Accept-Language
Content-Language: ko
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: same-origin
X-Cache-Status: MISS
```
이렇게 캐시 경로와 캐시 처리하라는 명령어로 처리했는데도 안되고 있다.
```

#Proxy Caching https://www.nginx.com/blog/nginx-caching-guide/
proxy_cache_path /nginxcache levels=1:2 keys_zone=cache_zone:20m m>
                 inactive=7d use_temp_path=off;

location / {
   # Cache Prop
   #--------------------------
   add_header X-Cache-Status $upstream_cache_status;
   proxy_cache_valid 200 60m;
   proxy_cache cache_zone;
   proxy_cache_min_uses 1;
   proxy_cache_revalidate on;
   proxy_cache_background_update on;
   #---------------------------
}
```

### 해결 : 

오타가 있어 정리했다. 
```
@ip:~/ $ curl --head https://siteurl
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 14 Apr 2021 01:30:13 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 33999
Connection: keep-alive
Vary: Accept-Encoding
Vary: Accept-Language
Content-Language: ko
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: same-origin
X-Cache-Status: HIT
```

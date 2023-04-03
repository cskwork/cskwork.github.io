---
title: "Nginx 서비스가 죽었다"
description: "간혹 사이트가 죽는 경우가 있는데 확인해보면 봇 크롤링 로그가 찍히고 nginx access.log를 확인하면 대한민국이 아닌 이탈리아, 아프리카, 홍콩 등 타지에서 봇이 접속한 경우가 발생했다.그래서 Nginx로 봇 접속을 차단하려고 설정을 찾아봤다.우선은 아래 세 "
date: 2021-04-13T23:45:54.466Z
tags: ["Nginx","server config"]
---
### 현상 : 사이트 죽음
간혹 사이트가 죽는 경우가 있는데 확인해보면 봇 크롤링 로그가 찍히고 nginx access.log를 확인하면 대한민국이 아닌 이탈리아, 아프리카, 홍콩 등 타지에서 봇이 접속한 경우가 발생했다.

### 현상 분석 및 솔루션 : 봇 접속 차단

그래서 Nginx로 봇 접속을 차단하려고 설정을 찾아봤다.

우선은 아래 세 가지를 서버 conf에 쓰니 서버가 죽는 현상은 확연히 줄었다.
```

# 1 특정 봇 막기
map $http_user_agent $limit_bots {
        default 0;
         ~*(bingbot|FeedDemon|GrapeshotCrawler|DuckDuckBot|MegaIndex) 1;
         ~*(VelenPublicWebCrawler|SimplePie|YandexBot|SCMGUARD|DotBot) 1;
         ~*(AhrefsBot|SemrushBot) 1;
}

# 2 IP 하나로 서비스 연결 갯수 제한
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
# 3 하나의 세션으로 요청할 수 있는 갯수 제한.
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;

server{
    # 2
    limit_conn conn_limit_per_ip 15;
	location /login/ {
        # 2
        limit_req zone=req_limit_per_ip;
    }

     location / {
         root /사이트 경로;
         # 1 봇 차단 조건
         if ($limit_bots = 1) {
              return 403;
         }
         # 3
         limit_req zone=req_limit_per_ip burst=10 nodelay;
     }
```

##### 1번은 불필요한 봇 차단 조건을 넣었다. 

##### 2는 하나의 IP로 연결 가능한 갯수에 제한을 두었고. 로그인 페이지는 연속적인 연결이 필요하지 않게 때문에 10으로 제한했다. 

##### 3번은 더 자세하게 설명.
```
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;
limit_req zone=req_limit_per_ip burst=10 nodelay;
```
- req_limit_per_ip:10m : 공유 메모리를 10MB로 정하고 
- rate=5r/s : 요청 가능한 최대 갯수는 rate * burst/s 로 현재는 50(5 x 10) 요청을 5초 동안 처리할 수 있다. 
- nodelay : 해당 옵션이 있는 경우 초과되는 요청은 503을 리턴하는데 nodelay가 없으면 초과 요청을 나중에 처리한다.

```
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
```
- conn_limit_per_ip:10m : 공유 메모리는 10MB로 제한한다.
- limit_conn conn_limit_per_ip 15 : IP 하나로 접속 가능한 수는 15.
일반적인 브라우저는 2-8개의 연결을 SPDY 프로토콜로 인해 나눠서 진행한다.
- 연결을 초과하면 Nginx는 503을 돌려준다.

### 후기 :
위와 같은 설정을 한 이후로 서버가 죽는 현상은 없었다. 좀 더 지켜봐야 되지만 안전장치는 해둔 것으로 사료된다. 
추가적으로 header, body에 대한 타임아웃, body maxsize , conn. timeout 등도 설정을 해뒀는데 다음 글에 다루기로 한다. 

### 참고 : 
https://www.nginx.com/blog/rate-limiting-nginx/
https://serverfault.com/questions/660243/nginx-how-to-set-limit-conn-and-limit-req








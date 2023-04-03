---
title: "Nginx 서버 설정 (프록시, 캐시, 보안)"
description: "NGINX 서버 설정 탐구"
date: 2021-04-11T11:49:33.399Z
tags: ["Nginx"]
---
### 프록시 구축
```
# 넘겨 받을 때 프록시 헤더 정보를 지정
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-NginX-Proxy true;

# 업로드 가능한 최대 용량
# - default: 1M
client_max_body_size 256M;
# 클라이언트 버퍼 사이즈 (body 에 들어오는 사이즈)
# - default: 32bit-8K, 64bit-16K
client_body_buffer_size 1m;

# 백엔드 서버로부터의 응답을 버퍼링할지 여부를 정의
# - on: 버퍼가 제공하는 메모리 공간을 이용해 응답 데이터를 메모리에 저장
# - off: 응답을 직접 클라이언트에게 전달
proxy_buffering on;
# 백엔드 서버로부터의 응답 데이터를 읽는 데 사용할 버퍼의 수와 크기를 설정
proxy_buffers 256 16k;
# 백엔드 서버 응답의 첫 부분을 읽기 위한 버퍼 크기를 설정 (주로 간단한 헤더 데이터가 포함)
proxy_buffer_size 128k;
# 버퍼가 여기서 지정한 값을 초과하면 데이터를 클라이언트로 보내고 버퍼를 비웁
proxy_busy_buffers_size 256k;

# 한번에 쓸 수 있는 임시 파일 용량
proxy_temp_file_write_size 256k;
# 최대 쓸 수 있는 임시파일 용량
proxy_max_temp_file_size 1024m;

# 백엔드 서버 접속 제한시간을 정의
proxy_connect_timeout 300;
# 백엔드 서버로부터 데이터를 읽을 때의 제한시간
proxy_send_timeout 300;
# 백엔드 서버로 데이터를 전송할 때의 제한시간
proxy_read_timeout 300;
# 백엔드 서버가 보내오는 모든 에러 페이지를 엔진엑스가 직접 클라이언트에게 회신
proxy_intercept_errors on;


 server {
  listen  8080;
  server_name {nginx server ip 혹은 domain 설정};
  # 서버 헤더와 에러페이지에서 Nginx버전이 표시되지 않게 한다. (보안 조치)
  server_tokens off; 
  
  # 하단에 설명한 buffer 설정 위치. 
  access_log /var/log/nginx/proxy/access.log;
  error_log /var/log/nginx/proxy/error.log;

  location / {
    # 위에서 설정한 프록시 파라미터 설정
    include /etc/nginx/proxy_params;
    # 요청을 보낼 주소를 입력
    # - 다른 주소에 있다면 localhost(127.0.0.1) 대신 도메인 혹은 IP 를 적어주면 된다.
    proxy_pass http://127.0.0.1:3000;
  }
}
  
```
- X-Real-IP(요청한 클라이언트의 실제 IP)
$remote_addr: 요청한 클라이언트 주소

- X-Forwarded-For(클라이언트의 IP 주소, 이전에 프록시 서버가 또 있었다면 그 IP 를 의미한다는 것이 Real-IP 와의 차이)
이를 통해 클라이언트 헤더의 주소를 알 수 있다.
nginx로는 RFC7239 표준 Forwarded를 사용함으로써 일부 보안취약점 보완 가능.

- $proxy_add_x_forwarded_for: 요청 헤더와 그 뒤에 따라오는 클라이언트의 원격 주소를 포함
Host(호스트 명)

- $http_host: http 요청이 들어 왔을 시 호스트 명

- X-Forwarded-Proto (스키마 이름)

- $scheme: 요청된 스키마를 가지고 있음(ex> http, https)

- X-NginX-Proxy
nginx proxy 를 썼다는 뜻. 안써도 무방. 표준 X


### 캐시
```
http {
    # ... 생략

    # 캐시 저장소 설정
    # - levels: 하위 디렉토리의 깊이
    # - keys_zone: 캐시를 가리키는 이름, 차지하는 메모리 크기를 설정
    # - inactive: 캐시된 응답이 지정한 시간만큼 사용되지 않으면 캐시에서 제거
    # - max_size: 전체 캐시의 최대 크기
    proxy_cache_path /var/cache/nginx/cache/ levels=1:2 keys_zone=cache_zone:40m inactive=7d max_size=100m;
    # 임시파일 저장소 설정
    proxy_temp_path /var/cache/nginx/temp/;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-available/*.conf;
}

 # Media 파일들인 경우 캐시를 지정 
  location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
    include /etc/nginx/proxy_params;
    proxy_pass http://127.0.0.1:3000;
    
    # 캐시 존을 설정 (캐시 이름)
    proxy_cache cache_zone;
    
    # 200 302 코드는 20분간 캐싱
    proxy_cache_valid 200 302 20m;
    
    # 404 에러 코드는 20분간 캐싱
    proxy_cache_valid 404 20m;
    
    # X-Proxy-Cache 헤더에 HIT, MISS, BYPASS와 같은 캐시 적중 상태정보가 설정
    add_header X-Proxy-Cache $upstream_cache_status;
    
    # Cache-Control 은 public 으로 설정
    add_header Cache-Control "public";
    
    # 클라이언트의 헤더를 무시한다.
    # - “X-Accel-Expires”, “Expires”, “Cache-Control”, “Set-Cookie”, “Vary” 의 헤더는 캐시에 영향을 줄 수 있는 요소이므로 잘 설정할 것
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control;
    
    # 만료기간을 1 달로 설정
    expires 1M;

    # access log 를 찍지 않는다. 어떤 IP로 서버로 접속했는지 기록은 안되지만 기록하는 과정이 없기 때문에 미세한 성능 업. - diskIO가 줄어든다. 반드시 필요하면 nginx.conf에 buffer설정하기!
    access_log off;
    # log_format compression '$remote_addr - $remote_user [$time_local] '
                       '"$request" $status $bytes_sent '
                       '"$http_referer" "$http_user_agent" "$gzip_ratio"';
    # access_log /var/log/nginx/access.log compression buffer=32k;
  }
```

### 보안 설정
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
- 1번은 불필요한 봇 차단 조건을 넣었다.
- 2는 하나의 IP로 연결 가능한 갯수에 제한을 두었고. 로그인 페이지는 연속적인 연결이 필요하지 않기 때문에 10으로 제한했다.
- 3번은 하단에 자세히 설명.
```
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;
limit_req zone=req_limit_per_ip burst=10 nodelay;
```

req_limit_per_ip:10m : 공유 메모리를 10MB로 정하고

rate=5r/s : 요청 가능한 최대 갯수는 rate * burst/s 로 현재는 50(5 x 10) 요청을 5초 동안 처리할 수 있다.

nodelay : 해당 옵션이 있는 경우 초과되는 요청은 503을 리턴하는데 nodelay가 없으면 초과 요청을 나중에 처리한다.

```
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
```
conn_limit_per_ip:10m : 공유 메모리는 10MB로 제한한다.

limit_conn conn_limit_per_ip 15 : IP 하나로 접속 가능한 수는 15.

일반적인 브라우저는 2-8개의 연결을 SPDY 프로토콜로 인해 나눠서 진행한다.
연결을 초과하면 Nginx는 503을 돌려준다.


### 참고
https://kscory.com/dev/nginx/setting
https://www.nginx.com/blog/tuning-nginx/
https://serverfault.com/questions/286825/should-i-keep-access-log-turned-on-in-nginx
http://nginx.org/en/docs/http/ngx_http_log_module.html
https://www.nginx.com/blog/rate-limiting-nginx/
https://serverfault.com/questions/660243/nginx-how-to-set-limit-conn-and-limit-req
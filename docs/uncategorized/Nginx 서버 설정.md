---
title: "Nginx 서버 설정"
description: "NGINX 서버 설정 탐구"
date: 2021-04-11T11:49:33.399Z
tags: ["Nginx"]
---
# 1 목적
NGINX 서버 설정을 탐구

# 2 퀵

```
proxy_cache_path /home/nginxcache levels=1:2 keys_zone=my_cache:10m max_size=10g
                 inactive=60m use_temp_path=off;
proxy_cache_key "$scheme$request_method$host$request_uri"; # Diff. cached files
# levels-twolv dir. for cache, keys_zone- memory zone for cache, max-size:upper limit for cache
#  inactive caching: 60min. use_temp_path - temp store cache area before caching
# Expires map

# limit the number of connections per single IP
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
# limit the number of requests for a given session
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;

server {
    server_tokens off; # hide nginx version
#    listen 443 ssl http2 siteurl 80;
    server_name siteurl http2 ssl 80 443;
    add_header Referrer-Policy "same-origin" always;
    add_header X-Cache-Status $upstream_cache_status;
    add_header X-Permitted-Cross-Domain-Policies none;
    add_header Cache-Control "public, proxy-revalidate, immutable, max-age=3153600";
#    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    limit_conn conn_limit_per_ip 10;
 #   limit_req zone=req_limit_per_ip burst=10 nodelay;

    if ($http_x_forwarded_proto = "http") {
       rewrite  ^/(.*)$  https://siteurl/$1 permanent;
    }

    if ($request_method !~ ^(GET|HEAD|POST)$ ) {
        return 405;
    }

    # max upload size
    client_max_body_size 100M;   

    location = /favicon.ico { access_log off; log_not_found off; }

    #Add Media Cache
    location /media {
        root /home/staticfiles/;
        try_files $uri =404;
        expires 30d;
    }
    #Add Static
    location /static {
        root /home/staticfiles/;
        try_files $uri =404;
        expires 20d;

    }

#    proxy_cache_path /home/nginxcache levels=1:2 keys_zone=my_cache:10m max_size=10g
 #                inactive=60m use_temp_path=off;


    location / {
        add_header Cache-Control "public, proxy-revalidate, immutable, max-age=3153600";
        proxy_cache my_cache;
        #proxy_cache_bypass $cookie_nocache $arg_nocache; # To get request from server before caching
        # GET request when refreshing content from origin server
        proxy_cache_revalidate on;  
        # Numb of times item requested by client before cache. Default is 1
        proxy_cache_min_uses 2; 
        # Instructs nginx to deliver stale content if conn. lost
        proxy_cache_use_stale error timeout updating http_500 http_502
                              http_503 http_504; 
        
        proxy_cache_background_update on;
        proxy_cache_lock on; # If multiple client request file not cached only first request is allowed. Others wait for cache
        proxy_cache_bypass $http_secret_header;
#        proxy_ignore_headers Expires Cache-Control Set-Cookie Vary;
        add_header X-Proxy-Cache $upstream_cache_status;
        include proxy_params;
        proxy_pass http://unix:/home/site.sock;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/siteurl/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/siteurl/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = siteurl) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    server_name siteurl http2 ssl 80 443;
    listen 80;
    return 404; # managed by Certbot
}
```
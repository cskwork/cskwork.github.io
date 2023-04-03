---
title: "Nginx-Django 운영을 위한 서버 캐시 정책 "
description: "자주 사용하는 데이터나 값을 미리 복사해 놓는 임시 장소입니다.저장 공간이 적고 빠른 성능을 제공해서 저장 공간이 작고 비용이 비싼 대신 빠른 성능을 제공하기 때문에 운영 서버에서는 필수에 가깝습니다.단 캐시를 사용하면 js, css 파일 등을 수정할 때 서버 설정값에"
date: 2021-04-23T03:06:32.277Z
tags: ["Nginx","django"]
---
### 🎁 서버 캐시
#### 정의: 
- 자주 사용하는 데이터나 값을 미리 복사해 놓는 임시 장소입니다.
- 저장 공간이 적고 빠른 성능을 제공하기 때문에 운영 서버에서는 필수에 가깝습니다.
- 단 캐시를 사용하면 js, css 파일 등을 수정할 때 서버 설정값에 따라서 수정사항이 반영 되기까지 시간이 좀 걸려요.

### 🦘 Django 서버 캐싱
memcache, redis cache, nginx cache 등 다양한 방법으로 서버 캐싱을 구현할 수 있고 하나만 사용할 때도 있고  nginx cache-memcache 조합으로 사용할 수도 있는데요.
저희는 우선 django에서 css, js 파일을 어떤식으로 서비스하는지 부터 알아볼게요.
대표적으로 캐싱에서 사용되는 건 ManifestStaticFilesStorage, whitenoise.storage.CompressedManifestStaticFilesStorage. 단 whitenoise는 운영에서 실제로 사용되지는 않는다고해요. 그래서 ManifestStaticFilesStorage하고 django-compressor의 조합을 사용했어요. 
ManifestStaticFilesStorage¶는 파일 컨텐츠에 MD5 hash 파일명을 붙여서 파일을 보관하고 필요할 때 보내줘요. 
예를 들어서 css/styles.css 은 css/styles.55e7cbb9ba48.css 파일로 파일명이 바뀌는거예요. 

왜 이렇게 할까요?

수정 전에 만들었던 파일은 그대로 두고 그 파일이 필요한 웹페이지에게 그대로 제공한다고해요. 

### 🐱 실습
#### 필수 패키지 pip install -r requirements.txt
```
django-compressor==2.4  # https://github.com/django-compressor/django-compressor
```


#### settings.py
```py
# django-compressor
# ------------------------------------------------------------------------------
# https://django-compressor.readthedocs.io/en/latest/quickstart/#installation
INSTALLED_APPS += ["compressor"]
STATICFILES_FINDERS += ["compressor.finders.CompressorFinder"]
COMPRESS_ENABLED = True
# ------------------------------------------------------------------------------
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
```

#### _base.html
```html
<!-- compress, cache가 필요한 css/js -->
{% load static compress %}
	{% compress css %}  <!-- 로컬 -->
	<link rel="stylesheet" href="/static/css/common/header.css"> 
    <!-- /# 공유 CSS-->
		{% block compress_css %}
		<!-- # 페이지 CSS--> 

		<!-- /# 페이지 CSS-->
		{% endblock %}
        {% endcompress %}
```

#### /etc/nginx/sites-available/sitesetting
```bash
#Proxy Caching https://www.nginx.com/blog/nginx-caching-guide/
proxy_cache_path /projectpath/nginxcache levels=1:2 keys_zone=cache_zone:20m max_size=5g
                 inactive=7d use_temp_path=off;

     location /static {
        #autoindex on;
        # collectstatic시 캐시 모음 경로
        alias /projectpath/.staticfiles;
         # HTTP Header response로 캐시를 서버에서 fetch했는지 알려줍니다. HIT/MISS/BYPASS 일반적.
         # 확인을 위한 명령어
         # curl --head https://siteurl
         add_header X-Cache-Status $upstream_cache_status;
         add_header Last-Modified $date_gmt;
         # cache 유효 시간
         proxy_cache_valid 200 10m;
         # cache 키 - proxy_cache_path
         proxy_cache cache_zone;
         # response cache를 위한 최소 요청 수
         proxy_cache_min_uses 1;
         proxy_cache_revalidate on;
         proxy_cache_background_update on;
         # 특정 URL은 캐싱 넘기게끔 설정 
         # https://siteurl/?nocache=true
         proxy_cache_bypass $cookie_nocache $arg_nocache;

      }
```

매번 서버를 접속해서 manage.py collectstatic, compress를 날리려면 번거롭기 때문에 보안성이 떨어진다는 점을 충분히 인지한 후에 .sh 스크립트로 서버에 해당 명령어를 날릴 수 있다는 점을 참고해주세요.

#### cacheRefresh.sh
```bash
plink -ssh user@ip -i "Path\PrivateKey.ppk" -m "cacheClearScript.txt"
```
#### cacheClearScript.txt
```bash
cd siteDir
source ./venv/bin/activate
python manage.py collectstatic --noinput
python manage.py compress --force
```

### 참고
https://mangkyu.tistory.com/69
https://django-compressor.readthedocs.io/en/latest/quickstart/#installation
https://blog.xoxzo.com/en/2018/08/22/cache-busting-in-django/
http://nginx.org/en/docs/http/ngx_http_proxy_module.html
https://velog.io/@csk917work/Nginx-%EC%84%9C%EB%B2%84-%EC%84%A4%EC%A0%95
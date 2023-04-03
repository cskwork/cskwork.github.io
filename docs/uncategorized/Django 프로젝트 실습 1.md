---
title: "Django 프로젝트 실습 1"
description: "Django 웹 프로젝트를 시작하는데 필요한 도구와 설치 및 설정 방법"
date: 2021-04-11T04:14:18.380Z
tags: ["django"]
---
# 1 목적 
Django 웹 프로젝트를 시작하는데 필요한 도구와 설치 및 설정 방법

# 2 퀵
1 파이썬 설치 (최신 버전)
https://www.python.org/downloads/

2 터미널을 열어서 프로젝트를 설치할 경로로 이동
```
mkdir pathToProject
cd ./pathToProject
```

3 파이썬 패키지 가상환경 생성 및 진입
```python
python -m venv venv

.\venv\Scripts\activate # window

source .\venv\bin\activate # Linux
```

4 Django 프레임워크 설치
```
pip install Django==3.2
```

5 설치 확인
```
py -V
py -m django --version
```

6 Django 프로젝트 구현
```
django-admin startproject mysite
```

7 서버 실행 ( http://127.0.0.1:8000/ URL 열람) 
```
 py manage.py runserver
```

---
---

# 3 이론
---
프로젝트 구조
- The outer mysite/ ( 프로젝트 컨테이너 )
root directory is a container for your project. Its name doesn’t matter to Django; you can rename it to anything you like.
- manage.py: ( Django 프로젝트를 제어하는 명령어 도구 )
A command-line utility that lets you interact with this Django project in various ways. You can read all the details about manage.py in django-admin and manage.py.
- The inner mysite/ ( 프로젝트 파이썬 패키지 모음 )
directory is the actual Python package for your project. Its name is the Python package name you’ll need to use to import anything inside it (e.g. mysite.urls).
- mysite/__init__.py: ( 해당 경로는 파이썬 패키지로 취급하기 위한 파일 )
An empty file that tells Python that this directory should be considered a Python package. If you’re a Python beginner, read more about packages in the official Python docs.
- mysite/settings.py: ( 프로젝트 설정 모음 )
Settings/configuration for this Django project. Django settings will tell you all about how settings work.
- mysite/urls.py: ( 프로젝트의 대분류 경로 모음)
The URL declarations for this Django project; a “table of contents” of your Django-powered site. You can read more about URLs in URL dispatcher.
- mysite/asgi.py: ( 서버와 프로젝트 사이의 async 방식 게이트웨이 )
An entry-point for ASGI-compatible web servers to serve your project. See How to deploy with ASGI for more details.
- mysite/wsgi.py: ( 서버와 프로젝트 사이의 sync 방식 게이트웨이 )
An entry-point for WSGI-compatible web servers to serve your project. See How to deploy with WSGI for more details.
---

# 4 참고
- https://docs.djangoproject.com/en/3.2/intro/tutorial01/







---
title: "Gunicorn/WSGI 서버 시리즈 2"
description: "우선 gunicorn 실행은 리눅스 환경에서 설치 및 실행한다고 가정할게요. Gunicorn과 함계 사용하는 Django, 그리고 리눅스(대표적으로 Ubuntu)에 프로젝트 생성 및 패키지 설치 방법은 인터넷에서 조금만 검색하면 자료가 많기 때문에 구체적으로 다룬지 않"
date: 2021-04-21T00:21:35.996Z
tags: ["gunicorn"]
---
### 🤷‍♀️ Gunicorn
우선 gunicorn 실행은 리눅스 환경에서 설치 및 실행한다고 가정할게요. Gunicorn과 합계 사용하는 Django, 그리고 리눅스(대표적으로 Ubuntu)에 프로젝트 생성 및 패키지 설치 방법은 인터넷에서 조금만 검색하면 자료가 많으므로 구체적으로 다루지는 않을게요. 바로 프로젝트를 gunicorn하고 연결하는 방법부터 시작하겠습니다. 
```
gunicorn --bind 0:8000 config.wsgi:application 
```
이 명령어는 무슨 뜻일까요?
우선 gunicorn을 gunicorn 프로그램을 호출한다는 명령어로 알겠는데 다른 건 모르겠네요. 
--bind -0:8000은 8000포트로 WSGI서버를 수행한다는 의미고요.
config.wsgi:application은 WSGI 서버가 호출하는 WSGI 애플리케이션은 config/wsgi.py 파일이라는 의미에요.

### ✔ 실행
상단에 있는 명령어를 날리고 서버로 접속하면 아마도 css, js 등이 적용되지 않은 상태로 나올 거예요. 그 이유는 gunicorn이 정적 파일을 읽지 못해서요. 시리즈 1번에서 설명했듯이 **gunicorn은 파이선 프로그램을 실행하는 WSGI 서버이고 정적 파일을 처리하지는 않아요!**


### 😸 Gunicorn 서비스로 등록하기
*** 다음은 반말 주의 ***
다음은 AWS 서버에 Gunicorn을 서비스로 등록하는 방법에 대해서 알아볼 건데 왜 서비스로 등록하냐고? 서버에 매번 명령어를 날려서 수동으로 시작하는 건 귀찮잖아! 그럼 좀 더 쉽게 Gunicorn 서비스를 시작, 중지 그리고 AWS 서버를 다시 시작해도 Gunicorn이 자동실행하게 하려면 서비스를 등록해야 해!

### 단계
- 환경 변수 파일 생성
```
sudo nano /home/ubuntu/venvs/mysite.env

#gunicorn이 사용하는 환경 변수 파일 추가!
DJANGO_SETTINGS_MODULE=config.settings.prod

```
- 서비스 파일 생성
```
sudo nano /etc/systemd/system/mysite.service

# 하단에 있는 내용 추가
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/projects/mysite
EnvironmentFile=/home/ubuntu/venvs/mysite.env
ExecStart=/home/ubuntu/venvs/mysite/bin/gunicorn \
        --workers 2 \
        --bind unix:/tmp/gunicorn.sock \
        config.wsgi:application
[Install]
WantedBy=multi-user.target
```
- 서비스 실행 및 등록
```bash
# 서비스 시작
sudo systemctl start mysite.service
# 서비스 상태 확인
sudo systemctl status mysite.service

# 서비스 자동 실행 등록
sudo systemctl enable mysite.service
# 서비스 중단
sudo systemctl stop mysite.service
# 서비스 재시작
sudo systemctl restart mysite.service

# 서비스 오류 확인 경로
/var/log/syslog
```



### 참고
https://wikidocs.net/76904


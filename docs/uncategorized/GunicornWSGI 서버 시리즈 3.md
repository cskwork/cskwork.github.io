---
title: "Gunicorn/WSGI 서버 시리즈 3"
description: "gunicorn service와 socket에 대해 햇갈릴 수 있는데요.시리즈 2에서 우리는 gunicorn 서버를 좀 더 편리하게 시작하고 중단하는 방법을 배웠어요. 이걸 가능하게 해주는 게 service와 socket파일인데요.우선 socket 파일은 서버를 시작하"
date: 2021-04-21T00:56:04.145Z
tags: ["gunicorn"]
---
### 🙀 Service ? Socket?
gunicorn service와 socket에 대해 헷갈릴 수 있는데요.
시리즈 2에서 우리는 gunicorn 서버를 좀 더 편리하게 시작하고 중단하는 방법을 배웠어요. 이걸 가능하게 해주는 게 service와 socket 파일인데요.

#### GUNICORN SOCKET
우선 socket 파일은 서버를 시작하면 생성되고요. 서버의 요청을 계속해서 듣고 있어요. 서버가 연결을 요청하면 systemd명령어로 gunicorn 프로세스를 자동으로 시작하고 서버 연결에 응답해요.
일반적인 socket 세팅은 아래와 같아요.
```bash
sudo nano /etc/systemd/system/gunicorn.socket

# gunicorn.socket
[Unit] # 소켓에 대한 설명
Description=gunicorn socket

[Socket] # 소켓 위치
ListenStream=/run/gunicorn.sock

[Install] # 소켓이 필요할 때 생성되게끔 지정
WantedBy=sockets.target
```
#### GUNICORN SERVICE
service는 wsgi의 임무를 실행해요. 시리즈 1에서 gunicorn은 동적 페이지 요청을 하려고 파이선 프로그램을 호출한다고 했었죠? 
네 임무를 수행해! 라는 메시지는 gunicorn socket이 전달해주는 거예요~
서비스와 소켓을 둘 다 만들고 실행하면 이렇게 정상적으로 실행이 될 거예요

![](/images/fc3aa629-7ba1-47d3-9704-2c3664a15b15-image.png)

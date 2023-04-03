---
title: "cURL의 모든? 것"
description: "정의 : cURL(client, URL)client-side program and URL client Request LIB.클라이언트 프로그램 + URL 프로그램URL을 사용해서 클라이언트 PC에 파일/데이터를 다운 받는 프로그램libcurl 라이브러리 사용. C AP"
date: 2022-01-26T12:31:00.233Z
tags: []
---
## 개념
**정의** : cURL(client, URL)
- client-side program and URL client Request LIB.
- 클라이언트 프로그램 + URL 프로그램
- URL을 사용해서 클라이언트 PC에 파일/데이터를 다운 받는 프로그램
- libcurl 라이브러리 사용. C API.
- CMD 원도우 기반 도구
- 오픈 소스 
- Daniel Stenberg가 개발하고 2500+ 개발자들이 개별적으로 참여, 기여

## 설치
### 리눅스
```bash
# Ubunto, Debian
apt install curl
apt install libcurl4-openssl-dev
# Redhat, CentOS
yum install curl
yum install libcurl-devel
```
### 원도우
https://curl.se/windows/

### 클라이언트-서버가 소통하는 프로세스
1. **클라이언트** -> 
2. URL에 찾아가야할 **호스트 주소**가 담겨있음 -> 
3. 이름으로 담겨진 주소를 IP주소로 DNS 서버가 변환해준다 -> 
4. **TCP**로 연결 맺음 -> 
5. 어느 연결통로(포트)로 갈지 선택함 (기본은 80) -> 
6. 연결과 이동할 통로가 완료된 후에는 안전한 소통을 위해서 TLS(Transport Layer Security) **악수**(handshake)를 통해서 신뢰관계를 형성. TLS 악수가 끝나면 소통 시작 -> 
7. 소통은 **프로토콜**이라는 정해진 언어와 형식을 통해서 진행함 (HTTP,HTTPS,POP3,TELNET,SMTP,FTP 등 ++) 

## 실습
### curl website
```bash
# -v = verbose
curl -v http://example.com

# 옵션을 붙이는 순서는 상관없다
curl -vL http://example.com
curl http://example.com -Lv
curl -v -L http://example.com

# 옵션 글을 길게 쓰려면 무조건 마이너스 두 개 필요 --
curl --verbose http://example.com
curl --verbose --location http://example.com
curl --data arbitrary http://example.com

# 옵션 제거 no- 사용
curl --no-verbose http://example.com
```
<img src="https://images.velog.io/images/csk917work/post/31c9b46e-ec84-4d21-b27c-cd8afc077fe5/image.png" align="center" width="50%" height="30">

### send argument
```bash
curl -A "I am your father" http://example.com
# Send double quotes
curl -d '{ "name": "Darth" }' http://example.com
```

### curl sftp
```bash
curl sftp://example.com/file.zip -u user
curl sftp://example.com/ -u user
# 인증
curl -u john:RHvxC6wUA -O scp://ssh.example.com/file.tar.gz
```

![](/images/f10bcb15-8afb-4c9e-b60c-44dceed1ccb5-image.png)
## REF
https://everything.curl.dev/cmdline/urls
// curl option 전체 모음
https://gist.github.com/eneko/dc2d8edd9a4b25c5b0725dd123f98b10

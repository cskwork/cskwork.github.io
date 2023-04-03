---
title: "CMD - Curl"
description: "데이터 전송에 사용하는 CMD 도구HTTP, HTTPS, FTP, FTPS, SFTP, IMAP, SMTP, POP3 등의 다양한 프로토콜 지원 and many more.네트워크 요청 디버깅시 사용Linux, Mac, Windows에서 전부 사용 가능By default"
date: 2021-09-29T00:27:16.745Z
tags: ["cmd","network"]
---
## curl  
- 데이터 전송에 사용하는 CMD 도구
- HTTP, HTTPS, FTP, FTPS, SFTP, IMAP, SMTP, POP3 등의 다양한 프로토콜 지원.
- 네트워크 요청 디버깅시 사용
- Linux, Mac, Windows에서 전부 사용 가능

### 1 Get HTTP Request
```bash
curl https://www.naver.com/
```
![](/images/4e41a85f-e592-4999-b23d-633c049c8b9e-image.png)

### 2 Get the HTTP response headers
By default the response headers are hidden in the output of curl. To show them, use the i option:
```bash
curl -i https://www.naver.com/
# Header 만 출력 (no response body)
curl -I https://www.naver.com/
```
![](/images/5f45cd2b-afd2-40f0-8a2b-76d206781e3b-image.png)

### 3 HTTP POST request
The X option lets you change the HTTP method used. By default, GET is used, and it’s the same as writing
``` bash
# application/x-www-form-urlencoded Content-Type is sent.
curl -d "option=value&something=anothervalue" -X POST https://www.naver.com/
```
### 4 HTTP POST request sending JSON
In this case you need to explicitly set the Content-Type header, by using the H option:
```bash
curl -d '{"option": "value", "something": "anothervalue"}' -H "Content-Type: application/json" -X POST https://www.naver.com/
```
#### 디스크에 있는 JSON 파일 발송:
```bash
curl -d "@my-file.json" -X POST https://www.naver.com/
```

### 5 Store the response to a file
```bash
curl -o sitefile.html https://www.naver.com/
```
![](/images/75b09f13-e6dd-4999-8683-471560566325-image.png)

### 6 Request and Response 상세 확인
```bash
curl --verbose -I https://www.naver.com/
```
![](/images/7561a67e-e525-4970-88db-a02fe9854362-image.png)

### 7 크롬 도구 사용
![](/images/111e98bb-627d-4490-b5f4-30aede0d30b0-image.png)

### REF
https://flaviocopes.com/http-curl/
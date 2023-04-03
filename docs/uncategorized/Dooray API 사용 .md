---
title: "Dooray API 사용 "
description: "================================================================https&#x3A;//helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/293998764763138441"
date: 2022-06-07T05:48:36.086Z
tags: []
---
API 문서
https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2939987647631384419


### 1 인증 토큰 생성
![](/images/caf0cd76-11ec-4dbb-9234-5626cbb61fe3-image.png)

### 2 CURL 호출
```bash
- 프로젝트 조회
curl -H 'Authorization: dooray-api {인증토큰}' https://api.dooray.com/project/v1/projects/3183341111111110182

- 이메일 조회
curl -H 'Authorization: dooray-api {인증토큰}' -H 'Content-Type: application/json' https://api.dooray.com/common/v1/members?externalEmailAddresses=email@company.com&page=0&size=20

- 대화방 목록 조회
curl -H 'Authorization: dooray-api {인증토큰}' -H 'Content-Type: application/json'
https://api.dooray.com/messenger/v1/channels

- 메시지 발송 
curl -H 'Authorization: dooray-api {인증토큰}' -X POST -H 'Content-Type: application/json' -d '{"text":"hello world","organizationMemberId":"3051342344554254793"}' https://api.dooray.com/messenger/v1/channels/direct-send

- 채널에 발송
curl -H 'Authorization: dooray-api {인증토큰}' -X POST -H 'Content-Type: application/json' -d '{"text":"hello world"}' https://api.dooray.com/messenger/v1/channels/319011111164957344/logs
```

### 3 원도우 스케줄링
![](/images/599f07f5-de13-465b-8570-b1dd5a3933f1-image.png)

![](/images/ef698752-30e5-493b-9cdd-8db8b1e53621-image.png)

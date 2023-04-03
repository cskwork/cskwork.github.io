---
title: "Django-RN-Expo 푸시 구현"
description: "푸시 서비스 구현푸시"
date: 2021-04-11T09:12:16.305Z
tags: []
---
### 목적
푸시 서비스 구현
### 쿽
- 앱을 실행하면 기기 고유 푸시토큰 정보를 FCM RealtimeDatabase로 발송을 해서 보관한다. 토큰 정보를 FCM에 보관되고 푸시를 발송하려면
- 장고 관리자창에서 글을 작성한 후 푸시를 발송하고 싶은 글을 선택한 후 액션 기능을 사용해서 푸시 발송 명령어를 djangorq task로 할당한다. 
- djangorq에서 FCM에 보관된 토큰 데이터를 전부 가져와서 해당 토큰과 제목, 내용, 링크 URL 정보를 expo push 서버로 발송한다. 
- Expo Push 서버는 djangorq에서 받은 정보를 각 기기 (ios, apple) APNS, FCM으로 발송한다.
- 클라이언트앱에서 푸시를 수신한다.

### 이론
undefined
---
title: "cron 사용 방법"
description: "any value,	value list separatorrange of values/	step values@yearly	(non-standard)@annually	(non-standard)@monthly	(non-standard)@weekly	(non-standard)"
date: 2022-02-21T04:12:29.247Z
tags: []
---

## 정의
크론탭 = 초 분 시 일 월 요일
```java
// 크론탭 = 초 분 시 일 월 요일
@Scheduled(cron="* * * * * *")
```
- 하단에 나온 설명은 분 시 일 월 요일까지 있다. 실제 사용시 초를 추가해서 총 6
개의 * 가 있어야 한다.

*	any value
,	value list separator
-	range of values
/	step values
@yearly	(non-standard)
@annually	(non-standard)
@monthly	(non-standard)
@weekly	(non-standard)
@daily	(non-standard)
@hourly	(non-standard)
@reboot	(non-standard)

## 예시
### 매일 특정 시간에
![](/images/b6bcf453-bb2b-4d51-988b-b9d1b4de710b-image.png)
### 평일 실행
![](/images/c8a550a1-c771-4a28-8cd4-d8c3ada2566d-image.png)
### 8월에 매일 실행
![](/images/dc1b7fd8-69ed-4b18-a9d8-cea6f334966e-image.png)
### 격월로 실행
![](/images/7cb80cb3-b783-4492-811d-d7b9875a9f4c-image.png)
### 2분마다 계속 실행
![](/images/a26dd9da-d7e3-4a54-8eed-3739c0697db3-image.png)


### 출처
https://crontab.guru/#5_0_*_8_*
https://crontab.guru/examples.html
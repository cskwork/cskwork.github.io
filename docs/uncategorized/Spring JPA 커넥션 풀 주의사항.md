---
title: "Spring JPA 커넥션 풀 주의사항"
description: "가능하면 GenerationType.IDENTITY 사용. 그렇지 못하면 커넥션 풀 문제 대처 필요 https&#x3A;//techblog.woowahan.com/2663/"
date: 2022-03-06T08:25:09.790Z
tags: []
---
## @GeneratedValue(strategy = GenerationType.AUTO 
### 이슈:
SQLTransientConnectionException + Connection pool deadlock
Best는 GenerationType.IDENTITY 사용. (빈번한 삽입 삭제가 있고 RDS 재시작시 auto_increment index가 변경될 가능성 있으면 문제됨) 안되면 커넥션 풀 문제 대처 필요 
https://techblog.woowahan.com/2663/

### 정의
DBCP 
- maxActive 동시에 쓸 수 있는 최대 커넥션 풀 수 제한
- min/maxIdle 커넥션 풀에서 커넥션을 일반적으로 반납하지만 다음 커넥션을 위해 최소 그리고 최대로 유지할 수 있는 커넥션 수
- 기본적인 규칙은 커넥션 개수보다 쓰레그 개수가 커야한다. 

### 문제 원인

- GenerationType.AUTO 로 동적으로 seq를 생성하는 쿼리 - mysql for update의 경우 조회한 쿼리에 락을 걸어 현재 트렌젝션이 끝날 때까지 다른 세션의 접근을 막는다.
- 16 개의 쓰레드를 사용하는 서버에서 쓰레드가 전부 일하는 상황이라고 가정 했을 때 이것들이 거의 동시에 히카리에서 커넥션을 얻는데 id 생성을 위해 for update가 한번에 작동하면  idleconnection 이 없어서 hand off queue에 대기하게 된다
- 이걸 사용 안하면되는데 

### 해결책 :
1. pool size 조정
![](/images/4b74e35d-9486-4754-ace2-01fb0cd690ce-image.png)
pool size = Thread Count X (Simultaneous Connection Count - 1) + (Thread Count / 2)

2. sequence Generator에 pooled-lotl optimizer 적용 

### 출처
https://techblog.woowahan.com/2663/

Coding is breaking One impossible Task Into Many possible Tasks. 

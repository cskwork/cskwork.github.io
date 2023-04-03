---
title: "Spring-scheduling-cron"
description: "https&#x3A;//m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=rlatmdtn81&logNo=220095397512https&#x3A;//wooncloud.tistory.com/75"
date: 2022-07-19T02:28:02.994Z
tags: []
---
## 사용 방법
### 1 servlet-context.xml/root-context.xml task 추가
```xml
	xsi:schemaLocation="http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd
		http://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd
		http://www.springframework.org/schema/task   
        http://www.springframework.org/schema/task/spring-task.xsd">
```

### 2 TASK 추가 
```xml
<!--  CRON 스케줄링 -->
	<task:annotation-driven scheduler="scheduler"/>
	<task:scheduler id="scheduler" pool-size="10"/>
	<context:component-scan base-package="com.restapi.Scheduler" />
```

### 3 TASK 실행 메소드 넣기
```java
package com.diquest.Scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SchedulerService {
	//크론탭 = 초 분 시 일 월 요일
//	@Scheduled(cron="0 10 16 * * *")
	@Scheduled(cron="0/5 1* * * * *")
    public synchronized void TestScheduler() throws Exception{
		System.out.println("cron 테스트 : 5초에 1번씩 console 찍기");
    }
}
```

### (옵션) XML 등록 방식도 가능
```xml
<task:scheduled-tasks>
    <!-- 5초에 1번씩 -->    <task:scheduled ref="SchedulerService" method="TestScheduler" cron="0/5 * * * * ?"/>
</task:scheduled-tasks>
```

### 크론 계산
https://crontab.guru/#0_0_*_*_*

### 출처
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=rlatmdtn81&logNo=220095397512

https://wooncloud.tistory.com/75


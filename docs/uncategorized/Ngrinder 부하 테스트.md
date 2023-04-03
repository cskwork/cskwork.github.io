---
title: "Ngrinder 부하 테스트"
description: "https&#x3A;//github.com/naver/ngrinder/wiki/Quick-Startjava -jar ngrinder-controller-X.X.war1  Run ngrinder warjava -jar ngrinder-controller-3.5.5-p1."
date: 2021-12-15T11:00:57.410Z
tags: ["nGrinder","stress"]
---
### REF
https://github.com/naver/ngrinder/wiki/Quick-Start

### 설치 방법
java -jar ngrinder-controller-X.X.war

1  Run ngrinder war
java -jar ngrinder-controller-3.5.5-p1.war

if PermGen Error Run With
java -XX:MaxPermSize=200m -jar  ngrinder-controller-3.4.war

2 account is 
admin / admin

3 이후 agent, monitor 설치하고 각 프로세스 실행 
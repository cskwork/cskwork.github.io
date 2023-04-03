---
title: "Gradle - Error"
description: "그래들에서 계속 주소 사용중이라고 뜨고 netstat으로 검색해도 포트가 사용중이지 않음. 계속 찾아보니 https&#x3A;//stackoverflow.com/questions/8428333/maven-eclipse-debug-jdwp-transport-dt-sock"
date: 2021-11-01T06:31:59.225Z
tags: ["gradle"]
---
### Address in Use
그래들에서 계속 주소 사용중이라고 뜨고 netstat으로 검색해도 포트가 사용중이지 않음. 계속 찾아보니 
https://stackoverflow.com/questions/8428333/maven-eclipse-debug-jdwp-transport-dt-socket-failed-to-initialize-transport-in

There is a long time the question was asked but i had the same problem recently.

Open Task Manager

Kill all "java.exe" process

Relaunch the mvn debug

Hope it will help

자바 프로세스 강제로 전부 종료하니까 정상작동함. 

```
./gradlew bootRun --debug-jvm --args='--server.port=8090'
```

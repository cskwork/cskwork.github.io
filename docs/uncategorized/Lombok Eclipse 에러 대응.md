---
title: "Lombok Eclipse 에러 대응"
description: "IntelliJ에서는 별도 설정 없이 잘 작동하지만... 역시 유료가 좋다 이클립스에는 lombok.jar를 받아서 넣어주고 파라미터 설정도 필요하다. eclipse.ini에 아래와 같이"
date: 2022-01-04T00:16:31.342Z
tags: []
---
- IntelliJ에서는 별도 설정 없이 잘 작동하지만... ~~역시 유료가 좋다~~ 이클립스에는 lombok.jar를 받아서 넣어주고 파라미터 설정도 필요하다.

## 이클립스에서 lombok 사용 방법
1. 다운로드
https://projectlombok.org/download

2. **eclipse.ini**에 아래와 같이
```bash
-javaagent:C:\Users\PATH\eclipse\lombok.jar
```

### 이슈 대응 
java.lang.IllegalAccessError: class lombok.javac.apt.LombokProcessor cannot access class com.sun.tools.javac.processing.JavacProcessingEnvironment
->
최신 버전 lombok 사용 그래도 안되면 jdk 버전 다운그레이드. 호환성은 changelog 확인
https://projectlombok.org/changelog
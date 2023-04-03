---
title: "CentOS - openJDK8 설치"
description: "https&#x3A;//yamoe.tistory.com/530https&#x3A;//bamdule.tistory.com/571 설치 가능 목록 확인open-jdk 1.8 설치설치가 완료되면 /usr/bin/경로에 java가 생성됩니다.환경변수 등록/usr/bin/jav"
date: 2021-12-24T02:22:34.430Z
tags: ["OpenJDK","centos","install"]
---
https://yamoe.tistory.com/530
https://bamdule.tistory.com/57

### 1 터미널 접속 후 설치 가능 목록 확인
```bash
yum list java-1.8.0-openjdk-devel*
```

### 2 JDK 설치
설치가 완료되면 /usr/bin/경로에 java가 생성됩니다.
```bash
yum install java-1.8.0-openjdk
yum install java-1.8.0-openjdk-devel
```

### 3 환경변수 등록
/usr/bin/java 경로에 심볼릭링크가 걸려있기 때문에 실제 경로를 찾아서 환경변수에 등록해주어야 합니다.
```bash
# readlink -f /usr/bin/java
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.242.b08-0.el7_7.x86_64/jre/bin/java
```

### 4 환경 변수 설정
```bash
> vi ~/.bashsrc

# Java
export PATH=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.222.b10-0.el7_6.x86_64/bin:$PATH
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.222.b10-0.el7_6.x86_64
> source ~/.bashsrc
```

### 5 환경 변수 설정 확인
```bash
echo $PATH
echo $JAVA_HOME
```
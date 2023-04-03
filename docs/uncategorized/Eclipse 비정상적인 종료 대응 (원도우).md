---
title: "Eclipse 비정상적인 종료 대응 (원도우)"
description: "비정상적으로 종료된 프로세스 찾기  프로세스 KILL.. "
date: 2022-01-04T00:56:35.022Z
tags: ["bash","netstat"]
---
### 비정상적으로 종료된 프로세스 찾기
```bash
netstat -ano | findstr 8080
```
### 프로세스 KILL..
```bash
taskkill /PID <PID> /F
```



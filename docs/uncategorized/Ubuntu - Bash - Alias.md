---
title: "Ubuntu - Bash - Alias"
description: "Alias를 사용해서 긴 명령어를 간편하게 실행추가 i 저장 wq!아래처럼 공백이 있으면 인식이 안된다 문법 정확히 써야한다.alias status = 'ls'alias status='ls'"
date: 2021-09-20T02:15:23.408Z
tags: ["ubuntu"]
---
### 목적
Alias를 사용해서 긴 명령어를 간편하게 실행

### 방법
```bash
cd ~
ll
vi ~/.bash_aliases
```
추가 i 
```bash
# Alias for Quick Commands
# source ~/.bashrc

# Web Control
alias status='sudo systemctl status pm2-webadmin'
alias wstop='sudo systemctl stop pm2-webadmin'
alias wstart='sudo systemctl start pm2-webadmin'
alias wrestart='sudo systemctl restart pm2-webadmin'
~                                                            
```
저장 wq!

### 테스트
![](/images/2b69f853-1a6d-4a2a-868c-9cabac59fc95-image.png)

### 주의사항
아래처럼 공백이 있으면 인식이 안된다 문법 정확히 써야한다.
alias status = 'ls'
alias status='ls'
---
title: "리눅스(ubuntu) 서버 관리 명령어"
description: "서버 관리 명령어 나열"
date: 2021-04-11T12:07:53.569Z
tags: ["network","ubuntu"]
---
# 1 목적
서버 관리 명령어 나열

# 2 퀵

### Ubuntu 패치 업데이트
```
sudo apt update        # Fetches the list of available updates
sudo apt upgrade       # Installs some updates; does not remove packages
sudo apt full-upgrade  # Installs updates; may also remove some packages, if needed
sudo apt autoremove    # Removes any old packages that are no longer needed
```

---

### 읽기 - READ

```bash 
netstat -ntlp #Check listing network

ll #파일 목록
uptime  #서비스 가동 시간
free -h #램 사용량 체크 
df -TH #전체 디스크 용량 체크
netstat #IO 네트쿼크 체크 
service postgresql status #Check postgresql db status
sudo netstat -plunt |grep postgres #Check running psql

/usr/lib/postgresql/12/bin/psql -p 5432
$ sudo systemctl is-active postgresql
$ sudo systemctl is-enabled postgresql
$ sudo systemctl status postgresql  #id / pwd

netstat -nlp | grep :80 #포트에 binding된 프로세스 확인
```
---
### 검색 - SEARCH
```
ps -ef | grep postgresql
```
---


---
title: "오라클 PDB 재시작"
description: "1 root로 접속해서 오라클 구동한 유저로 변경  2 sqlplus admin으로 연결  3 세션 및 프로세스 값 확인  4 SHUTDOWN  5 STARTUP "
date: 2022-01-19T07:27:59.756Z
tags: []
---
#### 1 root로 접속해서 오라클 구동한 유저로 변경
```bash
#root
su oracle
$oracle
```
#### 2 sqlplus admin으로 연결
```bash
sqlplus '/as sysdba'
```
#### 3 세션 및 프로세스 값 확인
```bash
SELECT RESOURCE_NAME, CURRENT_UTILIZATION, MAX_UTILIZATION, LIMIT_VALUE FROM V$RESOURCE_LIMIT WHERE RESOURCE_NAME IN ('processes', 'sessions');
show parameter sessions; //세션수 맥스값 조회
show parameter processes; 
select * from v$session where status = 'ACTIVE';
```
#### 4 SHUTDOWN
```bash
sql>shutdown immediate;
ps -ef | grep ora_
# 안되면 (리스크)
sql>shutdown abort;
```
#### 5 STARTUP
```bash
sql>startup
# PDB 사용시
SELECT name, open_mode FROM v$pdbs;
ALTER DATABASE OPEN;
ALTER PLUGGABLE DATABASE PDBORCL OPEN READ WRITE;
```
### 프로세스 늘리기
```bash
alter system set processes=500 scope=spfile;
# 이후 restart
# 세션 확인
select count(*) from v$session;
```

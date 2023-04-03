---
title: "소스 및 DB 파일 백업"
description: "서버 및 DB 파일 백업 정책"
date: 2021-04-11T11:25:41.134Z
tags: ["PostgreSQL","backup"]
---
# 1 목적
서버 및 DB 파일 백업 정책

권장하는 방법은 아니지만 즉각적인 백업이 필요하면 

# 2 퀵
### 비욘드 컴페어 백업
```
1 Create txt file
------------------
# 한글명 사용 X 
# Turn logging on
log normal "C:\Distrib\Synclog.txt"
# Set comparison criteria
criteria timestamp size
# Exclude certain file types
filter "-*.*~"
# Load the base folders
load "C:\Local" "ftp://jdoe:mypassword@ftp.acme.com/reports"
#Make the target identical to the source
#includes deleting files that only exist on the target side
sync mirror:lt->rt
------------------

2 Run CMD
------------------
"C:\BCompare.exe" @C:\bcscript.txt
"D:\BCompare.exe" @C:\BACKUP\backup_script.txt
------------------

3 Schedule Task
------------------
Control Panel > System and Security | Administrative Tools | Scheduled Tasks.
작업 스케줄러에서 등록  C:\BCompare.exe @C:\bcscript.txt
------------------
```
- backup_script.txt
```
# This is a script for Beyond Compare to mirror
# useage: BComp.exe @./goSync.bc (with no arguments)
# TARGETS YOU SHOULD CHANGE:  empty1, empty2
# SOURCES YOU SHOULD CHANGE:  recipes1, recipes2
# an optional log file: myLog.txt
# 운영 소스 로컬 소스로 백업

option confirm:yes-to-all

# Turn verbose logging on.
log normal "C:\BACKUP\autobackuplogs\log.txt"

# OPTIONAL Set the comparison criteria.
criteria timestamp size

# Load source and target folders.
load "profile:DEV1?mainsite" "C:\BACKUP\"

# Filter to only include source files, ignore CVS subfolders.
# filter "*.htm;*.html;*.php;*.jpg;*.gif;-CVS\"

# Sync the local files to the web site, creating empty folders.
sync create-empty update:left->right

#################################
#  more documentaion is online:              #
#                               #
# https://www.scootersoftware.com/v4help/index.html?sample_scripts.html
# https://www.scootersoftware.com/v4help/index.html?scripting_reference.html
#                               #
#################################
```

### POSTGRESQL DB SSH 백업 

```
# https://www.postgresql.org/docs/9.2/app-pgdump.html#PG-DUMP-EXAMPLES
ssh -i "PublicKey.pem" username@ip "PGPASSWORD='password' pg_dump -h localhost -p 5432 -d dbname -U userid -C --column-inserts" > "dbbackup.sql"
```
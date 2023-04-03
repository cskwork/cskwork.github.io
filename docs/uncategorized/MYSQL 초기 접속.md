---
title: "MYSQL 초기 접속"
description: "접속 "
date: 2022-01-04T05:53:42.460Z
tags: []
---
### 접속
```sql
mysql -u root 
# 데이터베이스 표시
show databases;
# 특정 데이터베이스로 이동
use database;
# 모든 테이블 표시
show tables;
# 이제 CRUD \G는 beautify 
select * from table\G; 
```
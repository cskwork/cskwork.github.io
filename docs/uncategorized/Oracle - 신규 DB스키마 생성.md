---
title: "Oracle - 신규 DB/스키마 생성"
description: "CREATE SCHEMA YUPF oe   CREATE TABLE new_product       (color VARCHAR2(10)  PRIMARY KEY, quantity NUMBER)    CREATE VIEW new_product_view       AS SEL"
date: 2022-03-04T05:47:58.472Z
tags: []
---
## Connect
```sql
root/ pwd  // 접속
su oracle
sqlplus '/as sysdba'
show pdbs
alter session set container=PDBORCL;
show con_name;
CREATE USER schemaUser identified by pwd ;
```
## Creating a User
```sql
CREATE USER admin IDENTIFIED BY MyPassword;
```
## Providing Roles
```sql
GRANT CONNECT, RESOURCE, DBA TO admin;
```

## Table Privilege
```sql
GRANT
  SELECT,
  INSERT,
  UPDATE,
  DELETE
ON
  schema.table
TO
  admin;
```

## Create Schema
```sql
CREATE USER schemaName identified by pwd DEFAULT TABLESPACE test;
```

## Assigning Privileges
```sql
GRANT UNLIMITED TABLESPACE TO schemaName;
GRANT CONNECT, RESOURCE, DBA TO schemaName;
GRANT 
 CREATE SESSION
,CREATE TABLE
,CREATE SEQUENCE  
,CREATE VIEW
TO schemaName;
```

## 출처
https://yjh5369.tistory.com/408
https://anuragkumarjoy.blogspot.com/2020/12/how-to-switch-cdb-container-to-pdb.html
https://chartio.com/resources/tutorials/how-to-create-a-user-and-grant-permissions-in-oracle/
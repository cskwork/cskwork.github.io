---
title: "Oracle Useful Query"
description: ""
date: 2021-12-14T06:21:17.551Z
tags: ["oracle"]
---
```

alter session set container=PDBDB ;
ALTER DATABASE OPEN;
create user test1 identified by test123;
grant connect, resource to test1;
ALTER USER test1 DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;
```
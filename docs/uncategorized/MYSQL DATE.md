---
title: "MYSQL DATE"
description: "월 주차 구하기 "
date: 2022-02-23T04:01:52.136Z
tags: []
---
### 1시간, 1일, 1달 전
```sql
한달전 where reg_date >= date_add(now(), interval -1 month)  
하루전 where reg_date >= date_add(now(), interval -1 day)  
한시간전 where reg_date >= date_add(now(), interval -1 hour)  

```


### 월 주차 구하기
```sql
   select week(NOW(),5) - 
   week(DATE_SUB(NOW(),INTERVAL DAYOFMONTH(NOW())-1 DAY),5) + 1 from dual;
        
```

### 요일 구하기
```sql
select dayname(now()) from dual;
```

### 지금으로 부터 7일 전 구하기
```sql
 select DATE(NOW()) - INTERVAL 7 DAY from dual;
```

### 달력 - 월에서 몇일인 구하기
```sql
select DAYOFMONTH(now()) from dual
```

### 같은 주차인지 확인
```sql
SELECT
	  TOTAL_SESSION_CNT,
	  DAYNAME(REG_DT) AS DAY,
	  (week(REG_DT,5) - week(DATE_SUB(REG_DT,INTERVAL DAYOFMONTH(REG_DT)-1 DAY),5) + 1) - (week(NOW(),5) - week(DATE_SUB(NOW(),INTERVAL DAYOFMONTH(NOW())-1 DAY),5) + 1 ) AS WEEK
	FROM TABLE
	WHERE REG_DT >= DATE(NOW()) - INTERVAL 7 DAY
```
---
title: "MYSQL 이벤트 스케줄러 사용 방법"
description: "사용 예시  문법 1. event scheduler 상태 확인  2. event scheduler ON/OFF  3 event scheduler 생성  특정 시간에 명령을 1회만 실행하도록 하려면 AT timestamp 사용. ex. ON SCHEDULE AT '202"
date: 2022-10-28T05:56:08.655Z
tags: []
---
## 정의
Mysql 이벤트 스케줄러
- DB에 주기적으로 작업을 해줄 때 필요. 
- DB에 대한 액션을 수행.

## 사용 예시 
```sql
-- @@@@@@@@@@@@@@@@@@@@@@
-- 1 프로시져 생성
-- DROP PROCEDURE make_company_cd;
CREATE PROCEDURE make_company_cd()
BEGIN
	TRUNCATE company_code;   
    -- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; -- 테이블 락 방지, 데이터 정합성 확인 필요 
   	insert into table_company_cd
		(select distinct b.companyCode , a.date 
		from company_temp_table as a, product_temp_table b
		where 1=1
		and b.productCode = a.productCode 
		and a.productCode != ""
		and b.companyCode != "");
     -- commit;
END ;
-- 2 확인
SHOW PROCEDURE STATUS;
-- 3 이벤트 생성
-- drop event event_make_company_cd;
CREATE EVENT if not exists event_make_company_cd
ON SCHEDULE
-- AT '2022-11-01 01:50:00'
EVERY 1 DAY
    STARTS (CURRENT_TIMESTAMP + INTERVAL 1 DAY + INTERVAL 1 HOUR) -- RUN EVERYDAY at 1AM
	-- ON COMPLETION PRESERVE
	-- COMMENT '회사코드 조인 프로시져 실행' 
DO
	call make_company_cd();
-- show events;
-- call make_company_cd();
-- @@@@@@@@@@@@@@@@@@@@@
-- select CURRENT_TIMESTAMP + INTERVAL 1 DAY + INTERVAL 1 HOUR from dual; -- CHECK TIME
```
## 문법
### 1. event scheduler 상태 확인
```sql
SHOW VARIABLES LIKE 'event%';
```
### 2. event scheduler ON/OFF
```sql
SET GLOBAL event_scheduler = ON;SET GLOBAL event_scheduler = OFF;
```
### 3 event scheduler 생성
```sql
CREATE    [DEFINER = user]    EVENT    [IF NOT EXISTS]    event_name    ON SCHEDULE schedule # 해당 명령을 수행하거나 반복할 시간 및 기간     [ON COMPLETION [NOT] PRESERVE]    [ENABLE | DISABLE | DISABLE ON SLAVE]    [COMMENT 'string']	# 해당 이벤트에 대한 설명    DO event_body;	# 수행할 명령    schedule: {    AT timestamp [+ INTERVAL interval] ...  | EVERY interval    [STARTS timestamp [+ INTERVAL interval] ...]    [ENDS timestamp [+ INTERVAL interval] ...]} interval:    quantity {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |              WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |              DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}
```
#### 특정 시간에 명령을 1회만 실행하도록 하려면 AT timestamp 사용. 
ex. ON SCHEDULE AT '2020-08-28 00:00:00'

#### 명령을 반복 실행하려면 EVERY interval을 사용
ex. ON SCHEDULE EVERY 1 DAY


#### STARTS, ENDS를 사용하여 시작일과 종료일을 지정할 수 있다.
ex. ON SCHEDULE EVERY 1 DAT STARTS '2018-01-01 00:00:00' ENDS '2020-01-01 00:00:00'

#### ON COMPLETE NOT PRESERVE ENABLE
해당 설정은 이벤트를 수행 후 삭제 여부를 지정한다.
이벤트 수행 후, 이벤트를 삭제하지 않는다면 ON COMPLETION PRESERVE ENABLE

### 4. event 목록 확인
```sql
SELECT * FROM information_schema.events;
# 프로시져 목록
SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_DEFINITION LIKE "%procedureName%";
```
### 5  이벤트 삭제
```sql
DROP EVENT 이벤트이름;
```

### 6 이벤트 수정
```sql
ALTER    [DEFINER = user]    EVENT event_name    [ON SCHEDULE schedule]    [ON COMPLETION [NOT] PRESERVE]    [RENAME TO new_event_name]    [ENABLE | DISABLE | DISABLE ON SLAVE]    [COMMENT 'string']    [DO event_body]
```

## 출처
추천 블로그
https://codingnotes.tistory.com/76
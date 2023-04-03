---
title: "QUERY CONVERSION MYSQL -> ORACLE"
description: "공백치환 함수 ( NVL -> IFNULL )Oracle : SELECT NVL('컬럼명', '') FROM DUAL;MySql : SELECT IFNULL('컬럼명', '') FROM DUAL;현재 날짜시간Oracle : SYSDATEMysql  : NOW() 날짜포"
date: 2022-01-04T09:17:06.923Z
tags: []
---
### If -> CASE WHEN
```sql
Oracle :
SELECT
CASE WHEN 컬럼명 NULL
	THEN ''
	ELSE 'ISNOTNULL'
END AS 컬럼명
FROM dual;

SELECT
CASE WHEN '' IS NULL
	THEN ''
	ELSE 'Unknown'
END AS TESTNUM
FROM dual;

MySql :
select IF('컬럼명' IS NULL ,'', '컬럼명') from dual;

select IF('' IS NULL ,'ISNULL', 'ISNOTNULL') from dual;
```

### 공백치환 함수 ( NVL -> IFNULL )
```sql
Oracle : SELECT NVL('컬럼명', '') FROM DUAL;
MySql : SELECT IFNULL('컬럼명', '') FROM DUAL;
```
NVL 함수는 값이 NULL인 경우 지정값을 출력하고, NULL이 아니면 원래 값을 그대로 출력한다.
- 함수  :  NVL("값", "지정값") 

NVL2 함수는 NULL이 아닌 경우 지정값1을  출력하고, NULL인 경우 지정값2를 출력한다.
- 함수 :  NVL2("값", "지정값1", "지정값2") // NVL2("값", "NOT NULL", "NULL") 


### 현재 날짜시간
```sql
Oracle : SYSDATE
Mysql  : NOW() 
```
### 날짜포멧 
```sql
Oracle : TO_CHAR(sysdate,'MMDDYYYYHH24MISS')
Mysql  : DATE_FORMAT(now(),'%Y%m%d%H%i%s')  -> 여기서 대문자Y는 4자리 년도, 
소문자 y는 2자리 년도
```
### 날짜 포멧 : 요일
```sql
Oracle : 요일이 1~7로 인식함  -> TO_CHAR(SYSDATE - 1, 'D') 
Mysql : 요일이 0~6으로 인식   -> DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY), '%w')
```
* 참고로 자바스크립트가 0~6으로 인식하기에 Oracle 쿼리에서 -1을 해서 맞추는 경우가 많음

### Like절 '%' 사용법
```sql
Oracle : Like '%'||'문자'||'%' 이런식으로 컬럼명 앞뒤로 '%'를 붙여주면 된다
Mysql : LIKE CONCAT('문자','%') 이런식으로 CONCAT 함수 사용
```
### 형변환
```sql
Oracle : To_char, To_number 등
Mysql : CAST
SELECT TO_CHAR(1234) FROM DUAL 
-> SELECT CAST(1234 AS CHAR) FROM DUAL
```
### 대소문자 구분함
```sql
Oracle : 구분없음
Mysql : 기본적으로 구분하나, 설정으로 변경 가능함
```
### ROWNUM
```sql
Oracle : where 절에 rownum > 5 and rownum =< 10 
Mysql : where절 없이 limit 5,10
```

### Sequence(시퀀스)는 둘 다 사용자함수를 만들어서 아래와 같이 사용
```sql
Oracle : 시퀀스명.nextval
Mysql : 시퀀스명.currval
```

### 문자열 자르기
```sql
Oracle: SUBSTR(문자열, 1, 10)
Mysql: SUBSTRING(문자열, 1,10), LEFT(문자열, 3), RIGHT(문자열, 3)
```

### 문자열 합치기 ( - 문자열을 연결한다고 가정)
```sql
Oracle: 문자열(또는 컬럼) ||' - '
Mysql: CONCAT(문자열(또는 컬럼), ' - ')
```
### 예약어가 컬럼명일 때
```sql
Oracle: 컬럼명을 따옴표(")로 감싸기 (예: select "column" from tab)
Mysql: 컬럼명을 TAB 키 위에 있는 ` 키 ( Single quotation )로 감싸기
```

### 저장프로시저 있는지 여부 파악해서 Create 하기
```sql
Oracle: CREATE OR REPLACE PROCEDURE 프로시저명
Mysql: DROP PROCEDURE IF EXISTS 프로시저명; 을 한 뒤에 CREATE PROCEDURE 프로시저명
```

### 기타
#### TRUNC : 날짜 자르기
TRUNC 함수는 주로 소수점 절사 및 날짜의 시간을 없앨 때 사용한다.

함수 : TRUNC("값", "옵션")
ADD_MONTHS : 월에 날짜 더하기
```sql
SELECT hire_date,
       ADD_MONTHS(hire_date, 3) 더하기_적용결과,
       ADD_MONTHS(hire_date, -3) 빼기_적용결과
FROM   employees
WHERE  employee_id BETWEEN 100 AND 106;
```

#### TO_CHAR(SYSDATE, 'Q') : 날짜를 4분기로 나눠서 조회
extract quarter from date oracle
```sql
SELECT 
    SYSDATE AS "Today's Date",
    TO_CHAR(SYSDATE, 'Q') AS "Today's Quarter"
FROM DUAL;
```

## 출처
https://gent.tistory.com/189


---
title: "오라클 - Functions"
description: "INSTR(문자열, 검색할 문자, 시작지점, n번째 검색단어)SUBSTR("문자열", "시작위치", "길이")결과SECONDVALUE     |\----------------+2020.06.30 23:59|"
date: 2022-01-18T03:52:53.455Z
tags: []
---
### INSTR
INSTR(문자열, 검색할 문자, 시작지점, n번째 검색단어)

### SUBSTR
SUBSTR("문자열", "시작위치", "길이")

#### 예)
```sql
SELECT substr ( '2020.04.17 00:00~2020.06.30 23:59', instr( '2020.04.17 00:00~2020.06.30 23:59', '~', 1) + 1 ) AS secondValue FROM dual;
```
결과
SECONDVALUE     |
----------------+
2020.06.30 23:59|

### TO_DATE
TO_DATE( (SUBSTR( YN.APL_DATE,  1,  instr(YN.APL_DATE, '~', 1, 1) -1 )) , 'YYYY.MM.DD HH24:mi' )
예)
```sql
SELECT to_date( '2020.06.30 23:59' , 'YYYY.MM.DD HH24:mi') FROM dual;
```
결과
TO_DATE('2020.06.3023:59','YYYY.MM.DDHH24:MI')|
----------------------------------------------+
                       2020-06-30 23:59:00.000|

### CASE WHEN
```sql

SELECT CASE WHEN  SYSDATE < TO_DATE( '2020.06.30 23:59' , 'YYYY.MM.DD HH24:mi' )
       THEN '신청가능'
       ELSE  '마감'
       END STATUS 
from dual;
```
결과
STATUS|
------+
마감    |

### REGEXP_SUBSTR

오라클 10g 이상부터 사용
REGEXP_SUBSTR(대상 문자, 패턴, 시작 위치(최소값1),매칭순번)
```sql
SELECT REGEXP_SUBSTR('공과대학 전자전기공학부 전자전기공학전공','[^ ]+', 1, 1 ) as REGEX FROM dual;
```
결과
REGEX
-----+
공과대학               




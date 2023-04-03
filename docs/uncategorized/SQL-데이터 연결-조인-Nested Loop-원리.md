---
title: "SQL-데이터 연결-조인-Nested Loop-원리"
description: "DBMS-조인-Nested Loop데이터 엑세스 순서 NL Join은 일반적인 중척 루프문(NL)과 동일한 수행 구조. 예제 PL/SQL)NL Join 수행 과정INDEX  pk_dept : dept.deptno  dept_loc_idx : dept.loc  pk_em"
date: 2022-09-15T01:03:41.976Z
tags: []
---
### DB-DBMS-쿼리-데이터 조회-조인-Nested Loop
- 데이터 엑세스 순서 
- NL Join은 일반적인 중척 루프문(NL)과 동일한 수행 구조. 

예제 중척 루프문 JAVA, C
```java
for(i=0; i<100; i++){
  -- outer loop 
  for(j=0; j<100; j++){
  -- inner loop // Do Anything ... 
  } 
}
```

예제 PL/SQL
```sql
begin for outer in (select deptno, empno, rpad(ename, 10) ename from emp) loop 
-- outer 루프 for inner in (select dname from dept where deptno = outer.deptno) loop 
-- inner 루프 dbms_output.put_line(outer.empno||' : '||outer.ename||' : '||inner.dname); end loop; end loop; end;
Oracle 쿼리문과 동일 순서로 엑세스 
```sql
select /*+ ordered use_nl(d) */ e.empno, e.ename, d.dname from emp e, dept d 
where d.deptno = e.deptno 
select /*+ leading(e) use_nl(d) */ e.empno, e.ename, d.dname from dept d, emp e where d.deptno = e.deptno 
```
### NL Join 수행 과정

INDEX * pk_dept : dept.deptno * dept_loc_idx : dept.loc * pk_emp : emp.empno * emp_deptno_idx : emp.deptno * emp_sal_idx : emp.sal

QUERY 
```sql
select /*+ ordered use_nl(e) */ e.empno, e.ename, d.dname, e.job, e.sal 
from dept d, emp e 
where e.deptno = d.deptno …………… ① and d.loc = 'SEOUL' …………… ② and d.gb = '2' …………… ③ and e.sal >= 1500 …………… ④ 
order by sal desc
```

### 상단쿼리-조인-실행순서
1. dept.loc = ‘SEOUL’ 조건을 만족하는 레코드를 찾으려고 dept_loc_idx 인덱스를 범위 스캔한다. 
2. dept_loc_idx 인덱스에서 읽은 rowid를 가지고 dept 테이블을 액세스해 dept.gb = ‘2’ 필터 조건을 만족하는 레코드를 찾는다. 
3. dept 테이블에서 읽은 deptno 값을 가지고 조인 조건을 만족하는 emp 쪽 레코드를 찾으려고 emp_deptno_idx 인덱스를 범위 스캔한다. 
4. emp_deptno_idx 인덱스에서 읽은 rowid를 가지고 emp 테이블을 액세스해 sal >= 1500 필터 조건을 만족하는 레코드를 찾는다. 
5. 1~4 과정을 통과한 레코드들을 sal 칼럼 기준 내림차순(desc)으로 정렬한 후 결과를 리턴한다.

### 쿼리-실행플랜 
```
Execution Plan --------------------------------------------------- 
0 SELECT STATEMENT 
1 0 SORT ORDER BY - sal 기준 내림차순(desc) 정렬(ID = 1)
2 1 NESTED LOOPS 
3 2 TABLE ACCESS BY INDEX ROWID DEPT  - 인덱스 rowid로 dept 테이블 액세스(ID = 3) 
4 3 INDEX RANGE SCAN DEPT_LOC_IDX  - dept_loc_idx 인덱스 범위 스캔(ID = 4)
5 2 TABLE ACCESS BY INDEX ROWID EMP - 인덱스 rowid로 emp 테이블 액세스(ID = 5)
6 5 INDEX RANGE SCAN EMP_DEPTNO_IDX - . emp_deptno_idx 인덱스 범위 스캔(ID = 6) 
```

### 쿼리 실행-SQL 조건 비교 순서 
SQL 조건절에 표시한 번호로 ② → ③ → ① → ④ 순. 
실행계획을 해석할 때, 형제(Sibling) 노드 간에는 위에서 아래로 읽는다. 부모-자식(Parent-Child) 노드 간에는 안쪽에서 바깥쪽으로, 즉 자식 노드부터 읽는다. 

### 쿼리-실행계획의 실행 순서를 나열
![](/images/f99889a6-ae00-4825-b264-5739bd577f3a-image.png)
### DBMS-SQL Server 시각적 예제
![](/images/c476b96d-a0f4-4ae7-8902-7b0d7f05ad25-image.png)
![](/images/eb0816ad-8e50-45e1-91a6-7cf1b0fb849d-image.png)

### NL Join-특징
- Random 엑세스(하나의 레코드를 읽으려고 블록 통째로 읽음) 위주의 조인 방식 -> 인덱스 구성이 완벽해도 대량의 데이터 조인시 비효율적이다. 
- 순차적으로 진행하는 특징 때문에 테이블의 처리 범위에 따라서 전체 일량이 결정됨. -> 그래서 인덱스 구성 전략 중요
- 조인 컬럼에 인덱스 여부와 컬럼 구성 방식에 따라서 조인 효율이 달라짐. 
- NL Join 은 소량의 데이터 처리, 부분범위 처리 가능한 온라인 트랜렉션 환경에 적합함. 

### 출처
https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=1&mod=document&keyword=%EC%A1%B0%EC%9D%B8&uid=368

---
데이터-엑세스-조인-OOO-중첩루프문-방식-OOO-장점-OOO-단점-OOO
데이터-엑세스-조인-OOO-중첩루프문-방식-적합한 곳-OOO
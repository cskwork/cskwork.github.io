---
title: "MYSQL 인덱싱"
description: "인덱스 적용 전 확인  인덱스 적용 후 확인 방법 "
date: 2022-01-04T05:07:09.757Z
tags: []
---
### 인덱스 적용 전 확인 
```sql
 -- 실행 플랜으로 퍼포먼스 확인
 explain 

-- 현재 INDEX 확인
 show index from table_name;
 -- 인덱스 생성 
 create index index_name on table_name (column_name1);
  -- 인덱스 삭제
drop index index_name on table_name;
 -- 복합 인덱스 생성
create index index_name on table_name (column_name1, column_name2);
 -- 인덱스 사용 중지
alter table table_name DISABLE index_name;

-- 캐시 설정 확인
SHOW GLOBAL VARIABLES LIKE 'query_cache_type';
-- 캐시 끄기 
SET GLOBAL query_cache_size = 0;
```

### 인덱스 적용 후 확인 방법
```sql
SELECT @@profiling;
SET profiling = 1;
SHOW PROFILES;
SHOW PROFILE ALL FOR QUERY 12; -- ALL 말고도 CPU/IPC/SOURCE/SWAPS 등으로 조회 가능
# 확인 후 
SET profiling = 0;
```
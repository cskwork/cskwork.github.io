---
title: "Database Style Guide"
description: "Names are long livedNames are contractsDeveloper context switchingHaving consistent naming conventions across your data model means that developers wi"
date: 2022-12-13T23:38:43.258Z
tags: []
---
## Importance of naming conventions
Names are long lived
Names are contracts
Developer context switching
- Having consistent naming conventions across your data model means that developers will need to spend less time looking up the names of tables, views, and columns.

## Naming Conventions
### 테이블 및 컬럼명 생성
테이블, 뷰, 컬럼 이름 대문자로 구성

### 컬럼명 생성 규칙
#### 1 테이블명, 컬럼명 소문자 생성
```sql
// bad
CREATE TABLE USERINFO ( 
  ID INT PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(255) NOT NULL,
);
// good
CREATE TABLE user_info ( 
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
);
```
#### 2 단어는 생략하지 않기
```sql
// bad
CREATE TABLE USERINFO ( 
  usernm VARCHAR(255) NOT NULL,
  pwd VARCHAR(255) NOT NULL
);
// good
CREATE TABLE user_info ( 
  username VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL
);
```
#### 3 복수명사의 경우 _ 로 띄어서 작성
```sql
// bad
CREATE TABLE user_info ( 
  username VARCHAR(255) NOT NULL, 
  birthdate VARCHAR(255) NOT NULL,
  menuname VARCHAR(255) NOT NULL
);
// good
CREATE TABLE user_info ( 
  user_name VARCHAR(255) NOT NULL, 
  birth_date VARCHAR(255) NOT NULL
);
```

### 4 PK 컬럼명은 id FK는 참조하는 테이블_id
```sql
// PK = id
CREATE TABLE person (
  id            bigint PRIMARY KEY,
  full_name     text NOT NULL,
  birth_date    date NOT NULL);

// FK = person_id
CREATE TABLE team (
  id            bigint PRIMARY KEY,
  person_id     bigint NOT NULL REFERENCES person(id),
  CONSTRAINT team_pkey PRIMARY KEY (id, person_id));
```

### 5 인덱스 생성시 테이블명과 사용하는 컬럼명 명시
```sql
CREATE TABLE person (
  id          bigserial PRIMARY KEY,
  first_name  text NOT NULL,
  last_name   text NOT NULL,
)

CREATE INDEX person_idx_first_name_last_name ON person (first_name, last_name);
```

### 참고
https://github.com/RootSoft/Database-Naming-Convention
https://launchbylunch.com/posts/2014/Feb/16/sql-naming-conventions/
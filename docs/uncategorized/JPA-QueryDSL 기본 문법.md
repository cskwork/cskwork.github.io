---
title: "JPA-QueryDSL 기본 문법"
description: "selectBasicList , innerJoinList, lefJoinOnList, selectDistinct단건을 조회할 때 사용한다. 결과가 없을때는 null 을 반환하고 결과가 둘 이상일 경우에는 NonUniqueResultException을 던진다.처음의 한건"
date: 2022-11-02T04:48:35.141Z
tags: []
---
## 기본 정의 
- Query DSL은 오픈소스 프로젝트로 JPQL(Java Persistence Query Language)을 Java 코드로 작성할 수 있도록 하는 라이브러리다.
- Query DSL은 select, from , where 등 쿼리 작성에 필요한 키워드를 메서드 형식으로 제공한다.

## SQL
```sql
select m from Member m where m.age > 18 order by name desc;
```
## QueryDSL
## .select()
selectBasicList , innerJoinList, lefJoinOnList, selectDistinct
```java
// selectBasicList
List<Member> selectBasicList = 
    query.selectFrom(m)
	.where(m.age.gt(18)) 
	.orderBy(m.name.desc())
	.fetch();
// innerJoinList        
List<User> innerJoinList = query
	.selectFrom(user)
	.join(user.battleClass, battleClass)
    .limit(1000) // 1000개로 한정
	.fetch();  
// lefJoinOnList
List<User> lefJoinOnList = query
	.select(user)
	.from(user)
	.leftJoin(battleClass)
	.on(battleClass.className.eq("궁수"), user.level.loe(10), user.username.eq("somerandomname"))
	.fetch();
// selectDistinct
List<Member> selectDistinct = query
    .selectFrom(member).distinct()
    .fetch();
```
		
## .fetch()
### .fetchOne()
단건을 조회할 때 사용한다. 결과가 없을때는 null 을 반환하고 결과가 둘 이상일 경우에는 NonUniqueResultException을 던진다.

### .fetchFirst()
처음의 한건을 가져오고 싶을때 사용한다.

### .fetchResults()
페이징을 위해 사용될 수 있다. 페이징을 위해서 total contents를 가져온다.

### .fetchCount()
count 쿼리를 날릴 수 있다.

## .where()
### .where() and , or
```java
// AND
.where(member.username.eq("member1")
.and(member.age.eq(10)))
||
.where(member.username.eq("member1"),member.age.eq(10))

// OR
.where(notify.regDate.between(start, end).or(notify.reserveDate.between(start, end))) 

// MORE
member.username.eq("member1") // username = 'member1'   
member.username.ne("member1") //username != 'member1'  
member.username.eq("member1").not() // username != 'member1'
member.username.isNotNull() //이름이 is not null   
member.age.in(10, 20) // age in (10,20)  
member.age.notIn(10, 20) // age not in (10, 20)   
member.age.between(10,30) //between 10, 30
member.age.goe(30) // age >= 30 
member.age.gt(30) // age > 30   
member.age.loe(30) // age <= 30 
member.age.lt(30) // age < 30
member.username.like("member%") //like 검색 
member.username.contains("member") // like ‘%member%’ 검색 
member.username.startsWith("member") //like ‘member%’ 검색
```

## 쿼리 DSL 설정
```bash
buildscript {
	dependencies {
		classpath("gradle.plugin.com.ewerk.gradle.plugins:querydsl-plugin:1.0.10")
	}
}

apply plugin: "com.ewerk.gradle.plugins.querydsl"

dependencies {

	// query dsl
	implementation 'com.querydsl:querydsl-jpa'
	implementation 'com.querydsl:querydsl-apt'
}

//def querydslDir = "$buildDir/generated/querydsl"
def querydslDir = 'src/main/generated'

querydsl {
	library = "com.querydsl:querydsl-apt"
	jpa = true
	querydslSourcesDir = querydslDir
}
sourceSets {
	main {
		java {
			srcDirs = ['src/main/java', querydslDir]
		}
	}
}
compileQuerydsl{
	options.annotationProcessorPath = configurations.querydsl
}
configurations {
	querydsl.extendsFrom compileClasspath
}
```
## 출처 
https://doing7.tistory.com/124
https://dev-alxndr.tistory.com/28
https://devraphy.tistory.com/623
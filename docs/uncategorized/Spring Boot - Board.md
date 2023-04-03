---
title: "Spring Boot - Board"
description: "공통 폴더 생성 JDK 설치 이클립스 설치워크스페이스 생성JDK 추가, 힙 최소, 최대 메모리 수치 늘리기STS 플러그인 설치Gradle (Minimalist Gradle Editor) / Maven 설치 General > Worspace 인코딩 UTF-8File > "
date: 2021-09-29T07:32:27.849Z
tags: ["Spring boot","board"]
---
### 1 개발환경
- 공통 폴더 생성 
- JDK 설치 
https://www.oracle.com/java/technologies/downloads/#java8-demos-windows
- 이클립스 설치 (EClipse IDE for Java EE Developers)
https://www.eclipse.org/downloads/
- 워크스페이스 생성
- JDK 추가, 힙 최소, 최대 메모리 수치 늘리기
```xml
# eclipse.ini
-vm jdk, -vargs -Xms1024m -Xms2048m 
```
- STS 플러그인 설치
![](/images/b80409da-c91d-4f6f-b770-8b5ad5800639-image.png)
- Gradle (Minimalist Gradle Editor) / Maven 설치 
- 워크스페이스 구조
![](/images/4506a5ff-16cf-4bb8-81e4-9b644e6bb23e-image.png)
- General > Worspace 인코딩 UTF-8
![](/images/827781b2-1f5c-4654-9f1d-5fd515c2e9d0-image.png)

### 2 프로젝트 생성
- File > New > Spring Starter Project
![](/images/b3e956f8-e0cb-441e-ba89-c617c5f4770a-image.png)

![](/images/6d5d910a-0e8b-4bec-acd7-f78831af43ea-image.png)
![](/images/9b359b1c-1ce6-4ea3-8b60-313f30248ad2-image.png)
-Check if port in use
```bash
netstat -aof | findstr :8080
```
![](/images/ebd60482-de6e-4d5c-a752-5693ba50f12c-image.png)

- HeyWorld 생성
![](/images/96353d02-a5d7-4f3a-a07e-5a6ae05a7c7b-image.png)

HelloController.java
```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
	@RequestMapping("/")
	public String hello() {
		return "Hey World";
	}
}
```

DemoApplication.java
```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
 * @SpringBootApplication includes
 * @EnableAutoConfiguration
 * @ComponentScan
 * @Configuration
 */
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
```

### 3 DB 연결
- MySQL 설치
https://dev.mysql.com/downloads/installer/
- application.properties로 데이터 소스 생성
- @Bean으로 데이터 소스 설정 
- 커넥션 풀 라이브러리는 HikariCP사용 (우수한 성능) 
- board? =  DB이름 
application.properties
```properties
spring.datasource.hikari.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.hikari.jdbc-url=jdbc:mysql://localhost:3306/board?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useSSL=false
spring.datasource.hikari.username=username
spring.datasource.hikari.password=password
spring.datasource.hikari.connection-test-query=SELECT NOW() FROM dual
```
- MyBatis (SQL매퍼 프레임워크) 사용해서 쿼리와 코드 분리 
DBConfig.java
```java
package board.configuration;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/application.properties")
public class DBConfig {
	
	// Add myBatis, 2021-10-02
	@Autowired
	private ApplicationContext appContext;
	
	// Add HikariCP
	@Bean
	@ConfigurationProperties(prefix="spring.datasource.hikari") //spring.datasource.hikari 로 시작하는 설정을 통해서 하카리CP 설정 만듬 
	public HikariConfig hikariConfig() {
		return new HikariConfig();
	}
	
	// Add HikariCP
	@Bean
	public DataSource dataSource() throws Exception{
		DataSource dataSource = new HikariDataSource(hikariConfig());
		System.out.println(dataSource.toString());
		return dataSource;
	}
	
	// Add myBatis, 2021-10-02
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception{
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dataSource);
		//mapper는 앱에서 사용할 SQL을 담은 XML 파일을 의미함. 
		sqlSessionFactoryBean.setMapperLocations(appContext.getResources("classpath:/mapper/**/sql-*.xml"));
		return sqlSessionFactoryBean.getObject();
	}
	
}
```

### 4 유닛테스트
JUnit 테스트 실행
``` java
package board;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BoardApplicationTest {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Test
	public void contextLoads() {
	}
	
	@Test 
	public void testSqlSession() throws Exception{
		System.out.println(sqlSession.toString());
		System.out.println("SUCCESS");
	}
}
```
![](/images/159d935f-67d0-4e84-8992-420bc37fb0bc-image.png)


### 여기까지하면 기본 설정 완료

![](/images/a1b0403e-7f3e-4b7e-9286-10c9c0be4c06-image.png)


### 4 Model 구성 
- 룸북 (자주 사용하는 코드를 어노테이션으로 자동 생성해주는 라이브러리) 추가
- Use for DTO


### REF
https://github.com/brettwooldridge/HikariCP#frequently-used

https://github.com/brettwooldridge/HikariCP/wiki/MySQL-Configuration








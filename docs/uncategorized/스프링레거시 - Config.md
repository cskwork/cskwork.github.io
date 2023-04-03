---
title: "스프링레거시 - Config"
description: "오류 : 이클립스 web.xml (A field of identity constraint 'web-app-servlet-name-uniqueness' matched element 'web-app', but this element does not have a simple"
date: 2021-10-05T09:56:01.999Z
tags: ["Spring"]
---
### ERR : web-app-servlet-name-uniqueness
오류 : 이클립스 web.xml (A field of identity constraint 'web-app-servlet-name-uniqueness' matched element 'web-app', but this element does not have a simple type.) - 해결 방법
Yuja-tea Yuja-tea 2021. 4. 25. 00:43
 
A field of identity constraint 'web-app-servlet-name-uniqueness' matched element 'web-app', but this element does not have a simple type. 라는 오류가 발생했다. 

java.sun.com 의 java를 JAVA 혹은 Java로 바꾸면 해결된다.
```xml
<web-app version="2.5" xmlns="http://JAVA.sun.com/xml/ns/javaee"
...
>
```

### web.xml - Encoding UTF-8
```xml
<!--  문자 인코딩  시작 -->
<filter>
  <filter-name>encodingFilter</filter-name>
  <filter-class>
    org.springframework.web.filter.CharacterEncodingFilter
  </filter-class>
  <init-param>
    <param-name>encoding</param-name>
    <param-value>UTF-8</param-value>
  </init-param>
  <init-param>
    <param-name>forceEncoding</param-name>
    <param-value>true</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>encodingFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
<!--  문자 인코딩  끝 -->
```

### JSP - UTF-8
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
```

### Hello-World
![](/images/98410401-6d09-4120-b2a4-1fcffa52b614-image.png)
![](/images/0bab3718-b000-4531-b082-127446a309f9-image.png)
![](/images/68934f6e-09e2-4658-9f12-86cddf89dfac-image.png)
![](/images/5c9edeec-aeac-4a70-8d83-2b92f70c08ab-image.png)
![](/images/6be76303-6c1f-4696-a2ab-f83c7c622f04-image.png)
![](/images/a6a03b62-7c27-4b95-bd00-0599dd4388a8-image.png)
#### Result
![](/images/aae954d6-bca2-4cf4-b7b8-ecf9bd4a94c5-image.png)

### Eclipse-Git
![](/images/c48c0e6a-a9d0-4ad4-8b6c-966ff1e65ef2-image.png)
![](/images/771c1c0e-3623-4f8e-8dcb-7d1708309d7b-image.png)
![](/images/3782856f-0354-47e8-a8eb-dce11e092101-image.png)

User : ID
Password : Github AccessToken
![](/images/68795682-39e3-4697-bcce-66a580422ee2-image.png)

### Error querying database.  Cause: java.sql.SQLException: No database selected
board.tbl_board --> tbl_board
//127.0.0.1:3308/board
```xml
	<bean class="org.springframework.jdbc.datasource.DriverManagerDataSource"
	 id="dataSource">
	 <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
	 <property name="url" value="jdbc:mysql://127.0.0.1:3308/board" />
	 <property name="username" value="root" />
	 <property name="password" value="root" />
	</bean>
```

### root-context.xml namespace error
![](/images/3a9ee430-3fea-4a37-aa81-1496fdb420af-image.png)


### NoClassDefFoundError: javax/servlet/SessionCookieConfig
버전 일관성 확인
pom.xml
```xml
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
  <scope>provided</scope>
</dependency>
```

### log4j2
log4j2.xml 파일 생성
```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">
  <!-- Logging Properties -->
  <Properties>
      <Property name="LOG_PATTERN">%d [%t] %-5level %c(%M:%L) - %m%n</Property>
      <!-- <Property name="LOG_PATTERN">%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ} %p %m%n</Property> -->
      <Property name="APP_LOG_ROOT">c:/log</Property>
  </Properties>
   
  <Appenders> 
      <!-- Console Appender -->
      <Console name="Console" target="SYSTEM_OUT" follow="true">
          <PatternLayout pattern="${LOG_PATTERN}"/>
      </Console>
       
      <!-- File Appenders on need basis -->
      <RollingFile name="frameworkLog" fileName="${APP_LOG_ROOT}/app-framework.log"
          filePattern="${APP_LOG_ROOT}/app-framework-%d{yyyy-MM-dd}-%i.log">
          <LevelRangeFilter minLevel="ERROR" maxLevel="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
          <PatternLayout pattern="${LOG_PATTERN}"/>
          <Policies>
              <TimeBasedTriggeringPolicy modulate="true" interval="1" /><!-- 일별 로그 파일 생성-->
              <SizeBasedTriggeringPolicy size="10MB" /> <!-- 10MB 용량이 초과시 DefaultRolloverStrategy 정책만큼 넘버링 -->      
          </Policies>
          <DefaultRolloverStrategy max="50"/><!-- 롤링 파일 50개 까지 생성 -->
      </RollingFile>
       
      <RollingFile name="debugLog" fileName="${APP_LOG_ROOT}/app-debug.log"
          filePattern="${APP_LOG_ROOT}/app-debug-%d{yyyy-MM-dd}-%i.log">
          <LevelRangeFilter minLevel="DEBUG" maxLevel="DEBUG" onMatch="ACCEPT" onMismatch="DENY"/>
          <PatternLayout pattern="${LOG_PATTERN}"/>
          <Policies>
              <TimeBasedTriggeringPolicy modulate="true" interval="1" /><!-- 일별 로그 파일 생성-->
              <SizeBasedTriggeringPolicy size="10MB" />
          </Policies>
          <DefaultRolloverStrategy max="50"/>
      </RollingFile>
       
      <RollingFile name="infoLog" fileName="${APP_LOG_ROOT}/app-info.log"
          filePattern="${APP_LOG_ROOT}/app-info-%d{yyyy-MM-dd}-%i.log" >
          <LevelRangeFilter minLevel="INFO" maxLevel="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
          <PatternLayout pattern="${LOG_PATTERN}"/>
          <Policies>
              <TimeBasedTriggeringPolicy modulate="true" interval="1" /><!-- 일별 로그 파일 생성-->
              <SizeBasedTriggeringPolicy size="19500KB" />
          </Policies>
          <DefaultRolloverStrategy max="50"/>
      </RollingFile>
       
      <RollingFile name="errorLog" fileName="${APP_LOG_ROOT}/app-error.log"
          filePattern="${APP_LOG_ROOT}/app-error-%d{yyyy-MM-dd}-%i.log" >
          <LevelRangeFilter minLevel="ERROR" maxLevel="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
          <PatternLayout pattern="${LOG_PATTERN}"/>
          <Policies>
              <TimeBasedTriggeringPolicy modulate="true" interval="1" /><!-- 일별 로그 파일 생성-->
              <SizeBasedTriggeringPolicy size="19500KB" />
          </Policies>
          <DefaultRolloverStrategy max="50"/>
      </RollingFile>
       
      <RollingFile name="perfLog" fileName="${APP_LOG_ROOT}/app-perf.log"
          filePattern="${APP_LOG_ROOT}/app-perf-%d{yyyy-MM-dd}-%i.log" >
          <PatternLayout pattern="${LOG_PATTERN}"/>
          <Policies>
              <SizeBasedTriggeringPolicy size="19500KB" />
          </Policies>
          <DefaultRolloverStrategy max="10"/>
      </RollingFile>
       
      <RollingFile name="traceLog" fileName="${APP_LOG_ROOT}/app-trace.log"
          filePattern="${APP_LOG_ROOT}/app-trace-%d{yyyy-MM-dd}-%i.log" >
          <PatternLayout pattern="${LOG_PATTERN}"/>
          <Policies>
              <SizeBasedTriggeringPolicy size="19500KB" />
          </Policies>
          <DefaultRolloverStrategy max="5"/>
      </RollingFile>       
  </Appenders>

  <Loggers> 
    <!-- 현재 추적중인 에러 로그 -->
      <Logger name="com.board.controller" additivity="false" level="trace">
          <AppenderRef ref="traceLog" />
          <AppenderRef ref="Console" />
      </Logger>
       
      <!--  기본 에러 로그 -->
      <Logger name="com.board.controller" additivity="false" level="debug">
          <AppenderRef ref="debugLog" />
          <AppenderRef ref="infoLog"  />
          <AppenderRef ref="errorLog" />
          <AppenderRef ref="Console"  />
      </Logger>
       
      <!--  성능 추적 -->
      <Logger name="org.framework.package" additivity="false" level="info">
          <AppenderRef ref="perfLog" />
          <AppenderRef ref="Console"/>
      </Logger>
      
      <!-- 스프링 프레임워크에서 찍는건 level을 info로 설정 -->
     <logger name="org.springframework.web" level="info" additivity="false" >
      <AppenderRef ref="Console" />
      <AppenderRef ref="frameworkLog" />
     </logger>
               
      <Root level="warn">
          <AppenderRef ref="Console"/>
      </Root>
  </Loggers>
</Configuration>
```
```java
private Logger log = LogManager.getLogger("DataSourceTest");
```
pom.xml
```xml
<dependency>
		    <groupId>org.apache.logging.log4j</groupId>
		    <artifactId>log4j-api</artifactId>
		  </dependency>
		 <dependency>
		    <groupId>org.apache.logging.log4j</groupId>
		    <artifactId>log4j-core</artifactId>
</dependency>
 
	<dependencyManagement>
	  <dependencies>
	    <dependency>
	      <groupId>org.apache.logging.log4j</groupId>
	      <artifactId>log4j-bom</artifactId>
	      <version>2.14.1</version>
	      <scope>import</scope>
	      <type>pom</type>
	    </dependency>
	  </dependencies>
	</dependencyManagement>
    
```
![](/images/99f1fadb-4a38-4797-8afe-c5192fcfb6f3-image.png)

### servlet-context.xml vs root-context.xml vs web.xml
![](/images/112b8fde-c296-44d8-9338-55c8b5a8b591-image.png)

servlet-context.xml
- 요청과 관련된 객체 
- controller나, @(어노테이션), ViewResolver, Interceptor, MultipartResolve 설정

root-context.xml
- view완 관련되지 않은 객체 
- Service, Repository(DAO), DB등 비즈니스 로직 설정

web.xml
- 설정을 위한 설정 파일
- WAS가 최초로 구동될 때, 각종 설정을 정의 (엔코딩)
- xml파일을 인식하도록 각 파일을 가리켜 준다 (servlet, root-context.xml)

### log4j:WARN No appenders could be found for logger
pom.xml check
```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
  </dependency>
 <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
  </dependency>
  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-jcl</artifactId>
</dependency> 
  
<!-- <dependency>
  <groupId>log4j</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.15</version>
  <exclusions>
    <exclusion>
      <groupId>javax.mail</groupId>
      <artifactId>mail</artifactId>
    </exclusion>
    <exclusion>
      <groupId>javax.jms</groupId>
      <artifactId>jms</artifactId>
    </exclusion>
    <exclusion>
      <groupId>com.sun.jdmk</groupId>
      <artifactId>jmxtools</artifactId>
    </exclusion>
    <exclusion>
      <groupId>com.sun.jmx</groupId>
      <artifactId>jmxri</artifactId>
    </exclusion>
  </exclusions>
  <scope>runtime</scope>
</dependency> -->
```
||
web.xml config check
```
<context-param>
  <param-name>log4jConfigLocation</param-name>
  <param-value>/WEB-INF/spring/log4j2.xml</param-value>
</context-param>
<listener>
  <listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>
</listener>
```

### @data getter setter issue
lombok은 lib가 있어도 따로 설치해줘야함. 
1 lombok lib가 있는 곳으로 nav
2 java -jar lombok-1.16.10.jar
3 다시 이클립스 실행 후 maven update, project clean.

https://stackoverflow.com/questions/11803948/lombok-is-not-generating-getter-and-setter

### setup gradle on existing project
1 check ver
2 add gradle nature
![](/images/2ed69f6d-bfc3-4d64-a13b-fdab86b1dc24-image.png)
    
### REF
https://kuzuro.blogspot.com/2019/08/1.html

https://kuzuro.blogspot.com/2018/04/github.html

https://thiago6.tistory.com/70

https://stackoverflow.com/questions/11803948/lombok-is-not-generating-getter-and-setter
 
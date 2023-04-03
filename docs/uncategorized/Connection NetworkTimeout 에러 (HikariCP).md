---
title: "Connection NetworkTimeout 에러 (HikariCP)"
description: "Cache Miss Rate(%) = Threads_created / Connections  100Connection Miss Rate(%) = Aborted_connects / Connections  100Connection Usage(%) = Threads_conn"
date: 2021-11-18T00:18:39.480Z
tags: []
---
## AS-IS
SpringBoot -> Spring Tomcat -> MariaDB

Tomcat Log
```
2021-11-15 18:25:27[DS_APP connection closer][ERROR] [Slf4jSpyLogDelegator.java]exceptionOccured(129) : 8222. Connection.setNetworkTimeout(com.zaxxer.hikari.pool.PoolBase$SynchronousExecutor@476e1aae, 15000;
com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: No operations allowed after connection closed.
        at sun.reflect.GeneratedConstructorAccessor733.newInstance(Unknown Source)
        at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
        at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
        at com.mysql.jdbc.Util.handleNewInstance(Util.java:425)
        at com.mysql.jdbc.Util.getInstance(Util.java:408)
        at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:918)
        at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:897)
        at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:886)
```
BootLog
```log
service-err
2021-11-15 18:51:08.351 [31mERROR[m [35m106810[m [io-8301-exec-10] [36mo.h.e.j.s.SqlExceptionHelper            [m : HikariPool-1 - Connection is not available, request timed out after 20001ms.
2021-11-15 18:51:08.352 [31mERROR[m [35m106810[m [io-8301-exec-10] [36mo.h.e.j.s.SqlExceptionHelper            [m : (conn=4387444) Connection.setNetworkTimeout cannot be called on a closed connection
2021-11-15 18:51:08.357 [31mERROR[m [35m106810[m [nio-8301-exec-2] [36mo.h.e.j.s.SqlExceptionHelper            [m : HikariPool-1 - Connection is not available, request timed out after 20000ms.
2021-11-15 18:51:08.357 [31mERROR[m [35m106810[m [nio-8301-exec-2] [36mo.h.e.j.s.SqlExceptionHelper            [m : (conn=4387444) Connection.setNetworkTimeout cannot be called on a closed connection
2021-11-15 18:51:09.373 [31mERROR[m [35m106810[m [nio-8301-exec-7] [36mo.h.e.j.s.SqlExceptionHelper            [m : HikariPool-1 - Connection is not available, request timed out after 20000ms.
2021-11-15 18:51:09.374 [31mERROR[m [35m106810[m [nio-8301-exec-7] [36mo.h.e.j.s.SqlExceptionHelper            [m : Could not connect to address=(host=555.555.555.55)(port=55)(type=master) : Socket fail to connect to host=555.555.555.55, port:55. connect timed out
2021-11-15 18:51:09.378 [31mERROR[m [35m106810[m [nio-8301-exec-5] [36mo.h.e.j.s.SqlExceptionHelper            [m : HikariPool-1 - Connection is not available, request timed out after 20000ms.
2021-11-15 18:51:09.378 [31mERROR[m [35m106810[m [nio-8301-exec-5] [36mo.h.e.j.s.SqlExceptionHelper            [m : Could not connect to address=(host=555.555.555.55)(port=55)(type=master) : Socket fail to connect to host=555.555.555.55, port:55. connect timed out

service
org.springframework.dao.DataAccessResourceFailureException: Unable to acquire JDBC Connection; nested exception is org.hibernate.exception.JDBCConnectionException: Unable to acquire JDBC Connection
	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:277)
	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:255)
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:528)
	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)
	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:242)
	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:154)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)
	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:14
    
```
``` bash
show variables;
show status like '%timeout%';
show status like '%thread%';
show status like '%connect%';
show status like '%clients%';
# 재시작 유효
vi /etc/my.cnf 
connect_timeout = 25000 
/etc/init.d/mysql restart

# 임시 설정
MariaDB [(none)]> set global connect_timeout = 20;
```

## 예상/연관 문제
1 HikariCP max pool size 조절
2 DB select/insert thread count 조절
3 1개 task에 동시에 필요한 connection 수가 부족해서 deadlock 상태 발생
4 max-lifetime은 wait_timeout보다 적어야함. HikariCP 공식문서 

MySQLNonTransientConnectionException의 경우
1 mysql version - java mysql connection version 일치 여부 확인
## 연산
Cache Miss Rate(%) = Threads_created / Connections * 100
Connection Miss Rate(%) = Aborted_connects / Connections * 100
Connection Usage(%) = Threads_connected / max_connections * 100

## 디버깅 설정
```xml
logging:
  level:
    sql: error
    com.zaxxer.hikari.HikariConfig: DEBUG
    com.zaxxer.hikari: TRACE
    org:
      springframework:
        boot:
          autoconfigure: ERROR
```
![](/images/0b95b883-cd04-40c8-ad5f-52d90af93bf8-image.png)

## 용어
### DB
**max_connections : 서버가 수용할 수 있는 고객(들)과의 연결 수** (MySQL 서버가 최대한 허용할 수 있는 클라이언트의 연결 수를 제한하는 설정. 
max_connection 값을 수천 수만으로 늘릴수록 MySQL 서버가 응답 불능 상태로 빠질 가능성이 높아지며 이 설정값을 낮출수록 MySQL 서버가 응답할 수 없게 될 확률이 줄어든다. 이 설정은 동적으로 변경할 수 있으므로 커넥션이 부족하다면 그때 변경해주면 된다.)****

**thread_cache_size : 고객과 서버의 연결** (클라이언트와 서버와의 연결 그 자체를 의미하며 스레드는 해당 커넥션으로부터 오는 작업 요청을 처리하는 주체다. 최초 클라이언트로부터 접속 요청이 오면 MySQL 서버는 스레드를 준비해 그 커넥션에 작업 요청을 처리해 줄 스레드를 매핑하는 형태이다. 클라이언트가 종료되면 MySQL은 스레드를 스레드풀에 보관한다. Thread_cache_size 설정 변수는 최대 몇 개까지의 스레드를 스레드 풀에 보관할지 결정한다.)

**wait_timeout : 요청 없이 고객을 최대한 대기하는 시간** (MySQL 서버에 연결된 클라이언트가 wait_timeout에 지정된 시간 동안 아무런 요청 없이 대기하는 경우 MySQL 서버는 해당 커넥션을 강제로 종료해버린다. 이 설정값의 시간 단위는 초이며 기본값은 28800초(8시간)이다.)

### HikaiCP - SpringBoot
![](/images/62c3947e-ee62-406f-b39d-9179a519658e-image.png)
**max-lifetime : 고객과의 커넨션 최대 유지 시간** (사용중인 커넥션은 maxLifetime에 상관없이 제거되지않고, 사용중이지 않을 때만 제거된다. 0으로 설정하면 무한 lifetime이 적용되지만, idle-timeout 설정되어 있는 경우에는 적용되지 않는다. (default: 1800000 (30분)) - HikariCP 공식문서에서 db connection time limit 보다 작게 설정하라고 나옴. DB - < wait_timeout
![](/images/9d0b6594-ddd8-49df-bd25-fdfbed31f76b-image.png)

**connection-timeout : pool에서 커넥션을 얻어오기전까지 기다리는 최대 시간.** (허용가능한 시간을 초과하면 SQLException이 발생하며, 설정가능한 가장 작은 시간은 250ms 이다. (default: 30000 (30초))
해당 데이터의 시간을 확인하고, **DB의 경우는 초(seconds) 단위** **HikariCP의 경우 밀리세컨드(millisecond) 단위**를 사용하기 때문에 변환기를 사용하거나 혹은 계산하여 HikariCP에 설정할 시간을 계산한 뒤에 1~2초 정도 적게 설정하면 된다)

**keepaliveTime : Attempts to keep conn. alive to prevent timeout by db.** Has to be less than maxLifeTime. Default is 0 (disabled). Min allowed value is 30sec. range of minutes is desiable. 

**minimumIdle : min. idle connections Hikari tries to maintain.** Default : same as maxPolSize. Recommend not setting value. 

**idleTimeout : max time conn. is allowed to sit idle. **Default is 600000 (10 min.) 

**validationTimeout : max time to check connection for aliveness. **Muyst be less than connection Timeout. Default 5000

### Spring -Tomcat
```
  <Resource name="jdbc/EmployeeDB"
            auth="Container"
            type="javax.sql.DataSource"
            username="dbusername"
            password="dbpassword"
            driverClassName="org.hsql.jdbcDriver"
            url="jdbc:HypersonicSQL:database"
            maxActive="8"
            maxIdle="4"/>
  ...
</Context>
```
**name**
필수 항목으로서 root java context 인 java:comp/env 에 상대적인 resource 이름이며 jdbc/ 로 시작 (예를 들어 jdbc/sarc)

auth
resource manager 에 sign on 하는 주체로 Container (container-managed 일 경우) 혹은 Application (application-managed 일 경우)

scope
resource 가 공유 될 수 있는지 여부로 Shareable 혹은 Unshareable 이며, default 는 Shareable

initialSize
초기 connection 수로, default 는 0 이며, BasicDataSource.java 에서 private int initialSize = 0; 으로 정의됨됨

maxActive
동시 사용 가능한 connection 수로 0 일 경우 무제한이며, default 는 8

minIdle
maxActive 를 넘을 수 없으므로 때에 따라 idle connection 이 minIdle 보다 적을 수도 있고, -1 일 경우 무제한이며, default 는 0

maxIdle
dle connection 의 최대 개수로, default 는 8

maxWait
새로운 connection 을 얻기 위해 대기하는 시간 (msec) 으로, 이 시간에 도달하게 되면 exception 이 발생하며, default 는 -1 로 무제한

validationQuery
connection 유효성 체크 query 로 default 는 null 이다. 만일 MySQL/MariaDB/PPAS/PostgreSQL 에 적용하려면 select 1, Oracle 에 적용하려면 select 1 from dual 을 사용한다.

### REF
https://github.com/brettwooldridge/HikariCP

https://github.com/brettwooldridge/HikariCP/wiki/MySQL-Configuration

https://kairuen.tistory.com/11

https://pkgonan.github.io/2018/04/HikariCP-test-while-idle

https://techblog.woowahan.com/2664/

https://sarc.io/index.php/tomcat/21-tomcat-datasource

DBCP
https://d2.naver.com/helloworld/5102792
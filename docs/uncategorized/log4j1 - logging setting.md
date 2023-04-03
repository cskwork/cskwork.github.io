---
title: "log4j1 - logging setting"
description: "THRESHOLD LEVELFATAL > ERROR > WARN > INFO > DEBUG > TRACEweb.xmllog4j.properties"
date: 2022-04-20T06:55:58.391Z
tags: []
---
THRESHOLD LEVEL

FATAL > ERROR > WARN > INFO > DEBUG > TRACE

FATAL: shows messages at a FATAL level only  
ERROR: Shows messages classified as ERROR and FATAL  
WARN: Shows messages classified as WARNING, ERROR, and FATAL  
INFO: Shows messages classified as INFO, WARNING, ERROR, and FATAL  
DEBUG: Shows messages classified as DEBUG, INFO, WARNING, ERROR, and FATAL  
TRACE : Shows messages classified as TRACE,DEBUG, INFO, WARNING, ERROR, and FATAL
ALL : Shows messages classified as TRACE,DEBUG, INFO, WARNING, ERROR, and FATAL 
OFF : No log messages display

web.xml
```xml
	<context-param>
	    <param-name>log4jConfigLocation</param-name>
	    <param-value>/WEB-INF/classes/log4j.properties</param-value>
    </context-param>
	<listener>
		<listener-class>
			org.springframework.web.util.Log4jConfigListener
		</listener-class>
	</listener>
```

log4j.properties
```bash
# 최상위 카테고리에 DEBUG로 레벨 설정 및 appender로 정의
log4j.rootLogger=DEBUG, CONSOLE, DAILY, ERROR

# CONSOLE OUTPUT
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender 
# DEBUG이상 레벨만 출력.
log4j.appender.CONSOLE.Threshold=DEBUG  
# 패턴설정
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout 
# ID 출력 VS
log4j.appender.CONSOLE.layout.ConversionPattern=[%d{yyyy MM dd HH:mm:ss}] [%-5p] %-17c{2} (%13F:%L) | %m   | %M [%t] %n 
# 파일 출력
# log4j.appender.CONSOLE.layout.ConversionPattern=[%p] [%-d{yyyy-MM-dd HH:mm:ss}] %C.%M(%13F:%L) | %m%n 

# //CONSOLE OUTPUT


# DAILY : log daily
log4j.appender.DAILY=org.apache.log4j.DailyRollingFileAppender 
log4j.appender.DAILY.Threshold=DEBUG
# 운영
#log4j.appender.DAILY.File=/home/tomcat8/appLog/restapi-app.log
# 로컬
log4j.appender.DAILY.File= C:/logs/restapi-app.log
log4j.appender.DAILY.DatePattern='.'yyyy-MM-dd
log4j.appender.DAILY.layout= org.apache.log4j.PatternLayout
log4j.appender.DAILY.layout.ConversionPattern=[%d{yyyy MM dd HH:mm:ss}] [%-5p] %-17c{2} (%13F:%L) | %m   | [%t] %n 
log4j.appender.DAILY.Append=true
# //DAILY : log daily


# ERROR : log error
log4j.appender.ERROR=org.apache.log4j.DailyRollingFileAppender
log4j.appender.ERROR.Threshold=WARN
# 운영
# log4j.appender.ERROR.File = /home/tomcat8/appLog/error-restapi-app.log
# 로컬
log4j.appender.ERROR.File= C:/logs/error-restapi-app.log
log4j.appender.ERROR.DatePattern='.'yyyy-MM-dd-a
log4j.appender.ERROR.layout=org.apache.log4j.PatternLayout
#log4j.appender.ERROR.layout.ConversionPattern=%d{yyyy MM dd HH:mm:ss} %-5p [%t] %-17c{2} (%13F:%L) %3x - %m%n
log4j.appender.ERROR.layout.ConversionPattern=[%d{yyyy MM dd HH:mm:ss}] [%-5p] %-17c{2} (%13F:%L) | %m   | [%t] %n 
log4j.appender.ERROR.Append=true
# //ERROR : log error

# iBatis
log4j.logger.com.ibatis=ERROR
log4j.logger.com.ibatis.common.jdbc.SimpleDataSource=ERROR
log4j.logger.com.ibatis.common.jdbc.ScriptRunner=ERROR
log4j.logger.com.ibatis.sqlmap.engine.impl.SqlMapClientDelegate=ERROR
log4j.logger.org.mybatis=ERROR
log4j.logger.java.sql.Connection=ERROR
log4j.logger.java.sql.Statement=ERROR
log4j.logger.java.sql.PreparedStatement=ERROR
log4j.logger.java.sql.ResultSet=ERROR

# https://everlikemorning.tistory.com/entry/Log4J-%EA%B0%84%EB%8B%A8-%EC%82%AC%EC%9A%A9%EB%B2%95
# https://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/DailyRollingFileAppender.html
# https://programmer.group/log4j-output-log-to-separate-log-file.html

# RollingFileAppender : Redirect log messages to a log file, support file rolling.
#log4j.appender.file=org.apache.log4j.RollingFileAppender
#log4j.appender.file.File=C:/logs/rolling.log
#log4j.appender.file.MaxFileSize=20MB
#log4j.appender.file.MaxBackupIndex=10
#log4j.appender.file.layout=org.apache.log4j.PatternLayout
#log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n

```
---
title: "Install Tomcat CentOS"
description: "https&#x3A;//www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-8-on-centos-7"
date: 2021-12-22T02:31:55.417Z
tags: []
---
https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-8-on-centos-7

### try ... catch ...
- 잘못된 권한으로 실행 안될 수 있음
- 환경변수 설정이 잘못되거나 안했을 수 있음 (잘못된 경로 설정 의심)
- server.xml 설정 문법에 문제가 있을 수 있다. 주석, 문법상 오류가 있어도 서비스는 정상적으로 올라간 것 처럼 보임.  
- 일반적인 오류는 catalina.out 로그를 확인하면서 잡을 수 있다. 
- selinux 권한 문제는 하단에 정리해 뒀다. 

### Tomcat 설치 전 사전 작업
```bash
# wget(컨텐츠를 불러오는 프로그램) 없을시 설치 
sudo yum install wget

# 원하는 톰켓 버전 받기
wget https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.30/bin/apache-tomcat-8.5.30.tar.gz

# 톰켓 압축풀기 
sudo mkdir /opt/tomcat
#tar zxvf apache-tomcat-8.5.59.tar.gz
tar xvf apache-tomcat-8.5.30.tar.gz -C ../../tomcat8 --strip-components=1

# JDK 설치 
sudo yum install java-1.8.0-openjdk
```

### 톰켓 사용자 권한 설정
```bash
# 필요시 톰켓용 유저 생성
sudo groupadd tomcatAdmin
sudo useradd -M -s /bin/nologin -g tomcatAdmin -d /home/user/tomcat8 tomcatAdmin

# 유저에게 권한 주기
# chmod는 조회, 실행, 쓰기 권한 변경
# chown는 사용자 권한 설정 
cd /opt/tomcat
sudo chgrp -R tomcat /home/user/tomcat8
# group r - read, x - execute
sudo chmod -R g+r conf 
sudo chmod g+x conf
sudo chown -R tomcat webapps/ work/ temp/ logs/
```

### 환경 설정 PATH 찾아서 쓰기
```bash
# ./.bash_profile
JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.el6_9.x86_64
CATALINA_PID==/home/centos/tomcat8/temp/tomcat.pid
CATALINA_HOME=/home/centos/tomcat8
CATALINA_BASE=/home/centos/tomcat8

ExecStart=/home/centos/tomcat8/bin/startup.sh
User=centos
Group=centos

# 환경 변수 테스트 
echo $JAVA_HOME
echo $CATALINA_HOME
```

### 톰켓 서비스 설정
```bash
# Run Tomcat as Service
#==================================
sudo vi /etc/systemd/system/tomcat.service

# /etc/systemd/system/tomcat.service
# Systemd unit file for tomcat
[Unit]
Description=Apache Tomcat Web Application Container
After=syslog.target network.target

[Service]
Type=forking

Environment=JAVA_HOME=/home/user/jdk8Dir/bin/java
Environment=CATALINA_PID=/home/user/tomcat8/temp/tomcat.pid
Environment=CATALINA_HOME=/ho
Environment=CATALINA_BASE=/home/user/tomcat8
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/bin/kill -15 $MAINPID

User=userName
Group=userGroup
UMask=0007
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
#==================================
sudo systemctl daemon-reload
sudo systemctl start tomcat
journalctl -xe #LOGGING
sudo systemctl status tomcat
sudo systemctl enable tomcat # run on boot

# Check Page
http://server_IP_address:8080
```


### Tomcat 관리자 설치 
Inside, comment out the IP address restriction to allow connections from anywhere. Alternatively, if you would like to allow access only to connections coming from your own IP address, you can add your public IP address to the list:
```bash
sudo vi /opt/tomcat/conf/tomcat-users.xml
# tomcat-users.xml — Admin User
<tomcat-users>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <role rolename="manager-jmx"/>
  <role rolename="manager-status"/>
  <role rolename="tomcat"/>
  <role rolename="role1"/>
 <!-- <user username="tomcat" password="tomcat" roles="tomcat"/>-->
 <!-- <user username="both" password="tomcat" roles="tomcat,role1"/>-->
  <user username="admin" password="admin123" roles="manager-gui,manager-script,manager-jmx,manager-status"/>

</tomcat-users>

sudo vi /opt/tomcat/webapps/manager/META-INF/context.xml
sudo vi /opt/tomcat/webapps/host-manager/META-INF/context.xml

# Allow Connection
# context.xml files for Tomcat webapps
<Context antiResourceLocking="false" privileged="true" >
  <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />-->
</Context>

# Restart
sudo systemctl restart tomcat
# 확인
http://server_IP_address:8080/manager/html
http://server_IP_address:8080/host-manager/html/

```

### 설치된 톰켓에 웹 서비스 올리기
server.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
    <Listener className="org.apache.catalina.startup.VersionLoggerListener"/>
    <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener"/>
    <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener"/>
    <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener"/>

    <Service name="Catalina">
        <Connector protocol="HTTP/1.1" URIEncoding="UTF-8" port="8080"
                   connectionTimeout="17200000" server="Server"/>
        <Connector protocol="AJP/1.3" URIEncoding="UTF-8" port="8009"/>

        <Engine name="Catalina" defaultHost="localhost">
            <Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">
		<!-- 웹 서비스 -->
                <Context path="/webServiceURL" docBase="../../webServiceURL/webManager"/>
               
                	<Manager pathname="" />
                </Context>

		<Context path="/rest" docBase="../../restapi"/>

                <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
                       prefix="localhost_access" suffix=".log" pattern="%h %l %u %t &quot;%r&quot; %s %b"/>
            </Host>
        </Engine>
    </Service>
</Server>
```

## 기타 설정

###  cors, xss 필터링
web.xml
```xml
 <filter>
        <filter-name>httpHeaderSecurity</filter-name>
        <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>

        <init-param>
            <param-name>antiClickJackingEnabled</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>antiClickJackingOption</param-name>
            <param-value>SAMEORIGIN</param-value>
        </init-param>
        <init-param>
            <param-name>blockContentTypeSniffingEnabled</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>xssProtectionEnabled</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>httpHeaderSecurity</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <filter>
        <filter-name>CorsFilter</filter-name>
        <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
        <init-param>
            <param-name>cors.allowed.origins</param-name>
            <param-value>http://url</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CorsFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

```

### catalina.policy

```xml
// System Property Setting
    // Precompiled JSPs need access to these system properties.
    permission java.util.PropertyPermission
     "org.apache.jasper.runtime.BodyContentImpl.LIMIT_BUFFER", "read";
    permission java.util.PropertyPermission
     "org.apache.el.parser.COERCE_TO_ZERO", "read";

    // The cookie code needs these.
    permission java.util.PropertyPermission
     "org.apache.catalina.STRICT_SERVLET_COMPLIANCE", "read";
    permission java.util.PropertyPermission
     "org.apache.tomcat.util.http.ServerCookie.STRICT_NAMING", "read";
    permission java.util.PropertyPermission
     "org.apache.tomcat.util.http.ServerCookie.FWD_SLASH_IS_SEPARATOR", "read";

    // Applications using WebSocket need to be able to access these packages
    permission java.lang.RuntimePermission "accessClassInPackage.org.apache.tomcat.websocket";
    permission java.lang.RuntimePermission "accessClassInPackage.org.apache.tomcat.websocket.server";

    // Applications need to access these packages to use the Servlet 4.0 Preview
    permission java.lang.RuntimePermission "accessClassInPackage.org.apache.catalina.servlet4preview";
    permission java.lang.RuntimePermission "accessClassInPackage.org.apache.catalina.servlet4preview.http";
```

### 캐싱
context.xml
```xml
    <CookieProcessor className="org.apache.tomcat.util.http.LegacyCookieProcessor"/>
    <Resources cachingAllowed="true" cacheMaxSize="102400"/>
```

### 서버정보 숨기기
https://blog.jiniworld.me/109

1 catalina.jar 압축 풀기
2 .\lib\org\apache\catalina\util\ServerInfo.properties 수정 후 
3 다시 압축

```xml
server.info=Apache Tomcat/8.5.73
server.number=8.5.73.0
server.built=Nov 11 2021 13:14:36 UTC
->
server.info=Server
server.number=
server.built=
```

### 환경변수 설정
/etc/profile
```
PATH=/usr/lib/jvm/java-1.8-openjdk/bin
JAVA_OPTS=-Xms2048m -Xmx2048m
TZ=Asia/Seoul
LANG=C.UTF-8
JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
```

### 패키지 버전 찾기
```bash
yum --showduplicates list java-1.8.0-openjdk | expand
```
![](/images/3595fd41-a0eb-488d-996e-c2228362a394-image.png)


## 디버깅
### selinux permission 문제
```bash
# selinux 실행 확인 
sestatus
# 설정 변경 확인
sudo vi /etc/selinux/config
# 해당 세션에 대한 빠른 해결은 
sudo setenforce 0
# 각 파일 별 허용은
chcon -Rv --type=httpd_sys_content_t /html 

```
### chcon
https://blog.naver.com/hanajava/222394006121
```
	
[Linux] SELinux 개념 + 관련 명령어 chcon  Linux   
2021. 6. 11. 14:43
[Linux] SELinux 개념 + 관련 명령어
떵해이 2020. 12. 14. 07:37
SELinux는 CentOS 7 이상부터 설

○ SELinux란 ?
    ▷ Security Enhanced Linux의 약자
    ▷ 과거 리눅스는 소스코드가 공개되어 있기 때문에 보안이 취약
    ▷ 취약점을 보안하기 위한 것이 SELinux
    ▷ Linux Kernel 보안 모듈이라고도 하고, Linux의 핵심인 Kernel을 보호하기 위한 도구
    ▷ 3가지 상태 존재

        - enforcing : 강제
        - permissive : 허용
        - disabled : 비활성화

    ▷ 우리가 사용하는 편리성과 보안과는 기본적으로 반비례합니다.
        설정해야 할 것도 많고, 관리할 것도 많으며, 제약이 생깁니다.
        보안이 뛰어나면 편리가 감소하고, 보안이 취약하면 편리가 증가한다고 생각하면 됩니다.

○ SELinux 사용법 (설정)
● SELinux 설정 파일

# vi /etc/sysconfig/selinux

selinux 설정 파일에 들어가서 selinux를 설정할 수 있습니다.

# SELINUX=enforcing / permissive / disabled 지금 적용중인 것을 알 수 있습니다.
가끔 SELINUX를 비활성화 시켜야 할 때가 있습니다.
여러가지 설정하는 경우는 아예 비활성화로 disabled 하시면 됩니다.
재부팅시에 설정이 적용됩니다.


disabled -  비활성화
permissive - 서비스 거부 메세지 통보를 받을 수 있고, 자료와 프로그램에 이름을 할당한 후 로그를 기록하지만 보안 정책을 사용하지 않음 처음 selinux를 사용하는 사람이 어떤 영향을 미치는지 알아볼 때 좋음
enforcing - 활성화
 추가 시스템 보안을 위해 모든 보안 정책을 사용

○ SELinux 관련 명령어
● setenforce / getenforce
# sentenforce 0
SELinux=permissive와 동일한 결과로서 임시적으로 적용하는 명령어

# setenforce 1
SELinux=enforcing와 동일한 결과로서 임시적으로 적용하는 명령어
(단, SELinux status값이 disable 상태이면 명령어 사용 불가)

# getenforce
설정을 보는 명령어

● chcon

# chcon [옵션] [보안 문맥] [파일명]
보안 문맥을 변경해주는 명령어


옵션
-t : 해당 파일에 대한 role 설정
-R : 하위 디렉토리 내 모든 파일에 대한 같은 role 설정
-u : user 바꿀 때
-r : role 바꿀 때
-t : type 바꿀 때

예시

# chcon -R -t httpd_sys_content_t /home/user

/home/user디렉토리 아래에 생성되는 모든 파일은 httpd_sys_content_t 보안 문맥 적용
[출처] [Linux] SELinux 개념 + 관련 명령어 chcon|작성자 하나자바
```
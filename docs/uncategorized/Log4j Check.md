---
title: "Log4j Check"
description: "버전 확인"
date: 2021-12-13T00:28:24.593Z
tags: []
---
버전 확인
``` java
 System.out.println(org.apache.log4j.Layout.class.getPackage().getImplementationVersion());
```


```xml
plugins {
    id 'org.springframework.boot' version '2.2.5.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
}

sourceCompatibility = '13'

repositories{
    mavenCentral()
}

ext{
    log4j2version = '2.13.1'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-log4j2'
    
    implementation "org.apache.logging.log4j:log4j-spring-cloud-config-client:${log4j2version}"
    implementation "org.apache.logging.log4j:log4j-api:${log4j2version}"
    implementation "org.apache.logging.log4j:log4j-core:${log4j2version}"
}

configurations {
    all {
        exclude group: 'org.springframework.boot', module: 'spring-boot-starter-logging'
        exclude group: "ch.qos.logback", module: "logback-classic"
        exclude group: "org.springframework.cloud", module: "spring-cloud-bus"
    }
}
```
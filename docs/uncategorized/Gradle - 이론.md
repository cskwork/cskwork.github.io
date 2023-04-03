---
title: "Gradle - 이론"
description: "Gradlebuild automation toolbuildmass compile automateAndroid main build toollogging possibleloggingstacktrace, info , scan https&#x3A;//scans.gradle.c"
date: 2022-06-13T22:58:39.314Z
tags: []
---
>Mosher's Law of Software Engineering
Don't worry if it doesn't work right. If everything did, you'd be out of a job.

# Gradle
## 정의
- build automation tool
- Netflix, Adobe, Android Usage

build
- mass compile automate
- Android main build tool
- logging possible
- 의존성 lib 다운, 컴파일 source->binary, package, deploy

logging
- stacktrace, info , scan 
![](/images/34a01196-dc60-4c43-8e0f-ee45a9b673b9-image.png)

https://scans.gradle.com/s/g5imwm7fcw44u

automation
- task based execution
- auto testing, uploading possibility

task
- build life cycle separation (before, after) 

tool
- made with programming language Groovy 

## 빌드 꿀팁
- JDK - Gradle version comparision
- 수동으로 jdk, gradleHome 설정 에러시 로그 하단 확인 (경로 문제 중 jdk 경로에서 /bin을 제거해서 넣어야 한다. 
- 일부 dependency 사이 충돌이 발생하기 때문에 간혹 날리고 하나씩 추가해서 확인해야하는 경우가 발생한다. 또는 검색해서 충돌 예방하기
- dependency - jdk 호환성 충돌로 인해 no such method found 등도 발생해서 확인해서 버전 다운 업도 필요! 
- lib를 추가했는데 안되는 경우 프로젝트 clean, gradle refresh 후 build clean -> build 프로세스로 초기화할 필요가 있다. 

## 장점
- Higher performance than Maven
- Build issue detection with build scan
- task creation and customization scripts
- IDE Support (auto-complete, error detection) - Kotlin best
- use of wrapper

## 구조 
Gradle-wrapper
- 다른 환경에서 빌드도구를 설치하고 실행환경설정을 기존에는 직접 관리했지만.
- gradle에서 제공하는 wrapper를 사용하면 빌드도구를 실행할 수 있는 jar 파일과 실행할 수 있는 스크립트가 함께 등록되어 일관된 빌드 환경으로 재현 가능하고 유지보수 가능한 빌드 자동화 제공. 
```bash
구조 
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar // 그레이들 래퍼 jar
│       └── gradle-wrapper.properties // 그레이들 래퍼 버전 및 실행환경 기록
├── gradlew // Unix 계열에서 실행가능한 스크립트
└── gradlew.bat // 윈도우에서 실행가능한 스크립트

gradle-wrapper.properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-6.7.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists

```

## 툴 비교 
Ant
- ease of custom build scripts

Maven
- Standardized build process and ease but less ease than Ant 

Gradle 
- Gets the best of Maven & Ant
- Non-XML, uses domain specific language
- Smaller config. file 

## 문법 
### plugin vs dependencey
- plugin - 앱 "빌드시/사용전" 필요한 도구
- dependency - 앱 "사용시" 필요한 라이브러리
### implementation vs compile
- implementation : A 모듈 수정시 이 모듈을 직접 의존하고 있는 B만 빌드
- compile : A 모듈 수정시 이 모듈을 직접 또는 간접 의존하고 있는 B, C 모두 재빌드. 즉 상위 부모 계층 전부 다시 컴파일
- compile 은 gradle 버전 7+ 이후 부터는 제거됨. deprecated
- 즉 implementation이 더 빠르고, 사용하는 API 명시/노출해서 직관적임. 
![](/images/26dfa205-e6be-43bc-95c2-a7766728eb7a-image.png)

### compileOnly vs runtimeOnly
- compileOnly : compileClasspath에 lib를 넣음
- runtimeOnly : runtimeClasspath에 lib를 넣음
- implementation : compileClasspath & runtimeClasspath에 넣음
![](/images/29426d36-c0de-403a-bf85-d33c8d3064eb-image.png)

이걸 왜 신경써야해 복잡한데 ㅠㅠ ? 

--> compile, runtime에 따른 중복 클래스 사용을 피하고, 명확히 명시되어 깔끔하고, 필요한 classPath에만 의존성 lib를 넣어서 더 빠르다. 

### compileClasspath vs runtimeClasspath vs testClasspath
- compileClasspath : 앱 컴파일에 사용하는 코드
- runtimeClasspath : 앱 실행해서 사용중 사용하는 코드 
- testClasspath : 앱 테스트 코드 실행 중 사용하는 코드 (즉 앱 안에 들어가지 않는다.)

#### build.gradle 예제
```java
buildscript {
    ext {
        springBootVersion = '2.3.5.RELEASE'
        queryDslVersion = "4.4.0" 
        log4j2version = '2.17.0'       
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

plugins {
    id 'org.springframework.boot' version '2.3.5.RELEASE'
    id 'io.spring.dependency-management' version '1.0.10.RELEASE'
    id 'java'
    id 'war'
    id 'eclipse'
    id 'eclipse-wtp'
    id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"
}

if (!project.hasProperty('target') || !target) {
    ext.target = 'tomcat'
}

// QUERYDSL ===================
apply plugin: "com.ewerk.gradle.plugins.querydsl"

def querydslDir = "$buildDir/generated/querydsl"

querydsl {
    jpa = true
    querydslSourcesDir = querydslDir
}

sourceSets {
    main {
        resources.srcDir "src/main/resources/profiles/${target}"
        output.resourcesDir 'build/resources/main'
        resources.exclude "**/profiles"
        java.srcDir querydslDir
    }

}
// //QUERYDSL ===================

group = 'com.project'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

configurations {
    querydsl.extendsFrom compileClasspath
    compileOnly {
        extendsFrom annotationProcessor
    }
    all*.exclude group: 'org.springframework.boot', module: 'spring-boot-starter-logging'
    providedRuntime  
}

//QUERYDSL ===================
compileQuerydsl {
    options.annotationProcessorPath = configurations.querydsl
}
////QUERYDSL ===================

repositories {
    mavenCentral()  
}

task local {
    bootRun {
        systemProperty("spring.profiles.active", "local")
    }
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
 
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-configuration-processor
    // compile group: 'org.springframework.boot', name: 'spring-boot-configuration-processor', version: '2.3.5.RELEASE'
    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'

    //Lombok
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    providedRuntime 'org.springframework.boot:spring-boot-starter-tomcat'
    testImplementation('org.springframework.boot:spring-boot-starter-test') {
        exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
    }

    // 스프링 부트 개발 툴(클래스 자동 리로더 등)
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    //QueryDSL
    implementation("com.querydsl:querydsl-jpa:${queryDslVersion}")

    // Maria DB
    runtimeOnly 'org.mariadb.jdbc:mariadb-java-client'

    // Thymeleaf Layout
    // https://mvnrepository.com/artifact/nz.net.ultraq.thymeleaf/thymeleaf-layout-dialect
    implementation group: 'nz.net.ultraq.thymeleaf', name: 'thymeleaf-layout-dialect', version: '2.5.1'

    // https://mvnrepository.com/artifact/com.github.kevinsawicki/http-request
    compile group: 'com.github.kevinsawicki', name: 'http-request', version: '6.0'
}

test {
    useJUnitPlatform()
    exclude '**/*'
}

```

## 출처 
https://gradle.org/

https://medium.com/@257ramanrb/ant-vs-maven-vs-gradle-cd8ab4c2735f

https://www.baeldung.com/ant-maven-gradle

https://stackoverflow.com/questions/38910129/what-is-the-difference-between-an-app-dependency-and-a-module-dependency-plugin

https://bluayer.com/13

https://techblog.woowahan.com/2625/

https://tomgregory.com/gradle-implementation-vs-compile-dependencies/

https://techblog.bozho.net/runtime-classpath-vs-compile-time-classpath/

http://www.natpryce.com/articles/000749.html

---
## #연결고리 
undefined

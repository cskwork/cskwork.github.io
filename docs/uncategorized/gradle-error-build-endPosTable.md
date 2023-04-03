---
title: "gradle-error-build-endPosTable"
description: "java.lang.IllegalStateException: endPosTable already setJPA QueryDsl이나 기타 Generate SRC할 때 발생 . source path가 제대로 clean 안된 상태에서 발생 cleantaskoptions수동으로"
date: 2022-06-09T00:04:05.677Z
tags: []
---
## Q endPosTable already set
java.lang.IllegalStateException: endPosTable already set
JPA QueryDsl이나 기타 Generate SRC할 때 발생 . source path가 제대로 clean 안된 상태에서 발생 

## A clean build
clean
```xml
clean.doLast {
	file(querydslGenratedSrc).deleteDir()
}
```
task
```xml
def querydslGenratedSrc = 'src/main/generated'

task deleteGeneratedSources(type: Delete) {
  delete file(querydslGenratedSrc)
}

tasks.withType(JavaCompile) { it.dependsOn('deleteGeneratedSources') }
```
options
```xml
tasks.withType(JavaCompile) {
	options.incremental = false
	options.annotationProcessorGeneratedSourcesDirectory = file(querydslGenratedSrc)
}
```
수동으로
```bash
./gradlew clean 
./gradlew build
```

Gradle set home, jdk 시 /bin을 없에줘야 한다... 전체 로그 보고 경로도 제대로 설정하기

Gradle 로
program argument --scan --stacktrace로 더 상세한 로그 확인
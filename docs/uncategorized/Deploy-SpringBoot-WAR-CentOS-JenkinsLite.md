---
title: "Deploy-SpringBoot-WAR-CentOS-JenkinsLite"
description: ""
date: 2022-10-13T02:48:48.157Z
tags: []
---
```bash
#!/bin/bash

### ====
### INPUT
PROJECT_NAME=$1
OWNER_NAME=userName
TEMPORARY=/home/$OWNER_NAME/deployProjectWar 
REPOSITORY=/home/$OWNER_NAME/$PROJECT_NAME/bin
BACKUPDIR="$REPOSITORY/backup/"`date "+%Y%m%d_%H%M%S"`
### =====

# 유효성 검사 
echo $PROJECT_NAME
if [ -z $PROJECT_NAME ]; then
    echo "> 프로젝트명을 입력하세요."
	exit 0
fi

# 1 백업 
echo "> Build 파일 백업"
cd $REPOSITORY/
mkdir -p ${BACKUPDIR}
cp -v ../bin/*.war ${BACKUPDIR}/

# 2 복사
echo "> Build 파일 복사"
if [ -z $TEMPORARY/$PROJECT_NAME*.war ]; then
    echo $PROJECT_NAME " WAR 프로젝트가 없습니다."
	exit 0
fi 

cp -v $TEMPORARY/$PROJECT_NAME*.war $REPOSITORY/
# rm -r $TEMPORARY/$PROJECT_NAME*.war

# 2 프로젝트 확인 
echo "> 현재 구동중인 애플리케이션 pid 확인"
CURRENT_PID=$(pgrep -fl $PROJECT_NAME | grep java | awk '{print $1}')


if [ -z $CURRENT_PID ]; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -9 $CURRENT_PID"
    kill -9 $CURRENT_PID
    sleep 3
fi

# 3 프로젝트 배포
echo "> 새 어플리케이션 배포"
JAR_NAME=$(ls -tr $REPOSITORY/$PROJECT_NAME*.war | tail -n 1)

echo "> $JAR_NAME에 실행권한 추가"
chmod +x $JAR_NAME

# 4 프로젝트 실행
echo "> $JAR_NAME 실행"
nohup java -jar $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &
```
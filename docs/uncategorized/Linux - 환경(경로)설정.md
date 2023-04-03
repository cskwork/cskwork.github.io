---
title: "Linux - 환경(경로)설정"
description: "https&#x3A;//opensource.com/article/17/6/set-path-linux"
date: 2022-03-10T10:05:44.153Z
tags: []
---
### 현재 환경설정 경로 조회 / 경로 설정
```bash
echo $PATH
export PATH=$PATH:/place/with/the/file
echo $PATH
```

### 경로 영구 설정
```bash
/etc
vi ~/.bash_profile : 특정 사용자의 원격 로그인 파일에 있는 환경 변수는 사용자가 원격 로그인 세션이 이루어질 시에 호출됨
vi ~/.bashrc : 특정 사용자가 새로운 로컬 세션을 생성할 때마다 로딩되는 파일. 즉 특정 사용자에게만 유효한 환경설정을 하려면 여기해 하면된다. 
vi ~/.profile : 시스템 전체의 profile 파일로 모든 사용자가 원격 로그인 세션이 이루어질 시에 호출됨. 

The difference between these files is (primarily) when they get read by the shell. If you're not sure where to put it, 

기본으로 설정하는 위치 : ~/.bashrc
```
## bash vs bash_profile
- bash_profile : bash 로그인 쉘 실행시 로딩됨.  
- bashrc : 새 쉘 터미널을 열 때마다 계속 실행된다. 
- login shell : ID/PWD 입력해서 쉘 실행. SSH 접속 등
- non-login shell : 로그인 없이 실행한느 쉘. ssh 접속 후 다시 bash 실행 GUI 세션에서 터미널 띄우고나 su 등의 행위 
### 출처
https://opensource.com/article/17/6/set-path-linux
https://linuxize.com/post/bashrc-vs-bash-profile/
https://jongmin92.github.io/2016/12/13/Linux%20&%20Ubuntu/bashrc-bash_profile/
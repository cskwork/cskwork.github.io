---
title: "Linux - 찾기 (파일, 스트링)"
description: "경로에서 특정 스트링 찾기 "
date: 2022-03-10T09:55:16.735Z
tags: []
---
## 경로에서 특정 스트링 찾기
```bash
grep -rnw '/home/찾는 경로' -e '찾을 스트링'
grep -rnw './adminServer.log' -e 'Open'
```
## 파일 찾기
```bash
# 현재 경로에서 FILENAME 이름을 갖고 있는 파일을 찾기. (현재 및 하위 디렉토리 포함)
find . -name "FILENAME"
```
## 현재 경로에 파일 찾아서 특정 파일명 패턴을 갖고 있는 경우 전부 삭제
```bash
find . -name "old_*" -exec rm -rf {} \;
```

### 그외
```bash
현재 디렉토리에 있는 파일 및 디렉토리 리스트 표시	find
대상 디렉토리에 있는 파일 및 디렉토리 리스트 표시	find [PATH]
현재 디렉토리 아래 모든 파일 및 하위 디렉토리에서 파일 검색	find . -name [FILE]
전체 시스템(루트 디렉토리)에서 파일 검색	find / -name [FILE]
파일 이름이 특정 문자열로 시작하는 파일 검색	find . -name "STR*"
파일 이름에 특정 문자열이 포함된 파일 검색	find . -name "*STR*"
파일 이름이 특정 문자열로 끝나는 파일 검색	find . -name "*STR"
빈 디렉토리 또는 크기가 0인 파일 검색	find . -empty
특정 확장자를 가진 모든 파일 검색 후 삭제	find . -name "*.EXT" -delete
검색된 파일 리스트를 줄 바꿈 없이 이어서 출력하기	find . -name [FILE] -print0
파일 또는 디렉토리만 검색하기	find . -name [FILE] -type f
파일 크기를 사용하여 파일 검색	find . -size +[N]c -and -size -[M]c
검색된 파일에 대한 상세 정보 출력. (find + ls)	find . -name [FILE] -exec ls -l {} \;
검색된 파일의 라인 수 출력. (find + wc)	find . -name [FILE] -exec wc-l {} \;
검색된 파일에서 문자열 찾기. (find + grep)	find . -name [FILE] -exec grep "STR" {} \;
검색 결과를 파일로 저장. (find, redirection)	find . -name [FILE] > [SAVE_FILE]
검색 중 에러 메시지 출력하지 않기 (find, redirection)	find . -name [FILE] 2> /dev/null
하위 디렉토리 검색하지 않기	find . -maxdepth 1 -name [FILE]
검색된 파일 복사. (find + cp)	find . -name [FILE] -exec cp {} [PATH] \;
```
### 출처
https://recipes4dev.tistory.com/156
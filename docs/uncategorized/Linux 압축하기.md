---
title: "Linux 압축하기"
description: "출처 : https&#x3A;//recipes4dev.tistory.com/146tar는 메타데이터를 보존하지만 '압축'이 아니라 합치기만 한다.단 권한정보 등을 보존하기 때문에 리눅스에서는 zip 보다는 tar로 압축한다. tar로 데이터를 묶고 압축까지 진행하려면 "
date: 2021-12-24T00:13:31.598Z
tags: ["gzip","linux","tar","zip"]
---
![](/images/20e778f4-57c5-47a9-83a6-c48c5cd430e9-image.png)

출처 : https://recipes4dev.tistory.com/146

## tar
- tar라는 단어는 낯설지만 전혀 어려운 개념이 아니다. 원도우에서 흔히 사용하는 zip파일 같은 건데 리눅스에서 사용하는 것... 정도로만 우선 생각하면 된다.

- 단 차이점은 tar는 메타데이터(리눅스에서 실행, 사용자 권한 정보)를 보존하지만 '압축'이 아니라 합친다.

- 이런 메타데이터를 보존하기 때문에 그리고 리눅스에서는 권한정보가 매우 중요하기 때문에 zip 보다는 tar를 사용한다.

- tar로는 데이터를 묶고. 묶은 후 압축까지 진행하려면 gzip로 압축하면된다. 


## 압축
- c : compress, tar 아카이브 생성 (기존 아카이브 덮어쓰기)
- v : 처리되는 과정을 나열
- f : 대상 tar 아카이브 지정 (기본 옵션)

### tar 압축하기
```bash
tar -cvf [파일명.tar] [폴더명]
tar -cvf test.tar test_folder
```

### tar + gzip 압축하기

``` bash
tar -zcvf [파일명.tar.gz] [폴더명]
tar -zcvf test.tar.gz test_folder
```

### zip 압축하기
```bash
zip [파일명.zip] [폴더명]
# 현재 폴더의 전체를 압축
zip test.zip ./*
# 현재 폴더의 모든 것과 현재 폴더의 하위 폴더들까지 모두 압축
zip test.zip -r ./*
```

## 압축 해제
- x : extract, tar 아카이브에서 파일 추출 
- v : 처리 되는 과정을 나열
- f : 대상 tar 아카이브 지정 (기본 옵션)
### tar 압축해제
```bash
tar -xvf [파일명.tar]
```
### gzip 압축해제
```bash
tar -zxvf [파일명.tar.gz]
tar -zxvf test.tar.gz
```

### zip 압축 해제 
```bash
unzip [파일명.zip]
unzip test.zip
unzip test.zip -d ./target_folder
```

### 특수 (압축하면서 파일 경로 제외)
```bash
sudo tar xvf apache-tomcat-8*tar.gz -C /dirToInstall/tomcat8 --strip-components=1 # 톰켓 압축하파일 안에 첫번째 dir를 무시하고 압축한다. 

--strip-components=number
Strip given number of leading components from file names before extraction.
F
or example, 
# 1 `archive.tar' 가  `some/file/archive.tar' 의 경로를 갖고 있으면 
# 2 압축 실행시 tar --extract --file archive.tar --strip-components=2 를 실행시
# 3 `some/file/archive.tar` 경로상에 두번째까지 등장하는 디렉토리를 제거한다. 그래서 최종적으로 archive.tar로 나온다
```

## 예제)
``` bash 
현재 디렉토리의 모든 파일과 디렉토리를 tar로 묶기	tar cvf T.tar *

대상 디렉토리를 포함한 모든 파일과 디렉토리를 tar로 묶기	tar cvf T.tar [PATH]

파일을 지정하여 tar 아카이브로 묶기	tar cvf T.tar [FILE_1] [FILE_2]

tar 아카이브를 현재 디렉토리에 풀기	tar xvf T.tar

tar 아카이브를 지정된 디렉토리에 풀기	tar xvf T.tar -C [PATH]

tar 아카이브의 내용 확인하기	tar tvf T.tar

현재 디렉토리를 tar로 묶고 gzip으로 압축하기	tar zcvf T.tar.gz *

gzip으로 압축된 tar 아카이브를 현재 디렉토리에 풀기	tar zxvf T.tar.gz

현재 디렉토리를 tar로 묶고 bzip2로 압축하기	tar jcvf T.tar.bz2 *

bzip2로 압축된 tar 아카이브를 현재 디렉토리에 풀기	tar jxvf T.tar.bz2

tar 아카이브 묶거나 풀 때 파일 별 진행 여부 확인하기	tar cvfw T.tar *

```

## tar 명령어 옵션
```
tar [OPTION...] [FILE]... 
	-f : 대상 tar 아카이브 지정. (기본 옵션) 
	-c : tar 아카이브 생성. 기존 아카이브 덮어 쓰기. (파일 묶을 때 사용) 
	-x : tar 아카이브에서 파일 추출. (파일 풀 때 사용) 
	-v : 처리되는 과정(파일 정보)을 자세하게 나열. 
	-z : gzip 압축 적용 옵션. 
	-j : bzip2 압축 적용 옵션. 
	-t : tar 아카이브에 포함된 내용 확인. 
	-C : 대상 디렉토리 경로 지정. 
	-A : 지정된 파일을 tar 아카이브에 추가. 
	-d : tar 아카이브와 파일 시스템 간 차이점 검색. 
	-r : tar 아카이브의 마지막에 파일들 추가. 
	-u : tar 아카이브의 마지막에 파일들 추가. 
	-k : tar 아카이브 추출 시, 기존 파일 유지. 
	-U : tar 아카이브 추출 전, 기존 파일 삭제. 
	-w : 모든 진행 과정에 대해 확인 요청. (interactive) 
	-e : 첫 번째 에러 발생 시 중지.

```

## 참고
https://recipes4dev.tistory.com/146
https://eehoeskrap.tistory.com/555
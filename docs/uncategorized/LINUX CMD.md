---
title: "LINUX CMD"
description: "Common'''mv ./path/folder /folder/foldercp ./path/folder ./folder/foldersh run.sh./run.shhistoryhistory -w currLoc.txtcat ./path/log.logvi ./path/log."
date: 2021-10-20T14:39:18.969Z
tags: ["linux"]
---
Common
```bash
mv ./path/folder /folder/folder
mv allFoldersUp/** ..

alias shortName="your custom command here"
alias re="sudo systemctl restart tomcat"
# Permanent alias
vi ~/.bashrc
alias re="sudo systemctl restart tomcat"
source ~/.bashrc
```

### 네트워크 체크
``` bash
netstat -plnt //listen,pid
netstat -plnt | grep ‘:80’ //filter
route -n //local Network 확인
```

### 프로세스 체크
``` bash
ps -ef | grep java | grep tomcat
cat /proc/cpuinfo   |   grep processor /proc/cpuinfo | wc -l  //cpu core 확인
uptime  //load 확인
ps -eo user,pid,ppid,rss,size,vsize,pmem,pcpu,time,cmd --sort -rss | head -n 11 //각 프로세스 사용량 확인
free -mh  | df -T //메모리 사용량 확인. 디스크 사용량 확인
```

### 자주 사용 
파일 찾기
``` bash
find -name '*.zip'
find . -name "*" | xargs grep -n "count"
```
파일 합침
``` bash
cat 1.txt 2.txt 3.txt > 0.txt
-concat 3 files and output to 0.txt.
-> = shell redirection
cp abc.txt abc_bak.txt
concat and alphabetic sort
cat file1 file2 | sort > file3; cat file3
```
권한 변경
```
chmod u+r secure (secure파일의 소유자 읽기권한 추가)
chmod ugo-wx secure (소유자, 그룹, 그 외 사용자의 쓰기,실행권한을 삭제)
chmod ugo+x secure (소유자, 그룹, 그 외 사용자에 실행권한 추가)
chmod ugo=x secure (소유자, 그룹, 그 외 사용자의 실행권한을 제외한 모든권한 삭제)
```


### 폴더 안에 있는 내용 전체 + 동일한 소유권
cp -rp ./path/folder ./folder/folder
sh run.sh
./run.sh

history  
history -w currLoc.txt

cat ./path/log.log
vi ./path/log.log
tail -f log.txt
tail -n log.txt

ps -ef | grep java | grep tomcat
kill

ls -al
'''

### 기타
```
**cpu 확인**

[http://lyo.kr/bbs/board.php?bo_table=tip&wr_id=14](http://lyo.kr/bbs/board.php?bo_table=tip&wr_id=14)

# CPU 코어 전체 개수

grep processor /proc/cpuinfo | wc -l

# 물리 CPU 수

grep 'physical id' /proc/cpuinfo | sort -u | wc -l

# 물리 CPU 당 물리 코어수

grep 'cpu cores' /proc/cpuinfo | tail -1

# HyperThreading 활성화 확인 (siblings이 cpu cores의 2배면 활성화)

egrep 'cpu cores|siblings' /proc/cpuinfo | sort -u

# 파일시스템 확인

dmesg | grep sda4

df -hT

# OS bit 조회

getconf LONG_BI

# 랜카드 지원속도 확인

ethtool eth0

# 오라클버전 확인

select banner from v$version;

# 모델명 확인

dmidecode | grep Name

# sar

sar -u // cpu 사용률 확인

sar -q // load average 확인

sar -r // memory 사용현황 확인

sar -W // swap 발생상황 확인

# 메모리 사용순위 보기

ps -ef --sort -rss

# 메모리 사용량 표시

ps -eo user,pid,ppid,rss,size,vsize,pmem,pcpu,time,cmd --sort -rss | head -n 11

ps -eo user,pid,ppid,rss,size,vsize,pmem,pcpu,time,comm --sort -rss | head -n 11

# 좀비 프로세스 확인

ps -ef | grep defunct | grep -v grep

# 좀비 프로세스 종료(PPID ID로 종료)

ps -ef | grep defunct | awk '{print $3}' | xargs kill -9
```
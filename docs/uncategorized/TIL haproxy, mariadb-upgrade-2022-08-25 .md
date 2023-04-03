---
title: "TIL haproxy, mariadb-upgrade-2022-08-25 "
description: "centos7 DB import 작업 중 무한 브로드케스트 메시지. 서비스 직접 접근은 불가 HIPSM 사용 명령어 여러줄 입력이 불가하여 (메시지 1초 정도 끊김- 명령어 입력 가능시간 외에는 지속적으로 발생해서) 원라인 명령어로 비번도 입력해야했음. 해당 명령어로 "
date: 2022-08-25T00:21:33.420Z
tags: []
---
## haproxy
### PROBLEM 
centos7 DB import 작업 중 무한 브로드케스트 메시지. 서비스 직접 접근은 불가 HIPSM 사용 
명령어 여러줄 입력이 불가하여 (메시지 1초 정도 끊김- 명령어 입력 가능시간 외에는 지속적으로 발생해서) 원라인 명령어로 비번도 입력 필요
![](/images/9c81bc7c-eab6-4b5c-a1ef-ea8f6f4b3384-image.png)

### SOLUTION

해당 명령어로 원라인 비번 입력 필요
```bash
echo '암호' | sudo -S service haproxy restart
# 설정에서 조정 필요 
ulimit -n 
```
---

## mariadb

### PROBLEM
마리아DB 5.5 (EOL) 버전 centos7에 설치 필요 
공식 사이트 및 왠만한 미러에서는 통합 설치 rpm 없음. 
결국 개별적으로 LIB 찾아서 설치가 필요함.

### SOLUTION
mariadb 5.5 설치에 필수적인 lib 받아서 로컬 설치 및 설치시 root 사용자 전환할 수 없는 세팅이어서 수동으로 권한 부여함. 
```bash
# 미러에서 받기
sudo wget http://mirror.centos.org/centos/7/os/x86_64/Packages/mariadb-libs-5.5.68-1.el7.x86_64.rpm
sudo wget http://mirror.centos.org/centos/7/os/x86_64/Packages/mariadb-server-5.5.68-1.el7.x86_64.rpm
sudo wget http://vault.centos.org/7.9.2009/os/Source/SPackages/mariadb-5.5.68-1.el7.src.rpm

# 설치 
sudo yum localinstall mariadb-libs-5.5.68-1.el7.x86_64.rpm
sudo yum localinstall mariadb-server-5.5.68-1.el7.x86_64.rpm
sudo yum localinstall mariadb-5.5.68-1.el7.x86_64.rpm

mysql --help | grep my.cnf
sudo vi /etc/my.cnf
```
---

### PROBLEM
마리아DB 서비스 시작시 각종 오류 발생. 예) mysql already in location 
### SOLUTION
해당 폴더에 있는 내용 백업 폴더 만들어서 이동시킴 
```bash
kdir /var/lib/mysql_bk && mv /var/lib/mysql/* /var/lib/mysql_bk
sudo mkdir /DATA/mysql_bk_20220824 && sudo mv /DATA/mysql/* /DATA/mysql_bk_20220824
sudo touch /var/log/mysqld.log
sudo chown mysql:mysql /var/log/mysqld.log
sudo chcon system_u:object_r:mysqld_log_t:s0 /var/log/mysqld.log

sudo systemctl start mariadb.service
```
---

### PROBLEM
마리아 DB 백업 및 복원 필요
### SOLUTION
zip 백업, 데이터베이스 백업 방식
```bash
# 백업
sudo mysqldump -u dbuser -p --all-databases --lock-all-tables | gzip -c > dbdump.zip
mysqldump -u dbuser -p --max_allowed_packet=1G --single-transaction --quick --lock-tables=false --routines --triggers data >./data20220816.sql
# 단일 테이블
mysqldump -u dbuser -p --max_allowed_packet=1G --single-transaction --quick --lock-tables=false --routines --triggers data TABLE_NAME  > /home/directory/backup/data-TABLE_NAME20220816.sql 

# 복원
mysql -u dbuser -p data < /home/directory/backup/data20220824.sql 
```
---
### PROBLEM
권한 또는 암호 이슈로 DB 사용 불가
### SOLUTION
권한 부여 
```sql
GRANT ALL privileges on dbuser.* to 'dbuser'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'localhost'@'%'; # 전체 권한 

# 설정된 암호 확인 및 변경시
# bash
mysql -u root mysql
# mysql
# 1 사용자 정보 확인
SELECT user,authentication_string,plugin,host FROM mysql.user;
# 2 수정
UPDATE mysql.user SET authentication_string = PASSWORD('NEW_USER_PASSWORD')
WHERE User = 'user-name' AND Host = 'localhost';
FLUSH PRIVILEGES;
# 3 수정된 정보 확인
SELECT user,authentication_string,plugin,host FROM mysql.user;
# 4 재시작
# bash
sudo systemctl restart mariadb.service
```
---

### SOLUTION

### PROBLEM
5.5 -> 10으로 업데이트시 발생 문제 
	- mysql_upgrade 명령 실행시 다수 테이블에서 REPAIR 필요 문제 발생 
		- --auto-repair all-databases 실행했을 때도 정상 작동하지 않음 table corruption 
	- 이후 database 전체 날리고 dump 받은 .sql 복원 시도시 
		- connection my.cnf 안늘리면 복원 안되는 문제 -> connection 늘림 
			- 커넥션 늘리고 복원 시도시 Can't create table `data`.`TABLENAME` (errno: 150 "Foreign key constraint is incorrectly formed")
			- 해당 문제 원인 확인 필요 
				1. 데이터 타입이 같은가
				2. NOT NULL or NULL 여부가 동일 한가
				3. 참조받는 데이터가 unique key / primary key 인가
				4. 두 테이블의 charset 이 같은가
### SOLUTION
가이드에 따른 DB 업글. table_upgrade 에러시 기존 database안 에 있는 내용은 전부 삭제 후 upgrade 돌리고 sql문으로 백업. FkPK 오류시 순서 조정 또는 데이터 우선 맞추는 거 확인. 그리고 최종 보류로 FK 일시 해제 후 삽입 

---

### PROBLEM
centos7 파일에 일부 내용 텍스트 파일에 추출 필요

### SOLUTION
&> 사용
```bash
 grep -rnw '.log20220824.sql' -e 'ab' &> temp.txt
```

### PROBLEM
MYSQL DB 락 이슈 발생
### SOLUTION
락 이슈 확인.
단기 해결. 
장기 해결책은 락 발생 시점, 명확한 원인 확인 필요 
```
show engine innodb status;
SHOW PROCESSLIST;
KILL proceeID;

```

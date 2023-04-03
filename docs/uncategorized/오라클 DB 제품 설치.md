---
title: "오라클 DB 제품 설치"
description: "https&#x3A;//edelivery.oracle.com/osdc/faces/SoftwareDelivery;jsessionid=Z8KxnLfHl3BNIKwUy8obX5PTF_taN-ChPBySprfrPHwLlKcbXQ4i!1966040717링크에서 다운"
date: 2021-12-13T02:27:10.359Z
tags: ["oracle"]
---

https://edelivery.oracle.com/osdc/faces/SoftwareDelivery;jsessionid=Z8KxnLfHl3BNIKwUy8obX5PTF_taN-ChPBySprfrPHwLlKcbXQ4i!1966040717

링크에서 다운

### Create SwapFile
```
# https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-centos-7
free -m

https://support.hpe.com/hpesc/public/docDisplay?docId=kc0101061ko_kr&docLocale=ko_KR


### count 1000 , blocksize=1M = 1G 파일생성 
### ADD
free -m
mkdir -p /var/swap
sudo dd if=/dev/zero of=/var/swap/swapfile count=10000 bs=1M
sudo chmod 600 /var/swap/swapfile
ls -lh /var/swap/swapfile
sudo mkswap /var/swap/swapfile
sudo swapon /var/swap/swapfile

### REMOVE
sudo swapoff -v /var/swap/swapfile

Next, remove the swap file entry /swapfile swap swap defaults 0 0 from the /etc/fstab file.
vi /etc/fstab

sudo rm /var/swap/swapfile
```

### REQ XMING
XMING.exe 열어둬야함!
https://sourceforge.net/projects/xming/files/latest/download

![](/images/4fa59895-6786-45ae-99b6-cd4073042cfe-image.png)

### Allow powertool if xclock does not work
```
dnf config-manager --enable PowerTools
sudo yum install xorg-x11-apps
yum --enablerepo=PowerTools list xorg-x11-apps
xclock

```
![](/images/75e6f5ec-d499-446e-b6b5-ff616849f715-image.png)

### JDK 설치 필수
```
yum list java*jdk-devel
yum install -y java-1.8.0-openjdk-devel.x86_64
java -version
vi /etc/profile
JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.el6_9.x86_64

```

### ./runInstaller 에러
Check if some JDK is installed in your system:

$ java -version
Installing JDK 7 solved my problem:

$ sudo apt-get install openjdk-7-jre-headless
If the problem persists, log as root, then execute:

$ xhost +
Switch back to another user and run installation again.

![](/images/a7ac9937-8d50-4b00-86af-83523a5fc9a0-image.png)

리눅스에 Oracle을 설치시에 ./runInstaller 를 실행하였는데

display 변수가 설정되어 있는지 확인하십시오

라는 에러가 나올 시에 root 계정에서 su - oracle 로 접속하지말고
일반 사용자 계정에서 su - oracle로 접속 후에 실행하면 된다.


![](/images/9c6fdc65-71b7-49be-9904-c5c8883c3365-image.png)

### Install SQLPLUS
Navigate to Instant Client Downloads for Linux x86-64 (64-bit)

Download these zip files:

instantclient-basic-linux.x64-12.2.0.1.0.zip
instantclient-sqlplus-linux.x64-12.2.0.1.0.zip
Make dir for instant client then unzip zips

 mkdir -p /opt/oracle
 unzip -d /opt/oracle instantclient-basic-linux.x64-12.2.0.1.0.zip
 unzip -d /opt/oracle instantclient-sqlplus-linux.x64-12.2.0.1.0.zip
The file listing of that dir should now look like

 $ cd /opt/oracle/instantclient_12_2 && find . -type f | sort
 ./adrci
 ./BASIC_README
 ./genezi
 ./glogin.sql
 ./libclntshcore.so.12.1
 ./libclntsh.so.12.1
 ./libipc1.so
 ./libmql1.so
 ./libnnz12.so
 ./libocci.so.12.1
 ./libociei.so
 ./libocijdbc12.so
 ./libons.so
 ./liboramysql12.so
 ./libsqlplusic.so
 ./libsqlplus.so
 ./ojdbc8.jar
 ./sqlplus
 ./SQLPLUS_README
 ./uidrvci
 ./xstreams.jar
Set the LD_LIBRARY_PATH and PATH env vars in your ~/.bashrc

 export LD_LIBRARY_PATH=/opt/oracle/instantclient_12_2:$LD_LIBRARY_PATH
 export PATH=$LD_LIBRARY_PATH:$PATH
Source your ~/.bashrc

 source ~/.bashrc
Run sqlplus -V to confirm it’s installed
https://zwbetz.com/install-sqlplus-on-linux/

### TNS ERROR
ADD to ~/.bash_profile

export ORACLE_BASE=/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/12.1.0/dbhome_1

export TNS_ADMIN=$ORACLE_HOME/network/admin
export ORACLE_SID=orcl

export NLS_LANG=AMERICAN_AMERICA.AL32UTF8
export LD_LIBRARY_PATH=$ORACLE_HOME
export PATH=$ORACLE_HOME/bin

// Apply
source ~/.bash_profile
### CONNECT
sqlplus / as sysdba
sqlplus /nolog
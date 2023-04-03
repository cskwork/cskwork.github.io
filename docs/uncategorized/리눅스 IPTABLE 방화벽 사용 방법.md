---
title: "리눅스 IPTABLE 방화벽 사용 방법"
description: "iptables -D INPUT -s 발신지 --sport 발신지 포트 -d 목적지 --dport 목적지 포트 -j 정책iptables -D INPUT -s 발신지 --sport 발신지 포트 -d 목적지 --dport 목적지 포트 -j 정책1초동안 80포트에 똑같은 I"
date: 2022-02-26T10:42:23.602Z
tags: []
---
위치 : cat /etc/sysconfig/iptables

## 방화벽 자동 초기화 기초 스크립트 1
```bash
#! /bin/bash
iptables -F
iptables -X

echo ssh 허용
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

echo http and https 허용
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

echo pop, imap and smtp 허용
iptables -A INPUT -p tcp --dport 25 -j ACCEPT
iptables -A INPUT -p tcp --dport 465 -j ACCEPT
iptables -A INPUT -p tcp --dport 143 -j ACCEPT
iptables -A INPUT -p tcp --dport 993 -j ACCEPT
iptables -A INPUT -p tcp --dport 587 -j ACCEPT
iptables -A INPUT -p tcp --dport 110 -j ACCEPT
iptables -A INPUT -p tcp --dport 995 -j ACCEPT

echo icmp 허용
iptables -A INPUT -p icmp -j ACCEPT

echo local 허용
iptables -A INPUT -s 127.0.0.1 -j ACCEPT

echo 기존에 연결된 연결은 유지 
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT

echo 그외 트래픽은 거절 
iptables -A INPUT -j REJECT
iptables -A FORWARD -j REJECT

# 설정을 저장 /sbin/service 
iptables save 

# 설정한 내용을 출력 
iptables -L -v
```

## 방화벽 자동 초기화 기초 스크립트 2
```bash
#!/bin/bash # 
iptables 설정 자동화 스크립트 

# 입맛에 따라 수정해서 사용합시다. 
iptables -F # TCP 포트 22번을 SSH 접속을 위해 허용 

# 원격 접속을 위해 먼저 설정합니다 
iptables -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT 

# 기본 정책을 설정합니다 
iptables -P INPUT DROP 
iptables -P FORWARD DROP 
iptables -P OUTPUT ACCEPT 

# localhost 접속 허용 
iptables -A INPUT -i lo -j ACCEPT 

# established and related 접속을 허용 
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT 

# Apache 포트 80 허용 
iptables -A INPUT -p tcp --dport 80 -j ACCEPT 

# 설정을 저장 /sbin/service 
iptables save 

# 설정한 내용을 출력 
iptables -L -v
```

## 방화벽 자동 초기화 심화 스크립트 
```bash
#!/bin/bash
# A sample firewall shell script 
IPT="/sbin/iptables"
SPAMLIST="blockedip"
SPAMDROPMSG="BLOCKED IP DROP"
SYSCTL="/sbin/sysctl"
BLOCKEDIPS="/root/scripts/blocked.ips.txt"
 
# Stop certain attacks
echo "Setting sysctl IPv4 settings..."
$SYSCTL net.ipv4.ip_forward=0
$SYSCTL net.ipv4.conf.all.send_redirects=0
$SYSCTL net.ipv4.conf.default.send_redirects=0
$SYSCTL net.ipv4.conf.all.accept_source_route=0
$SYSCTL net.ipv4.conf.all.accept_redirects=0
$SYSCTL net.ipv4.conf.all.secure_redirects=0
$SYSCTL net.ipv4.conf.all.log_martians=1
$SYSCTL net.ipv4.conf.default.accept_source_route=0
$SYSCTL net.ipv4.conf.default.accept_redirects=0
$SYSCTL net.ipv4.conf.default.secure_redirects=0
$SYSCTL net.ipv4.icmp_echo_ignore_broadcasts=1
#$SYSCTL net.ipv4.icmp_ignore_bogus_error_messages=1
$SYSCTL net.ipv4.tcp_syncookies=1
$SYSCTL net.ipv4.conf.all.rp_filter=1
$SYSCTL net.ipv4.conf.default.rp_filter=1
$SYSCTL kernel.exec-shield=1
$SYSCTL kernel.randomize_va_space=1
 
echo "Starting IPv4 Firewall..."
$IPT -F
$IPT -X
$IPT -t nat -F
$IPT -t nat -X
$IPT -t mangle -F
$IPT -t mangle -X
 
# load modules
modprobe ip_conntrack
 
[ -f "$BLOCKEDIPS" ] && BADIPS=$(egrep -v -E "^#|^$" "${BLOCKEDIPS}")
 
# interface connected to the Internet 
PUB_IF="eth0"
 
#Unlimited traffic for loopback
$IPT -A INPUT -i lo -j ACCEPT
$IPT -A OUTPUT -o lo -j ACCEPT
 
# DROP all incomming traffic
$IPT -P INPUT DROP
$IPT -P OUTPUT DROP
$IPT -P FORWARD DROP
 
if [ -f "${BLOCKEDIPS}" ];
then
# create a new iptables list
$IPT -N $SPAMLIST
 
for ipblock in $BADIPS
do
   $IPT -A $SPAMLIST -s $ipblock -j LOG --log-prefix "$SPAMDROPMSG "
   $IPT -A $SPAMLIST -s $ipblock -j DROP
done
 
$IPT -I INPUT -j $SPAMLIST
$IPT -I OUTPUT -j $SPAMLIST
$IPT -I FORWARD -j $SPAMLIST
fi
 
# Block sync
$IPT -A INPUT -i ${PUB_IF} -p tcp ! --syn -m state --state NEW  -m limit --limit 5/m --limit-burst 7 -j LOG --log-level 4 --log-prefix "Drop Sync"
$IPT -A INPUT -i ${PUB_IF} -p tcp ! --syn -m state --state NEW -j DROP
 
# Block Fragments
$IPT -A INPUT -i ${PUB_IF} -f  -m limit --limit 5/m --limit-burst 7 -j LOG --log-level 4 --log-prefix "Fragments Packets"
$IPT -A INPUT -i ${PUB_IF} -f -j DROP
 
# Block bad stuff
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags ALL FIN,URG,PSH -j DROP
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags ALL ALL -j DROP
 
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags ALL NONE -m limit --limit 5/m --limit-burst 7 -j LOG --log-level 4 --log-prefix "NULL Packets"
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags ALL NONE -j DROP # NULL packets
 
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags SYN,RST SYN,RST -j DROP
 
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags SYN,FIN SYN,FIN -m limit --limit 5/m --limit-burst 7 -j LOG --log-level 4 --log-prefix "XMAS Packets"
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags SYN,FIN SYN,FIN -j DROP #XMAS
 
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags FIN,ACK FIN -m limit --limit 5/m --limit-burst 7 -j LOG --log-level 4 --log-prefix "Fin Packets Scan"
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags FIN,ACK FIN -j DROP # FIN packet scans
 
$IPT  -A INPUT -i ${PUB_IF} -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j DROP
 
# Allow full outgoing connection but no incomming stuff
$IPT -A INPUT -i ${PUB_IF} -m state --state ESTABLISHED,RELATED -j ACCEPT
$IPT -A OUTPUT -o ${PUB_IF} -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
 
# Allow ssh
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 22 -j ACCEPT
 
# Allow http / https (open port 80 / 443)
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 80 -j ACCEPT
#$IPT -A INPUT -o ${PUB_IF} -p tcp --destination-port 443 -j ACCEPT
 
# allow incomming ICMP ping pong stuff
$IPT -A INPUT -i ${PUB_IF} -p icmp --icmp-type 8 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
#$IPT -A OUTPUT -o ${PUB_IF} -p icmp --icmp-type 0 -m state --state ESTABLISHED,RELATED -j ACCEPT
 
# Allow port 53 tcp/udp (DNS Server)
$IPT -A INPUT -i ${PUB_IF} -p udp --dport 53 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
#$IPT -A OUTPUT -o ${PUB_IF} -p udp --sport 53 -m state --state ESTABLISHED,RELATED -j ACCEPT
 
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 53 -m state --state NEW,ESTABLISHED,RELATED  -j ACCEPT
#$IPT -A OUTPUT -o ${PUB_IF} -p tcp --sport 53 -m state --state ESTABLISHED,RELATED -j ACCEPT
 
# Open port 110 (pop3) / 143
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 110 -j ACCEPT
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 143 -j ACCEPT
 
##### Add your rules below ######
#
# 
##### END your rules ############
 
# Do not log smb/windows sharing packets - too much logging
$IPT -A INPUT -p tcp -i ${PUB_IF} --dport 137:139 -j REJECT
$IPT -A INPUT -p udp -i ${PUB_IF} --dport 137:139 -j REJECT
 
# log everything else and drop
$IPT -A INPUT -j LOG
$IPT -A FORWARD -j LOG
$IPT -A INPUT -j DROP
 
exit 0
```


## 🎨 현재 방화멱 설정 전체 확인
iptables -D INPUT -s [발신지] --sport [발신지 포트] -d [목적지] --dport [목적지 포트] -j [정책]
```bash
iptables -L

# 방화벽 설정 초기화
iptables -F
# 기본정책을 ACCEPT 로 설정 
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT

# To list all IPv4 rules :
sudo iptables -S
# To list all IPv6 rules :
sudo ip6tables -S
# To list all tables rules :
sudo iptables -L -v -n | more
# To list all rules for INPUT tables :
sudo iptables -L INPUT -v -n
sudo iptables -S INPUT
```

## 방화벽 규칙 추가
iptables -D INPUT -s [발신지] --sport [발신지 포트] -d [목적지] --dport [목적지 포트] -j [정책]

```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
## 22 번 포트 패킷 입장 허용

iptables -A INPUT -s 192.168.0.111 -j DROP
# 소스 ip가 192.168.0.111 인 접속의 모든 접속 포트를 막아라.

iptables -A INPUT -p icmp -s 127.0.0.1 -j DROP
# INPUT 사슬에 출발지 주소가 127.0.0.1(-s 127.0.0.1) 인 icmp 프로토콜(-p icmp) 패킷을 거부(-j DROP)하는 정책을 추가(-A)하라

iptables -A INPUT -p tcp --dport 23 -j DROP
# INPUT 사슬에 목적지 포트가 23번(--dport23)인 tcp 프로토콜(-p tcp) 패킷을 거부하는(-j DROP)규칙을 추가(-A) 하라.

iptables -A INPUT -p tcp --dport :1023 -j DROP
# INPUT 사슬에 목적지 포트번호가 1023번 보다 작은 모든 포트(--dport :1023)인 tcp프로토콜(-p tcp)패킷을 거부하는(-j DROP)규칙을 추가(-A)하라

iptables -I INPUT -p tcp --dport 21 -j ACCEPT
# ftp포트를 열어라

iptables -I INPUT -s 192.168.0.0/255.255.255.0 -p udp --dport 143 -j ACCEPT
# imap 서비스를 방화벽에서 열어라

iptables -I INPUT -p tcp --dport 80 -j ACCEPT
# 웹서버 방화벽 열어라

iptables -R INPUT 2 -p tcp --dport 8880 -j ACCEPT
# 웹서버 포트 80 -> 8880으로 교체하라( 웹서비스 포트 변경시 /etc/services 에서도 변경 해줘야 함 )

cat domain-access_log |awk '{print $1}'|sort |uniq |awk '{print "iptables -A INPUT -s "$1" -j DROP"}'|/bin/bash
# domain-access_log 파일에 있는 모든 ip의 모든 접속 포트를 막아라(DOS공격 방어시 사용)
```

##  방화벽 규칙 제거
```bash
iptables -D INPUT -s 127.0.0.1 -p icmp -j DROP
## 규칙 삭제 
```

## 패킷 요청 조절
1초동안 80포트에 똑같은 IP가 10번 이상의 SYN가 들어오면 드랍시킨다.
 (즉, 정상적인 요청이 아닌 웹서비스 공격으로 간주하여 요청패킷을 폐기시켜 응답하지 않도록 한다.)
```bash
iptables -A INPUT -p tcp --dport 80 -m recent --update --seconds 1 --hitcount 10 --name HTTP -j DROP
```



## IPTABLE 설정 저장
```
service iptables save
# /etc/sysconfig/iptables 에 저장됨

1 save
iptables-save > /etc/iptables.rules
2 restore
iptables-restore < /etc/iptables.rules
3 부팅시 자동 restore
cat EOF >> /etc/network/interfaces pre-up iptables-restore < /etc/iptables.rules pst-down iptables-save -c > /etc/iptables.rules EOF
```

## 심화 사용 예제

외부에서 192.168.0.30:80 으로 HTTP 접속을 요청했을 때

```bash
iptables -t mangle -A PREROUTING -i eth0 -j TEE --gateway 192.168.0.1 
# mangle 의 PREROUTING 에서 TEE 를 이용해 eth0 80포트로 들어오는 내용을 gateway 192.168.0.1 로 미러링

iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-port 8080 
# nat 의 PREROUTING 에서 DNAT 하여 dport 80 를 8080으로 변경

iptables -F INPUT 
iptables -P DROP 
# filter 에서는 INPUT chain 을 default DROP 한 다음 user-defined chain 전체를 순회 등록

iptables -N user-before-input-logging 
# user-before-input-logging : chain 만 생성하고 rule X

iptables -N user-before-input 
# user-before-input

iptables -N user-after-input 
iptables -N user-after-input-logging 
iptables -N user-reject-input 
iptables -N user-track-input 
iptables -N user-input-skip 
iptables -A INPUT -j user-before-input-logging 
iptables -A INPUT -j user-before-input 
iptables -A INPUT -j user-after-input 
iptables -A INPUT -j user-after-input-logging 
iptables -A INPUT -j user-reject-input 
iptables -A INPUT -j user-track-input 

iptables -A user-before-input -m conntrack --ctstate INVALID -j DROP 
# conntrack 이용해서 connection state가 INVALID 인 것은 LOG 하고 DROP
 
iptables -A user-before-input -p icmp -j ACCEPT 
# ICMP 프로토콜 ACCEPT

iptables -A user-before-input -p udp --sport 67 --dport 68 -j ACCEPT 
# UDP 프로토콜 sport 67 dport 68 ACCEPT

iptables -A user-before-input -p tcp -d 235.255.255.250/32 --dport 5353 -j ACCEPT 
# TCP 프로토콜 dst 235.255.255.250/32 의 dport 5353 ACCEPT

iptables -A user-after-input -p udp --dport 137 -j user-input-skip 
#  UDP 프로토콜 dport 136을 user-input-skip 으로 jump
iptables -A user-after-input -p tcp --dport 139 -j user-input-skip 
# TCP 프로토콜 dport 139를 user-input-skip 으로 jump
iptables -A user-after-input -m addrtype --dst-type BROADCAST -j user-input-skip 
# BROADCAST 타입을 user-input-skip 으로 jump

iptables -A user-after-input-logging -m limit --limit 3/min --limit-burst 10 -j LOG --log-prefix "[USERLIMIT BLOCK]" 
iptables -A user-track-input -p tcp -m conntrack --ctstate NEW -j ACCEPT 
iptables -A user-track-input -p udp -m conntrack --ctstate NEW -j ACCEPT 

iptables -A user-input-skip -j ACCEPT 
# user-input-skip, user-output-skip 모든 packet 을 ACCEPT
iptables -N user-output-redirect 
iptables -N user-output-block 
iptables -A user-output-redirect -d 192.168.0.0 -j REDIRECT --to-port 50080 
# dst가 192.168.0.0 또는 dport 가 8080 인 것은 127.0.0.1:50080으로 REDIRECT

iptables -A user-output-redirect --dport 8080 -j REDIRECT --to-port 50080 
iptables -A user-output-block -p icmp -m icmp --icmp-type 11 -j DROP 
# icmp-type이 11 인 것은 DROP

iptables -t mangle -A POSTROUTING -i eth0 -j TEE --gateway 127.0.0.1 
# mangle 의 POSTROUTING 에서 TEE 를 이용해 local loopback 으로 미러링

iptables -t nat -A POSTROUTING -s 127.0.0.1 --sport 80 -o eth1 -j MASQUERADE --to-port 8080
# nat 의 POSTROUTING 에서 src가 local loopback 이고 sport 80인 것을 output interface eth1 의 src IP, sport 8080으로 Masquerade 하여 전송

```

## 이슈 대응
- 체인 순서는 무조건 중요하다. ACCEPT가 되어 있어서도 상단에 이미 해당 ip/port를 막았으면 적용되지 않는다. 그런 경우 -I로 넣었는지 확인

## 이론
### 필터 테이블
리눅스 서버 : 웹사이트를 호스팅하는 서버
- INPUT : 외부에서 리눅서 서버로
- FORWARD : 리눅스 서버를 경유해서 다른 곳으로 감
- OUTPUT : 리눅스 서버에서 외부로 나감.

### 상태값
ESTABLISHED 기존 연결의 일부
NEW 새로운 연결 요청 패킷
RELATED 기존 연결에 속하지만 새로운 연결 요청
INVALID 연결 추적표 어디에도 없는 것. 
DROP 연결하려는 대상이 비어있다고 표시. 응답하지 않음. timeout 발생. 
REJECT 는 reject-with icmp-port-unreachable. LAN 에서는 reject 사용. reject response 발생 

### 규칙 추가
-s (--source) 출발지 IP
-d (--destination) 목적지 IP
-p (--protocol) 특정 프로토콜 
-i (--in-interface) 입력 인터페이스
-o (--out-interface) 출력 인터페이스 
-t (--table) 처리될 테이블
-j (--jump) 규칙에 맞는 패킷을 어떻게 처리할지 명시 

-A (--append) 새로운 규칙 하단에 추가
-I (--insert) 새로운 규칙 최상단에 추가 
-P (--policy) 기본정책 변경
-L (--list) 규칙 출력 
-D (--delete) 구칙 삭제 
-R (--replace) 새로운 규칙 교체 
-F (--flush) 체인의 모든 규칙 삭제 
-C (--check) 패킷 테스트 
-X (--delete-chain) 비어 있는 체인 삭제

### NAT 테이블의 역할
- PREROUTING : 패킷이 INPUT 규칙으로 가기 전 ip, port를 변경
- INPUT : 필터 테이블과 동일하게 작동하지만 먼저 실행된다
- OUTPUT : 위와 ㅁ마찬가지
- POSTROUTING : 패킷이 OUTPUT 규칙에서 나온 후 ip, port를 변경함. 

### Masquerade
- 리눅스 네트워크 기능으로 공유기와 유사한 역할
- 게이트웨이 장치를 거쳐 외부로 나가는 패킷의 출발지 주소를 게이트웨이 장치에 있는 공인 IP주소로 변경 

## IPTABLE - CentOS 설치 및 확인
```
# Switch to Root
sudo -i
# Check iptable
cat /etc/sysconfig/iptables
# Install iptable
yum install iptables-services
```
## 출처 
https://yurmu.tistory.com/31  
https://linuxstory1.tistory.com/entry/iptables-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%B0%8F-%EC%98%B5%EC%85%98-%EB%AA%85%EB%A0%B9%EC%96%B4
https://webdir.tistory.com/170

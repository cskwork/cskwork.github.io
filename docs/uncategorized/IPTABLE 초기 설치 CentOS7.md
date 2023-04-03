---
title: "IPTABLE 초기 설치 CentOS7"
description: "CentOS 8은 2021 12월 부로 EOL(end of life) 더 이상 동일한 방식으로 업데이트가 안된다.Connection timed out : 연결 자체가 성립이 안됩. 즉 방화벽에 막히는 경우Connection refused : 연결을 거절했거나 서비스가 "
date: 2022-02-27T12:46:44.132Z
tags: []
---
- CentOS 8은 2021 12월 부로 EOL(end of life) 더 이상 동일한 방식으로 업데이트가 안된다.
- 기본 서비스 설정은 하단에 있는 방법을 사용해도 무난하다. 단 ubuntu, docker 등 사용시 chain 규칙이 달라질 수 있으니 다시 확이 필요하다.
- 꼭 필요시 iptables를 쓰고 그렇지 않으면 좀 더 직관적이고 쉬운 firewalld 사용을 권장한다. 

## 초기 설치
```bash
# 1 Switch to Root
sudo -i
# 2 Check Iptable
yum install iptables-services
# 3 Check iptable
iptables -L -v

# Check LISTEN
netstat -nap |grep ESTABLISHED
netstat -nap |grep LISTEN

# Reject 로 나머지는 거부
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT

# Reject 이후 추가시 -A 사용하지 말고 -I 사용
iptables -I INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
```

## 네트워크 관련 주의
Connection timed out : 연결 자체가 성립이 안됩. 즉 방화벽에 막히는 경우
Connection refused : 연결을 거절했거나 서비스가 아예 없다.

## iptable에 등록된 명칭의 port를 파일에서 찾기
```bash
grep 'domain' /etc/services
iptables -nL
```

## iptables.sh 파일 생성해서 설정 후 실행
```bash
# Check IPT == $IPT
IPT="/sbin/iptables"
SPAMLIST="blockedip"
SPAMDROPMSG="BLOCKED IP DROP"
SYSCTL="/sbin/sysctl"
BLOCKEDIPS="/root/iptableScripts/blocked.ips.txt"
 
# Stop certain attacks
echo "Setting sysctl IPv4 settings..."
$SYSCTL net.ipv4.ip_forward=0
#  ICMP Redirect 차단(발송 패킷 차단)
$SYSCTL net.ipv4.conf.all.send_redirects=0
$SYSCTL net.ipv4.conf.default.send_redirects=0
#  ICMP Redirect 차단(허용 패킷 차단)
$SYSCTL net.ipv4.conf.all.accept_source_route=0
$SYSCTL net.ipv4.conf.all.accept_redirects=0
$SYSCTL net.ipv4.conf.all.secure_redirects=0
$SYSCTL net.ipv4.conf.all.log_martians=1
# IP 소스 라우팅(source routing) 차단
$SYSCTL net.ipv4.conf.default.accept_source_route=0
$SYSCTL net.ipv4.conf.default.accept_redirects=0
$SYSCTL net.ipv4.conf.default.secure_redirects=0
$SYSCTL net.ipv4.icmp_echo_ignore_broadcasts=1
#$SYSCTL net.ipv4.icmp_ignore_bogus_error_messages=1
# TCP SYN Flooding 공격 차단
$SYSCTL net.ipv4.tcp_syncookies=1
$SYSCTL net.ipv4.conf.all.rp_filter=1
$SYSCTL net.ipv4.conf.default.rp_filter=1
# $SYSCTL kernel.exec-shield=1
# $SYSCTL kernel.randomize_va_space=1
 
echo "필터 초기화..."
$IPT -F
$IPT -X
#$IPT -t nat -F
#$IPT -t nat -X
#$IPT -t mangle -F
#$IPT -t mangle -X
 
# load modules
modprobe ip_conntrack

[ -f "$BLOCKEDIPS" ] && BADIPS=$(egrep -v -E "^#|^$" "${BLOCKEDIPS}")
 
# interface connected to the Internet 
PUB_IF="eth0"
 
#Unlimited traffic for loopback
$IPT -A INPUT -i lo -j ACCEPT
$IPT -A OUTPUT -o lo -j ACCEPT

echo "BLOCK IP LIST DROP"
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

echo "SET TRAFFIC RULES"
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
 
# allow incomming ICMP ping pong stuff
$IPT -A INPUT -i ${PUB_IF} -p icmp --icmp-type 8 -m state --state ESTABLISHED,RELATED -j ACCEPT
$IPT -A OUTPUT -o ${PUB_IF} -p icmp --icmp-type 0 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
 
# Allow port 53 tcp/udp (DNS Server)
$IPT -A INPUT -i ${PUB_IF} -p udp --dport 53 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
$IPT -A OUTPUT -o ${PUB_IF} -p udp --sport 53 -m state --state ESTABLISHED,RELATED -j ACCEPT
 
# Open port 110 (pop3) / 143
# $IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 110 -j ACCEPT
# $IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 143 -j ACCEPT

# Allow ssh
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 22 -j ACCEPT
 
# Allow http / https (open port 80 / 443)
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 80 -j ACCEPT
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 443 -j ACCEPT

echo "SET ADDITIONAL Policy ..."
##### 규칙 추가 ######

# 여기서 추가 또는 -I insert로 따로 추가
# 외부에서 연결
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 8080 -j ACCEPT
$IPT -A INPUT -i ${PUB_IF} -p tcp --destination-port 3306 -j ACCEPT


# 스크립트 파일 밖에서 추가시 
# iptables -I INPUT -p tcp --dport 110 -j ACCEPT 
##### 규칙 완료 ############

echo "SET LOG RULES ..."
# Do not log smb/windows sharing packets - too much logging
$IPT -A INPUT -p tcp -i ${PUB_IF} --dport 137:139 -j REJECT
$IPT -A INPUT -p udp -i ${PUB_IF} --dport 137:139 -j REJECT
 
# log everything else and drop
$IPT -A INPUT -j LOG
$IPT -A FORWARD -j LOG
# $IPT -A INPUT -j DROP

echo "DROP TRAFFIC"
# DROP all incomming traffic
# $IPT -P INPUT DROP
# $IPT -P OUTPUT DROP
# $IPT -P FORWARD DROP

echo "그외 트래픽은 거절" 
# iptables -A INPUT -j REJECT
# iptables -A FORWARD -j REJECT
```

## 용어
Bootp : TCP/IP상에서 자동 부팅을 위한 최초의 표준프로토콜이다.
53 서버 : 아마존 DNS 사용시 오픈 필요 
## 출처
https://techlog.gurucat.net/273 [하얀쿠아의 이것저것 만들기 Blog]
https://bash.cyberciti.biz/firewall/linux-iptables-firewall-shell-script-for-standalone-server/
---
title: "IPTABLE 규칙 전체 확인"
description: ""
date: 2021-04-12T02:10:36.556Z
tags: []
---
```bash
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
---
title: "아이폰 PWA 문제"
description: "안드로이드는 PWA 설치도 잘되고 그냥 모든 게 잘됐다.근데 아이폰은이걸 참고해서 외부 링크로 연결하는 설정도 해봤고https&#x3A;//sosohancoder.tistory.com/26이걸 참고해서 ubuntu 에 익명 ftp도 설치했는데 pwa가 사파리에서 그냥 "
date: 2021-04-22T08:24:38.304Z
tags: []
---
### 🧨 아이폰 서비스워커 작동 X
안드로이드는 PWA 설치도 잘되고 그냥 모든 게 잘됐다.
근데 아이폰은
이걸 참고해서 외부 링크로 연결하는 설정도 해봤고
https://sosohancoder.tistory.com/26

이걸 참고해서 ubuntu 에 익명 ftp도 설치했는데 pwa가 사파리에서 그냥 안먹힌다. 
https://www.burndogfather.com/201

우선 문제는 BeforeInstallPromptEvent 함수 자체가 호출이 불가해서 안되는 것 같다. 제거하고 해봐야된다. 
https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent

이외에도... 다른 함수로 대체.. 등 여러가지 방법을 써봤는데... 좀 더 찾아봐야겠다.
참고할 문서
https://jakearchibald.github.io/isserviceworkerready/


우선 익명 FTP 설치 전 SW 문제가 사파리에서 해결된 후 함수로 외부 링크 연결 방식으로 잘되면 굳이 사용할 필요 없다. 그래도 익명 FTP 서버 올리는 방법은 나중에도 써먹을 수 있으니까 적어본다.

하단에 익명 FTP 설치방법 설명...

### 😎 Ubuntu 익명 FTP 설치 방법
```bash
# Ubuntu 기준
cat ~/.bash_history # 과거에 사용한 명령어 확인

sudo apt-get install vsftpd
echo "vsftpd test file" | sudo tee /var/ftp/pub/test.txt
sudo nano /etc/vsftpd.conf

sudo systemctl restart vsftpd
sudo systemctl status vsftpd

sudo chown -R ftp:ftp /var/ftp

sudo ufw allow from any to any proto tcp port 10100:10110

```

### 🎇 설치 테스트 
```bash
ftp -p ipv4addr
Name (ipv4addr:21:ftp): ftp
# bad ip connect는 pasv_promiscuous=YES 한줄
ls
cd pub
get test.txt
```

- 참고로 chrome, Edge에서는 ftp:// 패시브 모드로 URL 디렉토리 조회가 불가하다. IE에서는 아직 가능! 
- 그래서 filezilla 우선 테스트를한 후 IE로도 테스트 해보는 걸 권장합니다. filzilla 고급 설정에서 전송 모드를 능동형 또는 수동형으로 변경 가능합니다.

### /etc/vsftpd.conf
```bash
#------
#
# Point users at the directory we created earlier.
# Bad IP Connect Issue
pasv_promiscuous=YES
anon_root=/var/ftp/
#
# Stop prompting for a password on the command line.
no_anon_password=YES
#
# Show the user and group as ftp:ftp, regardless of the owner.
hide_ids=YES
#
# Limit the range of ports that can be used for passive FTP
pasv_enable=YES
pasv_min_port=10100
pasv_max_port=10110
pasv_address=3.35.86.137
#-----
# Run standalone?  vsftpd can run either from an inetd or as a standalone
# daemon started from an initscript.
listen=YES
listen_ipv6=NO

# Allow anonymous FTP? (Disabled by default).
anonymous_enable=YES
#
# Uncomment this to allow local users to log in.
local_enable=NO
# Make sure PORT transfer connections originate from port 20 (ftp-data).
connect_from_port_20=YES

utf8_filesystem=YES

```


### 참고
https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-for-anonymous-downloads-on-ubuntu-16-04


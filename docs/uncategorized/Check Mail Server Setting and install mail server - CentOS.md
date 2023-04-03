---
title: "Check Mail Server Setting and install mail server - CentOS"
description: "Check if the mail server is installed:Check the main configuration file for the mail server:Verify the listen address and port:Referencehttps&#x3A;//c"
date: 2023-01-30T00:57:40.998Z
tags: []
---
### Check if the mail server is installed:

Check the main configuration file for the mail server:
```
cat /etc/postfix/main.cf

# domain name
grep "mydomain" /etc/postfix/main.cf

```
Verify the listen address and port:
```
grep "inet_interfaces" /etc/postfix/main.cf
grep "inet_protocols" /etc/postfix/main.cf

```

### Install mail server
```
sudo yum install postfix

sudo systemctl start postfix
sudo systemctl enable postfix
postfix check
```

### Check Log for Client - > Mail Server Connection
```bash
cat /var/log/maillog
```

### For server relay
```bash
mynetworks = 0.0.0.0/0 # ALL
```

### Check certificate
```
openssl s_client -showcerts -cert /etc/postfix/ssl/server.crt -key /etc/postfix/ssl/server.key -starttls smtp -CAfile /etc/ssl/certs/cacert.pem -connect localhost:25
```


Reference
https://chat.openai.com/chat

https://www.linuxbabe.com/redhat/run-your-own-email-server-centos-postfix-smtp-server
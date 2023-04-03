---
title: "PostFix - CentOS Mail server"
description: "Check if the mail server is installed:Check the main configuration file for the mail server:Verify the listen address and port:Referencehttps&#x3A;//c"
date: 2023-01-30T00:57:40.998Z
tags: ["postfix"]
---
## Config Check
```
cat /etc/postfix/main.cf

# domain name
grep "mydomain" /etc/postfix/main.cf

```
## Network Check
```
grep "inet_interfaces" /etc/postfix/main.cf
grep "inet_protocols" /etc/postfix/main.cf

```

## Install
```
sudo yum install postfix

sudo systemctl start postfix
sudo systemctl enable postfix
postfix check
```

## Log Check
```bash
cat /var/log/maillog
# Mail Sent Check
grep -i 'to=your_email@example.com' /var/log/maillog
```

## Server Relay (Low Security)
```bash
mynetworks = 0.0.0.0/0 # ALL
```

## Check SSL
```

# Verify Valid Cert
openssl x509 -in /etc/postfix/ssl/server.crt -text -noout

# main.cf
smtpd_tls_key_file = /etc/postfix/ssl/server.key
smtpd_tls_cert_file = /etc/postfix/ssl/server.crt
```

## Config No SSL
```bash
# General settings
myhostname = mail.example.com
mydomain = example.com
myorigin = $mydomain
inet_interfaces = all
inet_protocols = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain

# Mailbox settings
home_mailbox = mail/

# Network settings
mynetworks = 0.0.0.0/0

# SASL settings
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_security_options = noanonymous
broken_sasl_auth_clients = yes
smtpd_sasl_auth_enable = no

# Recipient restrictions
smtpd_recipient_restrictions = permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination

# TLS settings (disabled)
smtpd_use_tls = no
smtp_tls_security_level = none
smtpd_tls_security_level = none
```

## Test Send Mail
```bash
echo "This is a test email." | sendmail -v -f -s host@domain hostIP:hostPORT recipient@mail.com
```

## Reference
https://chat.openai.com/chat

https://www.linuxbabe.com/redhat/run-your-own-email-server-centos-postfix-smtp-server
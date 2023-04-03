---
title: "Change the time zone of your CentOS system to Seoul - timedatectl"
description: "change ntpd to seoul korea timeTo change the time zone of your CentOS system to Seoul, Korea time, you can use the "timedatectl" command.First, you ca"
date: 2023-01-27T06:30:47.014Z
tags: []
---

change ntpd to seoul korea time
To change the time zone of your CentOS system to Seoul, Korea time, you can use the "timedatectl" command.

First, you can check the current time zone of your system with:

```bash
timedatectl status
```
To change the time zone of your system to Seoul, Korea time, you can use the following command:

```bash
timedatectl set-timezone Asia/Seoul
```
This will change the time zone of your system to the Seoul, Korea time zone.

Once you have changed the time zone, you can use the "ntpdate" command to synchronize the time with an NTP server in the new time zone.

```bash
ntpdate 0.kr.pool.ntp.org
```
Or you can use ntpd service as I mentioned before.

You can check the current time with the "date" command, to make sure that the time is correct.

```bash
date
```
Once you have verified that the time is correct, you can restart the ntpd service to ensure that it is using the correct time zone.

```bash
systemctl restart ntpd
```
Please note that, you may need to reboot the system to completely apply the timezone changes.

To apply to this mariaDB you may have to restart mariaDB.
```sql
select now();
```


### Reference

https://chat.openai.com/chat
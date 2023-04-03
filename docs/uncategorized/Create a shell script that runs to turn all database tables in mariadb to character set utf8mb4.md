---
title: "Create a shell script that runs to turn all database tables in mariadb to character set utf8mb4"
description: "https&#x3A;//chat.openai.com/chat"
date: 2023-01-30T06:46:32.980Z
tags: []
---
```bash
#!/bin/bash

# specify the database name
db_name="data"

# list all the tables in the database
tables=$(mysql -u root -p"password" -D $db_name -e "SHOW TABLES;" | awk '{print $1}' | grep -v "^Tables")

# loop through each table and convert it to utf8mb4
for table in $tables; do
  mysql -u root -p"password" -D $db_name -e "ALTER TABLE $table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
done

# verify the change
mysql -u root -p"password" -D $db_name -e "SELECT TABLE_NAME,TABLE_COLLATION FROM information_schema.TABLES WHERE TABLE_SCHEMA = '$db_name';"
```

### Reference
https://chat.openai.com/chat
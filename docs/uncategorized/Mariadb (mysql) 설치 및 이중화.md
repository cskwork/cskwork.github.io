---
title: "Mariadb (mysql) 설치 및 이중화"
description: "masterslave"
date: 2023-01-19T03:12:36.603Z
tags: []
---
## MariaDB 설치
```bash
# Add the MariaDB repository to your system
sudo tee /etc/yum.repos.d/mariadb.repo <<EOF
[mariadb]
name = MariaDB
baseurl = https://tw1.mirror.blendbyte.net/mariadb/yum/10.4/centos7-amd64
gpgkey=https://tw1.mirror.blendbyte.net/mariadb/yum/RPM-GPG-KEY-MariaDB
gpgcheck=1
EOF

# Install MariaDB
sudo yum install MariaDB-server MariaDB-client

# Start the MariaDB service
sudo systemctl start mariadb

# Enable the MariaDB service to start on boot
sudo systemctl enable mariadb 

#  mysql_secure_installation script to secure your MariaDB installation
sudo mysql_secure_installation

sudo mysql -u root

mysql -V
```

## MariaDB 이중화
/etc/my.cnf
master
```bash
# CLIENT #
port                           = 3306
socket                         = /var/lib/mysql/mysql.sock

# MyISAM #
key_buffer_size                = 32M
myisam_recover_options         = FORCE,BACKUP

# SAFETY #
max_allowed_packet             = 16M
max_connect_errors             = 1000000
skip_name_resolve
sql_mode                       = STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
sysdate_is_now                 = 1
innodb                         = FORCE

# DATA STORAGE #
datadir                        = /var/lib/mysql/

# BINARY LOGGING #
log_bin                        = /var/log/mysql/mariadb-bin
expire_logs_days               = 14
sync_binlog                    = 1

# CACHES AND LIMITS #
tmp_table_size                 = 32M
max_heap_table_size            = 32M
query_cache_type               = 0
query_cache_size               = 0
max_connections                = 500
thread_cache_size              = 50
open_files_limit               = 5000
table_definition_cache         = 4096
table_open_cache               = 4096

# INNODB #
innodb_flush_method            = O_DIRECT
innodb_log_files_in_group      = 2
innodb_log_file_size           = 128M
innodb_flush_log_at_trx_commit = 1
innodb_file_format=barracuda
innodb_file_per_table          = 1
innodb_large_prefix = "ON"
innodb_file_format=barracuda
innodb_buffer_pool_size        = 8G

# LOGGING #
log_error                      = /var/log/mariadb/mariadb-error.log
slow_query_log                 = 1
slow_query_log_file            = /var/log/mariadb/mariadb-slow.log
long_query_time                = 10
log-queries-not-using-indexes

# REPLICATION #
server_id                      = 1
log_bin                        = /var/log/mariadb/mariadb-bin
log_slave_updates              = 1
relay_log                      = /var/log/mariadb/mariadb-relay
relay_log_recovery             = 1
```

slave
```bash
[mariadb]
# CLIENT #
port                           = 3306
socket                         = /var/lib/mysql/mysql.sock

# MyISAM #
key_buffer_size                = 32M
myisam_recover_options         = FORCE,BACKUP

# SAFETY #
max_allowed_packet             = 16M
max_connect_errors             = 1000000
skip_name_resolve
sql_mode                       = STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,                                                                                                                                                                                                                                             NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
sysdate_is_now                 = 1
innodb                         = FORCE

# DATA STORAGE #
datadir                        = /var/lib/mysql/

# BINARY LOGGING #
log_bin                        = /var/log/mysql/mariadb-bin
expire_logs_days               = 14
sync_binlog                    = 1

# CACHES AND LIMITS #
tmp_table_size                 = 32M
max_heap_table_size            = 32M
query_cache_type               = 0
query_cache_size               = 0
max_connections                = 500
thread_cache_size              = 50
open_files_limit               = 5000
table_definition_cache         = 4096
table_open_cache               = 4096

# INNODB #
innodb_flush_method            = O_DIRECT
innodb_log_files_in_group      = 2
innodb_log_file_size           = 128M
innodb_flush_log_at_trx_commit = 1
innodb_file_format=barracuda
innodb_file_per_table          = 1
innodb_large_prefix = "ON"
innodb_file_format=barracuda
innodb_buffer_pool_size        = 8G

# LOGGING #
log_error                      = /var/log/mariadb/mariadb-error.log
slow_query_log                 = 1
slow_query_log_file            = /var/log/mariadb/mariadb-slow.log
long_query_time                = 10
log-queries-not-using-indexes

# REPLICATION #
server_id                      = 2
read_only # 슬레이브 readonly
log_bin                        = /var/log/mariadb/mariadb-bin
log_slave_updates              = 1
relay_log                      = /var/log/mariadb/mariadb-relay
relay_log_recovery             = 1
```

REPLICATE SERVER
MASTER
```sql
CREATE USER 'replication_user'@'%' IDENTIFIED BY 'hostPasssword';
GRANT REPLICATION SLAVE ON *.* TO 'replication_user'@'%';
SHOW MASTER STATUS;
UNLOCK TABLES; # release data lock on table 
```

SLAVE
```sql
CHANGE MASTER TO
  MASTER_HOST='HOST_IP',
  MASTER_USER='replication_user',
  MASTER_PASSWORD='hostPasssword',
  MASTER_PORT=3306,
  MASTER_LOG_FILE='mariadb-bin.000020',
  MASTER_LOG_POS=1025,
  MASTER_CONNECT_RETRY=10;
START SLAVE;
SHOW SLAVE STATUS \G;  

sudo systemctl restart mariadb
sudo systemctl status mariadb
```

Increase ulimit
```bash
ulimit -n
cat /etc/security/limits.conf
sudo vi /etc/security/limits.conf
```

Give Log path Auth
```bash
groups
chmod 755 /var/log/mariadb/
chown mysql:mysql /var/log/mariadb/

cat /lib/systemd/system/mariadb.service
systemctl daemon-reload
```
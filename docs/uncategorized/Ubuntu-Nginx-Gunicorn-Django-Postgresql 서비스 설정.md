---
title: "Ubuntu-Nginx-Gunicorn-Django-Postgresql 서비스 설정"
description: "Ubuntu 서버에 Nginx-Gunicorn-Django-Postgresql 스택으로 서비스 초기 설정하는 명령어 나열함."
date: 2021-04-11T11:41:33.444Z
tags: ["Nginx","PostgreSQL","django","gunicorn","ubuntu"]
---
# 1 목적
Ubuntu 서버에 Nginx-Gunicorn-Django-Postgresql 스택으로 서비스 초기 설정하는 명령어 나열함.

# 2 퀵

---

### 사용자 생성
```
sudo adduser useradmin 
sudo usermod -aG wheel useradmin
gpasswd -a admin wheel
sudo yum install epel-release
sudo yum install python-pip python-devel postgresql-server postgresql-devel postgresql-contrib gcc nginx

# TYPE  DATABASE        USER            ADDRESS                 METHOD
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
#host    all             all             127.0.0.1/32            ident
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
#host    all             all             ::1/128                 ident
host    all             all             ::1/128                 md5

sudo systemctl restart postgresql
sudo systemctl enable postgresql
sudo su - postgres
psql

#Make DB
CREATE DATABASE myproject;
CREATE USER myprojectuser WITH PASSWORD 'uniquepwd'; 
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
\qsu 

#Move to site 
mkdir ~/mainsite
cd ~/mainsite
python -m venv sitevirtualenv

sudo yum install python3-devel

#MUST ACTIVATE VIRTUAL ENV!!!
source mainsiteenv/bin/activate

#Install gunicorn
pip install django gunicorn psycopg2

#Start Django Project
django-admin.py startproject site ~/site

nano ~/mainsite/mainsite/settings.py
#Add Allowed_hosts, DB, static_root (port can be left empty) import os for static
```

---

### DB 설정
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'myproject',
        'USER': 'myprojectuser',
        'PASSWORD': 'uniquepwd',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```
---
```
#Switch user
#chown -R ec2-user /var/www/html

#init
~/mainsite/manage.py makemigrations
~/mainsite/manage.py migrate
~/mainsite/manage.py createsuperuser 
~/mainsite/manage.py collectstatic

#runserver with django server
~/mainsite/manage.py runserver 0.0.0.0:8000
cd ~/mainsite
#runserver with gunicorn - (no style because no static info applied)
gunicorn --bind 0.0.0.0:8000 ~//wsgi #

gunicorn --bind 0.0.0.0:80 mainsite.wsgi

gunicorn --bind 0.0.0.0:8000 wsgi
```

---

### Gunicorn 서비스 설정 (WSGI 역할)

```
sudo nano /etc/systemd/system/gunicorn.socket

-rw-r--r--  1 root root  355 Mar 17 09:34  gunicorn.service
-rw-r--r--  1 root root  112 Mar 15 13:43  gunicorn.socket

[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target

sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket

###### GUNICORN SERVICE SETTING ######

###### GUNICORN SERVICE SETTING ######
#Serve gunicorn as service
sudo nano /etc/systemd/system/gunicorn.service
#---------------------------
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=gcadmin
Group=www-data
WorkingDirectory=/home/projectlocation
ExecStart=/home/projectlocation/sitevirtualenv/bin/gunicorn \
         --access-logfile - \
         --workers 2 \
         --bind unix:/run/gunicorn.sock \
         mainsite.wsgi:application

[Install]
WantedBy=multi-user.target
#---------------------------
#Make gunicorn start on boot
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
#check status
sudo systemctl status gunicorn 
###### GUNICORN SERVICE SETTING ######

ls /home/site
#sudo journalctl -u gunicorn  #DEBUG LOGS
#Reload daemon and restart gunicorn
sudo systemctl daemon-reload
sudo systemctl restart gunicorn

```
---

### NGINX 설정

```
#Create nginx
sudo nano /etc/nginx/sites-available/mainsite

#---------------------------
server {
    listen 80;
    server_name ip;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/projectlocation;
    }

    location / {
        include psudo systemctl restart nginxoxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;

      --bind unix:/run/gunicorn.sock \
         mainsite.wsgi:application


    }
}
#---------------------------
sudo nano /etc/nginx/sites-available/mainsite
sudo nano /etc/nginx/nginx.conf

# Enable Site config.- with symbolic link (reference link
sudo ln -s /etc/nginx/sites-available/mainsite /etc/nginx/sites-enabled
sudo systemctl reload nginx

sudo ln -s /etc/nginx/sites-enabled/mainsite /etc/nginx/sites-available/mainsite 

```
---
#### 설정 테스트

```
sudo nginx -t
#Restart Nginx
sudo systemctl reload nginx
sudo systemctl restart nginx
###### NGINX SETTING ######
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl status gunicorn.socket

sudo systemctl restart gunicorn.service
sudo systemctl status gunicorn.service
sudo systemctl restart gunicorn.socket
sudo systemctl status gunicorn.socket

sudo systemctl status rqworker

#FINISHED
#ACCESS WEB WITH 80 PORT
http://ip/

#DEBUG
#Follow ErrorLog
sudo tail -F /var/log/nginx/error.log
sudo tail /var/log/nginx/error.log
sudo systemctl status postgresql
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo nginx -t && sudo systemctl restart nginx
sudo nginx -t && sudo systemctl reload nginx
```
---


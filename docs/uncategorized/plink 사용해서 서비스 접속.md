---
title: "plink 사용해서 서비스 접속"
description: " 서비스 shutdown  서비스 연결 "
date: 2022-01-26T14:52:52.175Z
tags: []
---

## 서비스 shutdown
```bash
while true; do
    read -p "서비스를 멈추시겠습니까?" yn
    case $yn in
        [Yy]* ) plink userId@puttySessionName -pw password '(cd /path/execute/;./stop.sh)'; break;;
        [Nn]* ) exit;;
        * ) echo "yn 으로 답해주세요.";;
    esac
done
pause
```
## 서비스 연결
```bash
plink userId@puttySessionName -pw password
```

### 회고
- curl sftp 로 bash, source 등 다양한 방법으로 서비스 재시작을 명령어로 처리하는 방법을 시도했지만 선언되 PATH를 연결해서 쓰지 못하거나 권한 문제에 걸려 작동하지 않았다.
- SSH의 경우는 시도 필요

---
title: "mysql-event schedule-delete-table"
description: ""
date: 2022-07-26T09:30:37.242Z
tags: []
---
```sql
-- CHECK MYSQL EVENT
show variables like 'event%';
-- SET EVENT ON
SET GLOBAL event_scheduler = ON;
-- SET EVENT FOR TABLE
CREATE EVENT IF NOT EXISTS `data`.`DELETE_3_MONTH_USERSESSSION_STAT`
ON SCHEDULE
EVERY 7 DAY -- or 1 HOUR
COMMENT '3개월 이상 지난 접속 기록은 삭제'
DO
BEGIN
	DELETE FROM `SCHEMA`.`TABLE` where REG_DT < NOW() - INTERVAL 3 MONTH ; 
END
```
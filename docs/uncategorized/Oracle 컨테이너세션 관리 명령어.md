---
title: "Oracle 컨테이너/세션 관리 명령어"
description: ""
date: 2022-01-26T08:43:00.226Z
tags: []
---
```sql
# Create USER
create user c##_sys identified by oracle container=all;

# Grant Privilege
grant sysdba to c##_sys container=all;
grant SYSOPER to c##_sys container=all;

grant sysdba to c##_sys container=current;
grant SYSOPER to c##_sys container=current;
alter session set container=PDBORCL;
GRANT CREATE SESSION TO c##_sys;
GRANT SELECT ON v$session TO c##_sys;
GRANT SELECT ON Dba_Tab_Privs TO c##_sys;
GRANT SELECT ON SYS.V_$SESSION TO c##_sys;
GRANT SELECT ON SYS.v_$sysaux_occupants  TO c##_sys;
GRANT SELECT ON SYS.v_$sesstat  TO c##_sys;
GRANT SELECT ON SYS.v_$statname  TO c##_sys;
GRANT SELECT ON SYS.v_$active_session_history  TO c##_sys;
GRANT SELECT ON SYS.V_$SQLAREA TO c##_sys;
GRANT SELECT ON SYS.V_$process TO c##_sys;

# Check Privilege 
select * from v$pwfile_users;
select name,open_mode,con_id from v$pdbs;

# Change Password
ALTER USER c##_sys IDENTIFIED BY newpassword;

# Go to CDB root
show con_name;
alter session set container=CDB$ROOT;

# Check Session 

select * from
(
select session_id, session_serial#, count(*)
from v$active_session_history
where session_state= 'ON CPU' and
sample_time >= sysdate - interval '10' minute
group by session_id, session_serial#
order by count(*) desc
);

select
   ss.username,
   se.SID,
   VALUE/100 cpu_usage_seconds
from
   v$session ss,
   v$sesstat se,
   v$statname sn
where
   se.STATISTIC# = sn.STATISTIC#
and
   NAME like '%CPU used by this session%'
and
   se.SID = ss.SID
and
   ss.status='ACTIVE'
and
   ss.username is not null
order by VALUE desc;

select * from
(select sql_text,
cpu_time/1000000 cpu_time,
elapsed_time/1000000 elapsed_time,
disk_reads,
buffer_gets,
rows_processed
from v$sqlarea
order by cpu_time desc, disk_reads desc
)
where rownum < 51;

SELECT count(*) FROM v$session;
SELECT count(*) FROM v$process;

```
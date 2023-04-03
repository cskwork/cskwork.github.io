---
title: "Git Merge GUI로 쉽게 하기 "
description: "http&#x3A;//meldmerge.org/ https&#x3A;//git-scm.com/downloads"
date: 2022-01-20T01:54:36.149Z
tags: []
---
### GIT GUI MERGE 도구 다운받기 
http://meldmerge.org/ 

### 다운받은 MELD를 gitconfig 에 등록하기 (GITBASH 사용) 
https://git-scm.com/downloads

```bash
git config --global merge.tool meld
git config --global mergetool.meld.path "C:\Program Files (x86)\Meld\Meld.exe" <- MELD 다운 경로
```

### Conflict Resolution 작업 진행
```bash
git pull
git mergetool
```
![](/images/43f2894c-2696-47f0-ab67-10506fff96f1-image.png)

### Merge 완료 후 
```bash
git commit
# :wq
```
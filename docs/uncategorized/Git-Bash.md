---
title: "Git-Bash"
description: "Show all git config  Edit git config  Edit with editor code = vscode subl = sublime  CRLF for Windows & Mac // 보낼 때 \r를 제거해서 보내고 받을 때 \r를 추가해준다. Windo"
date: 2021-09-23T12:11:48.147Z
tags: ["git"]
---
### 로컬에 있는 걸 리모트에 있는 코드로 완전교체
```bash
git fetch --all
git reset --hard origin/{branch name}
```

### Show all git config
``` bash
git config --list
```
![](/images/e51877f6-ee69-4e9b-9b2e-683acaaeae90-image.png)


### Edit git config
```bash
git config --global -e

# Set USER INFO
git config --global user.email "email@email.com"
git config --global user.name "userName"
```
![](/images/5c290231-b711-4161-8d4d-1a55d469c87c-image.png)

### Edit with editor
code = vscode 
subl = sublime
![](/images/7f5f7ed1-7f8e-4ffe-9b63-ef44b3f5095a-image.png)

### CRLF for Windows & Mac
// 보낼 때 \r를 제거해서 보내고 받을 때 \r를 추가해준다.
Window \r\n 

Mac \n

```bash
git config --global core.autocrlf true
git config --global core.autocrlf input
git config --list
```

### Init and Check Git Dir
``` bash
ls -al
git init
ls -al
start/open .git # Master Branch
rm -rf .git # Remove Git 
```

### Set alias for git command
``` bash
git config --global alias.stat status
```
![](/images/188cbe3d-1df9-4472-be89-b9b93ff8ece1-image.png)


## Git Explained
### stage 1 - working directory
- 현재 작업중인 환경

**종류**
- untracked
	- 새로 만들어서 git이 아직 추적하지 않은 파일
- tracked
	- git이 추적하는 파일
    - unmodified
    	- (이전 버전과 비교해서) 수정되지 않은 파일
    - modified
    	- 수정된 파일

### stage 2 - staging area
- 저장 준비를 위해 올려놓음
- commit으로 .git dir로 보관

### stage 3 - .git directory
- 파일을 버전(hashv) 별로 보관 
- checkout으로 원하는 버전을 working dir로 가져갈 수 있음 
- 서버에 push로 보내고 pull로 가져올 수 있다. 

### 트래킹하고 싶지 않은 git 파일
``` bash
echo *.log > .gitignore
```
  다양한 형식 가능 
  *.log
  build/*.log
  build/
  
### Check changes
```bash
git diff
git diff --staged
```
![](/images/a3f5e0a4-6c34-4623-bd4d-3efda41b1daf-image.png)
```
-1 +1 첫번째 줄 
- 삭제된 것 
+ 추가된 것
```


### Use Tool to check changes
``` bash
git config --global -e


.gitconfig add

[diff]
	tool = vscode
[difftool "vscode"]
	cmd = code --wait --diff $LOCAL $REMOTE
```
![](/images/c98e1fb1-e174-403f-85fc-2bd72d8a7d73-image.png)

### Commit
``` bash
git commit  ||
git commit -m "new msg"

git log

# Skip Staging area and commit
git commit -am "skip staging"
git status -s
```

#### Practice and Check
``` bash
echo hello world > a.txt
ls
echo hello world > b.txt
echo hello world > c.txt
ls
git status
git add a.txt
git status
git add *.txt
git status
git config --global core.autocrlf
echo change >> a.txt
git status
history
git rm --cached *
git status
git add *
git status
rm a.txt
git status
git add a.txt
git status -s # short A - add M - modified

```

### REF
https://git-scm.com/docs
https://www.youtube.com/watch?v=Z9dvM7qgN9s

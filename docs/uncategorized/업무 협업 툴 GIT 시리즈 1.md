---
title: "업무 협업 툴 GIT 시리즈 1"
description: "업무 협업할 때 사용하는 툴인데요. 프로젝트 파일 별로 쉽게 버전 관리가 (VCS- Version Control System) 가능해서 개발자중에서 git를 모르는 사람은 없을거에요. 우선 VCS가 뭔지 잠간 알아볼게요.VCS는 이 작업을 단순화 시키는 작업을 해줘요."
date: 2021-04-22T02:05:18.341Z
tags: ["git","github"]
---
### 😀 Git 란
업무 협업할 때 사용하는 툴인데요. 
프로젝트 파일을 쉽게 관리할 수 있어서 (VCS- Version Control System) 개발자들이 많이 사용하는 도구예요. (필자는 SVN을 사용했음) 우선 VCS가 무엇인지 잠깐 알아볼게요.

파일 시스템으로 작업을 하면 수정사항이 있을 때마다 파일명을 바꾸고 파일도 여러 번 만들면서 수동으로 전부 관리를 해야 하는데요. 버전관리시스템(VCS)를 사용하면 이러한 작업을 자동으로 해줘서 관리하기 편해져요.
![](/images/d5404be8-80ee-4b72-ad97-76f9ec65af65-image.png)
Github는 git + GUI + 공동으로 작업할 수 있는 환경이 추가됐다고 보면 될 거예요!
그리고 [GIT](https://git-scm.com/)라는 툴도 미리 받아두세요. 

### 😶 실습
#### Github에서 프로젝트를 이미 만들었을 경우
터미널에서 프로젝트 작업을 할 경로로 이동해서 git clone을 하면 되는데요 복사 링크는 프로젝트 디렉터리에서 화살표로 가리킨 버튼을 눌러서 주소를 그대로 갖고 오면 돼요!
![](/images/1de19801-b504-4aef-8b91-cd218ee85648-image.png)
```bash
# 복사한 주소 붙여넣어서 git clone 명령어 날리기
git clone https://github.com/복사된URL/file.git
```
복사가 끝났으면 git status로 현재 변경된 파일 상태 확인도 해보고 파일 수정을 완료한 후 하단에 있는 git add . 명령어를 날린 후 다시 git status로 확인을 하면 사진과 같이 나올 거예요. (git add, git status를 잘 모르겠으면 🦾 Git 명령어 섹션을 참고해주세요)
```bash
# add . 은 현재 경로에 있는 파일들을 가상 공간에 올려둔다는 의미에요.
git add .
```
![](/images/fe29af47-fca4-4453-bb4e-d5ed579f636a-image.png)
완성됐으면 다음에 날릴 명령어는
```bash
# -m : 동료를 위해서 어떤 작업을 했는지 간단하게 메시지도 추가해주기
git commit -m "ADDED BIZCARD"
git push
```
이런 식으로 나오면 정상적으로 git를 통해서 github에 소스를 보낸 거예요
![](/images/11f8fb9c-018c-4d51-bdce-77efe7201545-image.png)
(브라우저로 github에서 git 접속 승인이 필요할 수도 있어요. 로그인하고 승인해주시면 자동으로 처리가 될 거예요)


### 🦅 장점
 - 현재 버전으로 앱이 작동되지 않으면 이전 버전으로 복구할 수 있고요.
- 협업 & 분업이 쉽고요 : branch > merge
- 코드를 언제, 어디서, 누가 수정했는지 확인할 수 있어요.
- 최종본을 안전하게 보존하면서 작업할 수 있어요
- 그리고 각자 로컬(각자 컴퓨터)에서 수정하기 때문에 소스 코드가 충돌하는 현상을 예방할 수 있어요.

### 🦾 Git 명령어
- git init : 프로젝트 폴더에 .git 폴더를 생성, 초기화한다. 해당 폴더는 깃의 관리를 받게 된다고 생각하자.
- .gitignore : 숨김 파일로 존재한다. 깃에 올리지 않을 폴더나 파일들을 관리한다. 절대 올리지 않을 파일을 미리 작성해두자.
- git remote : 로컬 폴더와 git 레포지토리를 연결한다. (git remote add origin 깃레포경로.git)
- git status : git관리 하에 있는 폴더 안에서 변화가 있는 파일&폴더를 알려준다..
- git diff : 이전 커밋과 비교하여 어떻게 달라졌는지 확인할 수 있다.
- git log : 커밋 로그를 볼 수 있다. tig 설친 후 git tig 명령어를 통해 가독성을 올릴 수 있다.
- git add : 서버에 올리기 전 변경 점이 있는 파일을 stage에 올린다..
- git commit : 커밋하여 서버에 올릴 준비 완료
- git push : 커밋 내용을 서버로 보낸다.
- git pull : 서버의 내용을 로컬에 내려받는다.


### 참고 
https://velog.io/@hwang-eunji/Git-Github-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EB%B2%95%EC%97%90-%EB%8C%80%ED%95%B4
https://velog.io/@lerrybe/TIL-3-Git-%EC%B2%B4%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%8A%B8
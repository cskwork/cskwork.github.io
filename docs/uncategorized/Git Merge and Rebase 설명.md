---
title: "Git Merge and Rebase 설명"
description: "Merge : 여러 개의 브랜치를 하나로 모을 수 있습니다.변경 내용의 이력이 모두 그대로 남아 있기 때문에 이력이 복잡해짐.1 'bugfix' 브랜치의 이력은 'master' 브랜치의 이력을 모두 포함하고 있기 때문에2 'master' 브랜치는 단순히 이동하기만 해도"
date: 2023-02-24T00:54:10.305Z
tags: []
---
## Merge 
Merge : 여러 개의 브랜치를 하나로 모을 수 있습니다.
- 변경 내용의 이력이 모두 그대로 남아 있기 때문에 이력이 복잡해짐.
### Fast-forward Merge
![](/images/518788d5-53b3-4a2b-a744-864c5f507b4f-image.png)
1 'bugfix' 브랜치의 이력은 'master' 브랜치의 이력을 모두 포함하고 있기 때문에
2 'master' 브랜치는 단순히 이동하기만 해도 'bugfix' 브랜치의 내용을 적용할 수 있습니다. 
```bash
# 기본 3-way merge
git pull
# fast-forward merge
git pull --ff-only
#  ff-only 옵션 기본값으로 설정하기
git config pull.ff only
```
### Three- Way Merge
![](/images/4c8a90c7-6a19-40a9-a226-3ef7f18d02a5-image.png)

1 'bugfix' 브랜치를 분기한 이후에 'master' 브랜치에 여러 가지 변경 사항이 적용되는 경우도 있습니다. 
2 이 경우에는 'master' 브랜치 내의 변경 내용과 'bugfix' 브랜치 내의 변경 내용을 하나로 통합할 필요가 있습니다.
3 따라서 양쪽의 변경을 가져온 'merge commit(병합 커밋)'을 실행하게 됩니다. 
4 병합 완료 후, 통합 브랜치인 'master' 브랜치로 통합된 이력이 아래 그림과 같이 생기게 됩니다.

## Rebase
- 이력은 단순해지지만, 원래의 커밋 이력이 변경됨. 정확한 이력을 남겨야 할 필요가 있을 경우에는 사용하면 안됨.
![](/images/5d7701e6-8bc7-4685-8052-d14690412af6-image.png)

1 'bugfix' 브랜치를 'master' 브랜치에 rebase 하면
2 'bugfix' 브랜치의 이력이 'master' 브랜치 뒤로 이동하게 됩니다. 
3 그 때문에 그림과 같이 이력이 하나의 줄기로 이어지게 됩니다.
4 이 때 이동하는 커밋 X와 Y 내에 포함되는 내용이 'master'의 커밋된 버전들과 충돌하는 부분이 생길 수 있습니다. 
5 그 때는 각각의 커밋에서 발생한 충돌 내용을 수정할 필요가 있습니다.
6 'rebase'만 하면 아래 그림에서와 같이, 'master'의 위치는 그대로 유지됩니다. 
![](/images/9b84f00c-1068-44ed-8e4a-05231071ba27-image.png)

7 'master' 브랜치의 위치를 변경하기 위해서는 'master' 브랜치에서 'bugfix' 브랜치를 fast-foward(빨리감기) 병합 하면 됩니다.

```bash
git pull --rebase
```

![](/images/bade77e4-7387-4a83-89b7-8d919939eb4c-image.png)

## 출처
https://backlog.com/git-tutorial/kr/stepup/stepup1_4.html
---
title: "Docker 시작 3"
description: "여기까지만 하면 아쉽겠죠? 이제 앱을 수정하는 방법을 알아볼거에요.우선은 src/static/js/app.js에서 소스를 바꿔봐요. 개인적으로는 sublime text editor 를 선호하지만 VSCode, notepad++ 등 다른 에디터를 사용해도 괜찮아요. 수정"
date: 2021-04-20T13:35:13.784Z
tags: ["docker"]
---
### 😎 업데이트하기!
여기까지만 하면 아쉽겠죠? 이제 앱을 수정하는 방법을 알아볼 거예요.
우선은 src/static/js/app.js에서 소스를 바꿔봐요. 개인적으로는 [sublime text editor](https://www.sublimetext.com/3) 를 선호하지만 VSCode, notepad++ 등 다른 에디터를 사용해도 괜찮아요. 
```html
<!-- 수정 전 -->
<p className="text-center">No items yet! Add one above!</p>
<!-- 수정 후 -->
<p className="text-center">You have no todo items yet! Add one above!</p>
```

수정했으면 이제 빌드를 해볼까요?
```
docker build -t getting-started .
```
빌드가 끝났으면 실행해봅시다! 
```
docker run -dp 3000:3000 getting-started
```
![](/images/8002d255-74eb-45a6-a500-67349434733f-image.png)
### 😖 에러
앗 에러가 발생했는데요?

왜 그런 거냐면요.
우리가 전에 만들었던 컨테이너가 아직 실행 중이어서 그래요. 
예전 컨테이너가 포트 3000을 점유하고 있고 프로세스를 쓰고 있어요! 

그럼 어떻게 해야 할까요?

네 기존 컨테이너를 제거하면 되겠죠!
우선은 실행 중인 컨테이너의 프로세스 ID를 가져와 볼까요?
```
docker ps
```
다음엔 실행 중인 컨테이너를 멈춰봐요!
```
docker stop <the-container-id>
```
제 경우에는 아래와 같아서 캡쳐 이미지한 그대로 실행해서 멈췄어요. 멈춘 후에는 없어졌는지 docker ps로 한 번 더 확인해 봐야겠죠?
![](/images/bd9b95d7-a69c-4da3-954a-e988d55f6e02-image.png)
 
컨테이너를 멈췄으면 제거하는 것도 잊지 말고요
```
docker rm <the-container-id>
# 또는 docker desktop로 쓰레기통 아이콘을 눌러서 제거! 
```

이제 다시 실행!
```
docker run -dp 3000:3000 getting-started

# 다음
http://localhost:3000/
```

물론 저처럼 테스트 프로젝트를 두 개 만들었으면 프로세스를 하나 더 제거해야 할 수도 있어요! 방법은 위에서 이미 설명했음~

수정된 사항은 확인할 수 있을 거예요!

수고해서 시리 😺
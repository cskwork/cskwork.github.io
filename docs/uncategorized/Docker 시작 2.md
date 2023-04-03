---
title: "Docker 시작 2"
description: "Docker 공식 튜토리얼에서1\. Download the Zip 집 파일을 다운 받아서 압축을 풀어요.http&#x3A;//localhost/tutorial/our-application/2 폴더 경로로가서 Dockerfile 이라는 파일을 만들어요. package.j"
date: 2021-04-20T13:18:04.999Z
tags: ["docker"]
---
### 😋 최종 결과물
![](/images/074b7703-3186-4df1-8601-1be5f9e22b4e-image.png)

### 🐱 준비단계
Docker 공식 튜토리얼에서
1. Download the Zip 집 파일을 다운 받아서 압축을 풀어요.
http://localhost/tutorial/our-application/
2 폴더 경로로가서 Dockerfile 이라는 파일을 만들어요. package.json이 있는 동일한 경로에 만들면되요. 이때 확장자가 있으면 안됩니다. 
![](/images/7147bc4e-a9d7-44e6-9b4a-91b2da458628-image.png)
3 이 파일 안에는 아래에 있는 내용을 그대로 넣어주세요.
```
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```
4 다음엔 터미널에서 Dockerfile이 있는 경로로 가서 docker build해주면 됩니다.
```
docker build -t getting-started .
# 해석:
# -t : 컨테이너에 있는 이미지에 사람이 읽을 수 있는 언어를 부여한다. (getting-started)
# getting-started . : . 은 Dockerfile을 현재 경로에서 찾아야 한다고 명령한다.
```
5 결과물
![](/images/fa50712c-2d1e-4610-8dfe-28a792a607b9-image.png)

6 실행
이제 한번 실행을 해볼까요.
터미널에 아래의 명령어를 날려보세요.
```
docker run -dp 3000:3000 getting-started
```
그리고  http://localhost:3000 를 열면
앱이 보일거에요!

![](/images/c65c747b-03bd-4e3c-ba10-5382341efbb3-image.png)







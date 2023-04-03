---
title: "JS 이벤트 루프"
description: "자바스크립트 엔진은 싱글-쓰레드로 작동합니다. 동시에 여러가지 작업이 불가하다는 의미입니다. 일을 한번에 하나씩 밖에 못하는 직원을 생각하면 될거에요. 그 이상 주면 과부화가 걸리고요. 그래도 하나 처리하고 다음 거 처리하면서 순서대로 일할 수 있으니 맡겨주면 언젠간 "
date: 2021-04-23T00:52:47.260Z
tags: ["JavaScript"]
---
![](/images/6cf8fe35-574d-4ef8-bcfc-485248b39c16-image.png)

### 🧿 자바스크립트 엔진
자바스크립트 엔진은 싱글-쓰레드로 작동합니다. 동시에 여러 가지 작업이 불가하다는 의미입니다. 일을 한 번에 하나씩 밖에 못 하는 사원을 생각하면 될 거에요. (순차적으로 빠른 속도로 일을 처리하는 효율적인 직원이 아닐까요?🐱‍👤). 

그럼 뭐가 문제일까요?

브라우저가 로딩할 때 30초 정도 걸리는 일 (setTimeout)을 자바스크립트 엔진(사원)으로 보내면 사용자(고객사)는 30초 동안 다른 일은 못하고 계속 기다려야 해요 ㅠㅠ. 그럼 사이트를 누가 쓰겠어요 😒

그래서 자바스크립트 엔진은 도움이 필요해요!

### 🎉 Web API
웹 브라우저는 DOM API, setTimeout, HTTP request등의 Web API를 제공해서 자바스크립트 엔진이 더 효율적으로 일할 수 있는 환경을 만들어주는데요.

사용자가 브라우저를 누르고 html에 담겨있는 스크립트를 실행하면 어떤 일이 발생하냐면요. 스크립트 안에 담겨있는 함수가 자바스크립트 엔진의 일부인 콜 스택 (call stack)에 추가돼요. 콜스택은 프로그램이 사용할 메소드 정보를 보관하는 임시공간인데요. 상사가 부하직원에게 오늘 처리해야 할 서류를 책상 위에 하나씩 쌓는 이미지를 그리면 스택의 개념을 이해할 수 있어요. FILO (First in, last out) 즉 먼저 올려둔 서류는 가장 나중에 처리하는 거예요. 너무 바빠서 가장 위에 올려둔 서류부터 처리하는 직원. 기술 용어로는 push - 콜 스택에 밀어넣다 , pull - 콜 스택에서 빼낸다고 해요.

undefined

위에 있는 그림에서 respond 함수는 setTimeout 함수를 호출해요. setTimeout은 WEB API에서 제공이되고요. 자바스크립트 엔진에서는 메인 쓰레드로 하나씩 실행하지만, Web API는 메인쓰레드가 실행될 때 함수 호출을 대기하게 해서 업무가 지연되는 현상을 줄여줘요.

undefined

어떤 일이 일어나고 있냐면요. 
setTimeout 함수로 보낸 콜백 함수 () => { return 'Hey' } 는 웹 API 추가되고요. setTimeout 함수와 respond 함수는 콜 스택에서 pop 즉 이건 바로 처리할 업무가 아니어서 Web API에 넘겨줄 준비를 완료하면서 서류 뭉텅이 속에서 빠져나오게 돼요.

undefined

그럼 콜 스택에서 빠져나온 함수와 콜백 함수는 어떻게 되는 걸까요?

바로 Web API가 받게 되어요! Web API는 1초간 기다렸다가 콤백 함수를 다시 콜스택에 돌려주려는데요. 1초 후에 바로 보내주는 건 아니고 queue(큐) 에 먼저 보관해요. queue에서 콜스택(서류 덤이)에 있는 서류가 전부 처리될 때까지 기다리는 거예요. 서류가 전부 처리돼서 책상이 깨끗하면 사원에게 다시 업무를 줘야겠죠? 🙀  이때 이벤트 루프가 실행되는 거예요!

undefined

이벤트 루프는 콜백 queue와 콜스택을 번갈아 보면서 콜스택이 비어있으면 queue에 있는 첫 번째 문서를 콜 스택에 push를 해요. 그럼 콜 스택에서 일을 시작해요!

### 🦾 실습
위에 설명한 내용을 완벽하게 이해했으면 실습도 이해가 될 거에요! 내용 중 잘못 해석한 부분이 있으면 피드백 부탁드려요!

[코드펜 예제](https://codepen.io/cskwork/pen/OJWrpPm)

```html
<html>
  <body>
    
  </body>
<script>
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
p1.innerText="FIRST";
p2.innerText="SECOND";
p3.innerText="THIRD";

const foo = () => document.body.appendChild(p1);
const bar = () => setTimeout(() => document.body.appendChild(p2), 500);
const baz = () => document.body.appendChild(p3)

bar();
foo();
baz();
</script>
</html>

```
### 참고
https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
https://www.interviewcake.com/concept/java/call-stack


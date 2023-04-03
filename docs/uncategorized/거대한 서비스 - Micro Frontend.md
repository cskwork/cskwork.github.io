---
title: "거대한 서비스 -> Micro Frontend"
description: "React Monolithic SPA - Webpack 5 Technical StackMonorepo ( React, Typescript, Vite, Redux) 1 서비스 복잡도, FE 도메인 지식을 개인이 전부 습득 어려움2 서비스 오너십 부여 필요 3 또 하나의 "
date: 2022-11-27T09:50:14.793Z
tags: []
---
React Monolithic SPA - Webpack 5 

Technical Stack
Monorepo ( React, Typescript, Vite, Redux) 

### 문제
1 서비스 복잡도, FE 도메인 지식을 개인이 전부 습득 어려움
2 서비스 오너십 부여 필요 
3 또 하나의 레거시 생성 방지 
4 통합 , QA , 배포가 현재는 단일로 전체 빌드하는 방식임. 

가설
하나의 서비스만 따로 개발 -> 배포 가능하게 할 수 있을까 

Drive -> Test -> QA -> Prod
Mail -> Test -> QA -> Prod
Wiki -> Test -> QA -> Prod

### 도입 검토
1 Linked SPA
Web app (behavior) > Website (content) 가 중요한 서비스 및 서비스간 연계가 필요한 상황에서 맞지 않다고 판단됨
2 Unified SPA 
App Shell 이 메인이되고 각각의 하위 서비스로 routing 해주는 역할


### 서비스 개선에 사용된 책 
MicroFrontend 

Module Federation Plugins - remoteentity.js 사용을 해서 rounting 해결 
Router, page fragement 사용으로 비즈니스 로직을 숨기고 서비스간 연계
캐싱 이슈 발생 가능성이 있는데 url dating으로 해결 방안.

### 문제
공통 모듈 수정시 전체 영향을 받음. 
### 해결 
서비스간 전환시 Redux를 교체해서 new state에서 시작함 
Fragment에서 redux 사용할 때는 local state 
Common은 runtime시 변경하지 않고 complietime에 선택적으로 변경 
버전 각각 2개 씩 생성. 정책 수립 필요. 
중복 코드가 발생하지만 각각의 서비스에 대한 분리와 책임이 더 중요하다고 판단. 

---
title: "Clean Code"
description: "1 호출되는 함수를 호출하는 함수보다 나중에 배치. (신문 기사 처럼 중요한 개념 우선 배치 2 서술적임 함수/변수명 사용. 의도가 분명한 이름 짓기. 주석 없이 직관적으로 이해할 수 있게끔 이름에 존재 이유? 수행 기능? 사용 방법?에 대해 답변을 할 수 있는 이름이"
date: 2021-12-03T00:03:24.580Z
tags: []
---
# Bad code labels
## Bloaters
### Long Method
### Large Class
### Primitive Obsession
### Long Parameter List
### Data Clumps
- contain identical groups of variables
## Bloaters Treatment
### Extract Class
![](/images/d38dd5ab-c264-4fc7-ad90-3402b6eedd0f-image.png)
### Extract Subclass (SR)
![](/images/61c7cb06-38f1-4bdd-8ca4-175f933a262a-image.png)
### Extract Interface
![](/images/f2a977ac-68da-4955-b341-ad8a1ca0f691-image.png)
### Extract Method
![](/images/cc89d862-1fb0-439e-9e2f-2e43374da2d6-image.png)

### Parameter Objects
![](/images/a090b47c-323f-497e-8fa1-293add0d0708-image.png)

## Object-Oriented Abusers
### Switch Statements
### Temporary Field
### Refused Bequest
### Alternative Classes with Different Interfaces
## Object-Oriented Abusers Treatment
### Null checker
![](/images/cd68e3d6-9560-438b-a49b-a662c77a5108-image.png)
### Replace Conditionals with polymorphism
![](/images/4fd35bde-3039-4ebf-853f-a9849b6e1fb4-image.png)
### Replace Parameter with Explicit Methods
![](/images/d2a6644c-5e3d-4cdb-8285-6c3b5c8cb389-image.png)
### Extract Superclass
![](/images/1d18f4f3-bea7-4bc3-9ea6-280fd4e8f2eb-image.png)

## Change Preventers
## Dispensables
## Couplers

### 함수 생성 규칙
1 호출되는 함수를 호출하는 함수보다 나중에 배치. (신문 기사 처럼 중요한 개념 우선 배치 

2 서술적임 함수/변수명 사용. 의도가 분명한 이름 짓기. 주석 없이 직관적으로 이해할 수 있게끔 이름에 존재 이유? 수행 기능? 사용 방법?에 대해 답변을 할 수 있는 이름이어야 한다. 일관성 있고 검색하기 쉬운 이름 사용. 

3 함수의 인수 최소화

4 함수는 최대한 작게 만들기. 함수는 한 가지만 잘해야 한다. 

5 변수 선언은 사용하는 위치에 최대한 가까이

6 인스턴스 변수는 클래스 맨 처음에 선언 

### 불필요한 주석
1 함수나 변수를 설명하는 주석 (함수 변수명을 잘만들라) 

2 저자 소개 

3 주석으로 처리한 코드 

4 너무 많은 정보 

### TDD
유연성, 유지보수성, 재사용성 고려하기 
1 실패하는 단위 테스트 작성 전까지 실제 코드 작성 X

2 컴파일이 실패하지 않으면서 실행이 실패하는 정도의 단위 테스트 작성

3 현재 실패하는 테스트를 통과할 정도의 실제 코드 작성

프로그래밍은 과학보다 공예에 가깝다. 깨끗한 코드를 짜려면 지저분한(우선 돌아가는) 코드를 짠 뒤에 정리해야 한다. 

### REF 
Clean Code 로버트 C. 마틴

https://refactoring.guru/
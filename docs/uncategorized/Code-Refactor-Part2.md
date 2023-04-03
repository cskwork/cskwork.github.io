---
title: "Code-Refactor-Part2"
description: "Use of primitiescontain identical groups of variables1 호출되는 함수를 호출하는 함수보다 나중에 배치. (신문 기사 처럼 중요한 개념 우선 배치 2 서술적임 함수/변수명 사용. 의도가 분명한 이름 짓기. 주석 없이 직관적으로 "
date: 2022-09-21T23:06:36.807Z
tags: []
---
## Primitive Obsession
- Use of primitives instead of small objects for simple tasks (currency, ranges, phone numbers)
- Use of constants for coding info. (USER_ADMIN_ROLE = 1)
- Use of string constants as field names for use in data arrays.
-> Class may become huge and unwieldly. 

Problem
- Class contains data field.
![](/images/40aa2584-f9d0-4c8b-abb6-0fc27fc4f17c-image.png)

Solution (Replace Data Value With Object)
- Create a new class, place old field and its behavior in class, store the object of class in original class
![](/images/67ee0735-d80e-484b-8656-b9d68b3cc0df-image.png)

Problem 
- You have an array that contains various types of data
```java
String[] row = new String[2];
row[0] = "Liverpool";
row[1] = "15";
```

Solution (Replace Array with Object)
- Replace array with object that will have separate fields for each element
```java
Performance row = new Performance();
row.setName("Liverpool");
row.setWins("15");
```

Problem
- Repeating group of parameters
![](/images/9255ad8d-1747-49a8-8507-fb9bb191127a-image.png)


Solution
- Replace parameters with object
![](/images/98ffbcfc-f86a-483d-be3a-4f139409d0ae-image.png)


Problem
- Class has fields that contain type code. These types aren't used in operator and don't affect problem behavior
![](/images/5ae3f3ae-319e-495a-8eb8-56dc46417e88-image.png)

Solution
- Make new class and use its objects instead of type code values
undefined



### Long Parameter List
### Data Clumps
- contain identical groups of variables


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

4 함수는 최대한 작게 만들기. 함수는 한 가지만 잘해야 한다. 주석을 달아서 이해를 시키려는 함수면 보통은 함수가 너무 크다는 걸 수 있다. 

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

# REF 
Clean Code 로버트 C. 마틴

https://refactoring.guru/
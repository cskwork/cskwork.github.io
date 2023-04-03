---
title: "Creational Pattern-Builder(JPA 사용) "
description: "클라이언트 프로그램에서 팩토리 클래스를 호출할 때 Optional한 인자가 많아지면, 타입과 순서에 대한 관리가 어려워져 에러 발생 확률이 높아진다.경우에 따라 필요 없는 파라미터들에 대해서 팩토리 클래스에 일일이 NULL 값을 넘겨줘야한다.생성해야 하는 sub cla"
date: 2022-09-07T04:20:19.034Z
tags: []
---
### Main Problem
1. 클라이언트 프로그램에서 팩토리 클래스를 호출할 때 Optional한 인자가 많아지면, 
타입과 순서에 관리가 어려워져 에러 발생 확률이 높아진다.
2. 경우에 따라 필요 없는 파라미터에 대해서 팩토리 클래스에 일일이 NULL 값을 넘겨줘야한다.
3. 생성해야 하는 sub class가 무거워지고 복잡해짐에 따라 팩토리 클래스 또한 복잡해진다. 

### Problem 
불필요한 생성자 즉 필요 없는 파라미터에 대해선 NULL 값을 넘겨주고, 타입과 순서에 맞는 파라미터로 넘겨줄 때 
개발자가 잘못 넘겨주는 실수 발생 
### Solution 
- 불필요한 생성자를 만들지 않고 객체를 만든다.

여행 제목, 여행 출발 일, 몇박 며칠 동안 어디서 머물지, n일차에 할일을 기록하는 여행 항목 
```java 
/**
 * 여행 계획
 */
public class TourPlan {
    private String title; // 여행 제목
    private LocalDate startDate; // 출발 일
    private int nights; // 몇 박
    private int days; // 며칠
    private String whereToStay; // 어디서 머물지
    private List<DetailPlan> plans; // n일차 할 일
}
 
/**
 * n일차 할 일
 */
public class DetailPlan {
    private int day; // n일차
    private String plan; // 할 일
}
```
점층적 생성자 패턴을 적용해 생성자 오버라이딩으로  Optional 속성에 대한 구현 가능. 
단 코드가 엄청 많이지고 가독성이 떨어짐 
```java
/**
 * 기본 생성자 (필수)
 */
public TourPlan() {
}
 
/**
 * 일반적인 여행 계획 생성자
 *
 * @param title 여행 제목
 * @param startDate 출발 일
 * @param nights n박
 * @param days m일
 * @param whereToStay 머물 장소
 * @param plans n일차 할 일
 */
public TourPlan(String title, LocalDate startDate, int nights, int days,
    String whereToStay, List<DetailPlan> plans) {
    this.title = title;
    this.nights = nights;
    this.days = days;
    this.startDate = startDate;
    this.whereToStay = whereToStay;
    this.plans = plans;
}
 
/**
 * 당일치기 여행 계획 생성자
 *
 * @param title 여행 제목
 * @param startDate 출발 일
 * @param plans 1일차 할 일
 */
public TourPlan(String title, LocalDate startDate, List<DetailPlan> plans) {
    this.title = title;
    this.startDate = startDate;
    this.plans = plans;
}
```

### Solution_1
Lombok의 @AllArgsConstructor 에너테이션을 활용하면 코드가 길어지는 문제는 해결할 수 있지만, 여전히 인자가 많은 경우 타입과 순서로 발생할 수 있는 에러 가능성이 존재
```java 
// 순서를 파악이 어렵고, 가독성이 떨어진다.
new TourPlan("여행 계획", LocalDate.of(2021,12, 24), 3, 4, "호텔",
    Collections.singletonList(new DetailPlan(1, "체크인")));
    
// 생성자를 만들지 않고 당일치기 객체를 생성하면 불필요한 Null을 채워야한다.
new TourPlan("여행 계획", LocalDate.of(2021,12, 24), null, null, null,
    Collections.singletonList(new DetailPlan(1, "놀고 돌아오기")));
```

### Problem_1_1 
Solution_1 로 인해 순서 파악이 어렵고 가독성이 떨어지고 불필요한 null을 넘기는 현상 발생  

### Solution_1_1 
자바 빈 패턴 사용 
```java 
TourPlan tourPlan = new TourPlan();
tourPlan.setTitle("칸쿤 여행");
tourPlan.setNights(2);
tourPlan.setDays(3);
tourPlan.setStartDate(LocalDate.of(2021, 12, 24));
tourPlan.setWhereToStay("리조트");
tourPlan.addPlan(1, "체크인 이후 짐풀기");
tourPlan.addPlan(1, "저녁 식사");
tourPlan.addPlan(2, "조식 부페에서 식사");
tourPlan.addPlan(2, "해변가 산책");
tourPlan.addPlan(2, "점심은 수영장 근처 음식점에서 먹기");
tourPlan.addPlan(2, "리조트 수영장에서 놀기");
tourPlan.addPlan(2, "저녁은 BBQ 식당에서 스테이크");
tourPlan.addPlan(3, "조식 부페에서 식사");
tourPlan.addPlan(3, "체크아웃");
```

### Problem_1_1_1 
Problem_1_1 의 문제는 
1. 함수 호출이 인자만큼 이루어지고, 객체 호출 한번에 생성할 수 없다.
2. immutable 객체를 생성할 수 없다. (setter로 값 변경 가능)
   - 쓰레드간 공유 가능한 객체 일관성(consistency)이 일시적으로 깨질 수 있다.

### Solution_1_1_1 
- 필요한 객체를 직접 생성하는 대신, 먼저 필수 인자들을 생성자에 전부 전달하여 빌더 객체를 만든다.
- 그리고 선택 인자는 가독성이 좋은 코드로 인자를 넘길 수 있다.
- setter가 없으므로 객체 일관성을 유지하여 불변 객체로 생성할 수 있다.

인터페이스 
```java 
public interface TourPlanBuilder {
 
    TourPlanBuilder nightsAndDays(int nights, int days);
 
    TourPlanBuilder title(String title);
 
    TourPlanBuilder startDate(LocalDate localDate);
 
    TourPlanBuilder whereToStay(String whereToStay);
 
    TourPlanBuilder addPlan(int day, String plan);
 
    TourPlan getPlan();
}
```
빌더 
```java 
public class DefaultTourBuilder implements TourPlanBuilder {
 
    private String title;
 
    private int nights;
 
    private int days;
 
    private LocalDate startDate;
 
    private String whereToStay;
 
    private List<DetailPlan> plans;
 
    @Override
    public TourPlanBuilder nightsAndDays(int nights, int days) {
        this.nights = nights;
        this.days = days;
        return this;
    }
 
    @Override
    public TourPlanBuilder title(String title) {
        this.title = title;
        return this;
    }
 
    @Override
    public TourPlanBuilder startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }
 
    @Override
    public TourPlanBuilder whereToStay(String whereToStay) {
        this.whereToStay = whereToStay;
        return this;
    }
 
    @Override
    public TourPlanBuilder addPlan(int day, String plan) {
        if (this.plans == null) {
            this.plans = new ArrayList<>();
        }
 
        this.plans.add(new DetailPlan(day, plan));
        return this;
    }
 
    @Override
    public TourPlan getPlan() {
        return new TourPlan(title, startDate, days, nights, whereToStay, plans);
    }
}
```
객체 생성 (JPA 사용 기본)
```java 
return tourPlanBuilder.title("칸쿤 여행")
        .nightsAndDays(2, 3)
        .startDate(LocalDate.of(2020, 12, 9))
        .whereToStay("리조트")
        .addPlan(0, "체크인하고 짐 풀기")
        .addPlan(0, "저녁 식사")
        .getPlan();
```

### Source
https://www.tutorialspoint.com/design_pattern/builder_pattern.htm
https://dev-youngjun.tistory.com/197

---

java-design-creational pattern-builder-features-parameter management-Utilize contructors
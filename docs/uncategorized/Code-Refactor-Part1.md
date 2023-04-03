---
title: "Code-Refactor-Part1"
description: "1 호출되는 함수를 호출하는 함수보다 나중에 배치. (신문 기사 처럼 중요한 개념 우선 배치 2 서술적임 함수/변수명 사용. 의도가 분명한 이름 짓기. 주석 없이 직관적으로 이해할 수 있게끔 이름에 존재 이유? 수행 기능? 사용 방법?에 대해 답변을 할 수 있는 이름이"
date: 2021-12-03T00:03:24.580Z
tags: []
---
# Bad Code Labels
## Bloaters
### Long Method
- If you feel the need to comment on something inside the method, you probably should take this code and put it into a new method.

Problem
- Long method
```java
void printOwing() {
  printBanner();

  // Print details.
  System.out.println("name: " + name);
  System.out.println("amount: " + getOutstanding());
}
```
Solution
- Extract Method
```java
// Replace oldcode with a call to the method
void printOwing() {
  printBanner();
  printDetails(getOutstanding());
}

void printDetails(double outstanding) {
  System.out.println("name: " + name);
  System.out.println("amount: " + outstanding);
}
```

Problem
- Long method
```java
double calculateTotal() {
  double basePrice = quantity * itemPrice;
  if (basePrice > 1000) {
    return basePrice * 0.95;
  }
  else {
    return basePrice * 0.98;
  }
}
```

Solution
- Replace Temp with Query
```java
double calculateTotal() {
  if (basePrice() > 1000) {
    return basePrice() * 0.95;
  }
  else {
    return basePrice() * 0.98;
  }
}
double basePrice() {
  return quantity * itemPrice;
}
```

Problem
- Complex Conditional 
```java
if (date.before(SUMMER_START) || date.after(SUMMER_END)) {
  charge = quantity * winterRate + winterServiceCharge;
}
else {
  charge = quantity * summerRate;
}
```
Solution
- Decompose Conditional (into
```java
if (isSummer(date)) {
  charge = summerCharge(quantity);
}
else {
  charge = winterCharge(quantity);
}
```


### Large Class
- Bloated class

Problem
- one class two functions
![](/images/ae0d39d7-fbde-4347-a255-1d842794e453-image.png)

Solution
- Extract Class : (Be Situational about this)
![](/images/5e039f5e-fbe7-4ac5-979c-305efa9bac39-image.png)

Problem
- Class has features used only in certain cases
![](/images/ee136f56-18d6-4a7d-9012-ab4094f3ebdd-image.png)

Solution
- Extract Subclass :Create subclass and use it in different cases
![](/images/b4a8ab3b-4e77-46c3-a5ff-1d7f89cb89d3-image.png)

Problem
- Multiple clients are using same part of class interface. Part of interface in two classes is the same.
![](/images/c61532af-3437-40ca-a96d-00957009aeef-image.png)

Solution
- Extract Interface : Move the identitcal portion to its own interface
![](/images/e08a50a1-8f69-4ec7-8d10-bd27822224ba-image.png)

# REF
https://refactoring.guru/smells
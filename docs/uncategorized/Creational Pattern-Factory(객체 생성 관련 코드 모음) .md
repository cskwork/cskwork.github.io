---
title: "Creational Pattern-Factory(객체 생성 관련 코드 모음) "
description: "모듈 기능을 확장하거나 변경할 때 매번 핵심 코드를 수정해야한다.Product 생성자가 변경된 경우 각각의 User클래스에 있는 모든 Product객체의 생성자 변경 필요 수정이 필요한 부분과 수정이 필요하지 않은 부분을 구분. (Factory Pattern)객체 생성"
date: 2022-09-07T02:31:40.868Z
tags: []
---
### Problem
모듈 기능을 확장하거나 변경할 때 매번 핵심 
코드를 수정해야한다.

Product 생성자가 변경된 경우 각각의 User클래스에 있는 
모든 Product객체의 생성자 변경 필요 
```java
class Product {
	init(){}
}

class UserA{
	public func doMethod(){
		let p = Product{}
	}
}
class UserB{
	public func doMethod(){
		let p = Product{}
	}
}
```

### Solution
- 수정이 필요한 부분과 수정이 필요하지 않은 부분을 
구분. (Factory Pattern)
- 객체 생성에 쓰는 코드는 수정이 필요한 코드
- 해당 코드를 한 곳에서 관리 

Factory에 getInstance() 메소드 내부에 있는 Product 생성자만 바꾸면된다. 
```java
class Product {
	init(){}
}

class Factory{
	public static getInstance() -> Product{
		return Product();
	}
}

class UserA{
	public func doMethod(){
		let p = Factory.getInstance();
	}
}
```

### Problem 
- 객체 생성에 쓰는 코드를 별도의 클래스로 관리하고 있지만 
하나가 아닌 여러 객체에 대해 처리가 필요하다 

### Solution
- 인터페이스를 만들고 파라미터로 사용하려는 클래스를 받아서 분기 처리하고 
- 분기 처리된 조건에 따라서 필요한 객체를 돌려준다 

프로토콜 생성 
```js
protocol Shape {
    func draw()
}
```
클래스 생성 
```js
class Rectangle : Shape {
    func draw() {
        print("Inside Rectangle::draw() method")
    }
}
class Square : Shape {
    func draw() {
        print("Inside Square::draw() method")
    }
}
class Circle : Shape {
    func draw() {
        print("Inside Circle::draw() method")
    }
}
```
Factory(객체 생성관련 코드만 모은 곳) 
```js
class ShapeFactory {
    public func getShape(shapeType : String) -> Shape? {
        if shapeType == nil {
            return nil
        }
        if shapeType == "CIRCLE" {
            return Circle()
        }
        else if shapeType == "RECTANGLE" {
            return Rectangle()
        }
        else if shapeType == "SQUARE"{
            return Square()
        }
        return nil
    }
}
```
사용예제 
```js
let shapeFactory = ShapeFactory()

let shape1 = shapeFactory.getShape(shapeType: "CIRCLE")
shape1?.draw()

let shape2 = shapeFactory.getShape(shapeType: "RECTANGLE")
shape2?.draw()

let shape3 = shapeFactory.getShape(shapeType: "SQUARE")
shape3?.draw()
```

### Source
https://velog.io/@ellyheetov/Factory-Pattern

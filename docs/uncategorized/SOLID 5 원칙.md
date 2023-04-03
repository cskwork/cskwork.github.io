---
title: "SOLID 5 원칙"
description: "1 SRP (Single Responsibility Principle)한 클래스는 하나의 책임을 가져야 한다.SRP가 지켜지지 않은 코드ProductionUpdateService의 역할은 Product의 내용을 변경하는 책임을 호출하는 책임을 가지고 있습니다. 즉, u"
date: 2021-09-10T23:49:16.149Z
tags: ["Design Pattern","정보처리기사"]
---
## SRP (Single Responsibility Principle)
- 한 클래스는 하나의 책임을 가져야 한다.

### SRP 적용 전
``` java
public class Production {

    private String name;
    private int price;

    public Production(String name, int price) {
        this.name = name;
        this.price = price;
    }

    public void updatePrice(int price) {
        this.price = price;
    }
}


public class ProductionUpdateService {
    
    // Product의 내용을 변경하는 책임
    public void update(Production production, int price) {
        //validate price
        validatePrice(price);

        //update price
        production.updatePrice(price);
    }
	// 가격의 유효성 검증을 하는 validatePrice()는 ProductionUpdateService 의 책임이라고 볼 수 있을까 ???
    private void validatePrice(int price) {
        if (price < 1000) {
            throw new IllegalArgumentException("최소가격은 1000원 이상입니다.");
        }
    }

}
```
가격의 유효성을 검증하는 작업은 실제 가격의 정보를 바꾸는 Production의 책임으로 보는게 더 맞지 않을까? 

그럼 이를 토대로 유효성 검증이라는 책임을 Production로 옮겼다!!!

### SRP 적용 후
``` java
public class Production {

    private static final int MINIMUM_PRICE = 1000;

    private String name;
    private int price;

    public Production(String name, int price) {
        this.name = name;
        this.price = price;
    }

    public void updatePrice(int price) {
        validatePrice(price);
        this.price = price;
    }

    private void validatePrice(int price) {
        if (price < MINIMUM_PRICE) {
            throw new IllegalArgumentException(String.format("최소가격은 %d원 이상입니다.", MINIMUM_PRICE));
        }
    }
}

public class ProductionUpdateService {

    public void update(Production production, int price) {
        //update price
        production.updatePrice(price);
    }

}
```

## 2 OCP (Open-Closed Principle)
- 소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.

### OCP 적용 전
```java
public class Production {
    private String name;
    private int price;
    // N(일반) ,E(전자티켓) ,L(지역상품)...
    private String option;

    public Production(String name, int price, String option) {
        this.name = name;
        this.price = price;
        this.option = option;
    }

    public int getNameLength() {
        return name.length();
    }

    public String getOption() {
        return option;
    }
}

// 확장성이 제한적이고 쉬운 변경이(인터페이스 부재) 가능한 validator
public class ProductionValidator {
    public void validateProduction(Production production) throws IllegalArgumentException {

        if (production.getOption().equals("N")) {
            if (production.getNameLength() < 3) {
                throw new IllegalArgumentException("일반 상품의 이름은 3글자보다 길어야 합니다.");
            }
        } else if (production.getOption().equals("E")) {
            if (production.getNameLength() < 10) {
                throw new IllegalArgumentException("전자티켓 상품의 이름은 10글자보다 길어야 합니다.");
            }
        } else if (production.getOption().equals("L")) {
            if (production.getNameLength() < 20) {
                throw new IllegalArgumentException("지역 상품의 이름은 20글자보다 길어야 합니다.");
            }
        }

    }
}
```

### OCP 원칙 적용 후
``` java
public interface Validator {

    boolean support(Production production);

    void validate(Production production) throws IllegalArgumentException;

}

public class DefaultValidator implements Validator {
    @Override
    public boolean support(Production production) {
        return production.getOption().equals("N");
    }

    @Override
    public void validate(Production production) throws IllegalArgumentException {
        if (production.getNameLength() < 3) {
            throw new IllegalArgumentException("일반 상품의 이름은 3글자보다 길어야 합니다.");
        }
    }
}


public class ETicketValidator implements Validator {
    @Override
    public boolean support(Production production) {
        return production.getOption().equals("E");
    }

    @Override
    public void validate(Production production) throws IllegalArgumentException {
        if (production.getNameLength() < 10) {
            throw new IllegalArgumentException("전자티켓 상품의 이름은 10글자보다 길어야 합니다.");
        }
    }
}

public class LocalValidator implements Validator {
    @Override
    public boolean support(Production production) {
        return production.getOption().equals("L");
    }

    @Override
    public void validate(Production production) throws IllegalArgumentException {
        if (production.getNameLength() < 20) {
            throw new IllegalArgumentException("지역 상품의 이름은 20글자보다 길어야 합니다.");
        }
    }
}

public class ProductValidator {

    private final List<Validator> validators = Arrays.asList(new DefaultValidator(), new ETicketValidator(), new LocalValidator());

    public void validate(Production production) {
        Validator productionValidator = new DefaultValidator();

        for (Validator localValidator : validators) {
            if (localValidator.support(production)) {
                productionValidator = localValidator;
                break;
            }
        }

        productionValidator.validate(production);
    }
}
```

## 3 LSP (Liskov Substitution Principle)
- 자식 클래스는 최소한 자신의 부모 클래스에서 가능한 행위는 수행할 수 있어야 한다.
- 상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다

### LSP 적용 전
``` javascript
class Rectangle {
  protected _width: number = -1;
  protected _height: number = -1;

  public get width() {
    return this._width;
  }
  public set width(w: number) {
    this._width = w;
  }

  public get height() {
    return this._height;
  }
  public set height(h: number) {
    this._height = h;
  }

  public get area() {
    return this._width * this._height;
  }
}

class Square extends Rectangle {
  public set width(w: number) {
    this._width = w;
    this._height = w;
  }

  public set height(h: number) {
    this._width = h;
    this._height = h;
  }
}

const rec: Rectangle = new Rectangle();
rec.width = 3;
rec.height = 4;

console.log(rec.area === 12); // true

// 부모클래스에서 쓰는 행위 수행 불가. 
const rec2: Rectangle = new Square();
rec2.width = 3;
rec2.height = 4;

console.log(rec.area === 12); // false
```
자식 클래스 Square는 부모 클래스 Rectangle의 area() 기능을 제대로 하지 못하고 있음

### LSP 적용 후
``` javascript
// Shape 인터페이스는 넓이를 구할 수 있는 것(기하학 관점의 면)이라고 가정한다.
interface Shape {
  readonly area: number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  public get area() {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(public width: number) {}

  public get area() {
    return this.width ** 2;
  }
}

const rec: Shape = new Rectangle(3, 4);
console.log(rec.area); // 12

const sq: Shape = new Square(4);
console.log(sq.area);  // 16
```


## 4 ISP (Integration Segregation Principle)
- 특정 클라이언트를 위한 여러 인터페이스 범용 인터페이스 하나보다 낫다.

### ISP 적용 전
``` java
public interface AllInOneDevice {
    void print();

    void copy();

    void fax();
}

public class SmartMachine implements AllInOneDevice {
    @Override
    public void print() {
        System.out.println("print");
    }

    @Override
    public void copy() {
        System.out.println("copy");
    }

    @Override
    public void fax() {
        System.out.println("fax");
    }
}

package solid.isp.before;

public class PrinterMachine implements AllInOneDevice {
    @Override
    public void print() {
        System.out.println("print");
    }

    @Override
    public void copy() {
        throw new UnsupportedOperationException();
    }

    @Override
    public void fax() {
        throw new UnsupportedOperationException();
    }
}
```
인쇄의 역할을 담당하는 print는 override되었지만 나머지 기능은 구현할 필요가 없기 때문에 UnsupportedOperationException 발생.
이런 경우, 인터페이스만 알고 있는 클라이언트는 printer에서 copy기능이 구현되어 있는지 안되어있는지 모르기 때문에 예상치 못한 오류를 만날 수 있다.

### ISP 적용 후
``` java
public interface PrinterDevice {
    void print();
}

public interface CopyDevice {
    void copy();
}

public interface FaxDevice {
    void fax();
}

public class SmartMachine implements PrinterDevice, CopyDevice, FaxDevice {
    @Override
    public void print() {
        System.out.println("print");
    }

    @Override
    public void copy() {
        System.out.println("copy");
    }

    @Override
    public void fax() {
        System.out.println("fax");
    }
}

// 구현한 객체
public class PrinterMachine implements PrinterDevice {
	@Override
 	public void print() {
    		System.out.println("print");
	}
}

		// 클라이언트가 사용할 경우
@DisplayName("하나의 기능만을 필요로 한다면 하나의 인터페이스만 구현하도록 하자")
@Test
void singleInterface() {
    PrinterDevice printer = new SmartMachine();
    printer.print();
}
```

## 5 DIP (Dependency Inversion Principle)
- 소프트웨어는 추상화에 의존해야지, 구체화에 의존하면 안된다.

### DIP 적용 전
``` java
public class ProductionService {

    private final LocalValidator localValidator;

    public ProductionService(LocalValidator localValidator) {
        this.localValidator = localValidator;
    }

    public void validate(Production production) {
        localValidator.validate(production);
    }

}

public class LocalValidator {

    public void validate(Production production) {
        //validate
    }
}
```

### DIP 적용 후
``` java
public interface Validator {
    void validate(Production production);
}

public class LocalValidator implements Validator {
    @Override
    public void validate(Production production) {
        //validate
    }
}

public class ETicketValidator implements Validator {
    @Override
    public void validate(Production production) {
        //validate
    }
}

public class ProductionService {

    private final Validator validator;

    public ProductionService(Validator validator) {
        this.validator = validator;
    }

    public void validate(Production production) {
        validator.validate(production);
    }
}
```

### 출처
https://bottom-to-top.tistory.com/27
https://medium.com/humanscape-tech/solid-%EB%B2%95%EC%B9%99-%E4%B8%AD-lid-fb9b89e383ef
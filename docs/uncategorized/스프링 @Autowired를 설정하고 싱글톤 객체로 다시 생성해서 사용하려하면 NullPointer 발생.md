---
title: "스프링 @Autowired를 설정하고 싱글톤 객체로 다시 생성해서 사용하려하면 NullPointer 발생"
description: "@Autowired : Spring Container에서 관리중인 Bean/자료형을 자동 맵핑해주는 어노테이션.Controller에서 생성자로 초기화하면 Spring Container에서 Singleton으로 만든 인스턴스 를 참조하지 않고 생성자로 인해 생성된 새로운"
date: 2022-02-24T01:36:57.629Z
tags: []
---
### 정의
@Autowired : Spring Container에서 관리중인 Bean/자료형을 자동 맵핑해주는 어노테이션.

### 사용 불가 :
#### 1 생성자
```java
@Autowired
private Service service = new ServiceImpl();
```
Controller에서 생성자로 초기화하면 **Spring Container에서 Singleton으로 만든 인스턴스** 를 참조하지 않고 생성자로 인해 생성된 새로운 ServiceImpl 객체의 인스턴스를 참조해서 Spring Container Bean 관리를 받지 않아 DI에 실패해 문제가 된다. 

#### 2 Static keyword
```java
@Autowired
private static Service;
```
정적 맴버 선언시 Controller가 먼저 로드되고 Service는 같은 시점에서 생성되지 않아 문제가 된다

### 결론
1 프레임워크에서 의도했던 방식으로 사용하자! new 로 객체 다시 생성해도 null. Autowired만 사용
```java
@Autowired
Service service;
```
2 정적 변수에 담아서 로딩하게끔 주입  
```java
    public static APIKey apiKey;

    /**
     * Make Spring inject the application context
     * and save it on a static variable,
     * so that it can be accessed from any point in the application. 
     */
    @Autowired
    private void APIKey(APIKey apiKeya) {
    	apiKey = apiKeya;       
    }
```

3 또한 스프링에서 DI 실행 후 실행할 메소드가 있으면 @PostContruct, @Component 에노테이션을 사용하고 @Autowired로 필요한 서비스/DAO를 로딩
```java
@Slf4j
@Component
public class TaskSchedule {
	@Autowired
	public void setCommonDao(CommonDao Commondao) {
		TaskSchedule.dao = Commondao;
	}
    
    @PostConstruct
	public static void init() throws Exception {
    }
}
```
@PostConstruct 정의
1 Used on a method that needs to be executed after dependency injection is done to perform any initialization. 
2 This method MUST be invoked before the class is put into service.

### 사용 예제2)
```java
private static SuperAdminRepository superAdminRepository;
	private static Environment env;
    
    @Autowired
	Environment _env;
	@Autowired
	SuperAdminRepository repo0;
    
	@PostConstruct
	private void init() {
		superAdminRepository = this.repo0;
		env = this._env;
	}
```

### 출처
https://simju9397.tistory.com/33
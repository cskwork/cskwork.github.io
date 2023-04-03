---
title: "AOP 표현식"
description: "plug-in action on AOP locationApplicaiton locaitonmethod classes in packageparticular methods of classSet of >= 1 Joinpoint where action is requiredcl"
date: 2022-10-20T23:39:53.855Z
tags: []
---
Filter -> Interceptor -> **AOP**
## 용어 설명
### Joinpoint
**plug-in action on AOP location**

Applicaiton locaiton
- method classes in package
- particular methods of class

### Pointcut
**Set of >= 1 Joinpoint where action is required**

### @Aspect
- class marked as containing advice method
### @Pointcut
- Mark function as pointcut
### @Around
- Run before and after method execution
### execution(expression)
- Expression covering methods which advice is to be applied
### within
- 메서드가 아닌 특정 타입에 속하는 메서드를 pointcut 으로 설정할 때 사용 

## 문법 
execution(<수식어 패턴> <리턴타입패턴> <패키지패턴> (<파라미터패턴>)

### 수식어 패턴
- 생략 가능
- public, protected 

### 리턴 타입 패턴
- 리턴 타입 명시

### 패키지/클래스 이름 패턴
- 클래스 이름 및 메서드 이름 명시

### 파라미터 패턴
- 매칭될 파라미터 명시 

### 예제
```java
'*' 모든 값을 표현
'..' 0개 이상이라는 의미.

execution(public void set*(..))
  - 리턴 타입이 void이고 메서드 이름이 set으로 시작하고, 파라미터가 0개 이상인 메서드 호출.
execution(* kame.spring.chap03.core.*.*())
  - kame.spring.chap03.core 패키지의 파라미터가 없는 모든 메서드 호출.
execution(*.kame.spring.chap03.core..*.*(..))
  - kame.spring.chap03.core 패키지 및 하위 패키지에 있는 파라미터가 0개 이상인 메서드 호출.
execution(Integer kame.spring.chap03.core.WriteArticleService.write(..))
  - 리턴 타입이 Integer인 WriteArticleService 인터페이스의 write() 메서드 호출.
execution(* get*(*))
  - 이름이 get으로 시작하고 1개의 파라미터를 갖는 메서드 호출.
execution(* get*(*, *))
  - 이름이 get으로 시작하고 2개의 파라미터를 갖는 메서드 호출.
execution(* read*(Integer, ..))
  - 메서드 이름이 read로 시작하고, 첫 번째 파라미터 타입이 Integer이며, 1개 이상의 파라미터를 갖는 메서드 호출.


within(kame.spring.chap03.core.WriteArticleService)
  - WriteArticleService 인터페이스의 모든 메서드 호출.
within(kame.spring.chap03.core.*)
  - kame.spring.chap03.core 패키지에 있는 모든 메서드 호출.
within(kame.spring.chap03.core..*)
  - kame.spring.chap03.core 패키지 및 그 하위 패키지에 있는 모든 메서드 호출.
```
## 예시 
```java
@Aspect
public class Logging {
   /** Following is the definition for a PointCut to select
      *  all the methods available. So advice will be called
      *  for all the methods.
   */
   @Pointcut("execution(* com.tutorialspoint.*.*(..))")
   private void selectAll(){}

   /** 
      * This is the method which I would like to execute
      * before / after a selected method execution.
   */
   @Before("selectAll()")
   public void beforeAdvice(){
      System.out.println("Going to setup student profile.");
   }  
   @After("selectGetAge()")
   public void afterAdvice(){
      System.out.println("Student profile setup completed.");
   } 
   // Run after only if method return is success before pointcut method
   @AfterReturning(Pointcut = "execution(* com.tutorialspoint.Student.*(..))", returning = "retVal")
    public void afterReturningAdvice(JoinPoint jp, Object retVal){
       System.out.println("Method Signature: "  + jp.getSignature());  
       System.out.println("Returning:" + retVal.toString() );
   }
   // Run after only if method return throws exception
    @AfterThrowing(Pointcut = "execution(* com.tutorialspoint.Student.*(..))", throwing = "error")
   public void afterThrowingAdvice(JoinPoint jp, Throwable error){
      System.out.println("Method Signature: "  + jp.getSignature());  
      System.out.println("Exception: "+error);  
   }
   
   
}
```


## 출처
https://blog.naver.com/chocolleto/30086024618

https://www.tutorialspoint.com/springaop/springaop_pointcut_methods1.htm
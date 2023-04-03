---
title: "Spring Docs - The IoC Container"
description: "IoC is also known as dependency injection (DI). It is a process whereby objects define their dependencies (that is, the other objects they work with) "
date: 2023-03-13T07:25:01.186Z
tags: []
---
## What is the IoC Container
An IoC container is a software component that manages the **creation and configuration of objects** in an application that follows the Inversion of Control (IoC) principle. IoC means that instead of creating dependencies manually, you let the **container inject** them for you¹. This way, you can achieve loose coupling and easier testing². There are different types of IoC containers, such as Spring IoC Container, Autofac, Unity, etc³.

An IoC container works by **reading some configuration metadata** that tells it how to create and configure the objects in your application⁵. The configuration metadata can be in XML, Java annotations, or Java code⁵. The IoC container then creates an object of the specified class and also injects all the dependency objects through a constructor, a property or a method at run time and disposes it at the appropriate time¹². This way, you don't have to create and manage objects manually¹².

Here is an example of IoC container configuration using Spring Framework and XML format¹:

```xml
<beans>
    <!-- A simple bean definition -->
    <bean id="helloBean" class="com.example.HelloWorld">
        <property name="name" value="Spring" />
    </bean>

    <!-- A bean definition with constructor injection -->
    <bean id="exampleBean" class="com.example.ExampleBean">
        <!-- constructor-arg specifies the argument index and value -->
        <constructor-arg index="0" value="7500000" />
        <constructor-arg index="1" ref="helloBean" />
    </bean>
</beans>
```

This configuration tells the IoC container to create two beans: helloBean and exampleBean. The helloBean is a simple bean that has a property name with the value Spring. The exampleBean is a bean that has two constructor arguments: a numeric value and a reference to another bean (helloBean).

## What is a Bean?

A Spring bean is a Java object that is managed by the Spring IoC container¹²³. A Spring bean is created from a bean definition, which is a configuration metadata that describes how to instantiate, configure and assemble the object¹³. A Spring bean can have dependencies on other beans, which are injected by the container using Dependency Injection (DI) principle¹²³. A Spring bean can also have a scope, which defines its lifecycle and visibility in the application context³.

## Types of bean scope

Some types of bean scopes are:

- **singleton**: This is the default scope for a bean. It means that the Spring container will create and manage only one instance of the bean per application context²⁴⁵.
- **prototype**: This scope means that the Spring container will create a new instance of the bean every time it is requested²⁴⁵. The container does not manage the lifecycle of prototype beans, so they are garbage collected when they are no longer in use⁴.
- **request**: This scope means that the Spring container will create and bind a new instance of the bean to each HTTP request¹³⁴. This scope can only be used in web-aware applications¹³.
- **session**: This scope means that the Spring container will create and bind a new instance of the bean to each HTTP session¹³. This scope can only be used in web-aware applications
- **globalSession**: This scope means that the Spring container will create and bind a new instance of the bean to each global HTTP session. This scope can only be used in web-aware applications with portlet contexts.


## Overview of the ApplicationContext Interface in Spring Framework

The org.springframework.context.ApplicationContext interface represents the Spring IoC container and is **responsible for instantiating, configuring, and assembling the beans**. 
The **container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata. **

The configuration metadata is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.

Several implementations of the ApplicationContext interface are supplied with Spring. In stand-alone applications, it is common to create an instance of ClassPathXmlApplicationContext or FileSystemXmlApplicationContext. While XML has been the traditional format for defining configuration metadata, you can instruct the container to use Java annotations or code as the metadata format by providing a small amount of XML configuration to declaratively enable support for these additional metadata formats.

In most application scenarios, explicit user code is not required to instantiate one or more instances of a Spring IoC container. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the web.xml file of the application typically suffices (see Convenient ApplicationContext Instantiation for Web Applications). If you use the Spring Tools for Eclipse (an Eclipse-powered development environment), you can easily create this boilerplate configuration with a few mouse clicks or keystrokes.

The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the ApplicationContext is created and initialized, you have a fully configured and executable system or application.

![](/images/eb289f3f-9a31-48fb-b2c0-c5a42b2d17b0-image.png)

## Reference
https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#spring-core

Bing과의 대화, 2023. 3. 14.(1) 5. The IoC container - Spring. https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html 액세스한 날짜 2023. 3. 14..
(2) IoC? DIP? IoC Container? DI? DI Framework? 도대체 그게 뭔데?. https://velog.io/@wickedev/IoC-DIP-IoC-Container-DI-DI-Framework-%EB%8F%84%EB%8C%80%EC%B2%B4-%EA%B7%B8%EA%B2%8C-%EB%AD%94%EB%8D%B0 액세스한 날짜 2023. 3. 14..
(3) IoC Containers - TutorialsTeacher. https://www.tutorialsteacher.com/ioc/ioc-container 액세스한 날짜 2023. 3. 14..
Bing과의 대화, 2023. 3. 14.(1) 5. The IoC container - Spring. https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html 액세스한 날짜 2023. 3. 14..
(2) IoC Containers - TutorialsTeacher. https://www.tutorialsteacher.com/ioc/ioc-container 액세스한 날짜 2023. 3. 14..
(3) IoC Containers - TutorialsTeacher. https://www.tutorialsteacher.com/ioc/ioc-container 액세스한 날짜 2023. 3. 14..
(4) Spring Tutorial: IoC Container - javatpoint. https://www.javatpoint.com/ioc-container 액세스한 날짜 2023. 3. 14..
(5) 20 Spring IoC Interview Questions and Answers - CLIMB - ClimbtheLadder. https://climbtheladder.com/spring-ioc-interview-questions/ 액세스한 날짜 2023. 3. 14..
Bing과의 대화, 2023. 3. 14.(1) 5. The IoC container - Spring. https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html 액세스한 날짜 2023. 3. 14..
(2) Spring IoC, Spring Bean Example Tutorial | DigitalOcean. https://www.digitalocean.com/community/tutorials/spring-ioc-bean-example-tutorial 액세스한 날짜 2023. 3. 14..
(3) Inversion of Control and Dependency Injection with Spring - Baeldung. https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring 액세스한 날짜 2023. 3. 14..
Bing과의 대화, 2023. 3. 14.(1) What is a Spring Bean? | Baeldung. https://www.baeldung.com/spring-bean 액세스한 날짜 2023. 3. 14..
(2) [Spring] Bean 정리. https://velog.io/@gillog/Spring-Bean-%EC%A0%95%EB%A6%AC 액세스한 날짜 2023. 3. 14..
(3) [Spring] Spring Bean의 개념과 Bean Scope 종류 - Heee's Development Blog. https://gmlwjd9405.github.io/2018/11/10/spring-beans.html 액세스한 날짜 2023. 3. 14..
 Bing과의 대화, 2023. 3. 14.(1) Spring Bean Scopes: Guía para comprender los distintos scopes (ámbitos) de un Spring .... https://blog.marcnuri.com/spring-bean-scopes-guia-rapida 액세스한 날짜 2023. 3. 14..
(2) Quick Guide to Spring Bean Scopes | Baeldung. https://www.baeldung.com/spring-bean-scopes 액세스한 날짜 2023. 3. 14..
(3) 4.4 Bean scopes - Spring. https://docs.spring.io/spring-framework/docs/3.0.0.M3/reference/html/ch04s04.html 액세스한 날짜 2023. 3. 14..
(4) Custom Bean Scope in Spring - GeeksforGeeks. https://www.geeksforgeeks.org/custom-bean-scope-in-spring/ 액세스한 날짜 2023. 3. 14..
(5) Custom Bean Scope in Spring - GeeksforGeeks. https://www.geeksforgeeks.org/custom-bean-scope-in-spring/ 액세스한 날짜 2023. 3. 14..
---
title: "SpringBoot - ShortStarterDemo"
description: "Spring Boot offers a fast way to build applications. It looks at your classpath and at the beans you have configured, makes reasonable assumptions abo"
date: 2021-09-29T01:22:19.691Z
tags: ["Spring","Springboot"]
---
## Spring Boot?
- Spring Boot offers a fast way to build applications. 
- It looks at your classpath and at the beans you have configured, makes reasonable assumptions about what you are missing, and adds those items. 
- With Spring Boot, you can focus more on business features and less on infrastructure.

## What it can do?

> AUTO-CONFIG

#### Is Spring MVC on the classpath? 
- Spring Boot adds them automatically. 
- A Spring MVC application also needs a servlet container, so Spring Boot automatically configures embedded Tomcat.

#### Is Jetty on the classpath? 
If so, you probably do NOT want Tomcat but instead want embedded Jetty. Spring Boot handles that for you.

#### Is Thymeleaf on the classpath? 
If so, there are a few beans that must always be added to your application context. Spring Boot adds them for you.

## Practice
### 1 Init
1 https://start.spring.io/
2 Chooose Grade || Maven
3 Dependency < Spring Web
4 Generate
### 2 Make Simple Web App
```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Ready to handle Web request
// @RestController combines @Controller and @ResponseBody - When called returns data not view
@RestController
public class HelloController {
    // Maps / to index() method
	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
```
### 3 Make Application Class
```java
package com.example.springboot;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

/*
@SpringBootApplication Adds
- @Configuration :  Tags class as source of bean def. for application context
- @EnableAutoConfiguration : Add beans based on classpath settings
- @ComponentScan : Look for components in package to find controller
*/
@SpringBootApplication
public class Application {

  public static void main(String[] args) {
        //Launches App. (no web.xml) 
        SpringApplication.run(Application.class, args);
  }
  //Retrieves all the beans that were created by your application and runs them on start up
  @Bean 
  public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
	return args -> {
		System.out.println("Let's inspect the beans provided by Spring Boot:");

		String[] beanNames = ctx.getBeanDefinitionNames();
		Arrays.sort(beanNames);
		for (String beanName : beanNames) {
		  System.out.println(beanName);
		}
	};
 }

}
```
### 4 Run App
```bash
# Gradle
./gradlew bootRun
# Maven
./mvnw spring-boot:run
# Check Server
$ curl localhost:8080
Greetings from Spring Boot!
```
### 5 Add Unit Test
Add unit test dependency to Gradle/Maven
```java
package com.example.springboot;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

    //MockMvc - import from SpringTest. Sends HTTPRequest into DispatcherServlet and make assertions about result.
	@Autowired
	private MockMvc mvc;

	@Test
	public void getHello() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(equalTo("Greetings from Spring Boot!")));
	}
}
```

### 6 Add Production-grade service
Spring Boot provides - HTTP endpoints or with JMX. Auditing, health, and metrics gathering management services with actuator module.
[Actuator](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#actuator) : manufacturing term that refers to a mechanical device for moving or controlling something. Actuators can generate a large amount of motion from a small change.
```bash
# Startup server and check
$ curl localhost:8080/actuator/health
{"status":"UP"}
```


### REF
https://spring.io/guides/gs/spring-boot/

https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#getting-started
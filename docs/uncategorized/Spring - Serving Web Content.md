---
title: "Spring - Serving Web Content"
description: "GreetingController.javaUses view rendering tech. Thymeleaf to perform server-side rendering of HTMLHandle hot swap during development with  spring-boo"
date: 2021-05-04T02:36:51.432Z
tags: []
---
GreetingController.java
```java
package com.example.servingwebcontent;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

// Identify controller
@Controller
public class GreetingController {
        //Ensures HTTP GET request to /greeting is mapped to the greeting() method. 
	@GetMapping("/greeting")
        /*
        @RequestParam binds value of query string parameter name into name paratmer of greeting() method. 
        */
	public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}

}
```

Uses view rendering tech. Thymeleaf to perform server-side rendering of HTML
```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head> 
    <title>Getting Started: Serving Web Content</title> 
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
  <!-- Renders the ${name} paramter that was set in the controller. -->
    <p th:text="'Hello, ' + ${name} + '!'" />
</body>
</html>
```

Handle hot swap during development with  [spring-boot-devtools](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-devtools)

### Run application
ServingWebContentApplication.java
```java
package com.example.servingwebcontent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServingWebContentApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServingWebContentApplication.class, args);
    }

}
```

### Build executable JAR
```bash
# gradle
./gradlew bootRun
./gradlew build

# maven
./mvnw spring-boot:run
./mvnw clean package
```

### App test
http://localhost:8080/greeting
http://localhost:8080/greeting?name=User


### Add Homepage
index.html
```html
<!DOCTYPE HTML>
<html>
<head> 
    <title>Getting Started: Serving Web Content</title> 
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <p>Get your greeting <a href="/greeting">here</a></p>
</body>
</html>
```

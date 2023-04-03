---
title: "MSA"
description: "Used to avoid problems from monolithic applicationsApplictions are created as a suite of small independent services, each independently deployable, on"
date: 2021-09-28T07:38:48.075Z
tags: ["microservice"]
---
### What are microservices?
- Used to avoid problems from monolithic applications
- Applictions are created as a suite of small independent services, each independently deployable, on a unique process, and communicate with each other using public APIs.
- Benefits include resiliency of services, ease of deployment, and independent scaling

## MSA 핵심 패턴
### MSA 개발 패턴 
㉠ 서비스 세분성 : 비즈니스 영역을 마이크로서비스로 분해해서 각 마이크로서비스가 적정 수준의 책임을 나눠 갖게 하는 방법은 무엇인가? 너무 넓게 나누면 유지보수와 변경에 어려움이 증가하고, 너무 좁게 나누면 복잡성이 증가합니다. 이에 대한 기준을 세우는 것이 중요한 이유이다.

㉡ 통신 프로토콜 : 마이크로서비스와 데이터 교환을 위한 XML이나 JSON, 아니면 Thrift 같은 바이너리 프로토콜을 사용하는가? JSON이 가장 이상적인 이유와 마이크로서비스와 데이터를 겨환하는데 일반적으로 선택되는 이유는 무엇일까?

㉢ 인터페이스 설계 : 개발자가 서비스 호출에 사용하는 실제 서비스 인터페이스를 설계하는 최선의 방법은 무엇인가? 서비스 의도를 전달하도록 서비스 URL을 구조화하는 방법은 무엇인가? 버전 관리는? 

㉣ 서비스 간 이벤트 프로세싱 : 서비스 간 하드 코딩된 의존성을 최소화하고 애플리케이션 회복성을 높이기 위한 마이크로서비스를 분리하는 방법은 무엇인가?

서비스 디스커버리와 라우팅은 모든 대규모 마이크로서비스 애플리케이션의 핵심입니다.

### 마이크로서비스 라우팅 패턴

### 마이크로서비스 클라이언트 회복성 패턴

마이크로서비스를 사용하면 오작동하는 서비스에서 서비스 호출자를 보호해야 하며, 서비스 하나가 느려지거나 다운되면 해당 서비스 이상의 중단이 발생할 수 있다는 것을 기억해야합니다.

 ### 마이크로서비스 클라이언트 회복성 패턴
### 마이크로서비스 보안 패턴

토큰 기반의 보안 체계를 사용하면 클라이언트의 자격 증명을 전달하지 않고 서비스 인증과 인가를 구현할 수 있습니다.
 

㉠ 인증 : 서비스를 호출하는 서비스 클라이언트가 자신이라는 것을 어떻게 알 수 있을까?

㉡ 인가 : 마이크로서비스를 호출하는 서비스 클라이언트가 수행하려는 작업을 수행할 자격이 있는지 어떻게 알 수 있을까?

㉢ 자격증명 관리와 전파 : 서비스 클라이언트가 한 트랜잭션과 관련된 여러 서비스 호출에서 자격 증명을 항상 제지하지 않아도 될 방법은 무엇인가? 특히 OAuth와 자바스트립트 웹 토큰(JWT) 같은 토큰 기반 보안 표준을 사용해 토큰을 얻는 방법은 어떻게 처리되는가?

### ⑤ 마이크로서비스 로깅 및 추적 패턴

엄밀하게 설계된 로깅 및 추적 전략으로 여러 서비스와 연관된 트랜잭션을 관리할 수 있습니다.

㉠ 로그 상관관계 : 단일 트랜잭션에 대해 여러 서비스 간 생성된 모든 로그를 함께 연결하는 방법은 무엇인가?

㉡ 로그 수집 : 수집된 로그를 단일 데이터베이스로 취합할 수 있을까? 취합된 로그를 검색할 수 있을까?

㉢ 마이크로서비스 추적 : 트랜잭션과 연관된 모든 서비스에서 클라이언트 트랜잭션 흐름을 시각화하고 서비스 성능을 측정할 수 있을까? 

### ⑥ 마이크로서비스 빌드 및 배포 패턴
마이크로서비스와 마이크로서비스가 실행되는 서버의 배포가 환경 간 하나의 원자 산출물이 되어야 합니다.

㉠ 빌드 및 배포 파이프라인 : 조직의 모든 환경에서 원클릭 빌드와 배포를 강조하는 반복 가능한 빌드 및 배포 프로세스를 어떻게 구현할까?

㉡ 코드형 인프라스크럭처 : 소스 제어를 사용해 실행하고 관리할 수 있는 코드로 서비스 프로비저닝을 처리하는 방법은 무엇인가?

㉢ 불변 서버 : 마이크로서비스 이미지를 생성하고 배포한 후 변경하지 못하게 하려면 어떻게 해야 하는가?

㉣ 피닉스 서버 : 서버가 오래 실행될수록 구성 편차가 발생할 가능성이 높아니는데 마이크로서비스를 실행하는 서버를 정기적으로 종료하고 불변 이미지를 재생성하려면 어떻게 해야 하는가?

## 사용
### Config Server
1 Add dependencies springboot, security, cloudconfig
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
2 Make Config class that pulls all the required setup through auto-configure annotation @EnableConfigServer
``` java
@SpringBootApplication
@EnableConfigServer
public class ConfigServer {
    
    public static void main(String[] arguments) {
        SpringApplication.run(ConfigServer.class, arguments);
    }
}
```
3 Configure server port on which server is listening and a Git-url for config content. 
``` xml
server.port=8888
spring.cloud.config.server.git.uri=ssh://localhost/config-repo
spring.cloud.config.server.git.clone-on-start=true
spring.security.user.name=root
spring.security.user.password=s3cr3t
```
4 Make Git Repository as Config. Storage.
Git, SVN, filesystem can all be used for config server.
``` bash
$> git init
$> echo 'user.role=Developer' > config-client-development.properties
$> echo 'user.role=User'      > config-client-production.properties
$> git add .
$> git commit -m 'Initial config-client properties'
````

5 Query Config. Now we can start server. Git-backend config API made by server can be queried.
[label] placeholder = Git Branch
[application] = Client App name
[profile] = Client's current active app. profile
```
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties

curl http://root:s3cr3t@localhost:8888/config-client/development/master
```

6 Make Client app. 
This has REST Controller and one GET method.
Config. is placed in bootstrap.application.
```
@SpringBootApplication
@RestController
public class ConfigClient {
    
    @Value("${user.role}")
    private String role;

    public static void main(String[] args) {
        SpringApplication.run(ConfigClient.class, args);
    }

    @GetMapping(
      value = "/whoami/{username}",  
      produces = MediaType.TEXT_PLAIN_VALUE)
    public String whoami(@PathVariable("username") String username) {
        return String.format("Hello! 
          You're %s and you'll become a(n) %s...\n", username, role);
    }
}
```
Put active profile and connection-details in bootstrap.properties
```
spring.application.name=config-client
spring.profiles.active=development
spring.cloud.config.uri=http://localhost:8888
spring.cloud.config.username=root
spring.cloud.config.password=s3cr3t

curl http://localhost:8080/whoami/Mr_Pink
```
7 Encryption
8 CSRF
9 (encrypt)Key management

### Discovery
Make way for all servers to find each other.
A central address registry can serve as an application address lookup. Setup Eureka discovery server.
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka-server</artifactId>
</dependency>
```
Add properties to bootstrap.properties
```properties
spring.cloud.config.name=discovery
spring.cloud.config.uri=http://localhost:8081
```
Add discovery.properties to Git repository
```properties
spring.application.name=discovery
server.port=8082

eureka.instance.hostname=localhost

eureka.client.serviceUrl.defaultZone=http://localhost:8082/eureka/
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```
Result
```
DiscoveryClient_CONFIG/10.1.10.235:config:8081: registering service...
Tomcat started on port(s): 8081 (http)
DiscoveryClient_CONFIG/10.1.10.235:config:8081 - registration status: 204
```

## Gateway
With config and discovery issues resolved, we need clients access all applications.
A gaeway server will act as reverse proxy, shuttling requests from client to the backend servers. 
- Allows all responses to originate from a single host
- This eliminates need for CORS and makes authentication convenient.

Add zulu dependency
```xml
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zuul</artifactId>
</dependency>
```

Add 2 property files
gateway.properties
```properties
spring.application.name=gateway
server.port=8080

eureka.client.region = default
eureka.client.registryFetchIntervalSeconds = 5

zuul.routes.book-service.path=/book-service/**
zuul.routes.book-service.sensitive-headers=Set-Cookie,Authorization
hystrix.command.book-service.execution.isolation.thread.timeoutInMilliseconds=600000

zuul.routes.rating-service.path=/rating-service/**
zuul.routes.rating-service.sensitive-headers=Set-Cookie,Authorization
hystrix.command.rating-service.execution.isolation.thread.timeoutInMilliseconds=600000

zuul.routes.discovery.path=/discovery/**
zuul.routes.discovery.sensitive-headers=Set-Cookie,Authorization
zuul.routes.discovery.url=http://localhost:8082
hystrix.command.discovery.execution.isolation.thread.timeoutInMilliseconds=600000
```
zulu routes property allows us to define an applicaiton to route certain requests based on URL matcher.

Result
```
Fetching config from server at: http://10.1.10.235:8081/
...
DiscoveryClient_GATEWAY/10.1.10.235:gateway:8080: registering service...
DiscoveryClient_GATEWAY/10.1.10.235:gateway:8080 - registration status: 204
Tomcat started on port(s): 8080 (http)
```

#### Sample Application
main.class
``` java
@SpringBootApplication
@EnableEurekaClient
@RestController
@RequestMapping("/books")
public class BookServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookServiceApplication.class, args);
    }

    private List<Book> bookList = Arrays.asList(
        new Book(1L, "Baeldung goes to the market", "Tim Schimandle"),
        new Book(2L, "Baeldung goes to the park", "Slavisa")
    );

    @GetMapping("")
    public List<Book> findAllBooks() {
        return bookList;
    }

    @GetMapping("/{bookId}")
    public Book findBook(@PathVariable Long bookId) {
        return bookList.stream().filter(b -> b.getId().equals(bookId)).findFirst().orElse(null);
    }
}
```
book POJO
``` java
public class Book {
    private Long id;
    private String author;
    private String title;

    // standard getters and setters
}
```

Update property file
```
spring.cloud.config.name=book-service
spring.cloud.config.discovery.service-id=config
spring.cloud.config.discovery.enabled=true

eureka.client.serviceUrl.defaultZone=http://localhost:8082/eureka/
```
Add book-service.properties to Git repo
```
spring.application.name=book-service
server.port=8083

eureka.client.region = default
eureka.client.registryFetchIntervalSeconds = 5
eureka.client.serviceUrl.defaultZone=http://localhost:8082/eureka/
```
Result
```
DiscoveryClient_BOOK-SERVICE/10.1.10.235:book-service:8083: registering service...
DiscoveryClient_BOOK-SERVICE/10.1.10.235:book-service:8083 - registration status: 204
Tomcat started on port(s): 8083 (http)
```


### REF
https://www.baeldung.com/spring-cloud-configuration

https://mariadb.com/resources/blog/how-to-create-microservices-and-set-up-a-microservice-architecture-with-mariadb-docker-and-go/

https://github.com/bstaijen/mariadb-for-microservices/blob/master/photo-service/app/models/photo.go

https://www.baeldung.com/spring-cloud-bootstrapping

https://waspro.tistory.com/451
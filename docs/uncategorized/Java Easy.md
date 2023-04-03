---
title: "Java Easy"
description: "Why is Java platform independent?Its byte codes can run on any system irrespective of its underlying OS.\-> OS independent.Why is Java not 100% Object"
date: 2021-05-04T01:43:08.760Z
tags: []
---
### Why is Java platform independent?
Its byte codes can run on any system irrespective of its underlying OS.
-> OS independent.

### Why is Java not 100% Object-oriented?
Because it uses 8 primitive data types such as boolean, byte, char, int, float, double, long which are not objects.
-> Because of primitives

### What are constructors in Java?
Block of code to initialize object. Has no return type and is auto called in object init.
Default- no input
Parameterized- Init with provided arguments.
-> initializer

### What is singleton class in JAVA?
Only one instance can be created at any given type. Make constructor private to create.

### Heap vs Stack Memory?
Heap - Used by all parts of app.
??

### What is a package?
Collection of related class and interface bundled together. Code can be easily modularized and optimized for reuse. 

### What is a JIT compiler?
Helps convert Java bytecode into instructions sent directly to the processor. JVM summons the compiled code of that method directly. Responsible for performance optimization of Java applications at run time.
-> Bytecode to native machine code coverter.

### Access modifier
default- same package
private - same class 
protected - prevent diff. package non-subclass
public - cross package access

### What is an object in Java?
Object has state, behavior, and identity. Is created with the new keyword. 

### What is final keyword in Java?
Final keyword is used as a non-access modifier. On a variable value can't be changed once assigned. On a method it can't be overridden by inheriting class. On a class it can't be extended by any subclass class. 

### this() vs super()? 
this() - current instance, calls default constructor, access methods of current class 
super() - current instance of parent/base class, access methods, constructor of parent/base class.

### What is a Servlet?
Java Servlet is server-side tech that extends capability of web server by providing dynamic response and data persistence. 

Get vs Post method difference?
![](/images/188f6872-f4e4-401e-a712-858dd8190f4f-image.png)

### What is a Request Dispatcher?
RequestDispatcher instance is ussed to forward request to another resource that can be HTML, JSP, or another servlet in same app. Can also be used to include content of another resource to response.
![](/images/eff0c9e9-6258-4351-9f40-086b954d2711-image.png)

### What is a JDBC Driver?
Software component that enables java app to interact with the DB. 

### What are steps to connect DB in java?
- Registering the driver class
- Creating connection
- Creating statement
- Executing queries
- Closing connection

### What is JDBC connection interface?
It maintains session with the DB. Used for transaction management. 
![](/images/ebc6f9d8-a15a-4622-81bd-85d1534eac88-image.png)


### 참고
https://www.edureka.co/blog/interview-questions/java-interview-questions/#Jdk-Jre-and-Jvm











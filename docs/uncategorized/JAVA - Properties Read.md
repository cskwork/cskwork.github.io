---
title: "JAVA - Properties Read"
description: "https&#x3A;//mkyong.com/java/java-properties-file-examples/"
date: 2022-01-12T05:28:59.206Z
tags: []
---
### REF
https://mkyong.com/java/java-properties-file-examples/

### 클래스 path- JAR 안에 properties 파일 생성 후 로딩
```java
try (InputStream input = MainController.class.getClassLoader().getResourceAsStream("path.properties")) {

    Properties prop = new Properties();

    if (input == null) {
        System.out.println("Sorry, unable to find config.properties");
        return;
    }

    //load a properties file from class path, inside static method
    prop.load(input);

    //get the property value and print it out
    System.out.println(prop.getProperty("db.url"));
    System.out.println(prop.getProperty("db.user"));
    System.out.println(prop.getProperty("db.password"));

} catch (IOException ex) {
    ex.printStackTrace();
}
```

### UTF-8 글자 사용하는 경우(한글)
```java
try (Reader input = new InputStreamReader( MainController.class.getClassLoader().getResourceAsStream("path.properties"), "UTF-8")) {
    Properties prop = new Properties();

    //load a properties file from class path, inside static method
    prop.load(input);

    //get the property value and print it out            
    System.out.println(prop.getProperty("srcMySQLPath"));
    System.out.println(prop.getProperty("srcOraclePath"));
    System.out.println(prop.getProperty("dstJoinedPath"));
    
    // SET PATH TO STRING
    srcMySQLPath = prop.getProperty("srcMySQLPath");
    srcOraclePath = prop.getProperty("srcOraclePath");
    dstJoinedPath = prop.getProperty("dstJoinedPath");
} catch (IOException ex) {
    ex.printStackTrace();
}
```

### 클래스 밖에 properties 파일 생성 및 로딩
- UTF-8
```java
try (Reader input = new InputStreamReader(new FileInputStream("C:\\path.properties"), "UTF-8")) {
	Properties prop = new Properties();

	//load a properties file from class path, inside static method
	prop.load(input);

	//get the property value and print it out            
	System.out.println(prop.getProperty("srcMySQLPath"));
	System.out.println(prop.getProperty("srcOraclePath"));
	System.out.println(prop.getProperty("dstJoinedPath"));
	
	// SET PATH TO STRING
	srcMySQLPath = prop.getProperty("srcMySQLPath");
	srcOraclePath = prop.getProperty("srcOraclePath");
	dstJoinedPath = prop.getProperty("dstJoinedPath");
} catch (IOException ex) {
	System.out.println("PROPERTIES NOT LOADED");
	ex.printStackTrace();
}
```
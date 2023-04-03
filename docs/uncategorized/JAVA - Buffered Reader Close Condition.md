---
title: "JAVA - Buffered Reader Close Condition"
description: "close()는 스트림을 생성한 객체가 닫아야함. try finally로 감싸서 사용  "
date: 2022-03-06T08:45:28.913Z
tags: []
---
## Input Stream 객체를 파라미터로 넘기면 close() 사용 X.
### 이슈
IOExceptions, resource leak

### 해결책
- close()는 스트림을 생성한 객체가 닫아야함. try finally로 감싸서 사용  
```java
// stream 만 사용한 케이스
public static void read(String str) throws IOException {
    FileInputStream stream = null
    try {
        stream = new FileInputStream(str);
        readStreamToConsole(stream);
    } finally {
        if (stream != null)
            stream.close();
    }
}

// Input Stream 으로 생성한 케이스 
private static void readStreamToConsole(InputStream stream) {
    BufferedReader stdOut = new BufferedReader(new InputStreamReader(stream));
    String output = null;
    while ((output = stdOut.readLine()) != null)
        System.out.println(output);
}
```
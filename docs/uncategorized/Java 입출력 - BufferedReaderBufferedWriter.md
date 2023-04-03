---
title: "Java 입출력 - BufferedReader/BufferedWriter"
description: "메모리 버퍼를 이용해서 읽고 쓰는 함수버퍼를 사용해서 입출력 효율 증가readLine()을 사용하면 데이터를 라인 단위를 읽은다.readLine() 함수 리턴은 String 고정이어서 다른 타입으로 입력 받으려면 형변환 필수.많은 양의 출력이 필요할 때 쓰면 성능 증가"
date: 2021-05-13T03:25:44.139Z
tags: ["Java"]
---
## ✉    BufferedReader/BufferedWriter 정의
- 메모리 버퍼를 이용해서 읽고 쓰는 함수
- 버퍼를 사용해서 입출력 효율 증가
![](/images/73607ffb-2ed9-42c0-ab1b-cbeb6677fbb5-image.png)

## BufferedReader 예제
- readLine()을 사용하면 데이터를 라인 단위를 읽은다.
- readLine() 함수 리턴은 String 고정이어서 다른 타입으로 입력 받으려면 형변환 필수.

```java
import java.io.*;

class BufferedReaderEx1 {
    public static void main(String[] args){
        try{ //예외처리 필수! 또는 throwsIOException해주기
            //콘솔에서 입력 받을 경우
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in)); 

            //파일에서 입력받을 경우
            FileReader fr = new FileReader("BufferedReaderEx1.java"); //"노란색글은 파일 이름"
            BufferedReader br_f = new BufferedReader(fr);
            
            //String이 리턴값이라 형변환 필수! 라인단위임
            int num = Integer.parseInt(br.readLine());             
####             br.close(); //입출력이 끝난 후 닫아주기
            
            //파일의 한 줄 한 줄 읽어서 출력한다.
            String line ="";
            for(int i=1; (line = br_f.readLine()) != null; i++){
                System.out.println(line);
            }
        } catch (IOException e){ //
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
    }
}
```

## BufferedWriter 예제
- 많은 양의 출력이 필요할 때 쓰면 성능 증가
- 버퍼를 다 사용한 후 flush()로 버퍼에 남아있는 데이터를 클린한 후 스트림을 닫아주면 완성. 

```java
import java.io.*;
 
class BufferedWriterEx1 {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new FileWriter("bufferedWriter.txt"));
        bw.write("hello\n"); //출력
        bw.newLine(); //개행 즉 엔터 역할
        bw.write("I am writing\n"); //개행과 함께 출력
        bw.flush(); //남아 있는 데이터 클린
        bw.close(); //스트림 닫기
    }
}

import java.util.Scanner;
import java.io.*;
class Main{
    public static void main(String args[]) throws IOException {
        Scanner sc = new Scanner(System.in);
        int n= sc.nextInt();
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        for(int i=1; i<=n; i++){
            bw.write(i+"\n");
        }
        bw.flush();
        bw.close();
    }
}
```

## 출처
https://jhnyang.tistory.com/92
https://jhnyang.tistory.com/96
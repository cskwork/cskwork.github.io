---
title: "오픈 API 사용시 SSL PKIX path building failed 이슈"
description: "방법 1 : 해당 인증서를 서버에 저장 인증서 다운 받기  인증서를 이클립스/인텔리제이에서 사용중인 자바 \Java\jdk1.8.0_202\jre\lib\security\ 경로에 저장  인증서 공개키 저장  이슈 대응 keytool 이 없는 경우 고급시스템설정에서 JDK path에 \Java\jdk1.8.0_202\bin 넣어"
date: 2022-01-27T13:04:45.012Z
tags: []
---
## 방법 1 : 해당 인증서를 서버에 저장
1.  인증서 다운 받기 
![](/images/34dfe4d0-b134-4eb3-9b2c-a45fb7caa317-image.png)
![](/images/7873ee06-9aaa-4382-a95b-b965f2c6fbf2-image.png)

2. 인증서를 이클립스/인텔리제이에서 사용중인 자바 \Java\jdk1.8.0_202\jre\lib\security\ 경로에 저장 
![](/images/9b837f85-ba3f-45f0-b277-a40d2c302b8a-image.png)
3. 인증서 공개키 저장
```bash
# alias 별칭
# storepass 저장암호. 기본은 changeit 
keytool -import -alias dict -keystore  "C:\Program Files\Java\jdk1.8.0_202\jre\lib\security\cacerts" -storepass changeit -file dict.cer
```
### 이슈 대응
- keytool 이 없는 경우 고급시스템설정에서 JDK path에 \Java\jdk1.8.0_202\bin 넣어두기 최상단에 있어야 기존 PATH 오버라이딩함. 
- keytool 명령어 실행시 access denied 문제가 발생하면 관리자 권한으로 CMD를 열기 (CTLR+SHIFT+ENTER). 그래도 access denied가 발생하면 권한 관련된 문제 해결 검색을 해서 찾아내거나. cacert를 바탕화면 등 다른 곳에 복사해서 인증서 적용하고 다시 자바 \security 경로에 덮어쓰기하면 된다.  
## 방법 2 : 인증서 전체 허용 
```java
package test;
 
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
 
public class ApiTest {
    public static void main(String[] args) throws IOException, NoSuchAlgorithmException, KeyManagementException {
    	String htmlUrl = "https://krdict.korean.go.kr/api/search";
    	
    	// ============= 인증서 허용 코드 =================
    	TrustManager[] trustAllCerts = new TrustManager[] { 
    	    (TrustManager) new X509TrustManager() {
    	        public X509Certificate[] getAcceptedIssuers() {
    	            return null;
    	        }

    	        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
    	        public void checkServerTrusted(X509Certificate[] certs, String authType) {}
    		}
    	};

    	SSLContext sc = SSLContext.getInstance("SSL");
    	sc.init(null, trustAllCerts, new SecureRandom());
    	HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        // ============= /인증서 허용 코드 =================
    	
    	
        StringBuilder urlBuilder = new StringBuilder(htmlUrl); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("certkey_no","UTF-8") + "=인증서 키 번호"); /*cert Key*/
        urlBuilder.append("&" + URLEncoder.encode("key","UTF-8") + "=" + URLEncoder.encode("발급받은 키 입력", "UTF-8")); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("type_search","UTF-8") + "=" + URLEncoder.encode("search", "UTF-8"));
        
        urlBuilder.append("&" + URLEncoder.encode("part","UTF-8") + "=" + URLEncoder.encode("word", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("q","UTF-8") + "=" + URLEncoder.encode("%EB%82%98%EB%AC%B4", "UTF-8")); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("sort","UTF-8") + "=" + URLEncoder.encode("dict", "UTF-8")); 
        
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
    }
}
```
## 결과
![](/images/c7f81971-99bd-4a47-ae70-e34848cbae29-image.png)


### REF
https://jinhokwon.github.io/devops/devops-java/
https://stackoverflow.com/questions/21076179/pkix-path-building-failed-and-unable-to-find-valid-certification-path-to-requ
// SSL에 대한 정리를 잘해둔 곳이다 
https://wayhome25.github.io/cs/2018/03/11/ssl-https/
https://opentutorials.org/course/228/4894
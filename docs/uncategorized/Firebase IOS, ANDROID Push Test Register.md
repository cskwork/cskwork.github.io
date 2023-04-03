---
title: "Firebase IOS, ANDROID Push Test Register"
description: "Test ApplicationFirebase PROD PUSH"
date: 2023-02-02T07:55:18.988Z
tags: []
---
Test Application
```java
package com.eduai.batch.executor;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.AndroidNotification;
import com.google.firebase.messaging.ApnsConfig;
import com.google.firebase.messaging.Aps;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;

// https://firebase.google.com/docs/cloud-messaging/send-message?hl=ko#java 

/**
 * PUSH TEST TOOL Apple : Invalid registration token는 인증서 없어서 발생함 
 https://dongminyoon.tistory.com/48
 TEAM ID, KEY ID 그리고 p8 인증키 애플에서 생성 후 firebase에 등록되어야함. 
 *
 */
@Component
@RequiredArgsConstructor
public class FirebaseTestExample {

  public static void main(String[] args) throws IOException, FirebaseMessagingException {
	
	  final String FIREBASE_CONFIG_PATH = "firebase/firebase_service_key.json";
	  final String FCM_TOKEN_APPLE = "dpYFqscKA0xdwdwdwddddddddddddddddddddddddddddddddddddffv0f";
	  final String FCM_TOKEN_ANDROID = "deviceToken";
	 
	  
    // Initialize Firebase
    FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(FIREBASE_CONFIG_PATH).getInputStream())
                    .createScoped(Arrays.asList("https://www.googleapis.com/auth/firebase.messaging", "https://www.googleapis.com/auth/cloud-platform")))
            
            .build();
    
    if (FirebaseApp.getApps().isEmpty()) {
        FirebaseApp.initializeApp(options);
    }
    
    // Define the target device token
   // String deviceToken = "your-device-token";

    // Build the message
//    Message message = Message.builder()
//        .putData("content_available", "false")
//        .putData("key2", "value2")
//        .setToken(FCM_TOKEN2)  
//        .build();
    
    // 
    Message message = Message.builder()
    	    .setNotification(Notification.builder()
    	        .setTitle("$GOOG up 1.43% on the day")
    	        .setBody("$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.")
    	        .build())
    	    .setAndroidConfig(AndroidConfig.builder()
    	        .setTtl(3600 * 1000)
    	        .setNotification(AndroidNotification.builder()
    	            .setIcon("stock_ticker_update")
    	            .setColor("#f45342")
    	            .build())
    	        .build())
    	    .setApnsConfig(ApnsConfig.builder()
    	        .setAps(Aps.builder()
    	            .setBadge(42)
    	            .build())
    	        .build())
    	    .setToken(FCM_TOKEN_APPLE)
    	    //.setTopic("industry-tech")
    	    .build();

    // Send the message
    String response = FirebaseMessaging.getInstance().send(message);
    System.out.println("Message sent: " + response);
    
    
  }
}
```

Firebase PROD PUSH
```java
   try {
        	  for (int cnt = 0; cnt <= batchCnt; cnt++) {
                  int start = cnt * fullSize;
                  int end = cnt == batchCnt ? tokenList.size() : (cnt + 1) * fullSize;
                  log.debug("[sendMessageByTokenList] send token index {} ~ {}", start, end);
                  // 푸시 태그 파싱 
                  String parsedBody = Utils.html2text(body);
                  if(StringUtils.isAllBlank(parsedBody)) parsedBody = title;
                  
                  MulticastMessage message = MulticastMessage.builder()
                          //.addAllTokens(tokenList.subList(start, end))
                          .addAllTokens(tokenList)
                          .setNotification(Notification.builder()
                                  .setTitle(title)
                                  .setBody(parsedBody)
                                  .build())
                          .putData("type", type)
                          .putData("body", parsedBody)
                          .build();

                  BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
                  successCnt += response.getSuccessCount();
                  if (response.getFailureCount() > 0) {
                      failCnt += response.getFailureCount();

                      List<SendResponse> responses = response.getResponses();
                      for (int i = 0; i < responses.size(); i++) {
                          if (!responses.get(i).isSuccessful()) {  
                        	  
                        	     log.debug( responses.get(i).getException().toString());
                              int org_index = cnt * fullSize + i; 
                              failedUserTokens.add(UserDeviceDTO.UserTokenFail.builder()
                                      .userToken(userTokenList.get(org_index))
                                      .response(responses.get(i))
                                      .build());
                              userTokenList.set(org_index, null);
                          }
                      }
                  }
              }
        }catch(FirebaseException e) {
	        	log.debug("FIREBASE SEND FAIL!");
	        	e.printStackTrace();
        }    
```
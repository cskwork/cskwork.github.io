---
title: "EXPO로 웹뷰만 구현"
description: "Expo Webview 설치"
date: 2021-04-15T04:29:31.772Z
tags: ["Expo","react native"]
---
### 소개 :

기초 웹뷰만 구현하는 방법.

### 설치방법:
Expo Webview 설치
```
# EXPO 설치
npm install --global expo-cli

# 프로젝트 시작
expo init my-project
cd my-project

# EXPO WEBVIEW 설치
expo install react-native-webview
```
### 웹뷰 REACT HTML
```js
import * as React from 'react';
import { WebView } from 'react-native-webview';
import { BackHandler, Linking, ActivityIndicator, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const WEBVIEW_URL =  "/SITEURL/" ;

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.root}>
      <StatusBar
        backgroundColor="black"/>
      <View style={{ flex: 1 }}>
        <WebView 
          allowsFullscreenVideo // Youtube FullScreen
          textZoom={100} //Erratic TextSize
          javaScriptEnabled={true} //JS Support
          domStorageEnabled={true} //Cache
          source={{ uri: WEBVIEW_URL }} 
          ref={(webView) => { this.webView.ref = webView; }} 
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }} />
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
});

```
### 뒤로가기 추가
```js
webView = { canGoBack: false, ref: null, } 

onAndroidBackPress = () => { 
  if (this.webView.canGoBack && this.webView.ref) 
  { 
        this.webView.ref.goBack();
        return true;
  } 
  return false; 
} 

componentDidMount() { 
  if (Platform.OS === 'android') { 
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress); 
  } 
} 

componentWillUnmount() {
  if (Platform.OS === 'android') {
    BackHandler.removeEventListener('hardwareBackPress'); 
  } 
}


```



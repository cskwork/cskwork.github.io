---
title: "React Native로 웹뷰 구현"
description: "App.js  package.json "
date: 2021-04-11T11:30:52.264Z
tags: ["reactnative","webview"]
---
# App.js
```js

import * as React from 'react';
import { BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';

const WEBVIEW_URL =  "https://sitename" ;

export default class App extends React.Component {

  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
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

  render() {
    return <WebView 
			   source={{ uri: WEBVIEW_URL }} 
			   style={{ marginTop: 20 }} 
			   ref={(webView) => { this.webView.ref = webView; }}
        	   onNavigationStateChange={(navState) => { this.webView.canGoBack =                                                                   navState.canGoBack; }}
			   
			   />;
  }
}
```
# package.json
```json
{
  "expo": {
    "name": "Main_App",
    "slug": "Main_App",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
	  "bundleIdentifier": "com.org.sitename",
      "buildNumber": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
	  "package": "com.org.sitename",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "packagerOpts": {
      "port": 58656
    }
  }
}
```
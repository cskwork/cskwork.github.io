---
title: "SafeAreaView IOS"
description: "SafeAreaView는 IOS 전용이며 디바이스 테두리를 안전하게 감싸기 위해서 ios에서 사용하는 API다. 컴포넌트가 화면에 맞게끔 자동 조정한다."
date: 2021-04-15T06:34:40.324Z
tags: ["react native"]
---
### SafeAreaView
- IOS 전용. 
- 디바이스 테두리를 안전하게 감싸기 위해서 ios에서 사용하는 API
- 리액트 UI 컴포넌트가 화면에 맞게끔 자동 조정한다.

```js
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Page content</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
```

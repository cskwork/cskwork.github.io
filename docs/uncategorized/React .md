---
title: "React "
description: "React에서는 이벤트 처리, state 변화, 화면 표시하기 위한 데이터 준비 방식 등 랜더링 로직이 다른 UI 로직하고 연결된다.Javascript Expresssion: 중괄호에 감싸 JSX안에 사용한다. 위에서 표현된 앱은 함수형 컴포넌트다.여기서 각 컴포넌트 "
date: 2021-04-15T06:28:56.182Z
tags: ["React"]
---
### React
React에서는 이벤트 처리, state 변화, 화면 표시하기 위한 데이터 준비 방식 등 랜더링 로직이 다른 UI 로직하고 연결된다.

### JSX
```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```
Javascript Expresssion: 중괄호에 감싸 JSX안에 사용한다. 

위에서 표현된 앱은 함수형 컴포넌트다.
여기서 각 컴포넌트 역할을 간략하게 설명한다.
Text Component : 텍스트 랜더링
View Component : 컨테이너 랜더링
flex : 1 - flex prop은 아이템이 어떤식으로 채워질지 정의한다.

### Props
컴포넌트에서 사용하는 Props는 컴포넌트의 파라미터로 이해하면된다. 함수형 컴포넌트는 props.YOUR_PROP_NAME 그리고 클래스형 컴포넌트는 this.props.YOUR_PROP_NAME로 정의한다.

예)
```js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})

const Greeting = (props) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
}

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='Rexxar' />
      <Greeting name='Jaina' />
      <Greeting name='Valeera' />
    </View>
  );
}

export default LotsOfGreetings;
```
### State
props는 무조건 읽기 전용 (즉 사용중 변경이 없지만)
state는 사용자 행동 / 네트워크 응답에 따라서 변할 수 있다. 
일반적으로 props는 부모에서 자식 컴포넌트로 변수를 보낼 때 사용되지만 state 변수는 컴포넌트 내부에서 사용된다.

State 사용 예제)
```js
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class App extends Component {
  state = {
    count: 0
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
```

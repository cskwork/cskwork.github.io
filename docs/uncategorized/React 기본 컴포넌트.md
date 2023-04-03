---
title: "React 기본 컴포넌트"
description: "목적 1 컴포넌트 생성 방법  쿽 1 클래스형 컴포넌트 생성  2 컴포넌트 랜더링  3 STATE 랜더링  이론 component : 재사용 가능한 UI 조각. 함수형 및 클래스형 컴포넌트가 있음. 함수형 컴포넌트 예)  props : 부모 컴포넌트가 자식 컴포넌트에게"
date: 2021-04-11T07:52:27.742Z
tags: ["React"]
---
# 목적
#### 리액트 기본 컴포넌트 생성 방법, props, state 익히기

# 쿽
#### 1 클래스형 컴포넌트 생성
```js
# MyName.js
import React, { Component } from 'react';

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

export default MyName;
```
#### 2 컴포넌트 랜더링
```js
# App.js
import React, { Component } from 'react';
import MyName from './MyName';

class App extends Component {
  render() {
    return (
      <MyName name="리액트" />
    );
  }
}

export default App;
```
#### 3 STATE 랜더링
```js
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

# 이론
- component : 재사용 가능한 UI 조각. 함수형 및 클래스형 컴포넌트가 있음.
- 함수형 컴포넌트 예) 
```js
import React from 'react';

const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 {name} 입니다.
    </div>
  );
};

export default MyName;
```
- props : 부모 컴포넌트가 자식 컴포넌트에게 주는 값.  받아온 props 를 직접 **수정 할 수 는 없다**.

- state : 컴포넌트 내부에서 선언하며 내부에서 **값을 변경 할 수 있음**

- setState : 해당 함수가 호출되면 컴포넌트가 리랜더링되어 state 값이 변경됨.




# 참고
[누구든지 하는 리액트 4편: props 와 state](https://velopert.com/3629)

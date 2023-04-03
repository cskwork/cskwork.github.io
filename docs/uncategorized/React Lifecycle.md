---
title: "React Lifecycle"
description: "React Lifecycle API에 대한 이해"
date: 2021-04-11T08:04:13.719Z
tags: ["React"]
---
# 목적
React Lifecycle API에 대한 이해

# 쿽
React LifeCycle 사용해보기. Counter.js
```js
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  constructor(props) {
    super(props);
    console.log('constructor');
  }
  
  componentWillMount() {
    console.log('componentWillMount (deprecated)');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5 의 배수라면 리렌더링 하지 않음
    console.log('shouldComponentUpdate');
    if (nextState.number % 5 === 0) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  

  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(
      ({ number }) => ({
        number: number - 1
      })
    );
  }
  
  render() {
    console.log('render');
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
- constructor : 컴포넌트가 새로 만들어질 때 호출
```js
constructor(props) {
  super(props);
}
```
- componentWillMount : 컴포넌트가 화면에 나오기 직전에 호출
- componentDidMount : 컴포넌트가 화면에 나오게 됐을 때 호출함.
- componentWillReceiveProps : 컴포넌트가 props 또는 state 변화를 인지 (새로운 props를 받게됄 때 호출.)
- shouldComponentUpdate : 컴포넌트의 변화가 발생하는 부분을 감지하여 true면 업데이트
- componentWillUpdate : shouldComponentUpdate에서 true를 반환하면 호출.
- componentDidUpdate : render() 호출한 후 발생. 
- componentWillUnmount : 컴포넌트 인스턴스 (외부 라이브러리) 제거


# 참조
[누구든지 하는 리액트 5편: LifeCycle API](https://velopert.com/3631)
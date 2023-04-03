---
title: "React Lifecycle (수명 주기)"
description: "React Lifecycle API에 대한 이해"
date: 2021-04-11T08:04:13.719Z
tags: ["React"]
---
# 목적
React Lifecycle API에 대한 이해
모든 리액트 컴포넌트는 수명 주기가 있습니다.
컴포넌트의 수명은 페이지에 렌더링되기 전인 준비과정에서 시작해서 페이지가 사라질 때 끝납니다. 라이프사이클 메서도는 클래스형 컴포넌트에서만 사용이 가능합니다. 

### constructor
컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드

### getDerivedStateFromProps
props에 잇는 값을 state에 넣을 때 사용하는 메서드

### componentDidMount
컴포넌트가 웹 브라우저에 나타난 후 호출하는 메서드입니다. 컴포넌트를 만들고, 첫 렌더링을 마친 후 실행합니다.

### 컴포넌트가 업데이트하는 경우
- props 변경
- state 변경
- 부모 컴포넌트 리랜더링
- this.forceUpdate로 강제 렌더링 트리거

### componentDidUpdate
컴포넌트의 업데이트 작업이 끝난 후 호출합니다. 즉 리렌더링을 완료한 후 실행합니다.

### shouldComponentUpdate
컴포넌트가 리랜더링할지 결정하는 메소드. true/false를 반환해야 합니다.

### getSnapshotBeforeUpdate
컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드입니다.

### componentWillUnmount
컴포넌트를 DOM에서 제거할 때 실행합니다. 

### useEffect Hook
componentDidMount, componentDidUpdate, componentWillUnmount 가 합쳐져서 함수형 컴포넌트에서 사용하는 함수.

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


# 참조
[누구든지 하는 리액트 5편: LifeCycle API](https://velopert.com/3631)
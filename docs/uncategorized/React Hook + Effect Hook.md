---
title: "React Hook + Effect Hook"
description: "기존에 컴포넌트 안에서 데이터를 가져오고 DOM을 조작하는 작업을 하며 다른 컴포넌트에도 영향을 준다.useEffect는 이런 side effects를 수행할 수 있게 해준다.usEffect를 사용하면 React는 DOM을 바꾼 뒤에 "effect" 함수를 실행한다. "
date: 2021-04-15T06:46:10.680Z
tags: ["React"]
---
### Effect Hook
DOM 렌더링 후 (매번)수행해야할 액션 정의. 

Effect Hook가 없는 세상에서는 데이터 state 변경을 DOM 렌더링 후 수행하려면 componentDidMount, DidUpdate 에 동일한 코드를 입력해주고 클래스 컴포넌트 사용이 필요한데 useEffect를 쓰면 함수형 컴포넌트에서 동일한 기능 실행 가능. 
React는 effect안에 있는 명령어를 DOM 렌더링 할 때 마다 렌더링 후 실행한다. 

사용조건
- Hook는 반복문, 조건문, nested 함수 안에서 사용 X
- Hook는 다른 함수형 REACT 컴포넌트만 호출 가능. 일반 JS 함수에서는 X.

### 기존 방식
```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
### Hook 사용
```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
### 참고
https://reactjs.org/docs/hooks-effect.html
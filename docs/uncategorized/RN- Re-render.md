---
title: "RN- Re-render"
description: "RN 주요 컴포넌트 총 3개. 푸시 수신 및 안드로이드, IOS child 컴포넌트로 사용자 기기에 따른 UI 렌더링 구분을 해주는 메인 컴포넌트안드로이드, IOS 자식 컴포넌트는 웹뷰 컴포넌트 렌더링. 메인 컴포넌트에서 푸시 URL수신을 받아서 웹뷰 source:UR"
date: 2021-04-18T09:17:30.647Z
tags: ["react native","webview"]
---
### 현황 :
- RN 주요 컴포넌트 총 3개. 푸시 수신 및 안드로이드, IOS child 컴포넌트로 사용자 기기에 따른 UI 렌더링 구분을 해주는 메인 컴포넌트
- 안드로이드, IOS 자식 컴포넌트는 웹뷰 컴포넌트 렌더링. 
- 메인 컴포넌트에서 푸시 URL수신을 받아서 웹뷰 source:URI를 바꿔줘야 하는데 state로 받아서 child로 보냈을 때 최초 1회만 child에서 받고 다음회에는 수신이 안된다. 
- state가 바뀌면 render() 함수는 다시 실행되는데 현재는 parent props로 보내서 state를 세팅을 해주는 방식인데 푸시를 수신하면 부모와 자식 state를 둘 다 바꿔 렌더링하게끔 제대로 설정이 되어 있는지 다시 확인이 필요하다. 

### 예제 :
```js
class App extends React.Component {
  componentDidMount() {
    this.setState({});
  }

  render() {
    console.log('render() method')
    return <h1>Hi!</h1>;
  }
}
```

### 참조 :
https://linguinecode.com/post/4-methods-to-re-render-react-component


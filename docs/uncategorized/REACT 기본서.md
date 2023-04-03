---
title: "REACT 기본서"
description: "뷰 안에 값을 수정하려면 해당 요소를 찾아서 업데이트해야 한다. 앱의 규모가 크면 복잡해지고 성능이 떨어질 수 있는 상황에서 페북 개발팀은 데이터 변화에 따른 뷰 변화가 아닌 뷰 전체를 날리고 새로 렌더링하는 방식을 찾았다.앱의 구조도 간단해지고 작성해야할 코드도 줄어"
date: 2021-04-19T02:22:14.530Z
tags: []
---
### React 탄생 배경
- 뷰 안에 값을 수정하려면 해당 요소를 찾아서 업데이트해야 한다. 앱의 규모가 크면 복잡해지고 성능이 떨어질 수 있는 상황에서 페북 개발팀은 데이터 변화에 따른 뷰 변화가 아닌 뷰 전체를 날리고 새로 렌더링하는 방식을 찾았습니다.
- 앱의 구조도 간단해지고 작성해야할 코드도 줄어둘고 변화에 신경 쓰는 일도 적어집니다. 
- DOM으로 처리하면 이 방식은 느리기 때문에 React가 개발됐습니다. 
- RN은 React의 장점을 살려서 cross-platform mobile 앱 개발을 가능하게 합니다. 

### React는
- View : JS 라이브러리이며 오직 사용자 인터페이스 구현에만 사용됩니다.

### 컴포넌트
- 리엑트의 특정 부분이 어떻게 생길지 정하는 선언체

### 렌더링
- 사용자 화면 뷰를 보여 줍니다. 

### 리액트 라이프사이클
- render() { ... } 실행시 초기 렌더링이 발생합니다.
컴포넌트가 어떻게 생겼는지 정의하는 역할을 합니다. 
뷰의 구성과, 작동 정보를 지닌 객체가 반환됩니다. 
컴포넌트 안에 컴포넌트가 있을 수 있는데 render()를 실행하면 내부에 있는 컴포넌트는 재귀적으로 렌더링됩니다. 

#### 초기 렌더링
렌더링 -> HTML MARKUP -> DOM -> 브라우저 화면

#### 리액트가 업데이트(reconciliation) 하는 방법
컴포넌트에서 데이터의 변화가 발생하면 뷰가 변형되는 게 아닌 새로운 요소로 갈아 끼우는데 이 액션도  render()가 진행됩니다. 새로운 데이터로 render()가 다시 실행된다는 의미!

### 조건부 연산자

```js
import React from 'react';
function App() {
 const name = '리액트'; //리앸트 
 return(
    <div>
   {name === '리액트' ? (<p>IS-REACT</p>)
    : ( <p>IS-NOT-REACT</p> )
   );
}
export default App;
```

### 주석
JSX 내부 주석
{/*    주석     */}
외부 부석
// 한줄 주석
/* 주석 */

### 컴포넌트 (클래스, 함수)
- 클래스형 컴포넌트와 함수형 컴포넌트의 차이점은 클래스형 컴포넌트는 state 기능 및 아이프사이클 기능이 사용할 수 있다는 것이고 임의 메서드를 정의할 수 있는 것입니다. 

#### 클래스형 컴포넌트
- render() 필수

#### 함수형 컴포넌트
- 메모리 자원 사용이 조금 덜합니다.
- 결과물의 파일 크기가 조금 더 작습니다.
- 단 state, 라이프사이클 API 사용이 불가했는데 v16.8 hooks가 이를 대체했습니다. 

### props (properties)
- 컴포넌트 속성을 설정할 때 사용합니다. 
- props 값은 해당 컴포넌트를 불러서 사용하는 부모 컴포넌트에서 설정이 가능합니다. 
- 컴포넌트는 props를 읽기 전용으로만 사용이 가능합니다. 하단에 있는 예시에서 App 컴포넌트에서 Mycomponent 를 사용할 때 props 값을 바꿔줘야 변경이 됩니다. MyComponent에서 전달받은 name 값은 직접 변경할 수 없습니다.

예)
```js
// MyComponent.js
import React from 'react';
const MyComponent = props -> {
 return <div>이름은 : {props.name}</div>;
 };
export default MyComponent;
//App.js
import React from 'react';
import MyComponent from './MyComponent';
const App = () =>{
  return <MyComponent name = "ReactName"/>;
};
export default App;
//RESULT
이름은 : ReactName
```

### state
- 컴포넌트 내부에서 바뀔 수 있는 값
- 두가지 종류가 있는데 하나는 클래스형 컴포넌트가 갖고 있는 state이고 다른 하나는 함수형 컴포넌트에서 useState 함수를 사용하는 state입니다.

### 클래스형 컴포넌트 state
```js
import React, {Component} from 'react';

class Counter extends Component {
  constructor(props){
    super(props);
    this.state = { number : 0 };
  };
  
  render(){
    const { number } = this.state;
    return (
      <h1>{number}</h1>
      <button onClick = { () => {
        this.setState ({ number : number +1 });
      }}>
  );
 };  
 export default Counter;
```

### 외부 API 연동으로 뉴스 뷰어 만들기 예제
```js
import React, {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () =? {
    try {
     const response = await axios.get(
      'https://newsapi.org/ve/top-headlines?country-kr&apiKey=key',);
     setData(response.data);
    } catch(e){
      console.log(e);
    }
};
return(
  <button onClick= {onClick}> 불러오기</button>
{data && <textarea rows = {7} value = {JSON.stringify(data, null, 2) } /> }
 );
};

export default App;
```

### 배열 비구조화 할당
```
const array = [1,2];
const one = array[0];
const two = array[1];
-->
const array = [1,2];
const [one, two] = array;

```

### 함수형 컴포넌트에서 useState 사용
- useState 함수 인자에는 상태 초기값 삽입을 합니다.
- 함수를 호출하면 배열이 반환되는데 첫 번째 요소는 원소의 현재 상태이고 두번째 원소는 상태를 바꿔주는 함수입니다. 

### 함수형 컴포넌트 useState 예제
```js
import React, {ustState} from 'react';

const Say = () => {
 const [message, setMessage] = useState('');
 const onClickEnter = () => setMessage('hi');
 const onClickLeave = () =>
 setMessage('bye');
 
  return (
    <button onClick = {onClickEnter}>Hi</button>
    <button onClick = {onClickLeave}>Leave</button>
    <h1>{message}</h1>
 );
};
};
export default Say;
```

### 참고
리액트를 다루는 기술 - 김민준

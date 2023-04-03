---
title: "React - Tutorial - TicTacToe"
description: ""
date: 2021-09-28T12:14:24.887Z
tags: ["React"]
---
```jsx
/*
React 소개 :
React는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리
작고 고립된 코드의 파편을 이용하여 복잡한 UI를 구성하도록 도움
*/

class Square extends React.Component {
  //React 컴포넌트는 생성자에 this.state를 설정하는 것으로 state를 가질 수 있다
  constructor(props){
    super(props);
    //Square의 현재 값을 this.state에 저장하고 Square를 클릭하는 경우 변경
    this.state = {
      value : null,  
    };
  }
  render() {
    {/*Square 컴포넌트를 클릭하면 “X”가 체크되는 기능 추가. 화살표 함수 사용

//render 함수 내부에서 onClick 핸들러를 통해 this.setState를 호출하여 <button> 클릭시 Sqaure가 다시 렌더링해야 한다고 알림.  
//컴포넌트에서 setState를 호출하면 React는 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트

Board renderSquare 함수로 state설정 변경 후 state에서 props로 바꿈 
*/}
    return (
      
      <button 
              className="square"
              onClick={() => this.props.onClick()}
        >
        {/*
onClick시 프로세스 :
1 내장된 DOM <button> 컴포넌트에 있는 onClick prop은 React에게 클릭 이벤트 리스너를 설정하라고 알려줌.
2 버튼을 클릭하면 React는 Square의 render() 함수에 정의된 onClick 이벤트 핸들러를 호출.
3 이벤트 핸들러는 this.props.onClick()를 호출. Square의 onClick prop은 Board에서 정의됨.
4 Board에서 Square로 onClick={() => this.handleClick(i)}를 전달했기 때문에 Square를 클릭하면 this.handleClick(i)를 호출.
5아직 handleClick()를 정의하지 않았기 때문에 코드가 깨짐. 지금은 사각형을 클릭하면 “this.handleClick is not a function”과 같은 내용을 표시하는 붉은 에러.   
        */}
        {/* TODO- Prop 표시 */}
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
  //두 개의 자식 컴포넌트들이 서로 통신하게 하려면 부모 컴포넌트에 공유 state를 정의해야함.
      //부모 컴포넌트는 props를 사용하여 자식 컴포넌트에 state를 다시 전달
      //부모-자식 동기화를 이룸
      squares : Array(9).fill(null),
    };
  }
  
  handleClick(i){
    const squares =      this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
  
  renderSquare(i) {
    //Square 클래스에 value prop을 전달
    //return <Square value={i} />;
    //Square 클래스에 Board 클래스의 value prop을 전달
    //Board에서 Square로 함수를 전달하고 Square는 사각형을 클릭할 때 함수를 호출
    return <Square 
             value={this.state.squares[i]} 
             onClick={ () => this.handleClick(i)}
            />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
//render 함수를 통해 표시할 뷰 계층 구조(화면에서 보려는 내용)를 반환
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/*
JSX 문법을 쓰면 아래와 같이 변환됨.

render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
  

JSX 문법이 없으면 React.createElement('div') 로 호출해야함.

return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', / ... h1 children ... /),
  React.createElement('ul', \/ ... ul children ... /)
);
*/
```
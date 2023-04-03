---
title: "javascript-custom-object-action-tool-proxy"
description: "Javascript ES6 에서 사용 가능. get() & set() 메소드를 사용할 수 있다.object/function 유효성 검사object/function 상수화 (read-only)object/function 조건에 맞으면 다른 액션(function) 호출vu"
date: 2022-10-16T11:24:29.614Z
tags: []
---
## Proxy 문법
```js
new Proxy(target, handler);
// new Proxy() = 생성자
// target = 프록시로 사용할 object/function
// handler = 재정의할 object/function의 행위 
```

Javascript ES6 에서 사용 가능. 

## Proxy Handler
get() & set() handler 메소드를 제공한다

### get()
```js
let student = {
    name: 'Jack',
    age: 24
}

const handler = {
    // get the object key and value
    get(obj, prop) {
        return obj[prop];
  }
}

const proxy = new Proxy(student, handler);
console.log(proxy.name); // Jack
```
### set()
```js
let student = {
    name: 'John'
}

let setNewValue = {
  set: function(obj, prop, value) {
    obj[prop] = value;
    return;
  }
};

// setting new proxy
let person = new Proxy(student, setNewValue);

// setting new key/value
person.age = 25;
console.log(person); // Proxy {name: "John", age: 25}
```

## Proxy를 사용하는 곳 
- object/function 유효성 검사
- object/function 상수화 (read-only)
- object/function 조건에 맞으면 다른 액션(function) 호출
- vue.js에서는 reactive() ref() 함수를 proxy처럼 사용한다

### object/function 유효성 검사
```js
let student = {
    name: 'Jack',
    age: 24
}

const handler = {
    // get the object key and value
    get(obj, prop) {
    // check condition
    if (prop == 'name') {
      return obj[prop];
    } else {
      return 'Not allowed';
    }
  }
}

const proxy = new Proxy(student, handler);
console.log(proxy.name); // Jack
console.log(proxy.age); // Not allowed
```
### object/function 상수화 (read-only)
```js
let student = {
    name: 'Jack',
    age: 23
}

const handler = {
    set: function (obj, prop, value) {
        if (obj[prop]) {   
            // cannot change the student value
            console.log('Read only')
        }
    }
};

const proxy = new Proxy(student, handler);
proxy.name = 'John'; // Read only
proxy.age = 33; // Read only
```
### object/function 조건에 맞으면 다른 액션(function) 호출
```js
const myFunction = () => {
    console.log("execute this function")
};

const handler = {
    set: function (target, prop, value) {
        if (prop === 'name' && value === 'Jack') {
            // calling another function
            myFunction();
        }
        else {
            console.log('Can only access name property');
        }
    }
};

const proxy = new Proxy({}, handler);
proxy.name = 'Jack'; // execute this function
proxy.age = 33; // Can only access name property
```


## REF
https://www.programiz.com/javascript/proxies

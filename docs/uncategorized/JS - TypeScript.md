---
title: "JS - TypeScript"
description: "offers all of JavaScript’s features, and an additional layer on top main benefit of TypeScript is that it can highlight unexpected behavior in your co"
date: 2021-09-11T01:10:38.554Z
tags: []
---
### What is typescript
- offers all of JavaScript’s features, and an additional layer on top 
- main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.

### Example

1 Typescript 작성
``` ts
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);
```

2 컴파일 ts - > js
``` shell
tsc greeter.ts
```
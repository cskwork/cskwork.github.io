---
title: "JS - Async API"
description: "Using non-blocking asynchronous APIs is even more important on Node than in the browser because Node is a single-threaded event-driven execution envir"
date: 2021-09-11T01:37:13.619Z
tags: ["JavaScript"]
---
### ASYNC API
- Using non-blocking asynchronous APIs is even more important on Node than in the browser because Node is a single-threaded event-driven execution environment.
- "Single threaded" means that all requests to the server are run on the same thread (rather than being spawned off into separate processes).

SYNC ACTION
```js
console.log('First');
console.log('Second');
```

ASYNC ACTION
```js
setTimeout(function() {
   console.log('First');
   }, 3000);
console.log('Second');

```

### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
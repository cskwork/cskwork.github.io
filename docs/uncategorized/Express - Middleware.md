---
title: "Express - Middleware"
description: "Middleware is used extensively in Express apps, for tasks from serving static files to error handling, to compressing HTTP responses.middleware functi"
date: 2021-09-11T01:42:49.025Z
tags: []
---
### What is a middleware?
- Middleware is used extensively in Express apps, for tasks from serving static files to error handling, to compressing HTTP responses.
- middleware functions typically perform some operation on the request or response and then call the next function in the "stack", which might be more middleware or a route handler. 
- Most apps will use third-party middleware in order to simplify common web development tasks like working with cookies, sessions, user authentication, accessing request POST and JSON data, logging
- You can write your own middleware functions, and you are likely to have to do so (if only to create error handling code).

### Hello World Middleware (f. morgan)

1 Install HTTP request logger middleware morgan
```
$ npm install morgan
```
2 Import middleware 
``` js 
const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
...
```
3 Result
![](/images/e85b0379-e761-420f-8e09-6b9d526080bc-image.png)

### Writing your own middleware
``` js
const express = require('express');
const app = express();

// An example middleware function
let a_middleware_function = function(req, res, next) {
  // ... perform some operations
  next(); // Call next() so Express will call the next middleware function in the chain.
}

// Function added with use() for all routes and verbs
app.use(a_middleware_function);

// Function added with use() for a specific route
app.use('/someroute', a_middleware_function);

// A middleware function added for a specific HTTP verb and route
app.get('/', a_middleware_function);

app.listen(3000);
```

### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

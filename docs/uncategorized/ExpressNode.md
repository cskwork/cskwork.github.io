---
title: "Express/Node"
description: "What is Node?open-source, cross-platform runtime environmentallows the creation of server-side tools and applications in JS.Benefits of Node?Great per"
date: 2021-09-11T01:19:03.613Z
tags: []
---
### What is Node?
- open-source, cross-platform runtime environment
- allows the creation of server-side tools and applications in JS.

### Benefits of Node?
- Great performance! Node was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time web applications).
- Code is written in "plain old JavaScript", which means that less time is spent dealing with "context shift" between languages when you're writing both client-side and server-side code.
- JavaScript is a relatively new programming language and benefits from improvements in language design when compared to other traditional web-server languages (e.g. Python, PHP, etc.) Many other new and popular languages compile/convert into JavaScript so you can also use TypeScript, CoffeeScript, ClojureScript, Scala, LiveScript, etc.
- The node package manager (NPM) provides access to hundreds of thousands of reusable packages. It also has best-in-class dependency resolution and can also be used to automate most of the build toolchain.
- Node.js is portable. It is available on Microsoft Windows, macOS, Linux, Solaris, FreeBSD, OpenBSD, WebOS, and NonStop OS. Furthermore, it is well-supported by many web hosting providers, that often provide specific infrastructure and documentation for hosting Node sites.
- It has a very active third party ecosystem and developer community, with lots of people who are willing to help.

### Hello Node
1 Open terminal
2 Go to Project Directory
3 Make file for loading node
``` js
// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer((req, res) => {

   // Set the response HTTP header with HTTP status and Content type
   res.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body "Hello World"
   res.end('Hello World\n');
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
})

```
4 Go to teriminal and run file in node 
```
node hello.js
```
5 Result in http://127.0.0.1:8000/
![](/images/f4fc0d9f-b07b-496a-b6f0-38841175e0a3-image.png)

### What is Expresss?
- Popular Node Web Framework
- Writes handlers for requests with different HTTP verbs at different URL paths (routes).
- Integrate with "view" rendering engines in order to generate responses by inserting data into templates.
- Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.
- Add additional request processing "middleware" at any point within the request handling pipeline.

### Hello World Express

1 Create DIR for Running Express
``` shell
npm init
npm install express --save
```

2 Create new file named app.js
``` js
//(imports) the express module and create an Express application
const express = require('express');
const app = express();
const port = 3000;

// app.get shows route definition
app.get('/', (req, res) => {
  res.send('Hello World Express!')
});

//starts up the server on a specified port ('3000') and prints a log comment
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
```
3 Run with shell/BASH
``` shell
 node app.js

```
4 Result in http://127.0.0.1:3000/
![](/images/7cf8d1d7-883c-42ec-b452-97ec22dbf89d-image.png)

### Reference
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

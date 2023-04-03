---
title: "Express - RESTApi - Basic CRUD"
description: "index.jshttp&#x3A;//localhost:3000/api/posts/2011/http&#x3A;//localhost:3000/api/courses/1"
date: 2021-09-17T03:07:37.365Z
tags: ["express"]
---
### Setup
``` bash
@echo off
set /p projectName="Enter project name: "

express %projectName% --view=pug
cd %projectName%

npm install
npm audit fix
npm i -g nodemon
npm start

pause
```

### Add route for GET
index.js
``` js
var express = require('express');
var router = express.Router();

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

router.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// 해당하는 ID를 찾아서 Respon
router.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`ID was not found`);
  res.send(course);
});


module.exports = router;

```

### Test GET
http://localhost:3000/api/posts/2011/
![](/images/3d9ef3aa-dd04-4438-b8ae-6a279d63c1b3-image.png)

http://localhost:3000/api/courses/1
![](/images/a7c7845b-2b06-4a2b-819f-f7a44599496a-image.png)

### Add route for POST
``` js
router.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});
```

### Test POST
![](/images/a5beb8a5-bbce-4dcd-9e75-a1e11bc72020-image.png)

http://localhost:3000/api/courses/12

![](/images/f5fe6f83-3eef-4def-8a0b-6dc56adc058c-image.png)







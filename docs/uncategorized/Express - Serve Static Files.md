---
title: "Express - Serve Static Files"
description: "You can use the express.static middleware to serve static files, including your images, CSS and JavaScriptstatic() is the only middleware function tha"
date: 2021-09-11T01:47:05.823Z
tags: []
---
### How to serve static files?
- You can use the express.static middleware to serve static files, including your images, CSS and JavaScript
- static() is the only middleware function that is actually part of Express


### Hello Static Files
1 Add Static Files in public DIR.
``` js
// serve images, CSS files, and JavaScript files from a directory named 'public' 
//Any files in the public directory are served by adding their filename (relative to the base "public" directory) to the base URL
app.use(express.static('public'));
```
2 Serve Static files in multiple DIRs.
``` js
app.use(express.static('public'));
app.use(express.static('media'));
```
3 create a virtual prefix for your static URLs, rather than having the files added to the base URL.
``` js
app.use('/media', express.static('public'));

```
Result
```
http://localhost:3000/media/images/dog.jpg
http://localhost:3000/media/video/cat.mp4
http://localhost:3000/media/cry.mp3
```

### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

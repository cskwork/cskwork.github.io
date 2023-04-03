---
title: "Express - Error Handling"
description: "Express comes with a built-in error handler, which takes care of any remaining errors that might be encountered in the appErrors are handled by one or"
date: 2021-09-11T01:49:43.850Z
tags: []
---
### How to handle/log Errors?
- Express comes with a built-in error handler, which takes care of any remaining errors that might be encountered in the app
- Errors are handled by one or more special middleware functions that have four arguments

### Hello Error
``` js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

```

### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
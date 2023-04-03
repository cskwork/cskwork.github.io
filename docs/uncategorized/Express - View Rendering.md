---
title: "Express - View Rendering"
description: "\-Template engines (referred to as "view engines" by Express) allow you to specify the structure of an output document in a templateTemplates are ofte"
date: 2021-09-11T01:53:52.018Z
tags: []
---
### How to create views for Express?
-Template engines (referred to as "view engines" by Express) allow you to specify the structure of an output document in a template
- Templates are often used to create HTML, but can also create other types of documents
- In your application settings code you set the template engine to use and the location where Express should look for templates using the 'views' and 'view engines' settings

### Hello Template
``` js
const express = require('express');
const path = require('path');
const app = express();

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views'));

// Set view engine to use, in this case 'some_template_engine_name'
app.set('view engine', 'some_template_engine_name');

//Assuming that you have a template file named "index.<template_extension>" that contains placeholders for data variables named 'title' and "message", 
//you would call Response.render() in a route handler function to create and send the HTML response:
app.get('/', function(req, res) {
  res.render('index', { title: 'About dogs', message: 'Dogs rock!' });
});
```

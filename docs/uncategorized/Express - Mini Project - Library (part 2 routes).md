---
title: "Express - Mini Project - Library (part 2 routes)"
description: "Overview  Add some test data after creating the models  Create a route module wiki.js  Create a route-handler callback function  authorController.js  "
date: 2021-09-15T07:17:42.093Z
tags: ["express"]
---
### Overview

![](/images/b40cb070-5199-4a92-9f36-9e8803a8112e-image.png)

### Add some test data after creating the models
![](/images/13f9fd3a-e079-46fa-8b58-4d80167c234c-image.png)

### Create a route-handler callback function
```
/express-locallibrary-tutorial  //the project root
  /controllers
    authorController.js
    bookController.js
    bookinstanceController.js
    genreController.js
    
/express-locallibrary-tutorial //the project root
  /routes
    index.js
    users.js
    catalog.js
```
authorController.js
``` js
var Author = require('../models/author');

// Display list of all Authors.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};

```

catalog.js
``` js
var express = require('express');
var router = express.Router();

// Require controller modules.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/book/create', book_controller.book_create_post);

// GET request to delete Book.
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book.
router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);
```

### Update the index route module

``` js
// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});
```

### Route Test
```
http://localhost:3000/
/catalog
/catalog/books
/catalog/bookinstances/
/catalog/authors/
/catalog/genres/
/catalog/book/123
/catalog/book/create
```

### Result for http://localhost:3000/catalog/books
![](/images/27fdc27f-2d19-4712-88d5-7b554bbe2457-image.png)
### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
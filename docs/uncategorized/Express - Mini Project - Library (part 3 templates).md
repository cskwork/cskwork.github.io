---
title: "Express - Mini Project - Library (part 3 templates)"
description: "templates"
date: 2021-09-17T01:36:26.340Z
tags: ["express"]
---
### Table Of Contents for Making the view with library data
```
1 Asynchronous flow control using async
2 Template primer
3 The LocalLibrary base template
4 Home page
5 Book list page
6 BookInstance list page
7 Date formatting using luxon
8 Author list page and Genre list page challenge
9 Genre detail page
10 Book detail page
11 Author detail page
12 BookInstance detail page and challenge
```
### 1 Asynchronous flow control using async
LocalLibrary pages will depend on the results of multiple asynchronous requests

``` bash
npm install async
```
### 2 Template primer with Pug
A Template is a text file defining the structure or layout of an output file, with placeholders used to represent where data will be inserted when the template is rendered
-  We use Pug (formerly known as Jade) for our templates. It is the most popular Node template language, and describes itself as a "clean, whitespace-sensitive syntax for writing HTML, heavily influenced by Haml
- Pug is sensitive to indentation and whitespace 
``` js
/*
The settings tell us that we're using pug as the view engine, 
and that Express should search for templates in the /views subdirectory.
*/
// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

### 3 The LocalLibrary base template

Make base template
layout.pug
``` pug
doctype html
html(lang='en')
  head
    title= title
    meta(charset='utf-8')
    meta(name='viewport', content='width=device-width, initial-scale=1')
    link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css", integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z", crossorigin="anonymous")
    script(src="https://code.jquery.com/jquery-3.5.1.slim.min.js", integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj", crossorigin="anonymous")
    script(src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js", integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV", crossorigin="anonymous")
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    div(class='container-fluid')
      div(class='row')
        div(class='col-sm-2')
          block sidebar
            ul(class='sidebar-nav')
              li
                a(href='/catalog') Home
              li
                a(href='/catalog/books') All books
              li
                a(href='/catalog/authors') All authors
              li
                a(href='/catalog/genres') All genres
              li
                a(href='/catalog/bookinstances') All book-instances
              li
                hr
              li
                a(href='/catalog/author/create') Create new author
              li
                a(href='/catalog/genre/create') Create new genre
              li
                a(href='/catalog/book/create') Create new book
              li
                a(href='/catalog/bookinstance/create') Create new book instance (copy)

        div(class='col-sm-10')
          block content

```

### 4 Home page

parallel(tasks, callbackopt)
- Run the tasks collection of functions in parallel, without waiting until the previous function has completed.


/controllers/bookController.js
```js
var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};
```
async.parallel() method is passed an object with functions for getting the counts for each of our models.

 
### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/flow_control_using_async
 
 https://caolan.github.io/async/v3/docs.html#parallel
 
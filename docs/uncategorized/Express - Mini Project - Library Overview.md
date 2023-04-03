---
title: "Express - Mini Project - Library Overview"
description: "Online catalog for a small local library where users can browse available books and manage their accounts."
date: 2021-09-17T01:16:45.209Z
tags: ["express"]
---
### Function
- Online catalog for a small local library where users can browse available books and manage their accounts.

### UML - Model Relationship
![](/images/34e75ad5-72e3-4dd2-b8a8-662057347e33-image.png)

Info Req for ...

Books
- Information about books
- Multiple Copies
- Information about author
- Allow Sorting


### System Path
![](/images/7813671d-6510-4982-8551-5828e233a534-image.png)

### Routes for the Site
```
catalog/ — The home/index page.
catalog/<objects>/ — The list of all books, bookinstances, genres, or authors 
(e.g. /catalog/books/, /catalog/genres/, etc.)
catalog/<object>/<id> — The detail page for a specific book, bookinstance, genre, or author with the given _id field value 
(e.g. /catalog/book/584493c1f4887f06c0e67d37).
catalog/<object>/create — The form to create a new book, bookinstance, genre, or author 
(e.g. /catalog/book/create).
catalog/<object>/<id>/update — The form to update a specific book, bookinstance, genre, or author with the given _id field value 
(e.g. /catalog/book/584493c1f4887f06c0e67d37/update).
catalog/<object>/<id>/delete — The form to delete a specific book, bookinstance, genre, author with the given _id field value 
(e.g. /catalog/book/584493c1f4887f06c0e67d37/delete).
```

### Route-handler Controllers
```
/express-locallibrary-tutorial  //the project root
  /controllers
    authorController.js
    bookController.js
    bookinstanceController.js
    genreController.js
```

### Template with Pug
```
/express-locallibrary-tutorial  //the project root
  /views
    error.pug
    index.pug
    layout.pug
```
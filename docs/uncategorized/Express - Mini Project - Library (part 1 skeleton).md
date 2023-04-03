---
title: "Express - Mini Project - Library (part 1 skeleton)"
description: "1 SETUP  QuickStart.bat "
date: 2021-09-15T05:46:36.616Z
tags: ["express"]
---
### 1 SETUP

``` bash
:: npm install express-generator -g

@echo off
set /p projectName="Enter project name: "

express %projectName% --view=pug

:: Change DIR
cd %projectName%
:: Install Dependency
npm install
:: Run app (bash/Linux)
DEBUG=%projectName%:* npm start

:: Load Browser
http://localhost:3000/
```
### QuickStart.bat
``` bash
@echo off 
:: DEBUG with Current Folder
for %%I in (.) do set CurrDirName=%%~nxI
echo %CurrDirName%
SET DEBUG=%CurrDirName%:* & npm start
:: After nodemon use 
:: npm run devstart

pause
```

### 2 Enable Restart on File Change

``` bash
npm install --save-dev nodemon
:: Check installed dependency  "devDependencies": {
    "nodemon": "^2.0.4"
}
```

### 3 Folder Structure Defined
```
express-locallibrary-tutorial
    # Creates Express App. Object
    # Set up view(template) engine
    app.js
    # Application Entry Point
    /bin
        www
    # Application Dep. Info
    package.json
    package-lock.json
    # Module Storage
    /node_modules
        [about 6700 subdirectories and files]
    # Handles Static Files
    /public
        /images
        /javascripts
        /stylesheets
            style.css
    # Uses router model to define callback when the matching HTTP GET request pattern is detected
    /routes
        index.js
        users.js
    # For Storing responses to render with 
    /views
        error.pug
        index.pug
        layout.pug

```

### 4 Send test message to routed template

users.js
```js
router.get('/cool', function(req, res, next) {
  res.render('challenge1', { title: 'You\'re so cool' });
});
```
challenge1.pug
```pug
extends layout

block content
  h1= title
  p #{title}
```

Result
![](/images/9c0076d2-9620-412f-b4fc-9c5c9f130483-image.png)

### 5 Install DB
``` bash
npm install mongoose
```
Add connection to app.js after var app = express();
``` js
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'insert_your_database_url_here';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

### 6 Setup in Mongo DB Atlas
https://www.mongodb.com/cloud/atlas




### 7 Add Models
author.js
``` js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
// Virtual properties are properties that can be used by the template for getting and setting. 
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
  }
  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
```

### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
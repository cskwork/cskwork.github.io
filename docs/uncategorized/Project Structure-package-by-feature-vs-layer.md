---
title: "Project Structure-package-by-feature-vs-layer"
description: "http&#x3A;//www.javapractices.com/topic/TopicAction.do?Id=205"
date: 2022-06-23T06:54:59.334Z
tags: []
---

### Package by feature
- place all items related to a single feature into a single directory.
- Has high modularity 
- Items related to the feature are within the package
EX)
```
├── com.app
    └── company
        ├── Company
        ├── CompanyController
        ├── CompanyRepository        
        └── CompanyService
    └── product
        ├── Product   
        ├── ProductController
        ├── ProductRepository
        └── ProductService
    └── util
    └── user
        ├── User   
        ├── UserController
        ├── UserRepository
        └── UserService
```

### Package by layer/type
- Feature is spread out over multiple loose categories. 
- Has Low cohesion and modularity. 
- separated by application layers. 
- utilized in layered architectures as decoupling mechanism. (has to make public)
```
├── com.app
    └── controller
        ├── CompanyController
        ├── ProductController
        └── UserController
    └── model
        ├── Company   
        ├── Product
        └── User
    └── repository
        ├── CompanyRepository   
        ├── ProductRepository
        └── UserRepository
    └── service
        ├── CompanyService
        ├── ProductService
        └── UserService
    └── util
```

### Winner? -> Package by feature 
For business application package by feature far outweights package by layer due to high modularity, easier code navigation, higher level of abstractions, bettter growth.(MSA)


### 출처 
http://www.javapractices.com/topic/TopicAction.do?Id=205
https://medium.com/sahibinden-technology/package-by-layer-vs-package-by-feature-7e89cde2ae3a
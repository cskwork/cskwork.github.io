---
title: "Firebase Python"
description: "파이썬으로 파이어베이스 데이터 획득"
date: 2021-04-11T11:28:32.734Z
tags: ["Firebase","python"]
---
# 1 목적
파이썬으로 파이어베이스 데이터 획득

# 2 퀵

```python

from firebase import firebase
 
firebase = firebase.FirebaseApplication('URL of database', None)

# Retrieve Data
result = firebase.get('/python-example-f6d0b/name/', '')
# Update Data
firebase.put('/python-example-f6d0b/name/-firebasecode','Name','Bob')
# Delete Data
firebase.delete('/python-example-f6d0b/name/', '-firebasecode')
# Insert Data
result = firebase.post('/python-example-f6d0b/name/',data)

print(result)

```
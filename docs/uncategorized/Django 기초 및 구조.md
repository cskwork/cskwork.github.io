---
title: "Django 기초 및 구조"
description: "Django의 기본 기능 사용법"
date: 2021-04-11T08:13:41.224Z
tags: ["django"]
---
# 목적
Django의 기본 기능 사용법

# 쿽

#### MVT 패턴
- Model
- View (+Controller)
- Template

#### 1 템플릿 디자인
```python
# Template Inheritance
{% extends "base.html" %}

{% block title %}Articles for {{ year }}{% endblock %}

{% block content %}
<h1>Articles for {{ year }}</h1>

{% for article in article_list %}
    <p>{{ article.headline }}</p>
    <p>By {{ article.reporter.full_name }}</p>
    # Template filter
    <p>Published {{ article.pub_date|date:"F j, Y" }}</p>
{% endfor %}
{% endblock %}
```

#### 2 URL 디자인 ( 웹사이트의 목차와 같음)
```python
from . import views

urlpatterns = [
    path('articles/<int:year>/', views.year_archive),
    path('articles/<int:year>/<int:month>/', views.month_archive),
    path('articles/<int:year>/<int:month>/<int:pk>/', views.article_detail),
]
```

#### 3 VIEW 작성 (함수형, 클래스형 - Controller)
```python
from django.shortcuts import render

from .models import Article

def year_archive(request, year):
    a_list = Article.objects.filter(pub_date__year=year)
    context = {'year': year, 'article_list': a_list}
    return render(request, 'news/year_archive.html', context)
```

# 이론
- object-relational mapping : 객체지향 방식으로 DB 데이터를 조회하고 제어하는 방법. 
#### sql 
```sql
book_list = new List();
sql = "SELECT book FROM library WHERE author = 'Linus'";
data = query(sql); // I over simplify ...
while (row = data.next())
{
     book = new Book();
     book.setAuthor(row.get('author');
     book_list.add(book);
}
```
#### ORM
```sql
book_list = BookTable.query(author="Linus");
```
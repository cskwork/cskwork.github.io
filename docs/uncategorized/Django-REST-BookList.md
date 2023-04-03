---
title: "Django-REST-BookList"
description: "views.pyapi/urls.pymodels.pyserializers.pyproject/urls.py"
date: 2021-09-04T06:56:43.319Z
tags: ["REST","django"]
---
### REST response as API vs Json vs Both

### 1 Add Code

views.py

``` python
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from apps.api.models import Book
from apps.api.serializers import BookSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', 'POST'])
def book_list(request):
    """
    # For API View
    """
    if request.method == 'GET':
        book = Book.objects.all()
        serializer = BookSerializer(book, many=True)
        # For JSON VIEW
        # return JsonResponse(serializer.data, safe=False)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    """ 
    # For JSON VIEW
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    """

```

api/urls.py
```python
from django.urls import path
from apps.api import views

urlpatterns = [
    path('api/', views.book_list),
    path('api/<int:pk>/', views.book_detail),
]
```

models.py
```python
from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
```

serializers.py
```python
from rest_framework import serializers
from apps.api.models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
```

project/urls.py
```python
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.api.urls')),

    # re_path('.*', TemplateView.as_view(template_name='index.html')),
]

```
### 2 Add Data
python manage.py shell
```python
# Check Data in Object as serializer
from apps.api.serializers import BookSerializer
serializer = BookSerializer()
print(repr(serializer))

# Create Data in Object with serializer
from apps.api.models import Book
from apps.api.serializers import BookSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

book = Book(name='Harry Potter', author='J.K Rowling')
book.save()
book = Book(name='Hamlet', author='Shakespeare')
book.save()
```

### Allow Suffix to decide format
views.py
```python
def book_list(request, format=None):
```
api/urls.py
```python
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = format_suffix_patterns(urlpatterns)
```


### 3 Result
http://127.0.0.1:8000/api.api
![](/images/f31f8784-b234-4640-b080-ef7bcbbcd906-image.png)

http://127.0.0.1:8000/api.json
![](/images/67e21fc8-79cc-436c-ab33-e2b5217dda9d-image.png)

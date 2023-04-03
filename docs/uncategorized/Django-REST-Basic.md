---
title: "Django-REST-Basic"
description: "1 Setup Batch File"
date: 2021-09-02T04:53:25.948Z
tags: ["REST","django"]
---
### 1 Setup Batch File

```bash
:: # Make project name
set envName=REST_Env
set projectName=REST_Project
set appName=REST_App
:: echo %projectName%

:: # Create the project directory
mkdir %envName%
cd %envName%

:: # Create a virtual environment to isolate our package dependencies locally
python -m venv env
call .\env\Scripts\activate  
:: # On Windows use `.\env\Scripts\activate`
:: # On Linux `source .\env/bin/activate`  
:: # Install Django and Django REST framework into the virtual environment
pip install django
pip install djangorestframework

:: # Set up a new project with a single application
:: # Note the trailing '.' character
django-admin startproject %projectName% .  
cd %projectName%
django-admin startapp %appName%
cd ..
subl %projectName%

:: # Sync DB and Create Admin
python manage.py migrate
python manage.py createsuperuser --email admin@example.com --username admin

pause
```
### 2 Add REST App and settings to settings.py

```bash 
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

INSTALLED_APPS = [
    ...
    'rest_framework',
]
```
### 3 Add URL and seriazlier.py

urls.py
```python
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from REST_Project.REST_App import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```

seriazliers.py
```python
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
```

### 4 Test with CURL
```bash
curl -H "Accept: application/json; indent=4" -u admin:admin http://127.0.0.1:8000/users/
```

### 5 RESULT
```bash
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "url": "http://127.0.0.1:8000/users/1/",
            "username": "admin",
            "email": "admin@example.com",
            "groups": []
        }
    ]
}
```
![](/images/476d55e4-e404-4e69-a036-e73e970b966a-image.png)


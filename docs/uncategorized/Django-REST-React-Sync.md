---
title: "Django-REST-React-Sync"
description: "1 Setup2 apps/api/apps.py3 project/settings.py"
date: 2021-09-04T05:40:45.061Z
tags: ["REST","React","django"]
---
### 1 Setup
``` bash
:: # Make project name
set projectDIR=projects
set projectName=djangoreact
set appName=api
:: echo %projectName%

:: # Create the project directory
mkdir %projectDIR%
cd %projectDIR%

:: # Create a virtual environment to isolate our package dependencies locally
python -m venv env
call .\env\Scripts\activate  
:: # On Windows use `.\env\Scripts\activate`
:: # On Linux `source .\env/bin/activate`  
:: # Install Django and Django REST framework into the virtual environment
:: # Or use pip install -r requirements.txt 

python -m pip install --upgrade pip
pip install django

:: # Set up a new project with a single application
:: # Note the trailing '.' character
django-admin startproject %projectName% 

:: # Make App in Projectrcmd
cd %projectName%
mkdir apps\%appName%
cd apps 
echo.> "__init__.py"
cd ..
python manage.py startapp %appName% apps\%appName%
cd ..
subl %projectName%

:: # Add Packages
cd %projectName%
echo django>"requirements.txt"
echo djangorestframework>>"requirements.txt"

:: # Create .env FILE
echo .env > .gitignore
echo SECRET_KEY>".env"

pip install -r requirements.txt

:: # Sync DB and Create Admin
python manage.py migrate
python manage.py createsuperuser --email admin@example.com --username admin

:: # SETUP REACT
:: npm install -g create-react-app
:: create-react-app frontend

pause
```

### 2 apps/api/apps.py
``` python
class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.api'
```

### 3 project/settings.py
``` python
INSTALLED_APPS = [
    'apps.api.apps.ApiConfig',
    'rest_framework',
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    'http://127.0.0.1:8000', # Django Port
    'http://localhost:3000' # React Port
]

CORS_ALLOW_CREDENTIALS = True

TEMPLATES = [
    {
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend', 'build'),
        ],
    },
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend', 'build', 'static'),
]
```

### 4 project/urls.py
```python
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    #path(‘api/’, include(‘api.urls’)),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
```

### 5 RUN
``` bash
python manage.py startapp react 
python manage.py runserver 
```

### 6 Result
![](/images/21b9b221-a710-4804-807b-64f5e39659d4-image.png)

#### Reference
https://htkim298.medium.com/django-react-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0-e3cf964bd04a

https://priyanshuguptaofficial.medium.com/django-and-react-integration-b712321a5232






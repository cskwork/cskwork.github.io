---
title: "Django-REST-BASIC+"
description: "1 Setup"
date: 2021-09-02T07:32:42.492Z
tags: []
---
### 1 Setup
Setup_Django_Run_In_Target_Folder.bat
``` bash
:: # Make project name
set projectDIR=projects
set projectName=REST_Project
set appName=initApp
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

pause

:: https://stackoverflow.com/questions/22841764/best-practice-for-django-project-working-directory-structure
:: settings.py  'apps.initApp.apps.InitAppConfig',
:: apps.py 		name = 'apps.initApp'
```

### 2 Create Serializer Class

serializers.py
```python
from rest_framework import serializers
from apps.snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES


class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
```
### 3 Test Serializer
```bash
python manage.py shell
from apps.snippets.models import Snippet
from apps.snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

snippet = Snippet(code='foo = "bar"\n')
snippet.save()

snippet = Snippet(code='print("hello, world")\n')
snippet.save()

serializer = SnippetSerializer(snippet)
serializer.data

```

### 4 Result
![](/images/58e24e75-b249-4189-bd1f-5782c5ad2578-image.png)

### 5 Use ModelSerializer
``` python
# simpler but less customizable
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['id', 'title', 'code', 'linenos', 'language', 'style']
```

### 6 Django View

views.py
```python
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer

@csrf_exempt
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
        
@csrf_exempt
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)
```

urls.py
```
from django.urls import path
from snippets import views

urlpatterns = [
    path('snippets/', views.snippet_list),
    path('snippets/<int:pk>/', views.snippet_detail),
]

```

project/urls.py
```
from django.urls import path, include

urlpatterns = [
    path('', include('snippets.urls')),
]
```
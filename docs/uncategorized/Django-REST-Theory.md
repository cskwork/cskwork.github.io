---
title: "Django-REST-Theory"
description: "Similar to Django form classIncludes validation flagsHas info. on how to renderAlternative is ModelSerializer classCan inspect all fields in the seria"
date: 2021-09-03T05:33:17.063Z
tags: []
---
## Contents
- Serialization
- Requests and Responses
- Class based views
- Auth and permissions
- Relationships and hyperlinked APIs
- Viewsets and routers

### Serializer class 
- Similar to Django form class
- Includes validation flags
- Has info. on how to render
- Alternative is ModelSerializer class
- Can inspect all fields in the serializer instance
example)
```python
from snippets.serializers import SnippetSerializer
serializer = SnippetSerializer()
print(repr(serializer))
```

### Model Serializer Class
- Auto defines determined set of fields
- Simple default impl. for create() update() methods

### HyperlinkedModelSerializer
- Similar to Model Serializer except that it uses hyperlinks (defined names) to represent relationship rather than primary keys.
- Improves discoverability and cohesion

### Request Objects
- request.POST handles form data for POST
- request.data handles arbitrary data for POST PUT PATCH

### Response Objects
- Takes unrendered content and uses content negotiation to determine correct content type to return to client. 

### Ways to wrap API Views
- @api_view : decorator for working with function based views
APIView
- APIView class : For class based views.

### Adding suffixes to URL
example)
http http://127.0.0.1:8000/snippets.json  # JSON suffix
http http://127.0.0.1:8000/snippets.api   # Browsable API suffix
```
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = format_suffix_patterns(urlpatterns)
```

### Rewrite API with class-based views
- Pass into class argument APIView from rest_framework.views
- Inherit methods get || post || get_object || put || delete

### Using Mixins 
- View can be built with GenericAPIView
- Pass into class argument mixins from rest_framework
- Bind get and post methods to appropriate actions

### Use generic class-based views
- Pass in generics.ListCreateAPIView || generics.RetrieveUpdateDestroyAPIView from rest_framework import generics

### Generic Views
- Common patterns in view development is abstracted away.
- Display list and detail page for object
- Allows CRUD for users
- Provide interface for developers
- imported from django.views.generic and has to pass into argument.

### Viewsets class vs view class
- Combine repeated patterns into a single class
- queryset used once while views require multiple
- By using router, user no longer has to adjust URL settings file 


## Authentication and Permission

### Security for CRUD snippets
- code snippets must be associated with creator
- authenticated user may create snippet
- snippet create may update or delete snippet
- unauthenticated request with full read-only access

### Associate Snippet to User
- perform_create method used to modify how instance save is managed
- ReadOnlyField  class used to designate as read-only
- IsAuthenticatedOrReadOnly used to ensure auth. requests get read-write access.

### Add login API
-  path('api-auth/', include('rest_framework.urls')),

### Object level permission
``` python
def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user
```


#### Reference
https://www.django-rest-framework.org/tutorial/3-class-based-views/

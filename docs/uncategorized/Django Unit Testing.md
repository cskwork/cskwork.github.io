---
title: "Django Unit Testing"
description: "checks whether slug for post is correct.Two Arguments are passed and equality is determined "==" raises error if not equal"
date: 2021-04-19T08:19:02.870Z
tags: ["django","unit test"]
---
### 1 Add Test Suite
```bash
cd ~/my_blog_app
. env/bin/activate
cd ~/my_blog_app/blog/blogsite
mkdir tests
cd ~/my_blog_app/blog/blogsite/tests
touch __init__.py
# Model, View for testing
touch test_models.py
touch test_views.py
nano test_models.py
```
#### test_models.py
```py
from django.test import TestCase

class ModelsTestCase(TestCase):
    pass
```

### 2 Test Code
```bash
cd ~/my_blog_app/blog/blogsite
nano models.py
```
#### models.py
```py
class Post(models.Model):
    ...
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)
    ...
 ```
 
 #### test_models.py
```py
from django.test import TestCase
from django.template.defaultfilters import slugify
from blogsite.models import Post


class ModelsTestCase(TestCase):
# Test if posts have Slug value
    def test_post_has_slug(self):
        """Posts are given slugs correctly when saving"""
        post = Post.objects.create(title="My first post")

        post.author = "John Doe"
        post.save()
        self.assertEqual(post.slug, slugify(post.title))
```
#### assetEqual
- checks whether slug for post is correct.
- Two Arguments are passed and equality is determined "==" 
- raises error if not equal

### 3 Django's Test Client

#### test_views.py
```py
from django.test import TestCase


class ViewsTestCase(TestCase):
    def test_index_loads_properly(self):
        """The index page loads properly"""
        response = self.client.get('your_server_ip:8000')
        self.assertEqual(response.status_code, 200)
```

### 4 Run Test

```bash
cd ~/my_blog_app/blog
python manage.py test
# RESULT
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
..
----------------------------------------------------------------------
Ran 2 tests in 0.007s

OK
Destroying test database for alias 'default'...
```

### 참고
https://www.digitalocean.com/community/tutorials/how-to-add-unit-testing-to-your-django-project







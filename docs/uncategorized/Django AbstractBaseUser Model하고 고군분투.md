---
title: "Django AbstractBaseUser Model하고 고군분투"
description: "현상 : Permissions 문제 이걸로 정말 오랜기간 싸웠다... 커스터마이즈한 유저 모델에 그룹과 Permission을 집어 넣으려고 했는데 계속 Permissions 오류가 떴다. StackOver도 엄청 찾아봤는데 답이 없었다. 그래서 DB 확인을 해봤는데 auth_user 테이블이 지속적으로 생성이 안되는 걸 확인했다. 결론은 커스터마이징한 Us..."
date: 2021-04-14T14:38:07.046Z
tags: ["django"]
---
### 현상 : Permissions 문제
이걸로 정말 오랜기간 싸웠다...
- 커스터마이즈한 유저 모델에 그룹과 Permission을 집어 넣으려고 했는데 계속 Permissions 오류가 떴다. StackOver도 엄청 찾아봤는데 답이 없었다.
- 그래서 DB 확인을 해봤는데 auth_user 테이블이 지속적으로 생성이 안되는 걸 확인했다.
- 결론은 커스터마이징한 User 테이블명이 회원목록
```
db_table = "회원목록"
```
- 으로 되어 있어서 문제된 걸 확인했다. 다시 auth_users로 변경하니 해결됐다. 즉 Permissions, Groups 모델을 자유롭게 쓸 수 있게 됐다. 

```python
class User(AbstractBaseUser, PermissionsMixin):
    
    objects = UserManager()

    user_id = models.CharField(max_length=17, verbose_name="아이디", unique=True)
    password = models.CharField(max_length=256, verbose_name="비밀번호")

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.user_id

    class Meta:
        db_table = "auth_user"
        verbose_name = "사용자"
        verbose_name_plural = "사용자"
```

### 후기 :
- 이 문제 때문에 from django.contrib.auth.models 소스도 까서 보고. AbstractBaseUser(전체 Override), AbstractUser(기존 User모델 사용) 의 차이. 

- fieldset에 group, permission추가하는 방법. decorator 사용 등 굉장히 많은 걸 알게됐다. 

- 결론은 : admin.site.register(Group) 디폴트로 추가된 것 확인하면서 마무리.

- 실은 더 근본적인 문제는 남이 만든 모델을 제대로 이해하지 못하고 써서 그만큼 시간이 오래 걸렸다고 본다. 알고 쓰자! 





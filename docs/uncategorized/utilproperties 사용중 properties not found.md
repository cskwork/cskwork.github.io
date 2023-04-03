---
title: "util:properties 사용중 properties not found"
description: "이슈  AS-IS "
date: 2022-03-06T23:30:17.740Z
tags: []
---
### 이슈
```
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'config': Invocation of init method failed; nested exception is java.io.FileNotFoundException: class path resource [properties/config.properties] cannot be opened because it does not exist
```

### AS-IS
```xml
<!-- Root Context: defines shared resources visible to all other web components -->
	<util:properties id="config" location="classpath:properties/config.properties"/>
```

### 해결
- 단순히 경로에 추가되지 않아서 발생 -> PATH에 추가. properties 및 root-context.xml 전부 추가 
![](/images/01677eba-eae7-45f2-855c-72106ea2c61a-image.png)

- 경로 잡는 xml 파일 오타 확인

- 경로에 파일 여부 다시 확인
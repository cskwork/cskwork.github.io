---
title: "thymeleaf-syntax"
description: "https&#x3A;//yeonyeon.tistory.com/153https&#x3A;//github.com/yeon-06/inflearnSpring/tree/master/mvc1-3"
date: 2022-06-09T05:49:33.220Z
tags: []
---
![](/images/b1023c7f-1dd1-4992-aea7-ffea7bf103df-image.png)


```html
<tbody>
  <tr th:each="article, i: ${list}">
    <td th:text="${article.seq}"></td>
    <td th:text="${article.username}"></td>
    <td sec:authorize="isAuthenticated()">
      <a th:href="${'/board/read/' + article.seq}" th:text="${article.title}"></a>
      <span class="text-blue" th:if="${i.count eq i.size}">[1등]</span>
    </td>
    <td sec:authorize="!isAuthenticated()" th:text="${article.title}"></td>
    <td th:text="${article.writeDate}"></td>
  </tr>
</tbody>
```

### 출처
https://yeonyeon.tistory.com/153
https://github.com/yeon-06/inflearnSpring/tree/master/mvc1-3
---
title: "Parse html tag in Java to get only the value from the input tag witht type text"
description: "https&#x3A;//chat.openai.com/chat"
date: 2023-02-02T23:22:48.039Z
tags: []
---
```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

String html = "<input type='text' value='Hello, World!'><input type='hidden' value='hiddenValue'>";
Document document = Jsoup.parse(html);
Element inputElement = document.select("input[type=text]").first();
String inputValue = inputElement.attr("value");
System.out.println(inputValue); // Output: "Hello, World!"
```

### Reference
https://chat.openai.com/chat
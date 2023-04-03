---
title: "JS Event capture & bubble"
description: "prototypehttps&#x3A;//medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67js prototype클래스 방식classfunction Perso"
date: 2022-05-30T06:18:16.127Z
tags: []
---
## Event Bubbling and capturing

https://medium.com/developers-arena/understanding-preventdefault-stoppropagation-and-stopimmediatepropagation-when-working-with-61842c37e012

### Event capturing
![](/images/2856054e-d68d-4477-bc48-ab7affcddc9b-image.png)

- click event start from top and move to children
```html
<div class="parent" (onClick)="console.log('parent')">
    <button class="child" (onClick)="console.log('child')"></button>
</div>
```
Result 
```
parent
children
```

### Event bubbling
![](/images/1775fb81-aad0-45b8-b74b-c9d137e531f4-image.png)

- inverse of event capturing, event moves from child to parent

### event.preventDefault()
- stop browser's default behavior 
```js
document.querySelector("#id-checkbox").addEventListener("click", function(event) {
         document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
         event.preventDefault();
}, false);
```

### event.stopPropagation()
- stop capture, bubbling phase of flow of event in browser
```js
<div class="parent" (onClick)="console.log('parent')">
    <button class="child" (onClick)="buttonClick(event)"></button>
</div>
<script>
    function buttonClick(event) {
        event.stopPropagation();
        console.log('child');
    }
</script>
```
### event.stopImmediatePropagation()
- prevents multiple click listeners on single HTML element
- stopImmediatePropagation = stopPropagation + other event listener
```js
<script>
    $("div").click(function(event) {
      event.stopImmediatePropagation();
      alert('First click triggered');
    });

    $("div").click(function(event) {
      // This function won't be executed
      alert('Second click triggered');
    });
</script>
<div>Click me</div>
```



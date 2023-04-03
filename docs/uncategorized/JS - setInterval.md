---
title: "JS - setInterval"
description: "setInterval() method, offered on the Window and Worker interfaces, repeatedly calls a function or executes a code snippet, with a fixed time delay bet"
date: 2021-09-12T12:55:36.320Z
tags: ["JavaScript"]
---
### What is setInterval?
setInterval() method, offered on the Window and Worker interfaces, repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
```
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```
#### func|code
Function or a string of code to execute. Usually, that’s a function. For historical reasons, a string of code can be passed, but that’s not recommended.
#### delay
The delay before run, in milliseconds (1000 ms = 1 second), by default 0.
#### arg1, arg2…
Arguments for the function (not supported in IE9-)

### In-Action 1
``` js
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
```
![](/images/3716e5d0-db3e-4300-9277-3bdc11ee4854-image.png)

### In-Action 2
``` html
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>
```

```js
  const secondHand = document.querySelector('.second-hand');
  const minsHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');

  function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  setInterval(setDate, 1000);

  setDate();

```

### REF
https://developer.mozilla.org/en-US/docs/Web/API/setInterval
https://javascript.info/settimeout-setinterval
---
title: "JS - addEventListener"
description: "fundamental problem of the aforementioned ways to assign handlers – we can’t assign multiple handlers to one event.addEventListener and removeEventLis"
date: 2021-09-12T12:49:06.362Z
tags: ["JavaScript"]
---

## Only one with active
```js
sendEventBinding : function(){
		let multiBtn = document.querySelectorAll('.multiBtn');
		multiBtn.forEach(btn => {
		  btn.addEventListener('click', 
		  	function handleClick(event) {
				//e.preventDefault(); //prevent double click 
				for (const item of multiBtn) {
					item.classList.remove('active');
				} 
				btn.classList.add('active');
		  	});
		});
	},
```

## addEventHandler
fundamental problem of the aforementioned ways to assign handlers – we can’t assign multiple handlers to one event.

```js
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // replaces the previous handler
```
addEventListener and removeEventListener are free of such a problem.
```js 
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

---

### In-Action 1
```
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
</script>
```

![](/images/b2f1c003-3bec-4a4b-a59a-c02af77881b7-image.png)

### In-Action 2
html
```
  <div class="keys">
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
    <div data-key="83" class="key">
      <kbd>S</kbd>
      <span class="sound">hihat</span>
    </div>
    <div data-key="68" class="key">
      <kbd>D</kbd>
      <span class="sound">kick</span>
    </div>
  </div>

  <audio data-key="65" src="sounds/clap.wav"></audio>
  <audio data-key="83" src="sounds/hihat.wav"></audio>
  <audio data-key="68" src="sounds/kick.wav"></audio>
```

script
``` js
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  /*
  1 Get Matching sound key and save to keys
  2 Remove any sound currently playing 
  3 Play sound on keydown.
  //transitionend – when a CSS-animation finishes.
  */
  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);
```

### REF
https://javascript.info/introduction-browser-events
https://javascript30.com/
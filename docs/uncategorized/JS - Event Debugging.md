---
title: "JS - Event Debugging"
description: "CHROME APIhttps&#x3A;//www.cookieshq.co.uk/posts/event-listeners-not-working-troublelshootinghttps&#x3A;//developer.chrome.com/blog/quickly-monitor-ev"
date: 2022-03-29T06:09:15.931Z
tags: []
---
## Method 1
CHROME API
```js
//monitorEvents(object [EVENT_TYPE]); 
monitorEvents(window, 'scroll'); 
```
![](/images/eaf373f5-539d-4d23-8877-b0727d0f1e79-image.png)

## Method 2
```js
	const EVENT_TYPE = 'scroll';
	// For breaking
	document.addEventListener(EVENT_TYPE, function() {debugger;}, true)
	// For logging
	document.addEventListener(EVENT_TYPE,console.log, true);
	// For logging multiple informations
	document.addEventListener(EVENT_TYPE, function(event) {
	  console.log(
	    event.type, // The type of the event
	    event.target, // The target of the event
	    event, // The event itself
	    (() => {try {throw new Error();} catch(e) {return e;}})() // A stacktrace to figure out what triggered the event
	  );
	}, true);
```

## Method 3
```js
/**
 * Helps finding out what stops events handling by logging or breaking
 * when any of the stopage methods (<code>stopPropagation</code>, <code>stopImmediatePropagation</code>, <code>preventDefault</code>)
 * are called.
 * @param {Object} options
 * @param {Array<String>} [options.methods]  - The list of methods to monitor
 * @param {'log'|'break'} [options.type]  - Whether to log or break when the method is called
 * @param {Function} [options.should] - A function to test whether the call should be logged or broken, useful for limiting noise
 */
(function debugEventStoppages({
  methods = ['stopPropagation', 'stopImmediatePropagation', 'preventDefault'],
  type = 'log',
  should = () => true
} = {}) {
  methods.forEach(method => {
    const original = Event.prototype[method];
    Event.prototype[method] = function() {
      // Test if we need do log/break for this particular event
      if (should(this)) {
        if (type == 'break') {
          debugger;
        } else {
          // Log which method was called, the event type, 
          // the event itself and a stacktrace to figure out what happened
          console.log(
            method,
            this.type,
            this,
            (() => {
              try {
                throw new Error();
              } catch (e) {
                return e;
              }
            })()
          );
        }
      }
      return original.apply(this, arguments);
    };
  });
})();
```

## 출처 
https://www.cookieshq.co.uk/posts/event-listeners-not-working-troublelshooting

https://developer.chrome.com/blog/quickly-monitor-events-from-the-console-panel-2/
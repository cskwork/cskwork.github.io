---
title: "JS - Fetch API vs XMLHttpRequest"
description: "fetch : Modern Promise-based Ajax request API supported on most browsers. Not Built ion XMLHttpRequest.1 Fetch One2 Fetch TwoIt’s challenging to manag"
date: 2022-12-12T11:23:45.014Z
tags: []
---
### Fetch Meaning
fetch : Modern Promise-based Ajax request API supported on most browsers. Not Built ion XMLHttpRequest.


### Fetch GET

1 Fetch One
```js
fetch("/service", { method: "GET" })
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:", err));
```

2 Fetch Two
```js
try {
  const res = await fetch("/service", { method: "GET" }),
        
  json = await res.json();
  console.log(json);
} catch (err) {
  console.error("error:", err);
}
```

### Fetch POST - Upload JSON Data
```js
const data = { username: 'example' };

fetch('https://example.com/profile', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Fetch POST - Abstraction
```js
async function post(host, path, body, headers = {}) {
  const url = `https://${host}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

post("jsonplaceholder.typicode.com", "posts", {
  title: "Test",
  body: "I am testing!",
  userId: 1,
})
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

### Fetch POST - Upload File
```js
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Fetch POST - Upload Multiple Files
```js
const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append('title', 'My Vegas Vacation');
let i = 0;
for (const photo of photos.files) {
  formData.append(`photos_${i}`, photo);
  i++;
}

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData,
})
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

---

## Features of Fetch
### Caching Control
```js
const res = await fetch("/service", {
  method: "GET",
  cache: "default",
});
```
It’s challenging to manage caching in XMLHttpRequest, and you may find it necessary to append a random query string value to bypass the browser cache. Fetch offers built-in caching support in the second parameter init object:

### CORS Control
```js
const res = await fetch(
  'https://anotherdomain.com/service', 
  {
    method: 'GET',
    mode: 'no-cors'
  }
);
```
Both fetch() and XMLHttpRequest will fail when this is not set. However, Fetch provides a mode property which can be set to 'no-cors' in the second parameter init object

### Credential Control
```js
const res = await fetch("/service", {
  method: "GET",
  credentials: "same-origin",
});
```
XMLHTTPRequest always sends browser cookies. Fetch API does not send cookies unless you explicitly set a credentials property in the second parameter init object.

### Redirect Control
```js
const res = await fetch("/service", {
  method: "GET",
  redirect: "follow",
});
```
By default, both fetch() and XMLHttpRequest follow server redirects. However, fetch() provides alternative options in the second parameter init object

### Data Streams
```js
const response = await fetch("/service"),
  reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  console.log(value);
}
```
XMLHttpRequest reads the whole response into a memory buffer but fetch() can stream both request and response data. For example, you could process information in a multi-megabyte file before it is fully downloaded. The following example transforms incoming (binary) data chunks into text and outputs it to the console. 

## Features of XMLHttpRequest
### ProgressSupport
```js
const xhr = new XMLHttpRequest();

// progress event
xhr.upload.onprogress = (p) => {
  console.log(Math.round((p.loaded / p.total) * 100) + "%");
};
```
We may monitor the progress of requests by attaching a handler to the XMLHttpRequest object’s progress event.  The Fetch API does not offer any way to monitor upload progress.
### Timeout Support
```js
const xhr = new XMLHttpRequest();
xhr.timeout = 5000; // 5-second maximum
xhr.ontimeout = () => console.log("timeout");

// FETCH CAN timeout with Wrapper Function or Promise race()
// timeout wrapper
function fetchTimeout(url, init, timeout = 5000) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then(resolve).catch(reject);
    setTimeout(reject, timeout);
  });
}
// Promise race
Promise.race([
  fetch("/service", { method: "GET" }),
  new Promise((resolve) => setTimeout(resolve, 5000)),
]).then((res) => console.log(res));
```
### Abort Support
```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/service");
xhr.send();
/// ...
xhr.onabort = () => console.log("aborted");
xhr.abort();
```
An in-flight request can be cancelled by running the XMLHttpRequest abort() method. An abort handler can be attached if necessary:

### Browser Support
XMLHttpRequest is also stable, and the API is unlikely to be updated. And supports IE, Browser versions prior to 2015

### 참조
https://blog.openreplay.com/ajax-battle-xmlhttprequest-vs-the-fetch-api

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

https://www.daleseo.com/js-window-fetch/
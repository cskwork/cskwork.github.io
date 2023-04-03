---
title: "javascript-component-framework-vuejs-fundamentals"
description: "Object Proxy - Reactive API  Primitive Value Proxy - Ref API  Combined Example  Attribute bindngs : v-bind Syntax  Example  Event Listener : v-on Synt"
date: 2022-10-16T12:34:00.031Z
tags: []
---
## Object Proxy - Reactive API 
```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```
## Primitive Value Proxy - Ref API
```js
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

### Combined Example
```js
<script setup>
import { ref, reactive } from 'vue'
// component logic
// declare some reactive state here.
const message = ref('Hello World!');
message.value="LEVEL";
  
const counter = reactive({
  count: 5
});
</script>

<template>
  <h1>{{ message.split('').reverse().join('') }} {{ counter.count }}</h1>
  <h2></h2>
</template>
```
![](/images/660a8054-6cc8-42c7-bfc5-03c2bd643525-image.png)

## Attribute bindngs : v-bind
### Syntax
```html
// VERSION 1
<div v-bind:id="dynamicId"></div>

// VERSION 2
<div :id="dynamicId"></div>
```
### Example
```html
<script setup>
  
import { ref } from 'vue'
const titleClass = ref('title')
  
</script>

<template>
  <h1 :class="titleClass">빨강색으로 클래스 적용</h1> <!-- add dynamic class binding here -->
</template>

<style>
.title {
  color: red;
}
</style>
```
![](/images/90a03eba-f960-4f75-8ffc-2578be7c0664-image.png)


## Event Listener : v-on
### Syntax
```html
// VERSION 1
<button v-on:click="increment">{{ count }}</button>

// VERSION 2
<button @click="increment">{{ count }}</button>
```
### Example
```html
<script setup>
import { ref } from 'vue'

const count = ref(0);
function increment(){
  count.value++;
};
</script>

<template>
  <!-- make this button work -->
  <button @click="increment">count is: {{ count }}</button>
</template>
```
![](/images/7fc0a89b-4689-4272-94df-0a3f67ae8840-image.png)

## Form Bindings : v-model
### Example with v-bind & v-on
```html
<script setup>
import { ref } from 'vue'

const text = ref('')

function onInput(e) {
  text.value = e.target.value
}
</script>

<template>
  <input :value="text" @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```
### Example with simplified v-model
```html
<script setup>
import { ref } from 'vue'
const text = ref('')
</script>
<template>
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```
![](/images/3eddbfa9-1dc6-4a5b-9d2e-ed0885054783-image.png)

## Conditional Rendering : v-if
```html
<script setup>
import { ref } from 'vue'

const awesome = ref(true)
function toggle() {
  awesome.value = !awesome.value
}
</script>

<template>
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```
![](/images/9b88aac1-0c83-47da-a8d1-1311a1b79a8d-image.png)


### REF
https://vuejs.org/guide/introduction.html
https://vuejs.org/guide/essentials/forms.html
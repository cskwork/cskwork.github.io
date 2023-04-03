---
title: "Vue Fundamentals"
description: "JavaScript framework to develop user interfaces.Builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based pro"
date: 2023-03-06T23:37:56.635Z
tags: []
---
## What is Vue ?

> JavaScript **framework** to develop** user interfaces.**

Builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.
```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')

<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```
The above example demonstrates the two core features of Vue:

- Declarative Rendering:
> **Describe HTML** output based on JavaScript state 

 Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.

- Reactivity: 
> **Update** DOM when JS state **changes**

 Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

## The Root Component
In Single file component we import the root component from another file (every app needs a root component that can contain other components as its children. 
Example)
```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```
.mount() 
> Returns root component to render an application instance

An application instance won't render until .mount() method is called. It expects a "container" argument that can be either an actual DOM element or selector string. 

```js
<div id="app"></div>
app.mount('#app')
```
Rule of thumb : .mount() method should be called after all app config. and asset registrations are done. (Return value is root component instance not app. instance) 

Think ! Root component's template (html) is loaded inside the mount container (js) !
```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```
```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

## Basic Syntax
```
v-bind:id = :id
v-on:click = @click
v-bind + v-on = @input || v-model
```

## Vue LifeCycle
mounted : called after component is mounted 
updated : called after component has updated DOM due to reactive state change
unmounted : called after component is unmounted

![](/images/7e7db42d-7cec-436f-8631-a7dc6c172dab-image.png)

## Key concepts

**Vue Instance**: The core object that controls a Vue app, responsible for managing data, methods, and lifecycle events.

```js
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
```

**Components**: Reusable, self-contained pieces of UI that can be nested and combined to create complex applications.

```js
Vue.component('hello-world', {
  template: '<p>{{ message }}</p>',
  data() {
    return {
      message: 'Hello, World!'
    };
  }
});
// Usage: <hello-world></hello-world>
```

**Reactive Data**: Vue's reactive data system allows the UI to update automatically when the underlying data changes.
```js
data() {
  return {
    message: 'Hello Vue!'
  };
}
```

**Directives**: Special HTML attributes that control the rendering and behavior of DOM elements. Some common directives include v-bind, v-model, v-if, v-for, and v-on.
```js
<!-- v-bind -->
<a v-bind:href="url">Link</a>

<!-- v-model -->
<input v-model="message" />

<!-- v-if -->
<p v-if="isVisible">Conditional Text</p>

<!-- v-for -->
<ul>
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</ul>

<!-- v-on -->
<button v-on:click="handleClick">Click Me</button>
```

**Props**: A way to pass data from a parent component to a child component, allowing for one-way communication and data flow.
```js
Vue.component('greeting', {
  props: ['name'],
  template: '<p>Hello, {{ name }}!</p>'
});

// Usage: <greeting name="John"></greeting>
```

**Events and Event Emitters**: A mechanism for communication between components, enabling child components to notify parent components of actions or changes.
```js
// Child Component
this.$emit('custom-event', payload);

// Parent Component
<child-component @custom-event="handleCustomEvent"></child-component>
```

**Computed Properties**: Functions that return a value based on the component's reactive data. These properties are cached and only re-evaluate when their dependencies change.
```js
computed: {
  reversedMessage() {
    return this.message.split('').reverse().join('');
  }
}

```

**Watchers**: Functions that react to changes in reactive data, allowing you to perform side effects or complex logic in response to data changes.
```js
watch: {
  message(newValue, oldValue) {
    console.log(`Message changed from ${oldValue} to ${newValue}`);
  }
}
```

**Lifecycle Hooks**: Methods that are called at specific points in a component's lifecycle, such as beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, and destroyed.
```js
created() {
  console.log('Component created');
},
mounted() {
  console.log('Component mounted');
}
```

**Vuex**: A state management library for Vue.js applications that centralizes application data, making it easier to manage and maintain.
```js
// Store
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

// Component
computed: {
  count() {
    return this.$store.state.count;
  }
},
methods: {
  increment() {
    this.$store.commit('increment');
  }
}
```

**Vue Router**: An official library for handling client-side routing in Vue.js applications, enabling navigation between different components based on URL changes.
```js
const routes = [
  { path: '/', component: HomeComponent },
  { path: '/about', component: AboutComponent }
];

const router = new VueRouter({ routes });

const app = new Vue({
  router
}).$mount('#app');
```

**Single File Components (SFCs)**: A way to define components using a single .vue file, which includes the template, script, and styles in a single, cohesive unit.
**Scoped CSS**: A feature of SFCs that allows you to scope CSS styles to a specific component, preventing unintended style inheritance or conflicts.
```js
<!-- MyComponent.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from MyComponent!'
    };
  }
};
</script>

<style scoped>
div {
  color: red;
}
</style>
```

**Mixins**: A way to reuse and share functionality across multiple components by merging properties and methods from shared objects.
```js
const sharedMixin = {
  created() {
    console.log('Mixin created');
  },
  methods: {
    sharedMethod() {
      console.log('Shared method');
    }
  }
};

const app = new Vue({
  mixins: [sharedMixin]
});
```

**Custom Directives**: A way to create reusable, custom directives that encapsulate DOM manipulation or behavior.
```js
Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
});

// Usage: <input v-focus />
```

**Server-side Rendering (SSR)**: A technique to pre-render Vue.js applications on the server, improving performance and search engine optimization (SEO).


## Reference
https://vuejs.org/guide/introduction.html#what-is-vue

https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
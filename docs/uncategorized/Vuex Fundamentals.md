---
title: "Vuex Fundamentals"
description: "Centralized store for all components.Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all th"
date: 2023-03-07T01:12:40.218Z
tags: []
---
## What is Vuex
> **Centralized store** for all components.

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.


## What is a "State Management Pattern"?

기본적인 vue앱의 작동 원리
```js
const Counter = {
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
}

createApp(Counter).mount('#app')
```

It is a self-contained app with the following parts:
- The state, the source of truth that drives our app
- The view, a declarative mapping of the state;
- The actions, the possible ways the state could change in reaction to user inputs from the view.

This is a simple representation of the concept of "one-way data flow":

![](/images/65502f0a-e48c-44cb-97fe-e2a3dcf07485-image.png)

However, the simplicity quickly breaks down when we have multiple components that share a common state:

## How did centralized component storage start?

Multiple views may depend on the same piece of state.
Actions from different views may need to mutate the same piece of state.

- For problem one, passing props can be tedious for deeply nested components, and simply doesn't work for sibling components. 
- For problem two, we often find ourselves resorting to solutions such as reaching for direct parent/child instance references or trying to mutate and synchronize multiple copies of the state via events. 
Both of these patterns are brittle and quickly lead to unmaintainable code.

> So why don't we extract the shared state out of the components, and manage it in a global singleton? 

With this, our component tree becomes a big "view", and any component can access the state or trigger actions, no matter where they are in the tree!

By defining and separating the concepts involved in state management and enforcing rules that maintain independence between views and states, we give our code more structure and maintainability.

This is the basic idea behind Vuex, inspired by Flux, Redux and The Elm Architecture. Unlike the other patterns, Vuex is also a library implementation tailored specifically for Vue.js to take advantage of its granular reactivity system for efficient updates.

If you want to learn Vuex in an interactive way you can check out this Vuex course on Scrimba, which gives you a mix of screencast and code playground that you can pause and play around with anytime.

![](/images/48e43920-2561-4410-a11d-d8f6142cbfdf-image.png)

## The Store
At the center of every Vuex application is the store. A "store" is basically a **container that holds your application state.** 

> There are two things that make a Vuex store different from a plain global object:

1 **Vuex stores are reactive.** 
When Vue components retrieve state from it, they will reactively and efficiently update if the store's state changes.

2 You **cannot directly mutate the store's state**. The only way to change a store's state is by explicitly **committing mutations**. This ensures every state change leaves a track-able record, and enables tooling that helps us better understand our applications.

Example
``` js
import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({ /* your root component */ })

// Install the store instance as a plugin
app.use(store)

// You can access the state object as store.state, 
// and trigger a state change with the store.commit method
store.commit('increment')
console.log(store.state.count) // -> 1
```

In a Vue component, you can access the store as this.$store. Now we can commit a mutation using a component method:
```js
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```
Again, the reason we are committing a mutation instead of changing store.state.count directly, is because we want to explicitly track it. 

This simple convention makes your intention more explicit, so that you can reason about state changes in your app better when reading the code. In addition, this gives us the opportunity to implement tools that can log every mutation, take state snapshots, or even perform time travel debugging.

- To track state changes explicitly, use mutations instead of changing store.state directly.
- To access store state in a component, return it in a computed property.
- To trigger changes, commit mutations in component methods.


## Reference
https://vuex.vuejs.org/
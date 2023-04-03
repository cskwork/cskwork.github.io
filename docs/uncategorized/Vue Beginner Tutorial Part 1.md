---
title: "Vue Beginner Tutorial Part 1"
description: "The core feature of Vue is declarative rendering: using a template syntax that extends HTML, 1 we can describe how the HTML should look like based on "
date: 2023-03-14T06:58:08.585Z
tags: []
---
## Declarative rendering
The core feature of Vue is **declarative rendering**: 

1 Using a template syntax that extends HTML we can describe how the HTML should look like based on **JavaScript state. **
2 When the state changes, the HTML updates automatically.

## Reactive State
State that can trigger updates when changed are considered reactive. 
In Vue, reactive state is held in components.

> We declare **reactive state **using the data component option

(reactive state) data option should be a function that returns an object:

```vue
<script>
export default {
  data() {
    return {
      message: 'Hello World!',
      abc: 'abc'
    }
  }
}

</script>

<template>
  <h1>{{ abc }}</h1>
  <h1>{{ message.split('').reverse().join('') }}</h1>
</template>
```
![](/images/66791803-0580-4f4a-bc78-5b9d572b3655-image.png)

## Attribute Bindings
A directive is a special attribute that starts with the v- prefix. 
They are part of Vue's template syntax. 
Similar to text interpolations, 

> Directive values are JavaScript expressions that have **access to the component's state.** 

The part after the colon (:id) is the "argument" of the directive. 

The element's id attribute will be synced with the dynamic Id property from the component's state.

ShortHand :
v-bind:id -> :id


```vue
<script>
export default {
  data() {
    return {
      titleClass: 'title'
    }
  }
}
</script>

<template>
  <h1 v-bind:class="titleClass">Make me red</h1> <!-- add dynamic class binding here -->
</template>

<style>
.title {
  color: red;
}
</style>
```
![](/images/2088bc3c-0ebc-4146-8b9d-8367a17f29b8-image.png)

## Event Listeners
We can listen to DOM events using the v-on directive

Inside a method, we can access the component instance using _this_. 

The component instance exposes the data properties declared by data. 
We can update the component state by mutating these properties.

Event handlers can also use inline expressions, and can simplify common tasks with modifiers.

ShortHand :
v-on:click -> @click

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
}
</script>

<template>
  <!-- make this button work -->
  <button @click="increment">count is: {{ count }}</button>
</template>
```

![](/images/90ab28de-9ec0-43cc-8085-4a08060a475a-image.png)

## Form Bindings
Using v-bind and v-on together, we can create two-way bindings on form input elements:

v-model **automatically syncs** the ```<input>```'s value with the bound state, so we no longer need to use an event handler for that.

v-model works not only on text inputs, but also on other input types such as checkboxes, radio buttons, and select dropdowns.

Shorthand : 
:value="text" @input="onInput" -> v-model="text"

```vue
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {      
  /*
  Refactored
    onInput(e) {
      this.text = e.target.value
    }
  */
  }
}
</script>

<template>
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```
![](/images/e096d560-1f1b-42bf-bb20-e46cbf425739-image.png)

## Conditional Rendering
v-if directive to conditionally render an element

```vue
<script>
export default {
  data() {
    return {
      awesome: true
    }
  },
  methods: {
    toggle() {
      // ...
      this.awesome = !this.awesome
    }
  }
}
</script>

<template>
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```
![](/images/0e8098ce-40c1-4e48-b8b8-cde869098a84-image.png)

## List Rendering
v-for directive to **render a list of elements** based on a source array

#### Ways to update a list
1 Call mutating methods on the source array:
```js
this.todos.push(newTodo)
```
2 Replace the array with a new one:
```js
this.todos = this.todos.filter(/* ... */)
```

```vue
<script>
// give each todo a unique id
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { id: id++, text: 'Learn HTML' },
        { id: id++, text: 'Learn JavaScript' },
        { id: id++, text: 'Learn Vue' }
      ]
    }
  },
  methods: {
    addTodo() {
      // ...
      const inputAddToDo = { id: this.todos.length + 1, text: this.newTodo };
      this.todos.push(inputAddToDo);
      this.newTodo = ''
    },
    removeTodo(id) {
      // ...
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add To Do</button>    
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo.id)">X</button>
    </li>
  </ul>
</template>
```
![](/images/f695b292-0c97-44de-9473-b212287ea685-image.png)

## Computed Property
We can declare a property that is reactively computed from other properties using the computed option

> A computed property is a property that is **automatically updated** based on other properties in the component's data or props objects. 

It caches the result and automatically updates it when its dependencies change.

The main benefit of using computed properties is that they can simplify complex logic in a component by breaking it down into smaller, more manageable pieces. 
Computed properties also provide a way to cache and reuse computed values, which can improve performance by avoiding unnecessary re-computations.

How do we render different list items based on that state?
HideCompleted Button!

```vue
<script>
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      todos: [
        { id: id++, text: 'Learn HTML', done: true },
        { id: id++, text: 'Learn JavaScript', done: true },
        { id: id++, text: 'Learn Vue', done: false }
      ]
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

## Reference
https://vuejs.org/tutorial/

https://vuejs.org/guide/essentials/template-syntax.html

https://vuejs.org/guide/essentials/event-handling.html

https://vuejs.org/guide/essentials/forms.html

https://vuejs.org/guide/essentials/conditional.html

https://vuejs.org/guide/essentials/list.html

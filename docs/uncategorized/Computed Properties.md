---
title: "Computed Properties"
description: "Reducing template clutterIn-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templat"
date: 2023-03-07T00:47:56.127Z
tags: []
---
> Reducing template clutter

**In-template expressions** are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example, if we have an object with a nested array:
```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```
```
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

Too much clutter!

That's why for complex logic that includes reactive data, it is recommended to use a computed property. Here's the same example, refactored:

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```
```html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```
Here we have declared a computed property publishedBooksMessage.

Try to change the value of the books array in the application data and you will see how publishedBooksMessage is changing accordingly.

You can data-bind to computed properties in templates just like a normal property. Vue is aware that this.publishedBooksMessage depends on this.author.books, so it will update any bindings that depend on this.publishedBooksMessage when this.author.books changes.

## Difference between computed caching and methods (used as event listeners) 
Computed property will never update because Date.now() is not a reactive dependency 
```js
computed: {
  now() {
    return Date.now()
  }
}
```
But method invocation will always run the function whenever re-render happens. 
But what's the use of caching?
- Imagine we have an expensive computed property list, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on list. **Without caching, we would be executing list’s getter many more times than necessary**! In cases where you do not want caching, use a method call instead.

## Writable Computed
Computed properties are by default getter-only. But can be aaigned a new value by you need both a getter and setter.
```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```



## Reference
https://vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods
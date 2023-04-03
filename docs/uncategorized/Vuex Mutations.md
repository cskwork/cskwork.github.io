---
title: "Vuex Mutations"
description: "Mutations changes global state, track changes.Similar to events/settersHave type : commit mutations and Handler : changes state.Mutations must be sync"
date: 2023-03-07T01:38:51.427Z
tags: []
---

Mutations changes global state, track changes.
It is similar to events/setters
Has two properties
- Type : commit mutations 
- Handler : changes state.

Mutations are synchronous transactions. 

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) { // increment is type of mutation
            state.count++ // handler is going to increment count
        }
        // 2nd mutation
        incrementBy (state, n) {
            state.count += n
        }
        // 2nd mutation
        incrementByMulti (state, payload) {
            state.count += payload.amount
        }
        
    }
});

import { mapState } from 'vuex';

new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: mapState([
        'count'
    ]),
    methods: {
        increment () {
            this.$store.commit('increment')
        }
    }
});

// This commits, calls a mutation (pass in type of mutation to commit.
// Gets mutations and calls handler.
store.commit('increment');

// Ths increase count by 8
store.commit('incrementBy', 8); // 8

// To pass in lots of data 
store.commit('incrementByMulti', { amount : 29 }); // 28
// Another way
store.commit({
    type: 'incrementByMulti',
    amount: 40
})
console.log(store.state.count);

// Vuex is reactive, mutations must follow init. stored state explicitly.

// NonIdeal - Best way is to create all data upfront
// One way to use vue.set
// Vue.set(obj, 'new prop', 123)
// Another way is usint spread operator
// state.obj = { ...state.obj, newProp: 123 }

// Commiting mutations in application 
```html
<html>
    <head>
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div id="app">
            {{count}}
            <button @click='increment'>+</button>
        </div>
        <script src="index.pack.js"></script>
    </body>
</html>
```
```js
	// When increment button is clicked this is called 
    methods: {
        increment () {
            this.$store.commit('increment')
        }
    }
    // This can be replaced by mapMutations
     methods: mapMutations([
        'increment',
        'incrementBy'
    ])
```

### mapmutations
mapMutations는 vuex에서 글로벌 상태에 변화를 주는 store.commit 과정을 간소화한 mapGlobalStateSetter(자체 명칭)!
Vue state, getter, methods, computed 등에 대한 개념을 우선 이해해야함. 


## Reference
https://scrimba.com/scrim/ckMZp4HN?pl=pnyzgAP
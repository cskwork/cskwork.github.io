```html
<template>
  <ion-list>
    <ion-item>
      <ion-input
        v-model="inputModel" 
        label="Alphanumeric Characters"
      ></ion-input>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
  import { IonInput, IonItem, IonList } from '@ionic/vue';
  import { defineComponent, ref, watch } from 'vue';

  export default defineComponent({
    components: { IonInput, IonItem, IonList },
    setup() {
      const inputModel = ref('');

      /**
       * flush: 'post' runs the callback
       * after the Vue ion-input component
       * has updated.
       * See https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing
       * for more information.
       */
      watch(inputModel, (newValue) => {
        inputModel.value = newValue.replace(/[^a-zA-Z0-9]+/g,'');
      }, { flush: 'post'});
      
      return { inputModel };
    }
  });
</script>
```

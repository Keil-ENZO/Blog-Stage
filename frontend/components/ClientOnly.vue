<!-- This file aims to create a Vue.js component that will only be mounted on the client side. This prevents the component's content from being displayed before the client-side JavaScript has been executed. 
We had to do this because the HeadlessUI library does not work on the server side and caused errors during the static site generation (hydration errors). -->
<template>
  <div v-if="hasMounted">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasMounted: false,
    };
  },
  mounted() {
    this.hasMounted = true;
  },
};
</script>

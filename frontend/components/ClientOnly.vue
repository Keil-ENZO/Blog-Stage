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

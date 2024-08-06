<template>
  <section>
    <article>Test.vue</article>
    <Button variant="destructive">Click me</Button>
  </section>
</template>

<script setup>
import client from "../api.js";

console.log(client.getArticles());
</script>

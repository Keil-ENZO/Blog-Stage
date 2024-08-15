<script setup>
import { useRoute } from "vue-router";
import client from "../api.js";

const route = useRoute();
const companyId = route.params.id;

client.getCompany(companyId).then((response) => {
  console.log(response.data);
});

console.log(companyId);
</script>

<template>
  <div>
    <h1>Article {{ companyId }}</h1>
  </div>
</template>

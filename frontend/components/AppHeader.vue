<template>
  <header class="bg-slate-600">
    <div>
      <NuxtLink to="/">
        <img src="~/public/favicon.ico" alt="Logo" />
      </NuxtLink>
    </div>
    <nav>
      <ul>
        <li v-for="item in navigation" :key="item.name">
          <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const navigation = ref([
  { name: "Home", link: "/" },
  { name: "Test", link: "/test" },
]);
</script>

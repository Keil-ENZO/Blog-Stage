<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        required
        class="text-black m-3"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="text-black m-3"
      />
      <button type="submit" class="bg-green-800">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import client from "../api.js";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  errorMessage.value = "";
  try {
    const response = await client.login(username.value, password.value);
    localStorage.setItem("token", response.data.token);
    router.push("/").reload();
  } catch (error) {
    errorMessage.value = "Invalid username or password";
    console.error("Login error:", error);
  }
};
</script>

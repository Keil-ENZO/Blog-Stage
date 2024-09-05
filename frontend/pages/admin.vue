<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <Input
        v-model="username"
        type="text"
        placeholder="Username"
        required
        class="m-3"
        @input="sanitizeUsername"
      />
      <Input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="m-3"
      />
      <Button class="m-3" type="submit">Login</Button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import client from "../api.js";

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const sanitizeUsername = () => {
  username.value = username.value.replace(/[^a-zA-Z0-9]/g, "");
};

const login = async () => {
  errorMessage.value = "";

  if (!username.value || !password.value) {
    errorMessage.value = "Username and password are required.";
    return;
  }

  if (username.value.length < 3 || password.value.length < 6) {
    errorMessage.value = "Username or password is too short.";
    return;
  }

  try {
    const response = await client.login(username.value, password.value);

    localStorage.setItem("token", response.data.token);
    window.location.href = "/";
  } catch (error) {
    errorMessage.value = "Invalid username or password";
    console.error("Login error:", error);
  }
};
</script>

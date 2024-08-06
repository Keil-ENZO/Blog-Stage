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
import { useRouter } from "vue-router"; // Utilisez vue-router pour la navigation
import client from "../api.js";

const username = ref("");
const password = ref("");
const errorMessage = ref(""); // Pour afficher les messages d'erreur
const router = useRouter();

const login = async () => {
  errorMessage.value = ""; // Réinitialiser le message d'erreur
  try {
    // Passez username et password comme arguments
    const response = await client.login(username.value, password.value);
    localStorage.setItem("token", response.data.token); // Stocker le token dans localStorage
    router.push("/"); // Redirection vers la page d'accueil après la connexion réussie
  } catch (error) {
    errorMessage.value = "Invalid username or password"; // Message d'erreur à afficher
    console.error("Login error:", error);
  }
};
</script>

<template>
  <Disclosure as="nav" class="bg-background" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-ring hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              :id="open ? 'main-menu-open' : 'main-menu-closed'"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Menu v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <X v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <li
              v-for="item in updatedNavigation"
              :key="item.name"
              class="list-none"
            >
              <NuxtLink
                :to="item.link"
                :class="[
                  item.current
                    ? 'bg-muted text-primary'
                    : 'bg-background hover:bg-accent hover:text-accent-foreground',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Button v-if="isAuthenticated" class="mx-2">
              <Plus class="w-4 h-4 mr-2" />
              New Article
            </Button>
            <Button
              v-if="isAuthenticated"
              @click="logout"
              class="mx-2"
              variant="outline"
              size="icon"
            >
              <LogOut class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <li
          v-for="item in updatedNavigation"
          :key="item.name"
          class="list-none"
        >
          <NuxtLink
            :class="[
              item.current
                ? 'bg-muted text-primary'
                : 'bg-background hover:bg-accent hover:text-accent-foreground',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :to="item.link"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { LogOut, Menu, Plus, X } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getUserRole } from "../utils/auth.js";

const userRole = ref(null);
const isAuthenticated = ref(false);

onMounted(() => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token; // Vérifie si le token est présent
  if (isAuthenticated.value) {
    userRole.value = getUserRole(); // Décode le token pour obtenir le rôle
  }
});

const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    isAuthenticated.value = false; // Met à jour le statut de l'authentification
    // Redirection après déconnexion
    window.location.href = "/"; // Assurez-vous que la route existe
    console.log("User logged out");
  }
};

const route = useRoute();
const currentPath = computed(() => route.path);

const navigation = ref([
  { name: "Home", link: "/", current: false },
  { name: "Entreprises", link: "/entreprise", current: false },
  { name: "Articles", link: "/article", current: false },
  { name: "Contact", link: "/contact", current: false },
]);

const updatedNavigation = computed(() => {
  return navigation.value.map((item) => ({
    ...item,
    current: item.link === currentPath.value,
  }));
});
</script>

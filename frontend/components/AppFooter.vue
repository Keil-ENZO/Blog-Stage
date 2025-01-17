<template>
  <footer class="bg-card" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="flex justify-around flex-col md:flex-row">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-sm font-semibold leading-6 text-primary">
              Navigation
            </h3>
            <ul role="list" class="mt-6 space-y-4">
              <li v-for="item in navigation.navigation" :key="item.name">
                <a
                  :href="item.href"
                  class="text-sm leading-6 text-ring hover:text-primary"
                >
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
          <div class="mt-8 md:mt-0">
            <h3 class="text-sm font-semibold leading-6 text-primary">Légal</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li v-for="item in navigation.legal" :key="item.name">
                <a
                  :href="item.href"
                  class="text-sm leading-6 text-ring hover:text-primary"
                >
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-10 xl:mt-0">
          <h3 class="text-sm font-semibold leading-6 text-primary">
            Abonnez-vous à la newsletter
          </h3>
          <p class="mt-2 text-sm leading-6 text-ring max-w-[400px]">
            Les dernières articles envoyés dans votre boîte de réception.
          </p>
          <form
            @submit.prevent="subscribeNewsletter"
            class="mt-6 sm:flex sm:max-w-md"
          >
            <div class="flex w-full max-w-sm items-center gap-1.5">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                v-model="email"
                class="form-input"
                required
              />
              <Button type="submit" class="btn-primary">S'inscrire</Button>
            </div>
          </form>
          <p
            v-if="message"
            :class="{ 'text-success': success, 'text-error': !success }"
            class="mt-2 text-sm leading-6"
          >
            {{ message }}
          </p>
        </div>
      </div>
      <div
        class="mt-16 border-t border-border pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24"
      >
        <div class="flex space-x-6 md:order-2">
          <a
            v-for="item in navigation.social"
            :key="item.name"
            :href="item.href"
            class="text-ring hover:text-primary"
          >
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <p class="mt-8 text-xs leading-5 text-ring md:order-1 md:mt-0">
          &copy; 2024 Blog KEIL Enzo. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Github, Linkedin, Mail } from "lucide-vue-next";
import { ref } from "vue";
import client from "../api.js";

const email = ref("");
const message = ref("");
const success = ref(false);

const subscribeNewsletter = async () => {
  if (!email.value) {
    message.value = "L'email est requis.";
    success.value = false;
    return;
  }
  if (!email.value.includes("@") || !email.value.includes(".")) {
    message.value = "Veuillez entrer une adresse email valide.";
    success.value = false;
    return;
  }

  try {
    await client.subscribeNewsletter(email.value);
    email.value = "";
    message.value = "Vous êtes maintenant inscrit à la newsletter.";
    success.value = true;
  } catch (error) {
    message.value = "Une erreur est survenue, veuillez réessayer.";
    success.value = false;
  }
};

// Navigation pour le footer
const navigation = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Entreprises", href: "/entreprises" },
    { name: "Articles", href: "/articles" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    {
      name: "Politique de Confidentialité",
      href: "/politique-confidentialite",
    },
    {
      name: "Conditions Générales d'Utilisation",
      href: "/conditions-utilisation",
    },
    { name: "Mentions Légales", href: "/mentions-legales" },
  ],
  social: [
    { name: "Mail", href: "mailto:enzo.keil06@icloud.com", icon: Mail },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/feed/",
      icon: Linkedin,
    },
    { name: "GitHub", href: "https://github.com/Keil-ENZO", icon: Github },
    {
      name: "X",
      href: "https://x.com/Keil_ENZO",
      icon: defineComponent({
        render: () =>
          h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              d: "M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z",
            }),
          ]),
      }),
    },
  ],
};
</script>

<style>
.text-error {
  color: red;
}
</style>

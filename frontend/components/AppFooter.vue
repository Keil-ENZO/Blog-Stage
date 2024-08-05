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
                  >{{ item.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-10 xl:mt-0">
          <h3 class="text-sm font-semibold leading-6 text-primary">
            Abonnez-vous à la newsletter
          </h3>
          <p class="mt-2 text-sm leading-6 text-ring max-w-[400px]">
            Les dernières articles envoyés chaque semaine dans votre boîte de
            réception.
          </p>
          <form class="mt-6 sm:flex sm:max-w-md">
            <div class="flex w-full max-w-sm items-center gap-1.5">
              <Input id="email" type="email" placeholder="Email" />
              <Button type="submit"> S'inscrire </Button>
            </div>
          </form>
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
import { Github, Linkedin } from "lucide-vue-next";
import { defineComponent, h } from "vue";

const navigation = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Entreprises", href: "/entreprise" },
    { name: "Articles", href: "/article" },
    { name: "Contact", href: "/contact" },
  ],

  social: [
    {
      nam: "LinkedIn",
      href: "https://www.linkedin.com/feed/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/Keil-ENZO",
      icon: Github,
    },
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

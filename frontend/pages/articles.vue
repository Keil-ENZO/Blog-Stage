<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-priamry sm:text-4xl">
          Contexte et présentation de l’entreprise
        </h2>
        <p class="mt-2 text-lg leading-8 text-ring">
          Venez découvrir les entreprises dans lesquelles j'ai travaillé
        </p>
      </div>
      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-border pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          class="flex max-w-xl flex-col items-start justify-between p-5 rounded-lg"
          v-for="article in articles"
          :key="article._id"
        >
          <a :href="`/article/${article._id}`" class="cursor-pointer">
            <img :src="article.img" alt="Img" />
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="article.created" class="text-ring">
                {{ formatedDate(article.created) }}
              </time>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-primary">
                <p>
                  <span class="absolute inset-0"></span>
                  {{ article.title }}
                </p>
              </h3>
              <p
                class="mt-5 line-clamp-3 text-sm leading-6 text-ring"
                v-html="article.content"
              ></p>
            </div>

            <div class="flex gap-2">
              <Badge
                variant="secondary"
                class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground mt-5"
                v-for="tag in article.tags"
              >
                {{ tag }}
              </Badge>
            </div>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import client from "../api.js";

const articles = ref([]);

client
  .getArticles()
  .then((response) => {
    articles.value = response.data;
    console.log(response.data);
  })
  .catch((error) => {
    alert("An error occurred while fetching articles" + error);
  });

function formatedDate(date) {
  const givenDate = new Date(date);
  const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10));

  if (givenDate < tenDaysAgo) {
    return format(givenDate, "dd MMMM yyyy", { locale: fr });
  } else {
    return formatDistanceToNow(givenDate, {
      addSuffix: true,
      locale: fr,
    });
  }
}
</script>

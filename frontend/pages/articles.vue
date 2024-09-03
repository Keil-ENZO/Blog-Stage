<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-priamry sm:text-4xl">
          Articles
        </h2>
        <p class="mt-2 text-lg leading-8 text-ring">
          Venez découvrir les derniers articles publiés
        </p>
      </div>

      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 border-t border-border pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article v-for="article in articles" :key="article._id">
          <a
            class="flex flex-col items-start justify-between cursor-pointer"
            :href="`/article/${article._id}`"
          >
            <div class="relative w-full">
              <img
                :src="article.img"
                :alt="article.img"
                class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
              />
            </div>
            <div class="w-full">
              <div
                class="w-full flex flex-col md:flex-row justify-between md:items-center"
              >
                <div class="mt-8 flex items-center gap-x-4 text-xs">
                  <time :datetime="article.created" class="text-ring">
                    {{ formatedDate(article.created) }}
                  </time>
                </div>
                <div class="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground mt-5"
                    v-for="tag in article.tags"
                  >
                    {{ tag }}
                  </Badge>
                </div>
              </div>
              <div class="group relative">
                <h3
                  class="mt-5 text-lg font-semibold line-clamp-3 leading-6 text-primary"
                >
                  {{ article.title }}
                </h3>
                <p
                  class="mt-3 line-clamp-3 text-sm leading-6 text-ring lowercase"
                  v-html="formatContent(article.content)"
                ></p>
              </div>
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

function formatContent(content) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(content, "text/html");

  let images = doc.querySelectorAll("img");
  images.forEach((img) => img.remove());

  let h2 = doc.querySelectorAll("h2");
  h2.forEach((h2) => {
    h2.outerHTML = `<p>${h2.innerHTML}</p>`;
  });

  let h3 = doc.querySelectorAll("h3");
  h3.forEach((h3) => {
    h3.outerHTML = `<p>${h3.innerHTML}</p>`;
  });

  return doc.body.innerHTML.toLowerCase();
}
</script>

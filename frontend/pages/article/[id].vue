<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-center">
      <div class="mx-auto max-w-3xl lg:mx-0 flex flex-col-reverse sm:flex-row justify-between w-full">
        <div> 
          <h2 class="text-3xl font-bold tracking-tight text-priamry sm:text-4xl">
          {{ article.name }}
        </h2>
        <time datetime="2020-03-16" class="text-ring mr-5">{{
          article.dateDuring
        }}</time>
        <Badge
          variant="secondary"
          class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground"
        >
          {{ article.country }} - {{ article.city }}
        </Badge>
      </div>

         <div class="relative mt-8 flex items-center gap-x-4 mb-5 sm:mb-0">
              <img
                src="/assets/img/kevin.jpg"
                alt=""
                class="h-10 w-10 rounded-full bg-ring"
              />
              <div class="text-sm leading-6">
                <p class="font-semibold text-primary">
                  <p>
                    <span class="absolute inset-0"></span>
                    {{ article.director }}
                  </p>
                </p>
              </div>
            </div>
       
      </div>

        <div class="mx-auto max-w-3xl lg:mx-0 flex flex-col-reverse sm:flex-row justify-between w-full mt-12">
          <p>{{ article.description }}</p>
        </div>

    </div>
          
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import client from "../api.js";

const route = useRoute();
const articleId = route.params.id;
const article = ref({});

client.getArticle(articleId).then((response) => {
  article.value = response.data;
});
</script>

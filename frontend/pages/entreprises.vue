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
          v-for="company in companies"
          :key="company._id"
        >
          <a :href="`/entreprise/${company._id}`" class=" cursor-pointer">
            <div class="flex items-center gap-x-4 text-xs">
              <time datetime="2020-03-16" class="text-ring">{{
                company.dateDuring
              }}</time>
                <Badge variant="secondary"  class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground">
                   {{ company.country }} - {{ company.city }} 
              </Badge>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-primary">
                <p>
                  <span class="absolute inset-0"></span>
                  {{ company.name }}
                </p>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-ring">
                {{ company.description }}
              </p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img
                src="/assets/img/kevin.jpg"
                alt=""
                class="h-10 w-10 rounded-full bg-ring"
              />
              <div class="text-sm leading-6">
                <p class="font-semibold text-primary">
                  <p>
                    <span class="absolute inset-0"></span>
                    {{ company.director }}
                  </p>
                </p>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import client from "../api.js";

const companies = ref([]);

client
  .getCompanies()
  .then((response) => {
    companies.value = response.data;
  }) 
  .catch((error) => {
    console.log(error);
  });
</script>

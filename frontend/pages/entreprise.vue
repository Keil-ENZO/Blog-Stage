<template>
  <div class="py-24 sm:py-32">
    <div
      class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      <div
        class="mx-auto max-w-3xl lg:mx-0 flex flex-col-reverse sm:flex-row justify-between w-full"
      >
        <div>
          <h2
            class="text-3xl font-bold tracking-tight text-priamry sm:text-4xl"
          >
            {{ company.name }}
          </h2>
          <time datetime="2020-03-16" class="text-ring mr-5">{{
            company.dateDuring
          }}</time>
          <Badge
            variant="secondary"
            class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground"
          >
            {{ company.country }} - {{ company.city }}
          </Badge>
        </div>

        <div class="relative mt-8 flex items-center gap-x-4 mb-5 sm:mb-0">
          <img
            :src="company.imgUrl"
            :alt="company.name"
            class="h-10 w-10 rounded-full bg-ring"
          />
          <div class="text-sm leading-6">
            <p class="font-semibold text-primary">
              <span class="absolute inset-0"></span>
              {{ company.director }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="mx-auto max-w-3xl lg:mx-0 flex flex-col-reverse sm:flex-row justify-between w-full mt-12"
      >
        <p>{{ company.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import client from "../api.js";

const route = useRoute();
const companyId = route.query.id;
const company = ref({});

client.getCompany(companyId).then((response) => {
  company.value = response.data;
});
</script>

<template>
  <div class="py-24 sm:py-32">
    <div
      class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      <div
        class="mx-auto max-w-3xl lg:mx-0 flex flex-col-reverse sm:flex-row justify-between w-full"
      >
        <div class="max-w-[350px]">
          <h2
            class="text-3xl font-bold tracking-tight text-priamry sm:text-4xl break-words"
          >
            {{ article.title }}
          </h2>
        </div>

        <div class="relative mt-8 flex flex-col items-end gap-x-4 mb-5 sm:mb-0">
          <time :datetime="article.created" class="text-ring text-xs">
            {{ formatedDate(article.created) }}
          </time>
          <div class="flex gap-2">
            <Badge
              variant="secondary"
              class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground mt-5"
              v-for="tag in article.tags"
            >
              {{ tag }}
            </Badge>
          </div>
        </div>
      </div>

      <div
        class="mx-auto max-w-3xl lg:mx-0 flex flex-col-reverse sm:flex-row justify-between w-full mt-12"
      >
        <div v-html="article.content"></div>
        <!-- <p>{{ article.content }}</p> -->
      </div>

      <Alert
        class="border-border border p-8 rounded-md flex flex-col max-w-3xl mt-12"
      >
        <AlertTitle class="mb-3 font-medium text-lg leading-none tracking-tight"
          >💡 Tips</AlertTitle
        >
        <AlertDescription class="text-sm font-light">
          {{ article.tips }}
        </AlertDescription>
      </Alert>
    </div>
  </div>
</template>

<script setup>
import { format, formatDistanceToNow, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { useRoute } from "vue-router";
import client from "../api.js";

const route = useRoute();
const articleId = route.params.id;
const article = ref({});

client.getArticle(articleId).then((response) => {
  article.value = response.data;
});

function formatedDate(date) {
  const givenDate = new Date(date);

  if (!isValid(givenDate)) {
    return;
  }

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

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

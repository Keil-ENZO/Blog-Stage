<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Contexte et présentation de l’entreprise
        </h2>
        <p class="mt-2 text-lg leading-8 text-ring">
          Venez découvrir les entreprises dans lesquelles j'ai travaillé
        </p>
        <template v-if="isAuthenticated">
          <Dialog>
            <DialogTrigger as-child class="flex justify-start">
              <Button class="mx-2">
                <Plus class="w-4 h-4 mr-2" />
                New Company
              </Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>New Company</DialogTitle>
                <Tabs
                  default-value="firstStep"
                  class="w-full flex flex-col items-center justify-center mt-5"
                >
                  <TabsList>
                    <TabsTrigger value="firstStep"> 1 Step </TabsTrigger>
                    <TabsTrigger value="secondStep"> 2 Step </TabsTrigger>
                  </TabsList>
                  <TabsContent value="firstStep" class="flex flex-col gap-3">
                    <Input type="text" placeholder="Name" v-model="name" />
                    <Input
                      type="text"
                      placeholder="Description"
                      v-model="description"
                    />
                    <Input
                      type="file"
                      ref="fileInput"
                      @change="handleFileUpload"
                    />
                    <p v-if="imgUrl">
                      <img
                        :src="imgUrl"
                        class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                      />
                    </p>
                  </TabsContent>
                  <TabsContent value="secondStep" class="flex flex-col gap-3">
                    <Input type="text" placeholder="City" v-model="city" />
                    <Input
                      type="text"
                      placeholder="Country"
                      v-model="country"
                    />
                    <Input
                      type="text"
                      placeholder="Director"
                      v-model="director"
                    />
                    <Input
                      type="text"
                      placeholder="Date during"
                      v-model="dateDuring"
                    />

                    <div
                      class="w-full flex items-center justify-end gap-x-2 mt-5"
                    >
                      <Button v-if="!isPublish" @click="publishCompany">
                        Publish
                      </Button>

                      <Button v-else disabled>
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Please wait
                      </Button>
                    </div>
                  </TabsContent>
                  <p v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </p>
                </Tabs>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </template>
      </div>
      <div
        class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-border pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          class="flex max-w-xl flex-col items-start justify-between p-5 rounded-lg"
          v-for="company in companies"
          :key="company._id"
        >
          <a :href="`/entreprise/${company._id}`" class="cursor-pointer">
            <div class="flex items-center gap-x-4 text-xs">
              <time datetime="2020-03-16" class="text-ring">{{
                company.dateDuring
              }}</time>
              <Badge
                variant="secondary"
                class="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-secondary-forground"
              >
                {{ company.country }} - {{ company.city }}
              </Badge>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-primary">
                {{ company.name }}
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-ring">
                {{ company.description }}
              </p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
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
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Loader2, Plus } from "lucide-vue-next";
import client from "../api.js";
import { getUserRole } from "../utils/auth.js";

const userRole = ref(null);
const isAuthenticated = ref(false);

const companies = ref([]);

const name = ref("");
const description = ref("");
const imgUrl = ref("");
const city = ref("");
const country = ref("");
const director = ref("");
const dateDuring = ref("");

const errorMessage = ref("");
const csrfToken = ref("");
const isPublish = ref(false);

onMounted(() => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token;
  if (isAuthenticated.value) {
    userRole.value = getUserRole();
  }
});

const publishCompany = async () => {
  try {
    csrfToken.value = await client.getCsrfToken();

    const dataCompany = {
      name: name.value,
      description: description.value,
      imgUrl: imgUrl.value,
      city: city.value,
      country: country.value,
      director: director.value,
      dateDuring: dateDuring.value,
    };

    const response = await client.addCompany(
      dataCompany,
      csrfToken.value.data.csrfToken
    );

    window.location.href = `/entreprise/${response.data._id}`;

    isPublish.value = true;
  } catch (error) {
    errorMessage.value = "Error publishing company, please try again." + error;

    isPublish.value = false;
  }
};

const handleFileUpload = async (event) => {
  const fileInput = event.target;

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await client.uploadImage(formData);
      imgUrl.value = response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    console.error("No file selected or input is invalid.");
  }
};

client
  .getCompanies()
  .then((response) => {
    companies.value = response.data;
  })
  .catch((error) => {
    alert("An error occurred while fetching companies" + error);
  });

isPublish.value = false;
</script>

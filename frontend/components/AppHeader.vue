<template>
  <Disclosure as="nav" class="bg-background" v-slot="{ open: slotOpen }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <DisclosureButton
              :id="'main-menu-' + (open ? 'open' : 'closed')"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-ring hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Menu v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <X v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <li
              v-for="item in updatedNavigation"
              :key="item.link"
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
                class="cursor-pointer"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <template v-if="isAuthenticated">
              <Dialog>
                <DialogTrigger as-child class="flex justify-start">
                  <Button class="mx-2">
                    <Plus class="w-4 h-4 mr-2" />
                    New Article
                  </Button>
                </DialogTrigger>

                <DialogContent class="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Article</DialogTitle>
                    <Tabs
                      default-value="firstStep"
                      class="w-full flex flex-col items-center justify-center mt-5"
                    >
                      <TabsList>
                        <TabsTrigger value="firstStep"> 1 Step </TabsTrigger>
                        <TabsTrigger value="secondStep"> 2 Step </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="firstStep"
                        class="flex flex-col gap-3"
                      >
                        <Input
                          type="text"
                          placeholder="Title"
                          v-model="title"
                        />
                        <!-- Mettre input file for upload img -->
                        <TagsInput v-model="tags">
                          <TagsInputItem
                            v-for="item in tags"
                            :key="item"
                            :value="item"
                          >
                            <TagsInputItemText />
                            <TagsInputItemDelete />
                          </TagsInputItem>

                          <TagsInputInput placeholder="Tags..." />
                        </TagsInput>
                      </TabsContent>
                      <TabsContent value="secondStep">
                        <client-only class="relative max-w-full">
                          <EditorContent :editor="editor" class="max-w-full" />
                          <Input
                            type="file"
                            ref="fileInput"
                            @change="handleFileUpload"
                          />
                          <div
                            class="w-full flex items-center justify-end gap-x-2 mt-5"
                          >
                            <div>
                              <Button v-if="!isPublish" @click="publishArticle">
                                Publish
                              </Button>

                              <Button v-else disabled>
                                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                                Please wait
                              </Button>
                            </div>
                          </div>
                        </client-only>
                      </TabsContent>
                    </Tabs>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                @click="logout"
                class="mx-2"
                variant="outline"
                size="icon"
              >
                <LogOut class="w-4 h-4" />
              </Button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <li
          v-for="item in updatedNavigation"
          :key="item.link"
          class="list-none"
        >
          <NuxtLink
            :class="[
              item.current
                ? 'bg-muted text-primary'
                : 'bg-background hover:bg-accent hover:text-accent-foreground',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            class="cursor-pointer"
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
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import { Loader2, LogOut, Menu, Plus, X } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import client from "../api.js"; // Assurez-vous que `client` est configuré pour faire des appels API
import { getUserRole } from "../utils/auth.js";

const userRole = ref(null);
const isAuthenticated = ref(false);

const route = useRoute();
const currentPath = computed(() => route.path);

const navigation = ref([
  { name: "Home", link: "/", current: false },
  { name: "Entreprises", link: "/entreprises", current: false },
  { name: "Articles", link: "/articles", current: false },
  { name: "Contact", link: "/contact", current: false },
]);

const csrfToken = ref("");
const isPublish = ref(false);

const tags = ref([]);
const title = ref("");
const content = ref("");
const img = ref(""); // URL de l'image
const likes = ref(0);

const editor = useEditor({
  extensions: [StarterKit],
  content: content.value,
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML();
  },
});

onMounted(() => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token;
  if (isAuthenticated.value) {
    userRole.value = getUserRole();
  }
});

const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    isAuthenticated.value = false;
    window.location.href = "/";
    console.log("User logged out");
  }
};

const updatedNavigation = computed(() => {
  return navigation.value.map((item) => ({
    ...item,
    current: item.link === currentPath.value,
  }));
});

client.getTags().then((response) => {
  tags.value = response.data.map((tag) => tag.name);
});

const handleFileUpload = async (event) => {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await client.uploadImage(formData); // Assurez-vous que `client.uploadImage` est bien configuré
      img.value = response.data.imageUrl; // URL de l'image renvoyée par le serveur
      console.log("Image URL:", img.value); // Pour vérifier que l'URL est correcte
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

const publishArticle = async () => {
  try {
    csrfToken.value = await client.getCsrfToken();

    const articleData = {
      title: title.value,
      content: content.value,
      tags: tags.value,
      img: img.value, // Vérifie que img.value contient l'URL de l'image
      likes: likes.value,
      created: new Date(),
      updated: new Date(),
    };

    const response = await client.addArticle(
      articleData,
      csrfToken.value.data.csrfToken
    );
    window.location.href = `/article/${response.data._id}`;
    isPublish.value = true;
  } catch (error) {
    console.error("Error publishing article:", error); // Affiche les détails de l'erreur
    alert("An error occurred while publishing the article");
    isPublish.value = false;
  }
};

isPublish.value = false;
</script>

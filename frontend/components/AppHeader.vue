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

                          <div>
                            <p class="text-sm text-muted-foreground mt-5">
                              Press
                              <kbd
                                class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
                              >
                                <span class="text-xs">⌘</span>J
                              </kbd>
                            </p>
                            <CommandDialog v-model:open="open">
                              <CommandInput
                                placeholder="Type a command or search..."
                              />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Tools">
                                  <CommandItem
                                    value="H3"
                                    @click="
                                      editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 3 })
                                        .run()
                                    "
                                    :class="{
                                      'is-active': editor.isActive('heading', {
                                        level: 3,
                                      }),
                                    }"
                                  >
                                    H3
                                  </CommandItem>
                                  <CommandItem
                                    value="H2"
                                    @click="
                                      editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 2 })
                                        .run()
                                    "
                                    :class="{
                                      'is-active': editor.isActive('heading', {
                                        level: 2,
                                      }),
                                    }"
                                  >
                                    H2
                                  </CommandItem>
                                  <CommandItem
                                    value="Bold"
                                    @click="
                                      editor.chain().focus().toggleBold().run()
                                    "
                                    :class="{
                                      'is-active': editor.isActive('bold'),
                                    }"
                                  >
                                    Bold
                                  </CommandItem>
                                  <CommandItem
                                    value="Italic"
                                    @click="
                                      editor
                                        .chain()
                                        .focus()
                                        .toggleItalic()
                                        .run()
                                    "
                                    :class="{
                                      'is-active': editor.isActive('italic'),
                                    }"
                                  >
                                    Italic
                                  </CommandItem>
                                  <CommandItem
                                    value="Add Image"
                                    @click="addImageToEditor"
                                  >
                                    Add Image
                                  </CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </CommandDialog>
                          </div>
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
                      <p v-if="errorMessage" class="error-message">
                        {{ errorMessage }}
                      </p>
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
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import { useMagicKeys } from "@vueuse/core";
import { Loader2, LogOut, Menu, Plus, X } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import client from "../api.js";
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

const errorMessage = ref("");

const csrfToken = ref("");
const isPublish = ref(false);

const tags = ref([]);
const title = ref("");
const content = ref("");
const likes = ref(0);
const imgUrl = ref("");

const open = ref(false);
const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) e.preventDefault();
  },
});

onMounted(() => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token;
  if (isAuthenticated.value) {
    userRole.value = getUserRole();
  }
});

let editor = useEditor({
  extensions: [
    StarterKit,
    Heading.configure({
      levels: [2, 3],
    }),
    Bold,
    Italic,
    Placeholder.configure({
      placeholder: "Write something …",
    }),
    Image,
  ],
  content: content.value,
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML();
  },
});

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

const addImageToEditor = () => {
  if (editor.value) {
    const url = window.prompt("Enter the image URL to insert:");

    if (url) {
      editor.value.chain().focus().setImage({ src: url }).run();
    }
  } else {
    console.error("Editor is not initialized or available.");
  }
};

const publishArticle = async () => {
  try {
    csrfToken.value = await client.getCsrfToken();

    if (!title.value || !content.value || !tags.value || !imgUrl.value) {
      errorMessage.value = "Title, content, tags and images are required.";
      return;
    }

    if (title.value.length < 3) {
      errorMessage.value = "Title is too short.";
      return;
    }

    if (content.value.length < 50) {
      errorMessage.value = "Content is too short.";
      return;
    }

    const articleData = {
      title: title.value,
      content: content.value,
      tags: tags.value,
      img: imgUrl.value,
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
    errorMessage.value = "Error adding article";
    isPublish.value = false;
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

const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    isAuthenticated.value = false;
    window.location.href = "/";
    console.log("User logged out");
  }
};

watch([Meta_J, Ctrl_J], (v) => {
  if (v[0] || v[1]) handleOpenChange();
});

function handleOpenChange() {
  open.value = !open.value;
}

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

isPublish.value = false;
</script>

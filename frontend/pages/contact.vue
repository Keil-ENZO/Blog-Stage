<template>
  <div class="isolate px-6 py-24 sm:py-32 lg:px-8">
    <div
      class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true"
    ></div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-priamry sm:text-4xl">
        Contactez-moi
      </h2>
    </div>
    <form @submit.prevent="sendEmail" class="mx-auto mt-8 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              class="block text-sm font-semibold leading-6 text-primary"
              for="nomUser"
              >Nom:</label
            >
            <div class="mt-2.5">
              <Input
                v-model="form.nom"
                autocomplete="off"
                id="nomUser"
                type="text"
                placeholder="Nom"
                required
              />
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-semibold leading-6 text-primary"
              for="nomUser"
              >Prenom:</label
            >
            <div class="mt-2.5">
              <Input
                v-model="form.prenom"
                autocomplete="off"
                id="nomUser"
                type="text"
                placeholder="Prenom"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-semibold leading-6 text-primary"
            for="email"
            >Email:</label
          >
          <div class="mt-2.5">
            <Input
              v-model="form.email"
              autocomplete="off"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-semibold leading-6 text-primary"
            for="message"
            >Message:</label
          >
          <div class="mt-2.5">
            <Textarea
              v-model="form.message"
              class="resize-none"
              id="message"
              cols="30"
              rows="5"
              placeholder="Message..."
              required
            ></Textarea>
          </div>
        </div>

        <div class="flex justify-end m-5">
          <Button type="submit" v-if="!sendMessage">
            Envoyer un message
          </Button>

          <Button v-else disabled>
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </Button>
        </div>

        <p v-if="message" class="error-message">
          {{ message }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import emailjs from "emailjs-com";
import { onMounted, ref } from "vue";

const sendMessage = ref(false);
const message = ref("");

// Reactive form data
const form = ref({
  nom: "",
  prenom: "",
  email: "",
  message: "",
});

// Initialize EmailJS on component mount
onMounted(() => {
  emailjs.init("hbLXCkj8CAtH_3yUV");
});

// Function to send email
const sendEmail = () => {
  sendMessage.value = true;

  emailjs.send("service_ko7maw8", "template_ecwwbvp", form.value).then(
    () => {
      message.value = "Message envoyé avec succès !";

      form.value.nom = "";
      form.value.prenom = "";
      form.value.email = "";
      form.value.message = "";

      sendMessage.value = false;
    },
    () => {
      message.value = "Erreur lors de l'envoi du message !";
      sendMessage.value = false;
    }
  );
};

sendMessage.value = false;
</script>

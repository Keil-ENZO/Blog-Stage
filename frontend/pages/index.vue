<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-between items-center">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <svg
        class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        />
      </svg>
    </div>
    <section class="flex justify-evenly items-center w-full px-16 h-screen">
      <div
        class="max-w-screen-md flex flex-col md:flex-row items-center justify-between w-full md:-translate-y-1/2"
      >
        <div class="flex flex-col justify-between mb-16 max-w-[430px]">
          <h2 class="text-4xl md:text-5xl">Bienvenue sur mon Blog</h2>
          <p>
            Découvrez ici toutes mes expériences professionnelles et les projets
            que je souhaite partager avec vous.
          </p>
          <div>
            <Dialog>
              <DialogTrigger as-child class="flex justify-start mt-5">
                <Button variant="outline"> Curriculum vitae </Button>
              </DialogTrigger>

              <DialogContent class="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <div class="flex items-center space-x-2">
                  <div class="grid flex-1 gap-2">
                    <Label for="link" class="sr-only"> Link </Label>
                    <Input
                      id="link"
                      default-value="https://shadcn-vue.com/docs/installation"
                      read-only
                    />
                  </div>
                  <Button type="submit" size="sm" class="px-3">
                    <span class="sr-only">Copy</span>
                    <Copy class="w-4 h-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <img
          src="/assets/img/profil.jpeg"
          alt="photo de mon profil"
          class="h-auto w-60 rounded-full"
        />
      </div>
    </section>

    <section class="flex justify-evenly items-center w-full p-16">
      <div class="max-w-screen-md">
        <h3 class="text-3xl mb-12">Qui suis-je ?</h3>

        <p>
          Bonjour tout le monde, je m’appelle KEIL Enzo, étudiant en deuxième
          année de Bachelor en informatique à l’école Sophia Ynov Campus. Je
          suis quelqu’un de très déterminer dans ce que je faire avec une envie
          de toujours en apprendre plus. Je suis passionné par le développement
          web depuis maintenant trois ans et j’envisage d’en faire mon métier
          dans les prochaines années. Mon intérêt pour le métier de développeur
          web a commencé lors d’une discussion avec un membre de ma famille,
          développeur web frontend depuis huit ans. J’ai commencé à m’intéresser
          sérieusement au développement web au lycée, en Terminale STI2D à
          Grasse, une ville sur la Côte d’Azur. Là, j’ai appris les bases de
          l’HTML et du CSS à travers différents projets. Chez moi, après le
          lycée, je pratiquais sur un vieux ordinateur, un MacBook Air de 2010.
        </p>
      </div>
    </section>
  </div>
</template>

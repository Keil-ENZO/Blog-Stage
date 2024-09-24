<script setup>
import pkg from "file-saver";
import { Download } from "lucide-vue-next";
const { saveAs } = pkg;

async function downloadCV() {
  try {
    const response = await fetch("/cv_keil_enzo.pdf");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    saveAs(blob, "cv_keil_enzo.pdf");
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier", error);
  }
}
</script>

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
    <section
      class="flex justify-evenly items-center w-full px-8 md:px-16 h-screen"
    >
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
                  <DialogTitle>Téléchargez mon CV</DialogTitle>
                  <DialogDescription class="mb-4">
                    Intéressé(e) par mon parcours ? Téléchargez mon CV pour en
                    savoir plus sur mon expérience et mes compétences.
                  </DialogDescription>

                  <div>
                    <img
                      src="/assets/img/cv.png"
                      alt="photo de mon profil"
                      class="h-full w-full"
                    />
                  </div>
                  <Button variant="outline" size="icon" @click="downloadCV">
                    <Download class="w-4 h-4" />
                  </Button>
                </DialogHeader>
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

    <section class="flex justify-evenly items-center w-full px-8 md:px-16">
      <div class="max-w-screen-md">
        <h3 class="text-3xl mb-12">Qui suis-je ?</h3>

        <p>
          Bonjour tout le monde, je m’appelle KEIL Enzo, étudiant en troisième
          année de Bachelor année de Bachelor en informatique à l’école Sophia
          Ynov Campus. Je suis quelqu’un de très déterminé dans ce que je fais
          avec une envie de toujours en apprendre plus. Je suis passionné par le
          développement web depuis maintenant trois ans et j’envisage d’en faire
          mon métier dans les prochaines années. Mon intérêt pour le métier de
          développeur web a commencé lors d’une discussion avec un membre de ma
          famille, développeur web frontend depuis huit ans.
          <br />
          <br />

          J’ai commencé à m’intéresser sérieusement au développement web au
          lycée, en Terminale STI2D à Grasse, une ville située sur la Côte
          d’Azur. J’ai appris les bases de l’HTML et du CSS à travers différents
          projets. Chez moi, après le lycée, je pratiquais sur un vieil
          ordinateur, un MacBook Air de 2010.
        </p>

        <div class="w-full flex justify-center mt-16">
          <img
            src="/assets/img/macbook.jpeg"
            alt="Image du MacBook Air de 2010"
            class="max-w-[400px] w-full"
          />
        </div>

        <p class="py-16">
          J’ai ensuite intégré mon école actuelle,
          <a
            href="https://www.ynov.com/campus/sophia"
            class="link"
            target="_blank"
            >Sophia Ynov Campus</a
          >
          , toujours dans l’objectif de découvrir de nouvelles choses en
          informatique. Cela fait maintenant deux ans que je suis dans cette
          école, où j’ai pu m’enrichir de diverses compétences en informatique,
          et tout particulièrement en développement web. Je vais maintenant
          entrer dans ma troisième année avec le choix d’une spécialité qui
          sera, dans mon cas, le ‘Développement’.
          <br />
          <br />
          De plus, cette troisième année est synonyme de grand changement pour
          moi car je deviens alternant au sein de l’entreprise ACOSS située à
          Sophia Antipolis.
          <br />
          <br />
          Je vous ai parlé de moi en détail, maintenant je vous laisse découvrir
          mon blog. J’espère que cela vous plaira.
        </p>

        <p class="mb-16">À bientôt ! 👋</p>

        <Alert class="border-border border p-8 rounded-md flex flex-col">
          <AlertTitle
            class="mb-3 font-medium text-lg leading-none tracking-tight"
            >💡 Anecdote</AlertTitle
          >
          <AlertDescription class="text-sm font-light">
            Le MacBook devait toujours être branché sinon il s’éteignait, pas
            très pratique pour un ordinateur portable !
          </AlertDescription>
        </Alert>
      </div>
    </section>
  </div>
</template>

<!-- See the comment in the ClientOnly.vue file for more information and to understand why we are using this tag. -->
<template>
  <div>
    <ClientOnly>
      <AppHeader />
    </ClientOnly>
    <slot />
    <ClientOnly>
      <AppFooter />
    </ClientOnly>
  </div>
</template>

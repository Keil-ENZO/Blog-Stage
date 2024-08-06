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

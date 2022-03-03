<template>
  <div class="cps-page">
    <Header/>
    <NuxtBody/>
    <Footer/>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  components: {
    'Header': () => import('~/components/Layouts/Header'),
    'Footer': () => import('~/components/Layouts/Footer'),
    'NuxtBody': () => import('~/components/NuxtBody'),
  }
}
</script>
<style>
.cps-page {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}
</style>

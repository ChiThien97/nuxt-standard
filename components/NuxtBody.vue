<template>
  <div v-lazy-container="{ selector: 'img' }">
    <div class="d-flex justify-content-center align-items-center">
      <img class="nuxt-logo"
           data-src="https://image.cellphones.com.vn/500x/media/favicon/default/logo-cps.png"
           alt="CPS">
    </div>
    <Content/>
    <Comment :comment-type="2"/>
  </div>
</template>
<script>
export default {
  name: 'NuxtBody',
  components: {
    'Content': () => import('~/components/Content/Content'),
    'Comment': () => import('~/modules/ModuleComment/Comment')
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
div {
  .nuxt-logo {
    height: 180px;
    margin: 30px;
  }
}
</style>

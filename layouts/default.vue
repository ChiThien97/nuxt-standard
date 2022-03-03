<template>
  <Nuxt></Nuxt>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Default",
  created() {
    let token = this.$cookies.get("token");
    const accessToken = this.$route.query;
    if (accessToken) {
      this.accessToken = accessToken.access_token;
      token = accessToken.access_token;
    }
    if (token) {
      this.login(token);
    }
  },
  methods: {
    ...mapActions("account", ["login"]),
  },
}
</script>

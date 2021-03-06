import Vue from 'vue';
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  lazyComponent: true,
  attempt: 1,
  listenEvents: ['scroll'],
});

<template>
  <div class='box-search '>
    <form @submit.stop.prevent='submit()'>
      <div class='cps-group-input d-flex'>
        <div class='input-group-btn'>
          <button class='btn pr-0 border-0 shadow-none outline-none text-dark' type='submit'>
            <font-awesome-icon icon='search'/>
          </button>
        </div>
        <input id='inp$earch' v-model='key' type='text' class='cps-input' placeholder='Bạn cần tìm gì?'
               autocomplete="off" @blur='resetSearchResult()'>
        <!-- eslint-disable vue/no-v-html -->
        <div id="search_autocomplete"
             class="box-search-result search-autocomplete"
             :class="searchResults===''?'d-none':'d-block'" v-html="searchResults"></div>
        <!--eslint-enable-->
        <div :class="searchResults===''?'d-none':'d-block'"><span id="btn-close-search" @click="resetSearchResult()">&times;</span>
        </div>
      </div>
    </form>
    <div class="header-overlay" :class="searchResults!== '' ? 'active': ''"></div>
  </div>

</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: "HeaderSearch",
  data() {
    return {
      key: "",
      overlay: false,
      html: ``
    }
  },
  computed: {
    ...mapState('header-search', ['searchResults']),
  },
  watch: {
    async key() {
      if (this.key.length >= 3) {
        await this.getSearchResult(this.key)
        this.html = this.searchResults
      }
    }
  },
  methods: {
    ...mapActions('header-search', ['getSearchResult', 'submitSearchForm', 'resetSearchResult']),
    submit() {
      this.submitSearchForm(this.key)
    },
  },
};
</script>

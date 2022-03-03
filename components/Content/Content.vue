<template>
  <div class="content__box-content my-3">
    <div class="cps-container">
      <div class="cps-block-content" style="text-align: justify"
           :style="!showMoreBtn?{height: 'auto'}:{height: '500px'}">
        <div v-lazy-container="{selector: 'img'}" v-html="content"></div>
        <div v-if="showMoreBtn" class="cps-block-content_btn-showmore">
          <a class="btn-show-more" @click="handleShowMore">
            Xem thêm&nbsp;<font-awesome-icon icon='chevron-down'/>
          </a>
        </div>
        <div v-if="!showMoreBtn" class="cps-block-content_btn-showmore">
          <a class="btn-show-more" @click="handleShowMore">
            Rút gọn&nbsp;<font-awesome-icon icon='chevron-up'/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    idBlock: {
      type: String,
      default: 'block-tet-cps'
    }
  },
  data() {
    return {
      showMoreBtn: true,
      content: ""
    };
  },
  mounted() {
    this.getContent();
  },
  methods: {
    handleShowMore() {
      this.showMoreBtn = !this.showMoreBtn;
    },
    async getContent() {
      const url = `https://cellphones.com.vn/lapi/dev/getDataPage?pageId=uu-dai-tet&blockId=${this.idBlock}`
      try {
        const result = await this.$axios.$get(url)
        if (result) {
          this.content = result.content
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

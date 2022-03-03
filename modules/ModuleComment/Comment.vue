<template>
  <div class="block-comment">
    <div class="block-comment__box-title">
      <p id="total_comment" class="totalcomment">Hỏi và đáp</p>
    </div>
    <div class="block-comment__box-form-comment form-add">
      <textarea id="review_field"
                v-model="commentFormData.content"
                class="cps-textarea"
                name="detail"
                rows="4"
                cols="5"
                placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời ngay trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau.">
      </textarea>
      <a id="btnSendCmt1"
         class="btn-send-cmt"
         href="javascript:void(0)"
         @click="handleOpenModal('comment-error')">
        <font-awesome-icon icon='paper-plane'/>&nbsp;Gửi
      </a>
      <span v-if="commentFormData.content.length < 10"
            id="sub-comment-error1"
            class="comment-error error-text error d-none">
        {{
          commentFormData.content === "" ? "Vui lòng nhập bình luận" : (isShortComment ? "Bình luận của bạn quá ngắn. Vui lòng nhập lại" : "")
        }}
      </span>
    </div>
    <div class="block-comment__box-list-comment">
      <div id="page_comment_list"
           class="list-comment"
           data-index="1"
           data-load="0"
           data-count="">
        <div v-for="comment in commentList"
             :key="JSON.stringify(comment)"
             class="item-comment">
          <div v-if="comment.is_shown === 1" class="item-comment__box-cmt">
            <div class="box-cmt__box-info">
              <div class="box-info">
                <div class="box-info__avatar">
                  <i v-if="comment.is_admin"
                     class="cps-icons icon-cps"></i>
                  <template v-else>
                    {{ comment.customer.fullname.charAt(0) }}
                  </template>
                </div>
                <p class="box-info__name">
                  {{ comment.customer.fullname }}
                </p>
                <span v-if="comment.is_admin" class="box-info__tag">QTV</span>
              </div>
              <p class="box-time-cmt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <path
                    id="clock"
                    d="M7.72,8.78,5.25,6.31V3h1.5v2.69L8.78,7.72ZM6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM6,10.5A4.5,4.5,0,1,1,10.5,6,4.5,4.5,0,0,1,6,10.5Z"
                    fill="#707070"
                  ></path>
                </svg
                >&nbsp;{{ handleDiffPostedDate(comment.created_at) }}
              </p>
            </div>
            <div class="box-cmt__box-question">
              <p v-for="(line,key) in convertHtmlToString(comment.content)" :key="key">
                {{ line }}<br/>
              </p>
              <a href="javascript:void(0)"
                 class="btn-rep-cmt respondent"
                 @click="handleSaveCommentParentId(comment.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="12"
                  viewBox="0 0 12 10.8"
                >
                  <path
                    id="chat"
                    d="M3.48,8.32V4.6H1.2A1.2,1.2,0,0,0,0,5.8V9.4a1.2,1.2,0,0,0,1.2,1.2h.6v1.8l1.8-1.8h3A1.2,1.2,0,0,0,7.8,9.4V8.308a.574.574,0,0,1-.12.013H3.48ZM10.8,1.6H5.4A1.2,1.2,0,0,0,4.2,2.8V7.6H8.4l1.8,1.8V7.6h.6A1.2,1.2,0,0,0,12,6.4V2.8a1.2,1.2,0,0,0-1.2-1.2Z"
                    transform="translate(0 -1.6)"
                    fill="#707070"
                  ></path>
                </svg
                >&nbsp;Trả lời
              </a>
            </div>
            <div class="item-comment__box-rep-comment">
              <div class="list-rep-comment">
                <template v-for="rely in comment.children">
                  <div v-if="rely.is_shown === 1" :key="JSON.stringify(rely)" class="item-rep-comment">
                    <div class="box-cmt__box-info">
                      <div class="box-info">
                        <div class="box-info__avatar">
                          <i v-if="rely.is_admin" class="cps-icons icon-cps"></i>
                          <template v-else>
                            {{ rely.customer.fullname.charAt(0) }}
                          </template>
                        </div>
                        <p class="box-info__name">
                          {{ rely.customer.fullname }}
                        </p>
                        <span v-if="rely.is_admin" class="box-info__tag">QTV</span>
                      </div>
                      <p class="box-time-cmt">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                        >
                          <path
                            id="clock"
                            d="M7.72,8.78,5.25,6.31V3h1.5v2.69L8.78,7.72ZM6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM6,10.5A4.5,4.5,0,1,1,10.5,6,4.5,4.5,0,0,1,6,10.5Z"
                            fill="#707070"
                          ></path>
                        </svg
                        >&nbsp;{{ handleDiffPostedDate(rely.created_at) }}
                      </p>
                    </div>
                    <div class="box-cmt__box-question">
                      <p v-for="(line,key) in convertHtmlToString(rely.content)" :key="key">
                        {{ line }}
                      </p>
                      <a href="javascript:void(0)"
                         class="btn-rep-cmt respondent"
                         @click="handleSaveCommentParentId(comment.id)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="12"
                          viewBox="0 0 12 10.8"
                        >
                          <path
                            id="chat"
                            d="M3.48,8.32V4.6H1.2A1.2,1.2,0,0,0,0,5.8V9.4a1.2,1.2,0,0,0,1.2,1.2h.6v1.8l1.8-1.8h3A1.2,1.2,0,0,0,7.8,9.4V8.308a.574.574,0,0,1-.12.013H3.48ZM10.8,1.6H5.4A1.2,1.2,0,0,0,4.2,2.8V7.6H8.4l1.8,1.8V7.6h.6A1.2,1.2,0,0,0,12,6.4V2.8a1.2,1.2,0,0,0-1.2-1.2Z"
                            transform="translate(0 -1.6)"
                            fill="#707070"
                          ></path>
                        </svg
                        >&nbsp;Trả lời
                      </a>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div v-if="parentId === comment.id" class="form_reply_wrap">
              <textarea :id="'text-area-' + comment.id"
                        v-model="commentFormData.subContent"
                        class="cps-textarea"
                        name="detail"
                        cols="5"
                        rows="4"
                        placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời trong 30 phút từ 8h - 22h mỗi ngày .">
              </textarea>
              <a id="btnSendCmt"
                 class="btn-send-cmt"
                 href="javascript:void(0)"
                 @click="handleOpenModal('sub-comment-error')">
                <font-awesome-icon icon='paper-plane'/>&nbsp;Gửi
              </a>
              <span v-if="commentFormData.subContent.length < 10"
                    id="sub-comment-error"
                    class="sub-comment-error error-text error d-none">
                {{
                  commentFormData.subContent === "" ? "Vui lòng nhập bình luận" : isShortComment ? "Bình luận của bạn quá ngắn. Vui lòng nhập lại" : ""
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <a
        v-show="prevHits < total"
        id="cmt_loadmore"
        class="btn-show-more"
        @click="getComments(2, '', pageUrl)"
      >Xem thêm&emsp;<font-awesome-icon icon='chevron-down'/>
      </a>
    </div>
    <!-- Modal -->
    <b-modal id="comment-module-modal"
             class="modal fade cps-popup"
             tabindex="-1"
             role="dialog"
             aria-labelledby="popup_cmt_form"
             aria-hidden="true"
             hide-footer>
      <template #modal-header="{ close }">
        <h4 class="modal-title">Thông tin người gửi</h4>

        <b-button size="md" class="close" @click="close()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path
              id="cross"
              d="M11.89,9.64h0L8.249,6l3.64-3.64h0a.376.376,0,0,0,0-.53L10.17.109a.376.376,0,0,0-.53,0h0L6,3.749,2.359.109h0a.376.376,0,0,0-.53,0L.109,1.829a.376.376,0,0,0,0,.53h0L3.75,6,.109,9.64h0a.38.38,0,0,0-.086.134.374.374,0,0,0,.086.4l1.72,1.72a.376.376,0,0,0,.53,0h0L6,8.249l3.64,3.64h0a.376.376,0,0,0,.53,0l1.72-1.72a.376.376,0,0,0,0-.53Z"
              transform="translate(0 0)"
              fill="#fff"
            ></path>
          </svg
          >&nbsp;Đóng
        </b-button>
      </template>
      <form id="commentForm" class="popup_cmt_form">
        <input
          id="nickname_field"
          v-model="commentFormData.fullname"
          type="text"
          name="nickname"
          class="cps-input required-entry"
          value=""
          placeholder="Họ tên (bắt buộc)"
        />
        <div
          v-if="!customRegex(commentFormData.fullname, 'fullName')"
          class="error-text-comment-info error-text error d-none"
        >
          Quý khách vui lòng kiểm tra lại thông tin
        </div>

        <input
          id="phone_field"
          v-model="commentFormData.phone"
          type="text"
          name="phone"
          maxlength="10"
          class="cps-input"
          value=""
          placeholder="Số điện thoại"
        />
        <div
          v-if="!customRegex(commentFormData.phone, 'phone')"
          class="error-text-comment-info error-text error d-none"
        >
          Quý khách vui lòng kiểm tra lại thông tin
        </div>

        <input
          id="email_field"
          v-model="commentFormData.email"
          type="text"
          name="email"
          class="cps-input"
          value=""
          placeholder="Email (để nhận phản hồi qua email)"
        />

        <div
          v-if="!customRegex(commentFormData.email, 'email')"
          class="error-text-comment-info error-text error d-none"
        >
          Quý khách vui lòng kiểm tra lại thông tin
        </div>

        <div v-show="isErrorGGCapcha" class="form-group position-center">
          <vue-recaptcha ref="recaptcha"
                         sitekey="6LetVbYUAAAAABRM1I3VO6WD-xxhzTKiR9MDmbNK"
                         @verify="verifyToken"
                         @expired="handleExpired">
          </vue-recaptcha>
          <div v-if="isErrorGGCapcha && tokenRecapcha.length === 0"
               class="error-text error-text-comment-info d-none">
            Quý khách vui lòng xác thực GoogleCapcha
          </div>
        </div>

        <button id="cps_comment_post"
                class="button"
                @click="sendComment('2', '', '', pageUrl)">
          <b>Gửi bình luận</b>
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  customRegex,
  convertHtmlToString,
  validate,
  handleDiffPostedDate,
} from "~/helper/function";

export default {
  components: {
    VueRecaptcha: () => import('vue-recaptcha')
  },
  props: {
    commentType: {
      type: Number,
      default: 2,
      required: true,
    },
  },
  data() {
    return {
      prevHits: 0,
      commentList: [],
      productId: "",
      commentFormData: {
        fullname: "",
        email: "",
        phone: "",
        content: "",
        subContent: "",
      },
      pageUrl: "",
      parentId: "",
      isErrorGGCapcha: false,
      total: 0,
      last_record: [],
      tokenRecapcha: "",
      isShortComment: false
    };
  },
  mounted() {
    if (this.commentType === 2) {
      const path = window.location.origin + window.location.pathname;
      this.pageUrl = path;
      this.getComments(2, "", path);
    }
    if (this.commentFormData.subContent) {
      this.isShortComment = this.commentFormData.subContent.length < 10
    }
    if (this.commentFormData.content) {
      this.isShortComment = this.commentFormData.content.length < 10
    }
  },
  methods: {
    validate,
    customRegex,
    convertHtmlToString,
    handleDiffPostedDate,
    handleOpenModal(className = "") {
      if (!validate(className)) return;
      // this.$root.$emit('bv::toggle::modal', 'comment-module-modal')
      // $(`#comment-module-modal`).modal("show");
      this.$bvModal.show('comment-module-modal')
    },
    handleSpinComment() {

    },
    handleSaveCommentParentId(parentId) {
      this.parentId = parentId;
      setTimeout(() => {
        const hash = document.querySelector(`#text-area-${parentId}`);
        // $("html, body").animate({scrollTop: $(hash).offset().top - $("#cpsHeader").height(),}, 500,
        //   function () {console.log("Run Done");}
        // );
        this.scrollToTab(hash)
      }, 100);
    },
    async sendComment(type = "1", productUrl = "", productName = "", pageUrl = "") {
      event.preventDefault();
      if (!validate("error-text-comment-info")) return;
      const formData = new FormData();
      const url = "https://customer.cps.onl/comments-api/";
      formData.append("is_admin", "0");
      formData.append("sent_from", "cellphones");
      formData.append("fullname", this.commentFormData.fullname);
      formData.append("email", this.commentFormData.email);
      formData.append("phone", this.commentFormData.phone);
      if (type === "1") {
        formData.append("product_id", this.productId);
        formData.append("product_url", productUrl);
        formData.append("page_name", productName);
      }
      if (type === "2") {
        formData.append("page_url", pageUrl);
        formData.append("page_name", productName);
      }
      if (this.tokenRecapcha) {
        formData.append("g-recaptcha-response", this.tokenRecapcha);
      }
      if (this.parentId !== "") {
        formData.append("parent_id", this.parentId);
        formData.append("content", this.commentFormData.subContent);
      } else {
        formData.append("content", this.commentFormData.content);
      }
      try {
        // $("#page_loader").show();
        const result = await this.$axios.$post(url, formData, {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNzNjMTRjODdkOTYzZDRmMWFmOTdhZjJiY2M1NzQ4MDUxYmQ1NjRmNjY1ZWU5OTNkYTNkZDM3YTRiMDhlMGNmNjNiNzEwMDY2MDg1YmExMGEiLCJpYXQiOjE2MzU4MTkwMDIuMTI4ODQzLCJuYmYiOjE2MzU4MTkwMDIuMTI4ODQ5LCJleHAiOjQ3OTE0OTI2MDIuMTEwNTE5LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.RKyBKmPYpTGhS1NIAvIvOUUWKn1C_BklN_gudMEL1j9sJfGYZpQ9jFWqxHpOfqBPTBH0-pau0tT-nSYeMknybvugjt9AyYFZ8mzRMoAYYTTmR30waWiFx1kpCF08d4bUbqRA1Y64l_65Bbaoi1jkoMutDyF7YBCKk4OqE1b_B5eHThqxLflbkoCtQAo5Dfo7qaB3khYuL79pNbF1ISkYdDA8kKLk3VhOEx71gNVZvwfiqsnd9Nx-_6efz5b3ID0R_OPV9Ds12eujXToYEIMrvFmfgGeHa7Qd9DArbIjpq1WAmiOlzf8komoVKR71cPnfF-BDbOA5Ms2cpxV57mQ3wcdbtKL5xp0xxK9vWogEks7BwoDA16KywyFk18bj0fqHxVKI0VEgu0nQtNr3azzWW3NMyqg58SM8eEMj7ykwfg6PEsemIa1HgWWYS4_zeM7KKmYce9m1JXzH9EzqNDRH3D2AR-M4AXoNnz0OjnaZRXR2K7ja34Rblw0wSGolSqsvGTS2YiMbhcmlHfp2lhPCvf_oZcattubqquhkcjrl37bugc44TCWfESFHNO6k660En8ZC-gCCPZ8bNijc7honvy83BSDit2fdIgHhaES1EkAZuqNWSoyYBXOaa3De66fGI4yzh2IrrTpP4ZfgYa8W_qe4T4GdB3md4k0NeBJrJ8E",
            "X-Requested-With": "XMLHttpRequest",
          },
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
        });
        if (!result.isError) {
          document.querySelector(`#comment-module-modal .close`).click();
          // this.getComments(2, "", this.pageUrl);
          setTimeout(function () {
            location.reload();
          }, 1500);
        }
      } catch (error) {
        if (error.response.status === 429) {
          this.isErrorGGCapcha = true;
        }
      }
    },
    handleExpired() {
      this.tokenRecapcha = "";
    },
    verifyToken(data) {
      this.tokenRecapcha = data;
    },
    // eslint-disable-next-line camelcase
    async getComments(type = 1, product_id, page_url = "") {
      const url = "https://customer.cps.onl/comments-api/elastic/filter";
      let params = type === 1 ? {product_id,} : {page_url,};
      if (this.pidId) {
        params = {
          ...params,
          "last_hit[pit]": this.pidId,
          "last_hit[search_after]": JSON.stringify(this.last_record),
        };
      }
      try {
        const result = await this.$axios.$get(url, {
          params, headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjNmNjNkZWFjZmEzYTNiODcyNmQzN2ZjOTRjYmJhZTFhNjg3OTQwMDNlMDMzYTI3OWFkYzU0OWVjNjFlNjBkNzkwNWUzYWE4NzU3NWE5ZmIiLCJpYXQiOjE2MzY0NzIzOTIuODIzNDM1LCJuYmYiOjE2MzY0NzIzOTIuODIzNDQzLCJleHAiOjQ3OTIxNDU5OTIuODE5MTg2LCJzdWIiOiIiLCJzY29wZXMiOlsiY29tbWVudF9nZXQiLCJyZXZpZXdfZ2V0Il19.A492jiothIY_0a6rg3wgiEnP2-jb1PV90Gctwzm_6yPXNBeTK_iDaKZdXzCpLXp3c4QVhZppNY0R1mXfIHiVZatNBIBgRjYVbVD31EjM5VfUoN6S7igRv7foZhl1vxW5OaOsKkmXf1BKP02ciQGhKG82Nsx7p4iq-JZroJwWBV2D8O3719TE2y-hMjgc3l2Dov4Rnz-59V3DqNgb351mka11u7togtTVB8IotIlGjZPtXKHYpJeJubsnlmBkSbQ3az04rscJgsQLOdP2Tqzx_g1fy8MmEtZpJl18bPZoY-14duKdDtPYzQ144QCy22g9Om36lpcyyAoVtftuRheF3QsRV7LbCvAMQWe5AK_xZ1RoaZHj6hjuvwWOFCusU5NFkssLbEnSylACNWdWorrwmUPcv06g3COVYpWKwtouM_55TYLrvj9NxRQP4kjOZlawWWHEDpvDfmV0vhQ2L7hQpi14SH0W4lksFVof84nezQE_j1uue0C7YLVmUA8FgH8WSJbS6Z-6HjqZELBuqSBrPDA363uvYyuavy81HajxXwotOiEgK5Q6Pr6WbGE4_AIFPwIWaL5uBLjmVE3yAtFD0YLW9lg5tzEROOL_8a0X3mPgh2tokgliN6egHxIQS0swObsyHz02LSlCaE3bsH2Ho13A9zHCctEecXfBe1HKBqE",
          },
        });
        if (!result.isError) {
          const data = result.data;
          this.commentList = [...this.commentList, ...data.matches];
          this.total = data.total;
          this.pidId = data.pit_id;
          this.prevHits += data.matches.length || 0;
          this.last_record = data.last_record;
        }
      } catch (error) {
        console.error(error);
      }
    },
    scrollToTab(element) {
      setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const result = element.getBoundingClientRect().top + scrollTop + 5;
        window.scrollTo({
          top: result,
          behavior: "smooth",
        });
      }, 100);
    },
  },
};
</script>

<style>
</style>

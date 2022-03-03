<template>
  <div class="cps-otp">
    <div v-show="step === 1" class="cps-otp__step1">
      <input v-model="phone"
             type="text"
             class="cps-input-otp"
             placeholder="Nhập số điện thoại"
             maxlength="128"
             autocomplete="off"/>
      <div v-if="!customRegex(phone, 'phone')" class="error-text cps-otp-phone-error-text d-none">
        Quý khách vui lòng kiểm tra lại thông tin
      </div>
      <div class="form-group position-center m-t-10 flex-column">
        <vue-recaptcha ref="recaptcha"
                       sitekey="6LetVbYUAAAAABRM1I3VO6WD-xxhzTKiR9MDmbNK"
                       @verify="verifyTokenOTP"
                       @expired="handleExpired">
        </vue-recaptcha>
        <div v-if="tokenRecapcha.length === 0" class="error-text cps-otp-phone-error-text d-none">
          Quý khách vui lòng xác thực GoogleCapcha
        </div>
      </div>
      <b-button class="btn-send-OTP text-center" @click="handleGetOTP()">
        Nhận mã OTP
      </b-button>
    </div>
    <div v-show="step === 2" class="cps-otp__step2">
      <input v-model="codeOTP"
             type="text"
             class="cps-input-otp"
             placeholder="Nhập mã OTP"
             maxlength="4"
             autocomplete="off"/>
      <div v-if="!customRegex(codeOTP, 'otp')" class="error-text cps-otp-code-error-text d-none">
        Quý khách vui lòng kiểm tra lại thông tin
      </div>
      <p v-if="countDownTime !== 0" class="count-down">
        Mã OTP sẽ hết hạn sau {{ countDownTime }} giây
      </p>
      <b-button class="btn-send-OTP text-center" @click="handleVerifyOTP()">
        Xác Nhận
      </b-button>
    </div>
    <div v-if="formMessage.content" class="p-t-5">
      <p class="m-0 fs-12" :class="formMessage.type">
        {{ formMessage.content }}
      </p>
      <a v-b-modal.resend-module-modal
         style="cursor: pointer"
         class="fs-12 resend-link mt-2"
         @click="handleResend">
        Gửi lại ngay
      </a>
    </div>
    <b-modal id="resend-module-modal"
             class="modal fade cps-popup"
             tabindex="-1"
             role="dialog"
             aria-labelledby="popup_cmt_form"
             aria-hidden="true"
             centered
             hide-footer>
      <template #modal-header="{ close }">
        <h4 class="modal-title">Quý khách vui lòng xác thực captcha</h4>
        <b-button size="md" style="cursor: pointer" class="close" @click="close()">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="12"
               height="12"
               viewBox="0 0 12 12">
            <path
              id="cross"
              d="M11.89,9.64h0L8.249,6l3.64-3.64h0a.376.376,0,0,0,0-.53L10.17.109a.376.376,0,0,0-.53,0h0L6,3.749,2.359.109h0a.376.376,0,0,0-.53,0L.109,1.829a.376.376,0,0,0,0,.53h0L3.75,6,.109,9.64h0a.38.38,0,0,0-.086.134.374.374,0,0,0,.086.4l1.72,1.72a.376.376,0,0,0,.53,0h0L6,8.249l3.64,3.64h0a.376.376,0,0,0,.53,0l1.72-1.72a.376.376,0,0,0,0-.53Z"
              transform="translate(0 0)"
              fill="#fff"
            ></path>
          </svg
          >&times;
        </b-button>
      </template>
      <div class="form-group position-center">
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
      <button class="btn btn-red" @click="handleGetOTP(); $bvModal.hide('resend-module-modal')">
        <b>Gửi lại OTP</b>
      </button>
    </b-modal>
  </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from "vuex";

import {authHeader, customRegex, validate} from "~/helper/function";

export default {
  components: {
    VueRecaptcha: () => import('vue-recaptcha')
  },
  props: {
    typeGetOtp: {
      type: Number,
      default: 1,
    },
    cb: {
      type: Function,
      default: () => {
      },
    },
  },
  data() {
    return {
      step: 1,
      phone: "",
      codeOTP: "",
      countDownTime: 0,
      tokenRecapcha: "",
      formMessage: {
        type: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState("account", ["user"]),
  },
  watch: {
    countDownTime: {
      handler(value) {
        if (this.step === 2) {
          if (value > 0) {
            setTimeout(() => {
              this.countDownTime--;
            }, 1000);
          }
          if (!this.countDownTime) {
            this.setMessage("Mã OTP đã hết hạn", "error-text");
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("account", ["verifyOTP"]),
    ...mapMutations({saveUserToken: "account/saveUserToken"}),
    customRegex,
    setMessage(content, type) {
      this.formMessage.content = content;
      this.formMessage.type = type;
    },
    async handleGetOTP() {
      if (!validate("cps-otp-phone-error-text")) return;
      let url = process.env.BLACK_FRIDAY_SERVER;
      let headers = authHeader();
      const data = new FormData();
      data.append("phone", this.phone);
      data.append("g-recaptcha-response", this.tokenRecapcha);
      if (this.typeGetOtp !== 1) {
        url += "account/otp";
        const token = this.user.token
        headers = authHeader(token);
      } else {
        url += "account/phone-login";
      }
      try {
        const result = await this.$axios.$post(url, data, headers);
        if (result.status === 200) {
          this.pushGTMLogin(this.phone)
          if (this.typeGetOtp === 1) {
            const token = result.data.data
            this.saveUserToken(token)
          }
          this.step = 2;
          this.countDownTime = 60;
          this.setMessage("Không nhận được OTP?", "text-info");
        } else if (result.status === 422) {
          console.log(result)
          this.setMessage(
            "Quý khách vui lòng chờ 1 phút và thử lại!",
            "text-danger"
          );
        } else {
          console.log(result)
          this.setMessage(
            "Gửi OTP lỗi, vui lòng liên hệ bộ phận CSKH 1800.2097!",
            "text-danger"
          );
        }
      } catch (error) {
        console.log(error)
        this.setMessage(
          "Gửi OTP lỗi, vui lòng liên hệ bộ phận CSKH 1800.2097!",
          "text-danger"
        );
      }
    },

    handleExpired() {
      this.tokenRecapcha = "";
    },

    handleResend() {
      this.tokenRecapcha = ""
    },

    verifyTokenOTP(data) {
      this.tokenRecapcha = data;
    },

    async handleVerifyOTP() {
      if (!validate("cps-otp-code-error-text")) return;
      const result = await this.verifyOTP({
        type: this.typeGetOtp,
        phone: this.phone,
        otp: this.codeOTP,
      });
      if (result.status === 200) {
        this.cb();
      }
    },

    // pushGTMLogin(phone = "", fullname = "", email = "") {
    //   // const dataLayer = window.dataLayer || [];
    //   // dataLayer.push({event: "DangKyNhanThongTin-Click"});
    //   // if (typeof o2oAnalytics !== "undefined") {
    //   //   o2oAnalytics.event({
    //   //     category: "Subcriber",
    //   //     action: "Subcriber-Tet",
    //   //     label: "Tet 2021",
    //   //     dmpData: {
    //   //       user_data: {
    //   //         email_address: email,
    //   //         phone_number: phone,
    //   //         address: {
    //   //           first_name: fullname,
    //   //         },
    //   //       },
    //   //     },
    //   //   });
    //   // }
    // },
  },
};
</script>

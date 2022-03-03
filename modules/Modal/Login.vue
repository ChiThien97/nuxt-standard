<template>
  <div class="cps-custom-modal-login item-about about-5 about-smember cta-smember">
    <div id="cps-custom" class="cps-btn-login-modal text-center"
         @click="showModal">
      <div class="about__box-icon ">
        <svg id="icon-smember" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 560" width="20">
          <defs>
            <style>#icon-smember .cls-1 {
              fill: none;
              stroke: #fff;
              stroke-width: 30px;
            }</style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <circle class="cls-1" cx="280" cy="280" r="265"></circle>
              <circle class="cls-1" cx="280" cy="210" r="115"></circle>
              <path class="cls-1"
                    d="M86.82,461.4C124.71,354.71,241.91,298.93,348.6,336.82A205,205,0,0,1,473.18,461.4"></path>
            </g>
          </g>
        </svg>
      </div>
      <div class="about__box-content">
        <p class="mb-0 title">Đăng Nhập</p>
      </div>
    </div>
    <b-modal ref="cps-modal-login" centered hide-footer>
      <template #modal-title>{{
          showSubTextOTP
            ? "XIN VUI LÒNG NHẬP SỐ ĐIỆN THOẠI NHẬN MÃ OTP "
            : "ĐĂNG NHẬP TÀI KHOẢN SMEMBER"
        }}
      </template>
      <div class="d-block text-center cps-modal-login">
        <!--          modules OTP-->
        <SendOTP
          :cb="hideModal"
          :type-get-otp="showSubTextOTP ? 2 : 1"
        ></SendOTP>
        <!--        modules OTP-->
        <p v-if="!showSubTextOTP" class="cps-devider-text"><span>Hoặc</span></p>
        <div v-if="!showSubTextOTP" class="block-login-gg-fb">
          <div class="block-login-gg-fb__content">
            <div class="box-login-gg-fb">
              <div class="box-login-gg-fb__input">
                <div class="btn custom-btn btn-login-gg" @click="loginWithGoogle">
                  <img src="~/static/Login/gg-logo.png" alt="" width="20"/>
                  <p>Đăng nhập bằng tài khoản Google</p>
                </div>
                <div class="btn custom-btn btn-login-fb mb-0" @click="loginWithFacebook">
                  <img src="~/static/Login/fb-logo.png" alt="" width="22"/>
                  <p>Đăng nhập bằng tài khoản Facebook</p>
                </div>
                <a class="cps-link" href="https://cellphones.com.vn/smember/">Chính sách ưu đãi cho Smember</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Login',
  components: {
    SendOTP: () => import('~/modules/ModuleOTP/SendOTP')
  },
  props: {
    accessToken: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showSubTextOTP: false,
    };
  },
  computed: {
    ...mapState("account", ["user"]),
  },
  watch: {
    user: {
      deep: true,
      handler(newUser, oldUser) {
        if (newUser.loggedIn === false && this.accessToken) {
          this.showModal();
          this.showSubTextOTP = true;
        }
      },
    },
  },
  methods: {
    showModal() {
      this.$refs["cps-modal-login"].show();
    },
    hideModal() {
      this.$refs["cps-modal-login"].hide();
    },
    loginWithGoogle() {
      window.location.href = process.env.googleLoginURL;
    },
    loginWithFacebook() {
      window.location.href = process.env.facebookLoginURL;
    },
  },
};
</script>

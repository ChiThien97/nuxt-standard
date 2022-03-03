<template>
  <div class="cps-custom-popover cps-custom-modal-login item-about about-5 about-smember cta-smember">
    <b-button id="popover-custom" class="cps-popover-btn cps-btn-login-modal text-center p-0 bg-transparent border-0">
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
        <p class="mb-0 title"> {{ convertPhoneNumber(user.phone) }}</p>
      </div>
    </b-button>
    <b-popover id="cps-login-popover"
               custom-class="cps-popover"
               placement="bottom"
               target="popover-custom"
               triggers="hover focus">
      <div class="cps-profile--container">
        <b-list-group class="list-group">
          <b-list-group-item class="list-group-item">
            <a target="_blank" href="https://cellphones.com.vn/smember">
              <div class="custom-item">
                <div class="cps-box-icon">
                  <font-awesome-icon icon='user-circle'/>
                </div>
                <div class="about__box-content">
                  <p class="mb-0 title">&nbsp;Smember</p>
                </div>
              </div>
            </a>
          </b-list-group-item>
          <b-list-group-item class="list-group-item">
            <div class="custom-item" @click="handleLogOut()">
              <div class="cps-box-icon">
                <font-awesome-icon icon='sign-out-alt'/>
              </div>
              <div class="about__box-content">
                <p class="mb-0 title">&nbsp;Đăng Xuất</p>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-popover>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import {convertPhoneNumber} from "~/helper/function";

export default {
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    convertPhoneNumber,
    ...mapActions("account", ["logout"]),
    handleLogOut() {
      this.logout();
    },
  },
};
</script>

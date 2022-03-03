import {Alert} from "~/helper/alert"

export const state = () => {
  return {
    user: {
      loggedIn: false
    },
    statusSubscription: false,
  }
}

export const actions = {
  async login({dispatch, commit}, token) {
    const url = `${process.env.campServer}/account/profile`
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    try {
      const result = await this.$axios.$get(url, axiosConfig)

      if (result) {
        const user = result.data
        commit('handleLogin', user)
        dispatch('updateCookie', token)
        Alert(this, 'Thông Báo', 'Đăng nhập thành công', 'success');
      }
    } catch (error) {
      Alert(this, 'Thông Báo', 'Xin Vui Lòng Thử Lại', 'error');
      commit('loginFail', error)
    }
  },

  async verifyOTP({dispatch, commit, state}, {phone, otp}) {
    const url = `${process.env.campServer}/account/active`
    const token = this.$cookies.get('token')
    const data = {otp, phone}
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    try {
      const result = await this.$axios.$put(url, data, axiosConfig,)
      if (result.status === 200) {
        const user = result.data.data
        commit('handleLogin', user)
        dispatch('updateCookie', token)
        Alert(this);
        return result;
      }
    } catch (error) {
      Alert(this, 'Thông Báo', 'Xác Thực Thất Bại', 'danger')
      console.error(error.message)
    }
  },

  async logout({commit, dispatch}) {
    const cookieOptions = {
      maxAge: process.env.sessionLifeTime,
      path: '/',
      domain: process.env.domainCookies
    }
    const token = this.$cookies.get('token')
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const url = `${process.env.campServer}/account/logout`
    try {
      await this.$axios.$delete(url, axiosConfig)
      this.$cookies.remove('user', cookieOptions)
      this.$cookies.remove('quote_id', cookieOptions)
      this.$cookies.remove('order_id', cookieOptions)
      this.$cookies.remove('step', cookieOptions)
      this.$cookies.remove('quote_type', cookieOptions)
      this.$cookies.remove('voucher', cookieOptions)
      this.$cookies.remove('token', cookieOptions)
      this.$cookies.remove('token_expired', cookieOptions)
      commit('logout')
      await this.$router.replace({'query': null})
      window.location.reload();
    } catch (e) {
      console.log(e.message)
      dispatch('alert/error', 'Đã có lỗi xảy ra, vui lòng tải lại trình duyệt hoặc liên hệ 1800.2097 để được hỗ trợ', {root: true})
    }
  },

  async createToken({dispatch, commit}) {
    const url = `${process.env.campServer}/session`
    try {
      const result = await this.$axios.post(url)
      if (result.status === 200) {
        const token = JSON.stringify(result.data.access_token)
        const cookieOptions = {
          maxAge: process.env.SESSION_LIFETIME,
          path: '/',
          domain: process.env.DOMAIN_COOKIES
        }
        this.$cookies.set('token', token, cookieOptions)
        dispatch('updateCookie', token)
      }
    } catch (error) {
      Alert(this, 'Thông Báo', 'Xin Vui Lòng Thử Lại', 'error');
      commit('loginFail', error)
    }
  },

  updateCookie({state}, token) {
    const cookieOptions = {
      maxAge: process.env.sessionLifeTime,
      path: '/',
      domain: process.env.domainCookies
    }
    this.$cookies.set('user', JSON.stringify(state.user), cookieOptions)
    this.$cookies.set('token', token, cookieOptions)
  },
}

export const mutations = {
  initialiseStore(state) {
    const user = this.$cookies.get('user')
    if (user) {
      state.user = {...user}
    }
  },
  handleLogin(state, user) {
    user.loggedIn = user.is_active === 1 && user.is_phone_login_otp === 0
    state.user = user
  },
  loginFail(state) {
    state.user = {
      loggedIn: false,
    }
  },
  handleStoreSubscription(state, status) {
    localStorage.setItem("isSubscription", true);
    state.statusSubscription = status;
  },
  saveUserToken(state, token) {
    const user = {...state.user}
    user.token = token
    state.user = {...user}
  },
  saveUser(state, user) {
    state.user = {...user}
  },
  logout(state) {
    state.user = {
      loggedIn: false,
    }
  },
}

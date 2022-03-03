export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Code Standard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://image.cellphones.com.vn/200x/media/favicon/default/logo-cps.png'
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugin/vue-lazyload.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    '@nuxtjs/fontawesome',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  fontawesome: {
    icons: {
      solid: [
        'faChevronRight',
        'faChevronLeft',
        'faChevronDown',
        'faChevronUp',
        'faSearch',
        'faStar',
        'faCircle',
        'faMobileAlt',
        'faUserCircle',
        'faMapMarkerAlt',
        'faListAlt',
        'faBirthdayCake',
        'faCalendarCheck',
        'faCheckCircle',
        'faAward',
        'faCreditCard',
        'faEye',
        'faComments',
        'faTimes',
        'faTrashAlt',
        'faPlus',
        'faMinus',
        'faShoppingCart',
        'faCartPlus',
        'faAddressCard',
        'faBoxOpen',
        'faQuestionCircle',
        'faFrown',
        'faEdit',
        'faSignOutAlt',
        'faGift',
        'faPaperPlane'
      ]
    }
  },

  env: {
    campServer: process.env.CAMP_SERVER,
    googleLoginURL: process.env.GOOGLE_LOGIN,
    facebookLoginURL: process.env.FACEBOOK_LOGIN,
    domainCookies: process.env.DOMAIN_COOKIES
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}

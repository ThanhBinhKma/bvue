import config from './config';
import axios from './plugins/axios'
const path  = require('path');
export default {
  
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  env: {
    CONFIG_ENV: process.env.CONFIG_ENV
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ["bootstrap/dist/css/bootstrap.css","@/assets/sass/paper-dashboard.scss","@/assets/css/themify-icons.css",
  path.resolve(__dirname,'node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
  './node_modules/element-ui/packages/theme-chalk/src/base.scss',
  './node_modules/element-ui/packages/theme-chalk/src/button.scss',
  './node_modules/element-ui/packages/theme-chalk/src/container.scss'
],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~plugins/axios','~plugins/moment', '~plugins/element-ui','~plugins/multi-select'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: config.api.url,
  },
  auth: {
    redirect: {
        callback: '/dashboard',
        login: '/login',
        logout: '/login',
        home: '/dashboard'
    },
    strategies: {
        local: {
            endpoints: false
        },
    },
    vuex: {
        namespace: 'authentication'
    }
},

  router: {
    middleware: ['checkLogin'],
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.node = {
          fs: 'empty'
      }
  },

  },
}

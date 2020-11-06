import i18n from './config/i18n'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Where You Live',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/v-mask.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    [
      'nuxt-i18n',
      {
        defaultLocale: 'ptbr',
        locales: [
          {
            code: 'ptbr',
            name: 'Português',
          },
          {
            code: 'en',
            name: 'English',
          },
        ],
        vueI18n: i18n,
      },
    ],
  ],

  vuetify: {
    theme: {
      themes: {
        light: {
          'custom-main-background': '#edf6f9',
          'custom-field-background': '#fafafa',
          'custom-submit-btn-background': '#e69e84',
        },
        dark: {
          'custom-main-background': '#181818',
          'custom-field-background': '#111111',
          'custom-submit-btn-background': '#e18a6b',
        },
      },
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api': {
      target: 'https://viacep.com.br',
      pathRewrite: {
        '^/api': '/',
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}

import colors from 'vuetify/lib/util/colors'

export default {
  ssr: false,

  target: 'server',
  head: {
    titleTemplate: (t) => (t ? `${t} - AGRAVIC` : 'AGRAVIC'),
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  plugins: ['~/plugins/models', '~/plugins/utils'],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  modules: [
    // '@nuxtjs/pwa',
    // '@nuxtjs/axios',
    '@nuxtjs/firebase',
    'cookie-universal-nuxt', // should be "under" firebase
    'nuxt-i18n',
  ],

  // axios: {},

  firebase: {
    config: {
      apiKey: 'AIzaSyA69AZ8_qicsBJYmtl8xHH13eCFftcu3oU',
      authDomain: 'seismic-spot-287016.firebaseapp.com',
      projectId: 'seismic-spot-287016',
      storageBucket: 'gs://seismic-spot-287016.appspot.com',

      databaseURL: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'user/setAuth',
        },
      },
      firestore: true,
      storage: true,
    },
  },

  i18n: {
    defaultLocale: 'zh-TW',
    locales: [{ code: 'zh-TW', file: 'zh-TW.json' }],
    lazy: true,
    langDir: 'lang/',
  },

  vuetify: {
    theme: {
      dark: true,

      themes: {
        dark: {
          // primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3,
        },
      },
    },
  },
  build: {
    extractCSS: true,
  },
}

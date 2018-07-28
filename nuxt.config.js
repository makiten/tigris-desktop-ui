
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Tigris Learning',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Tigris Learning Web/Desktop UI' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/vuelidate.js'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Routing
  */
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      '~/plugins/vuelidate.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // mode: 'spa',
  /*
  ** Modules
  */
  modules: [
    // ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
    // '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en-us',
          iso: 'en-US',
          name: 'English (American)',
          file: 'en-US.js'
        }
      ],
      lazy: true,
      defaultLocale: 'en-us',
      loadLanguagesAsync: true,
      langDir: 'locales/'
    }]
  ],
  /*
   * Apollo settings
   */
  apollo: {
    // tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    includeNodeModules: false, // optional, default: false (this includes graphql-tag for node_modules folder)
    // authenticationType: 'Basic', // optional, default: 'Bearer'
    networkInterfaces: {
      default: '~/apollo/network-interfaces/default.js'
    },
    // required
    
    clientConfigs: {
      default: {
        // required  
        httpEndpoint: 'http://localhost:8000/graphql/',
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        // wsEndpoint: 'http://localhost:8000/graphql/', // optional
        // LocalStorage token
        //tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false // Optional
      },
      test: {
        httpEndpoint: 'http://localhost:5000',
        // wsEndpoint: 'http://localhost:5000',
        tokenName: 'apollo-token'
      }
    }
  }
}

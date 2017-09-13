// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
// import VueI18n from 'vue-i18n'
import vueinterval from 'vue-interval'
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import Vuelidate from 'vuelidate'
import store from './store'

Vue.use(VueLodash, lodash)
Vue.use(VueCookie)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
// Vue.use(VueI18n)
Vue.use(require('vue-shortkey'))
Vue.use(Quasar) // Install Quasar Framework

Vue.config.productionTip = false

/*
  const i18n = new VueI18n({
  locale: 'pt_br',
  failbackLocale: 'en',
  header: {},
  tooltips: {},
  content: {}
})
*/

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    store,
    el: '#q-app',
    mixins: [vueinterval],
    router,
    render: h => h(require('./App'))
  })
})

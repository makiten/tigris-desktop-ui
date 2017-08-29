import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import token from './modules/token'
import vuexI18n from 'vuex-i18n'
import Locales from './locales.js'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const defaultLocale = 'pt_br'
const fallbackLocale = 'en_us'
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    token
  },
  strict: debug,
  plugins: [vuexLocalStorage.plugin]
})

Vue.use(vuexI18n.plugin, store, 'i18n')

for (var k in Locales) {
  if (Locales.hasOwnProperty(k)) {
    Vue.i18n.add(k, Locales[k])
  }
}
if (Vue.i18n.localeExists(defaultLocale)) {
  Vue.i18n.set(defaultLocale)
}
Vue.i18n.fallback(fallbackLocale)

export default store

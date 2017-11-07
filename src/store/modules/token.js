const SET_TOKEN = 'SET_TOKEN'
const DESTROY_TOKEN = 'DESTROY_TOKEN'

// initial state
const state = {
  token: null
}

// mutations
const mutations = {
  [SET_TOKEN] (state, { token }) {
    state.token = token
  },
  [DESTROY_TOKEN] (state) {
    state.token = null
  }
}

// actions
const actions = {
  initialize ({ state, commit }, { token }) {
    commit(SET_TOKEN, { token: token })
  },
  destroy ({ state, commit }) {
    commit(DESTROY_TOKEN)
  }
}

const getters = {
  getToken: state => state.token
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations
}

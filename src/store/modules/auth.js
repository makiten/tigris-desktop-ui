// initial state
const state = {
  auth: null
}

// getters
const getters = {
  auth: state => state.auth
}

// actions
const actions = {
}

// mutations
const mutations = {
  initialize (state, { auth }) {
    state.auth = auth
  },
  destroy (state) {
    state.auth = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

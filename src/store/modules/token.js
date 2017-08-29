// initial state
const state = {
  token: null
}

// getters
const getters = {
  token: state => state.token
}

// actions
const actions = {
}

// mutations
const mutations = {
  initialize (state, { token }) {
    state.token = token
  },
  destroy (state) {
    state.token = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

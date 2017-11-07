import Tigris from '../../api/Tigris'

const SET_AUTH = 'SET_AUTH'
const DESTROY_AUTH = 'DESTROY_AUTH'

// initial state
const state = {
  user: null
}

// mutations
const mutations = {
  [SET_AUTH] (state, { user }) {
    state.user = user
  },
  [DESTROY_AUTH] (state) {
    state.user = null
  }
}

// actions
const actions = {
  initialize ({ state, commit }, { creds }) {
    return Tigris.initialize(creds).then(tigris => {
      commit(SET_AUTH, { user: tigris._token._user })
      return tigris
    })
  },
  destroy ({ state, commit }) {
    commit(DESTROY_AUTH)
  },
  finalize ({ state, commit }, { id, email, password }) {
    return Tigris.finalize(id, email, password).then(tigris => {
      commit(SET_AUTH, { user: tigris._token._user })
      return tigris
    })
  },
  refresh ({ state, commit }, { user, token }) {
    return Tigris.initializeWithToken(user.id, token).then(tigris => {
      commit(SET_AUTH, { user: tigris._token._user })
      return tigris
    })
  }
}

const getters = {
  getUser: state => state.user
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations
}

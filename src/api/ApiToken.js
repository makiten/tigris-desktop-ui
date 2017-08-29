import axios from 'axios'

export default class ApiToken {
  constructor ($axios, key = '') {
    this.axios = $axios
    this.key = key
  }

  /*
  _authenticate (username, password) {
    const data = {
      username: username,
      password: password
    }
    return result.token
  }
  */

  static create (username, password) {
    const $http = axios.create({
      baseURL: process.env.apiHost + '/api'
    })
    const data = { username: username, password: password }
    return $http.post('/users/authenticate', data).then(r => {
      const result = r.data
      const token = new ApiToken($http)
      token._user = result.user
      token.value = result.token
      token.axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.token
      return token
    }).catch(e => { return e })
  }

  static reload (id, token) {
    const $http = axios.create({
      baseURL: process.env.apiHost + '/api'
    })
    const headers = { 'Authorization': 'Bearer ' + token.value }
    return $http.put('/users/refresh', {id: id}, { headers: headers }).then(r => {
      const result = r.data
      const newToken = new ApiToken($http)
      newToken._user = result.user
      newToken.value = result.token
      newToken.axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.token
      return newToken
    }).catch(e => { return e })
  }

  get token () {
    return this.refresh()
  }

  refresh () {
    this.axios.put('/users/refresh', {}).then(r => {
      const result = r.data
      this.axios.defaults.headers.common['Authorization'] = result.token
    })
  }
}

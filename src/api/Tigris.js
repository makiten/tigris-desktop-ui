import axios from 'axios'
import ApiToken from './ApiToken'
import Course from './Course'
import Module from './Module'
import Notification from './Notification'
import Permission from './Permission'
import Quiz from './Quiz'
import Role from './Role'
import Test from './Test'
import User from './User'
import Util from './Util'

const resources = {
  Course: Course,
  Module: Module,
  Notification: Notification,
  Permission: Permission,
  Quiz: Quiz,
  Role: Role,
  Test: Test,
  User: User,
  Util: Util
}

export default class Tigris {
  constructor (token) {
    this._token = token
  }

  _setResources () {
    for (var r in resources) {
      this[r.toLowerCase()] = new resources[r](this._token)
    }
  }

  static initializeWithToken (id, token) {
    return ApiToken.reload(id, token).then(t => {
      const tigris = new Tigris(t)
      tigris._setResources()
      return tigris
    }).catch(e => { return e })
  }

  static initialize ({ username, password }) {
    return ApiToken.create(username, password).then(token => {
      const tigris = new Tigris(token)
      tigris._setResources()
      return tigris
    }).catch(e => { return e })
  }

  static validate (token) {
    const $http = axios.create({
      baseURL: process.env.apiHost + '/api'
    })
    return $http.get('/utils/token/' + token).then(r => {
      return r.data
    })
  }

  static resetPassword (email, message) {
    const $http = axios.create({
      baseURL: process.env.apiHost + '/api'
    })
    return $http.post('/utils/reset-password', {email: email, message: message})
  }

  static finalize (id, email, password) {
    const $http = axios.create({
      baseURL: process.env.apiHost + '/api'
    })
    return $http.post('/utils/finalize', {id: id, password: password}).then(r => {
      return Tigris.initialize({username: email, password: password})
    })
  }

  get token () {
    return this._token.axios.defaults.headers.common['Authorization'].substring(7)
  }

  get authedUser () {
    return this._token._user
  }
}

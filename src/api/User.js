import ApiMethodClient from './ApiMethodClient'

export default class User extends ApiMethodClient {
  create (id, data) {
    if (id) {
      return this._apiMethod(`/users/${id}/enrollments`, 'post', data)
    } else {
      return this._apiMethod('/users', 'post', data)
    }
  }
  destroy (id, enrollmentId) {
    if (typeof enrollmentId !== 'undefined' && enrollmentId !== null) {
      return this._apiMethod(`/users/${id}/enrollments/${enrollmentId}`, 'delete')
    } else {
      return this._apiMethod(`/users/${id}`, 'delete')
    }
  }
  retrieve (id, enrollmentId, data) {
    // GET: /users
    if (arguments.length === 0 || data) {
      var qs
      if (!(typeof data === 'undefined' || data === null)) {
        qs = '?' + this._toQueryString(data)
      } else {
        qs = ''
      }
      return this._apiMethod(`/users${qs}`, 'get')
    // GET: /users/{id}
    } else if (typeof enrollmentId === 'undefined') {
      return this._apiMethod(`/users/${id}`, 'get')
    // GET: /users/{id}/enrollments/{e_id}
    } else {
      return this._apiMethod(`/users/${id}/enrollments/${enrollmentId}`, 'get')
    }
  }
  update (id, enrollmentId, data) {
    if (typeof enrollmentId === 'undefined' || enrollmentId === null) {
      return this._apiMethod(`/users/${id}`, 'patch', data)
    } else {
      return this._apiMethod(`/users/${id}/enrollments/${enrollmentId}`, 'patch', data)
    }
  }
}

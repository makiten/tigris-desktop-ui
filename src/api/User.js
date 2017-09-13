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
      if (data) {
        qs = '?' + this._toQueryString(data)
      } else {
        qs = ''
      }
      return this._apiMethod(`/users${qs}`, 'get')
    // GET: /users/{id}/enrollments/{e_id}
    } else if (id && enrollmentId) {
      return this._apiMethod(`/users/${id}/enrollments/${enrollmentId}`, 'get')
    // GET: /users/{id}
    } else {
      return this._apiMethod(`/users/${id}`, 'get')
    }
  }
  update (id, enrollmentId, data) {
    if (!enrollmentId) {
      return this._apiMethod(`/users/${id}`, 'patch', data)
    } else {
      return this._apiMethod(`/users/${id}/enrollments/${enrollmentId}`, 'patch', data)
    }
  }
}

import ApiMethodClient from './ApiMethodClient'

export default class Notification extends ApiMethodClient {
  create (data) { return this._apiMethod('/notifications', 'post', data) }
  destroy (id) { return this._apiMethod(`/notifications/${id}`, 'delete') }
  retrieve (data, id) {
    // GET: /notifications
    if (typeof id === 'undefined') {
      var dict
      if (typeof data === 'undefined' || data === null) {
        dict = {}
      } else {
        dict = data
      }
      const qs = (Object.keys(dict).length > 0) ? '?' + this._toQueryString(dict) : ''
      return this._apiMethod(`/notifications${qs}`, 'get')
    // GET: /notifications/{id}
    } else {
      return this._apiMethod(`/notifications/${id}`, 'get')
    }
  }
  update (id, data) { return this._apiMethod(`/notifications/${id}`, 'put', data) }
}

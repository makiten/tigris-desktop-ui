import ApiMethodClient from './ApiMethodClient'

export default class Permission extends ApiMethodClient {
  create (data) { return this._apiMethod('/permissions', 'post', data) }
  destroy (id) { return this._apiMethod(`/permissions/${id}`, 'delete') }
  retrieve (id) {
    // GET: /permissions
    if (arguments.length === 0) {
      return this._apiMethod('/permissions', 'get')
    // GET: /permissions/{id}
    } else {
      return this._apiMethod(`/permissions/${id}`, 'get')
    }
  }
  update (id, data) {
    // PUT: /permissions/{id} - Activating/deactivating permissions
    if (data.hasOwnProperty('activate')) {
      return this._apiMethod(`/permissions/${id}`, 'patch', data)
    // PATCH: /permissions/{id} - Normal updates
    } else {
      return this._apiMethod(`/permissions/${id}`, 'put', data)
    }
  }
}

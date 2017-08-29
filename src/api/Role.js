import ApiMethodClient from './ApiMethodClient'

export default class Role extends ApiMethodClient {
  create (data) { return this._apiMethod('/roles', 'post', data) }
  destroy (id) { return this._apiMethod(`/roles/${id}`, 'delete') }
  permissions (id) { return this._apiMethod(`/roles/${id}/permissions`, 'get') }
  retrieve (id) {
    // GET: /roles
    if (arguments.length === 0) {
      return this._apiMethod('/roles', 'get')
    // GET: /roles/{id}
    } else {
      return this._apiMethod(`/roles/${id}`, 'get')
    }
  }
  update (id, data) { return this._apiMethod(`/roles/${id}`, 'patch', data) }
}

import ApiMethodClient from './ApiMethodClient'

export default class Module extends ApiMethodClient {
  create (courseId, data) { return this._apiMethod(`/courses/${courseId}/modules`, 'post', data) }
  destroy (courseId, id) {
    // DELETE: /courses/{id}/modules
    if (arguments.length === 0) {
      return this._apiMethod(`/courses/${courseId}/modules`, 'delete')
    // DELETE: /courses/{id}/modules/{id}
    } else {
      return this._apiMethod(`/courses/${courseId}/modules/${id}`, 'delete')
    }
  }
  retrieve (courseId, id, query) {
    // GET: /courses/{id}/modules?slug=[slug]
    if (!(typeof query === 'undefined' || query === null)) {
      var qs = this._toQueryString(query)
      if (qs !== '') {
        qs = '?' + qs
      }
      return this._apiMethod(`/courses/${courseId}/modules${qs}`, 'get')
    // GET: /courses/{id}/modules
    } else if (typeof id === 'undefined' || id === null) {
      return this._apiMethod(`/courses/${courseId}/modules`, 'get')
    // GET: /courses/{id}/modules/{id}
    } else if (typeof id === 'number') {
      return this._apiMethod(`/courses/${courseId}/modules/${id}`, 'get')
    } else {
      return { error: { code: 902, message: 'Wrong type of parameter for ' + (typeof val) } }
    }
  }
  update (courseId, id, data) { return this._apiMethod(`/courses/${courseId}/modules/${id}`, 'patch', data) }
}

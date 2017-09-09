import ApiMethodClient from './ApiMethodClient'

export default class Test extends ApiMethodClient {
  create (data) { return this._apiMethod('/tests', 'post', data) }
  destroy (id) { return this._apiMethod(`/tests/${id}`, 'delete') }
  evaluate (id, data) { return this._apiMethod(`/tests/${id}/evaluate`, 'post', data) }
  retrieve (id, courseId, keepAnswer = false) {
    // GET: /tests
    if (arguments.length === 0) {
      return this._apiMethod('/tests', 'get')
    // GET: /tests?course-id={id}
    } else if (id === null && typeof courseId === 'number') {
      const keep = (keepAnswer) ? '&' + this._toQueryString({'keep-answer': keepAnswer}) : ''
      return this._apiMethod(`/tests?course-id=${courseId}${keep}`, 'get')
    // GET: /tests/{id}
    } else {
      return this._apiMethod(`/tests/${id}`, 'get')
    }
  }
  update (id, data) { return this._apiMethod(`/tests/${id}`, 'patch', data) }

  createEnrollment (id, data) { return this._apiMethod(`/tests/${id}`, 'post', data) }
  destroyEnrollment (id, enrollmentId) { return this._apiMethod(`/tests/${id}/enrollments/${enrollmentId}`, 'delete') }
  retrieveEnrollment (id, userId, enrollmentId) { return this._apiMethod(`/tests/${id}/users/${userId}/enrollments/${enrollmentId}`, 'get') }
  updateEnrollment (id, userId, enrollmentId, data) { return this._apiMethod(`/tests/${id}/users/${userId}/enrollments/${enrollmentId}`, 'put', data) }
}

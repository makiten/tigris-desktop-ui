import ApiMethodClient from './ApiMethodClient'

export default class Quiz extends ApiMethodClient {
  create (data) { return this._apiMethod('/quizzes', 'post', data) }
  evaluate (id, courseId, moduleId, submission) {
    const data = {
      'course-id': courseId,
      'module-id': moduleId,
      'submission': submission
    }
    return this._apiMethod(`/quizzes/${id}/evaluate`, 'post', data)
  }
  destroy (id) { return this._apiMethod(`/quizzes/${id}`, 'delete') }
  retrieve (id, moduleId, keepAnswer = false) {
    // GET: /quizzes
    if (arguments.length === 0) {
      return this._apiMethod('/quizzes', 'get')
    // GET: /quizzes?module-id={id}
    } else if (id === null && typeof moduleId === 'number') {
      const keep = (!(typeof keepAnswer === 'undefined' || keepAnswer === null)) ? '&' + this._toQueryString({'keep-answer': keepAnswer}) : ''
      return this._apiMethod(`/quizzes?module-id=${moduleId}${keep}`, 'get')
    // GET: /quizzes/{id}
    } else {
      return this._apiMethod(`/quizzes/${id}`, 'get')
    }
  }
  update (id, data) { return this._apiMethod(`/quizzes/${id}`, 'patch', data) }

  createEnrollment (id, data) { return this._apiMethod(`/quizzes/${id}`, 'post', data) }
  destroyEnrollment (id, enrollmentId) { return this._apiMethod(`/quizzes/${id}/enrollments/${enrollmentId}`, 'delete') }
  retrieveEnrollment (id, userId, enrollmentId) {
    // GET: /quizzes/{id}/users/{u_id}/enrollments/{e_id}
    return this._apiMethod(`/quizzes/${id}/users/${userId}/enrollments/${enrollmentId}`, 'get')
  }
  updateEnrollment (id, userId, enrollmentId, data) { return this._apiMethod(`/quizzes/${id}/users/${userId}/enrollments/${enrollmentId}`, 'put', data) }
}

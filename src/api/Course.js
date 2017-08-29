import ApiMethodClient from './ApiMethodClient'

export default class Course extends ApiMethodClient {
  create (data) {
    return this._apiMethod('/courses', 'post', data)
  }
  destroy (id) {
    return this._apiMethod(`/courses/${id}`, 'delete')
  }
  retrieve (val) {
    var promise
    // GET: /courses
    if (arguments.length === 0) {
      promise = this._apiMethod('/courses', 'get')
    } else {
      // GET: /courses/{id}
      if (typeof val === 'number') {
        promise = this._apiMethod(`/courses/${val}`, 'get')
      // GET: /courses?type=int[&query=slug]
      } else if (typeof val === 'object') {
        const qs = this._toQueryString(val)
        promise = this._apiMethod(`/courses?${qs}`, 'get')
      } else {
        promise = new Promise((resolve, reject) => {
          const err = {
            error: {
              code: 902,
              message: 'Wrong type of parameter for ' + (typeof val)
            }
          }
          resolve(err)
        })
      }
    }
    return promise
  }
  update (id, data) {
    return this._apiMethod(`/courses/${id}`, 'patch', data)
  }
}

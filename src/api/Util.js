import ApiMethodClient from './ApiMethodClient'

export default class Util extends ApiMethodClient {
  email (data) { return this._apiMethod('/utils/send-email', 'post', data) }
  invite (data) { return this._apiMethod('/utils/token', 'post', data) }
  slugify (data) { return this._apiMethod('/utils/slugify', 'put', data) }
  validate (token) { return this._apiMethod(`/utils/token/${token}`, 'get') }
}

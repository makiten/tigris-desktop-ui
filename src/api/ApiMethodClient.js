import ApiBaseClient from './ApiBaseClient'

export default class ApiMethodClient extends ApiBaseClient {
  constructor ($token) {
    super($token.axios)
  }

  _apiMethod (path, type, data = {}) {
    const t = type.toLowerCase()
    var result

    switch (t) {
      case 'delete':
        result = this._delete(path)
        break

      case 'get':
        result = this._get(path)
        break

      case 'patch':
        result = this._patch(path, data)
        break

      case 'post':
        result = this._post(path, data)
        break

      case 'put':
        result = this._put(path, data)
        break

      default:
        result = { error: { code: 901, message: 'Invalid HTTP method used: ' + t } }
    }
    return result
  }

  _toQueryString (paramsObject) {
    return Object
           .keys(paramsObject)
           .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
                                                                                            .join('&')
  }
}

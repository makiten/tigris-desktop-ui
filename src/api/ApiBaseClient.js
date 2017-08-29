export default class ApiBaseClient {
  constructor ($axios) {
    this.axios = $axios
  }

  _delete (url) {
    return this.axios.delete(url)
  }

  _get (url) {
    return this.axios.get(url)
  }

  _patch (url, data) {
    return this.axios.patch(url, data)
  }

  _post (url, data) {
    return this.axios.post(url, data)
  }

  _put (url, data) {
    return this.axios.put(url, data)
  }
}

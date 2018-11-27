import baseURL from '@/config/url'
class httpRequest {
  constructor () {
    this.stream = weex.requireModule('stream')
  }
  json2str (json) {
    var params = Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    }).join('&')
    return params
  }
  request (options) {
    var promise = new Promise((resolve, reject) => {
      this.stream.fetch({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-URL-PATH': location.pathname
        },
        body: this.json2str(options.data),
        method: options.method,
        type: options.type || 'json',
        url: baseURL + options.url
      }, function (data) {
        if (data.ok) {
          resolve(data.data)
        } else {
          reject(data.data)
        }
      })
    })
    return promise
  }
}
export default httpRequest

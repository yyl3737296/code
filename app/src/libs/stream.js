class httpRequest {
  constructor () {
    this.stream = weex.requireModule('stream')
  }
  request (options) {
    return this.stream.fetch({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-URL-PATH': location.pathname
      },
      body: 'userName=admin&password=admin',
      method: 'post',
      type: 'json',
      url: 'http://127.0.0.1:7001/login'
    })
  }
}
export default httpRequest

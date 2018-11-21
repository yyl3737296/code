class httpRequest {
  constructor () {
    this.stream = weex.requireModule('stream')
  }
  request (options) {
    return this.stream.fetch({
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      },
      body: '{username:"admin",password:"admin"}',
      method: 'post',
      url: 'http://127.0.0.1:7001/login'
    })
  }
}
export default httpRequest

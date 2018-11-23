import baseURL from '@/config/url'
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
      body: 'userName=admin&password=db69fc039dcbd2962cb4d28f5891aae1',
      method: 'post',
      type: 'json',
      url: baseURL + 'login'
    })
  }
}
export default httpRequest

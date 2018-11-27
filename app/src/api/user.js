import http from '@/libs/api.request'

export const login = (data) => {
  return http.request({
    url: 'login',
    data: data,
    method: 'post'
  })
}

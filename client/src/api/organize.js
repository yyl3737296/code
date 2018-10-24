import axios from '@/libs/api.request'

export const add = (data) => {
  return axios.request({
    url: 'organize',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'userInfo',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

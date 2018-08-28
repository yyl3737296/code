import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
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

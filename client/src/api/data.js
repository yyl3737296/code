import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const add = (url, data) => {
  return axios.request({
    url: url,
    data,
    method: 'post'
  })
}

export const del = (url) => {
  return axios.request({
    url: url,
    method: 'delete'
  })
}

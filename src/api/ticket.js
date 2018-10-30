import axios from '@/libs/api.request'

export const getInfo = (parmas) => {
  return axios.request({
    url: '/admin/detail/info',
    params: parmas,
    method: 'get'
  })
}

import axios from '@/libs/api.request'

export const getSource = (parmas) => {
  return axios.request({
    url: '/admin/source',
    params: parmas,
    method: 'get'
  })
}

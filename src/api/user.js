import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    login: userName,
    password: password
  }
  return axios.request({
    url: '/admin/user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/admin/user/info',
    params: { token: token },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/admin/user/logout',
    method: 'post'
  })
}

export const getPrivilegesInfo = () => {
  return axios.request({
    url: '/admin/user/getPrivilegesInfo',
    params: {},
    method: 'get'
  })
}

export const getUserList = (parmas) => {
  return axios.request({
    url: '/admin/user/list',
    params: parmas,
    method: 'get'
  })
}
// 重置密码
export const resetPassword = (parmas) => {
  return axios.request({
    url: '/admin/user/resetPassword',
    data: parmas,
    method: 'post'
  })
}
// 修改用户系统权限
export const modifyRoles = (parmas) => {
  return axios.request({
    url: '/admin/user/modifyRoles',
    data: parmas,
    method: 'post'
  })
}

// 修改用户景区权限
export const modifySites = (parmas) => {
  return axios.request({
    url: '/admin/user/modifySites',
    data: parmas,
    method: 'post'
  })
}

// 注册用户
export const registerUser = (parmas) => {
  return axios.request({
    url: '/admin/user/register',
    data: parmas,
    method: 'post'
  })
}

// 用户停用启用
export const setStatus = (parmas) => {
  return axios.request({
    url: '/admin/user/setStatus',
    data: parmas,
    method: 'post'
  })
}

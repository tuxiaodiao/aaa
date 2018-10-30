import { login, logout, getUserInfo, getUserList, resetPassword, modifyRoles, modifySites, registerUser, setStatus} from '@/api/user'
import { setToken, getToken } from '@/libs/util'
import _ from 'underscore'

const user = {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: [],
    sites: [],
    userList: [],
    modalSites: false,
    modalRoles: false,
    modalPassword: false,
    modalAddUser: false,
    modifySites: {},
    modifyRoles: {},
    setStatus: {},
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setSites (state, sites) {
      state.sites = sites
    },
    userList (state, data) {
      state.userList = data
    },
    setPassword (state, data) {

    },
    modalSites (state, val) {
      state.modalSites = val
    },
    modalRoles (state, val) {
      state.modalRoles = val
    },
    modalPassword (state, val) {
      state.modalPassword = val
    },
    modalAddUser (state, val) {
      state.modalAddUser = val
    },
    modifyRoles (state, data) {
      state.modifyRoles = data
    },
    modifySites (state, data) {
      state.modifySites = data
    },
    registerUser (state, data) {
      state.registerUser = data
    },
    truncateList (state) {
      state.userList = []
    },
    setStatus (state, data) {
      state.setStatus = data
    }

  },
  actions: {

    // 登录
    handleLogin ({ commit }, {userName, password}) {
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          commit('setToken', res.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setSites', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(data => {
          commit('setAvator', data['avator'] || '')
          commit('setUserName', data.username)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          commit('setSites', data.sites)
          commit('setHasGetInfo', true)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户列表
    getUserList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserList().then(data => {
          commit('userList', data || '')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 重置密码
    resetPassword ({commit }, args) {
      return new Promise((resolve, reject) => {
        resetPassword(args).then(data => {
          commit('setPassword', data || '')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改用户系统权限
    modifyRoles ({commit}, args) {
      return new Promise((resolve, reject) => {
        modifyRoles(args).then(data => {
          commit('modifyRoles', data || '')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 修改用户景区权限
    modifySites ({commit}, args) {
      return new Promise((resolve, reject) => {
        modifySites(args).then(data => {
          commit('modifySites', data || '')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 用户注册
    registerUser ({commit}, args) {
      return new Promise((resolve, reject) => {
        registerUser(args).then(data => {
          commit('registerUser', data || '')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 用户停用启用
    setStatus ({commit}, args) {
      return new Promise((resolve, reject) => {
        setStatus(args).then(data => {
          commit('setStatus', data || '')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }

  }
}

export default user

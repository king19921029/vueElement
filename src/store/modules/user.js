import {
  login,
  logout,
  getInfo
} from '@/api/login'

import {
  getUserDetails
} from '@/api/getUserBasicsList'

import {
  getToken,
  setToken,
  removeToken,
  setUserId,
  getUserId
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: '',
    userId: '1',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          setToken(response.data.token)
          setUserId(response.data.id)
          commit('SET_TOKEN', response.data.token)
          commit('SET_USERID', response.data.id)
          commit('SET_AVATAR', response.data.header_pic_url)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }, userInfo) {
      return new Promise((resolve, reject) => {
        getInfo(userInfo).then(response => {
          const data = response.data
          // if (data.roles && data.roles.length > 0) {
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.username)
          getUserDetails({adminUserId:getUserId()}).then(res=>{
            commit('SET_AVATAR', res.data.header_pic_url)
          })

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        next('/login')

      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user

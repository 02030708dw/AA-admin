import { login, logout } from '@/api/user'
import { UserInfo } from '@/api/account/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter, newRouter, asyncRoutes } from '@/router'
import { gamerPage } from '@/api/gamer/gamer'
import { CurrencytPage } from  '@/api/Currency/Currency'
const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    gamer: JSON.parse(sessionStorage.getItem('gamer')),//游戏商
    currency: JSON.parse(sessionStorage.getItem('currency')),//币种
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USEROBJ: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  //游戏商
  SET_GAMER: (state, avatar) => {
    state.gamer = avatar
    sessionStorage.setItem('gamer', JSON.stringify(avatar))
  },
  //币种
  SET_CURRENCY: (state, avatar) => {
    state.currency = avatar
    sessionStorage.setItem('currency', JSON.stringify(avatar))
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { resultSet } = response
        console.log('登录', resultSet)
        commit('SET_TOKEN', resultSet)
        setToken(resultSet)
        resolve()
      }).catch(error => {
        console.log('登录失败', error)
        reject(error)
      })
    })
  },

  // 获取用户信息
  async getInfo({ commit }) {
    return await new Promise((resolve, reject) => {
      UserInfo().then(response => {
        // const { data } = response

        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }

        // const { userObj, avatar } = data
        // 权限处理
        // if (userObj.roles === 'admin') {
        //   newRouter(asyncRoutes)
        // }

        // commit('SET_USEROBJ', userObj)
        // commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //游戏商
  gamerSet({ commit, state }) {
    return new Promise((resolve, reject) => {
      gamerPage({ pageNo: 1, pageSize: 1000000 }).then((res) => {
        console.log(res);
        commit('SET_GAMER',res.resultSet.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  currencySet({ commit, state }) {
    return new Promise((resolve, reject) => {
      CurrencytPage({ pageNo: 1, pageSize: 1000000 }).then((res) => {
        console.log(res);
        commit('SET_CURRENCY',res.resultSet.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


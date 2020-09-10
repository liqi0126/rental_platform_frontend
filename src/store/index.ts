import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userId: null, // 用户id
    // userEmail: null, // 用户email
    userKey: null, // 用户key
    isAdmin: false,
    user: {}
    // hasLogin: false, // 登录状态
    // showLogin: false, // 显示/隐藏 登录/注册框
    // showLoginBtn: true, // 显示/隐藏 header登录/注册按钮
    // isOverdue: false // 是否登录过期
  },
  mutations: {
    setUserKey (state, userKey) {
      state.userKey = userKey
      localStorage.userKey = userKey
    },
    setCurrentUser (state, payload) {
      state.user = payload.user
      localStorage.user = JSON.stringify(payload.user)
      state.isAdmin = payload.isAdmin
      localStorage.isAdmin = payload.isAdmin
    },
    resetState (state) {
      state.userKey = null // 用户key
      state.isAdmin = false
      state.user = {}
      localStorage.user = JSON.stringify({})
      localStorage.isAdmin = false
      localStorage.userKey = null
    }
    // 刷新页面后还原state
    // resetState(state, payload) {
    //   state.userid = payload.userid
    //   state.useremail = payload.useremail
    //   state.userkey = payload.userkey
    //   state.hasLogin = payload.hasLogin
    //   state.showLogin = payload.showLogin
    //   state.showLoginBtn = payload.showLoginBtn
    // },
    // // 保存用户信息
    // saveUserData(state, payload) {
    //   state.userid = payload.userid
    //   state.useremail = payload.useremail
    //   state.userkey = payload.userkey
    // },
    // // 保存vuex状态
    // saveState(state) {
    //   const data = JSON.stringify(state)
    //   localStorage.setItem('segmentstate', data)
    // },

    // // 重新登录
    // reLogin(state, payload) {
    //   state.hasLogin = payload.hasLogin
    //   state.isOverdue = payload.isOverdue
    //   state.showLogin = payload.showLogin
    //   state.userid = payload.userid
    //   state.useremail = payload.useremail
    //   state.userkey = payload.userkey
    // },

    // // 更新登录状态
    // loginStatus(state, payload) {
    //   // console.log("save user state")
    //   state.hasLogin = payload
    //   localStorage.setItem('hasLogin', JSON.stringify(payload))
    // },

    // // 显示隐藏 登录/注册框
    // showLogin(state, payload) {
    //   state.showLogin = payload
    // },

    // // 显示隐藏 header-注册/登录按钮
    // toggleLoginBtn(state, payload) {
    //   state.showLoginBtn = payload
    // }
  },
  actions: {
  },
  modules: {

  },
  getters: {
    getUserKey (state) {
      if (localStorage.userKey) {
        state.userKey = localStorage.userKey
      }
      return state.userKey
    },
    getCurrentUser (state) {
      if (localStorage.user) {
        state.user = JSON.parse(localStorage.user)
      }
      return state.user
    },
    isAdmin (state) {
      if (localStorage.isAdmin) {
        state.isAdmin = localStorage.isAdmin
      }
      return state.isAdmin
    }
  }
})

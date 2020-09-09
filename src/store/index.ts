import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid: null, // 用户id
    useremail: null, // 用户email
    userkey: null, // 用户key
    hasLogin: false, // 登录状态
    showLogin: false, // 显示/隐藏 登录/注册框
    showLoginBtn: true, // 显示/隐藏 header登录/注册按钮
    isOverdue: false // 是否登录过期
  },
  mutations: {
    // 刷新页面后还原state
    resetState (state, payload) {
      state.userid = payload.userid
      state.useremail = payload.useremail
      state.userkey = payload.userkey
      state.hasLogin = payload.hasLogin
      state.showLogin = payload.showLogin
      state.showLoginBtn = payload.showLoginBtn
    },
    // 保存用户信息
    saveUserData (state, payload) {
      state.userid = payload.userid
      state.useremail = payload.useremail
      state.userkey = payload.userkey
    },
    // 保存vuex状态
    saveState (state) {
      const data = JSON.stringify(state)
      localStorage.setItem('segmentstate', data)
    },

    // 重新登录
    reLogin (state, payload) {
      state.hasLogin = payload.hasLogin
      state.isOverdue = payload.isOverdue
      state.showLogin = payload.showLogin
      state.userid = payload.userid
      state.useremail = payload.useremail
      state.userkey = payload.userkey
    },

    // 更新登录状态
    loginStatus (state, payload) {
      // console.log("save user state")
      state.hasLogin = payload
      localStorage.setItem('hasLogin', JSON.stringify(payload))
    },

    // 显示隐藏 登录/注册框
    showLogin (state, payload) {
      state.showLogin = payload
    },

    // 显示隐藏 header-注册/登录按钮
    toggleLoginBtn (state, payload) {
      state.showLoginBtn = payload
    }
  },
  actions: {
  },
  modules: {

  }
})

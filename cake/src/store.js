import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // vuex中全局共享数据
  state: {
    userId: ""
  },
  // 修改vuex中全局共享数据
  mutations: {
    setUserId(state) {
      if(sessionStorage.getItem("uid")!=null) {
        state.userId = sessionStorage.getItem("uid");
      } else {
        state.userId = "";
      }
    },
    delUserId(state) {
      state.userId = "";
      sessionStorage.removeItem("uid");
    }
  },
  // 获取vuex中全局共享数据
  getters: {
    getUserId: function (state) {
      return state.userId;
    }
  },
  actions: {

  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)

const state = {
  user: {}, // 用车人
  nuser: {}, //帮人订车
  hiscity: [], // 城市历史记录
  curcity: {}, //选中当前城市
  hisaddr: [], // 地址历史记录
  curaddr: {}, //选中地址
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { state, getters, mutations, actions } from './global'

import user from './modules/user'

let store = new Vuex.Store({
	actions,
	state,
	getters,
	mutations,
	modules: {
		user
	}
})

export default store
import session from 'utils/session'

let NS = 'global.'

export const state = {
	global: {
		user: null,
		isLoading: false // 默认不加载进度条
	}
}

export const getters = {
	[NS + 'user']: state => {
		state.global.user = session.getLoginUser()
		return state.global.user
	},
	[NS + 'isLoading']: state => {
		return state.global.isLoading
	}
}

export const mutations = {
	[NS + 'changeUser'] (state, user) {
		state.global.user = user
		session.setLoginUser(user)
	},
	[NS + 'changeisLoading'] (state, isLoading) {
		state.global.isLoading = isLoading
	}
}

export const actions = {
}
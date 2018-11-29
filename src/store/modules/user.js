let NS = 'user.'

export default {
	state: {
		views: {
			index: 'login'
		},
		editUser: null
	},
	getters: {
		[NS + 'views']: state => state.views,
		[NS + 'editUser']: state => state.editUser
	},
	mutations: {
		[NS + 'changeView'] (state, { name, value }) {
			state.views[name] = value
		},
		[NS + 'changeEditUser'] (state, value) {
			state.editUser = value
		}
	}
}
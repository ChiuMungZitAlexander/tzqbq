import session from './session'
import backend from './backend'
import api from '../conf/api'
import store from '../store'
import router from '../router'
import CryptoJS from 'crypto-js'
import stringUtil from './string'

export default {
	// 请求后台登录
	doLogin (inUser, toUrl) {
		backend.request(api.user.login, inUser)
		.then((response) => {
			document.body.className = ''
			// 将用户信息保存到本地
			store.commit('global.changeUser', response.data)
			let redirect = router.currentRoute.query.redirect
			let paths = ['/']
			session.setPrivData([])
			session.setPaths(paths)
			if (redirect) {
				redirect = decodeURIComponent(redirect)
				if (session.getPaths().indexOf(redirect) === -1) {
					redirect = '/'
				}
			} else {
				redirect = toUrl
			}
			router.push({path: redirect})
		})
	}
}
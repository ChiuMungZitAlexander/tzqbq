import Vue from 'vue'
import VueRouter from 'vue-router'
import navConfig from './conf/nav.json'
import session from 'utils/session'

Vue.use(VueRouter)

let routes = [] // 路由配置表
let isLoad = false

navConfig.map(nav => {
	let path = '/' + nav.path
	let name = nav.path.replace(new RegExp('\\/', 'g'), '_')
	let component = resolve => require(['./views/' + nav.component], resolve)
	
	routes.push({
		path,
		name,
		component
	})
})

const router = new VueRouter({
	// mode: 'history',
	routes
})

/**
 * 路由跳转之前的钩子
 */
router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0
	if (!isLoad) {
		isLoad = true
		if (typeof (to.query.redirect) !== 'undefined') {
			let redirect = decodeURIComponent(to.query.redirect)
			next(redirect)
			return
		}
	}
	if (to.name === 'login') {
		next()
	} else {
		let user = session.getLoginUser()
		if (user) {
			next()
		} else {
			if (typeof (to.query.redirect) === 'undefined') {
				to.query.redirect = encodeURIComponent(to.path) 
			}
			next({ name: 'login', query: to.query })
		}
	}
})

export default router
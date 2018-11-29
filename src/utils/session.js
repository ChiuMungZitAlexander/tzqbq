const LOGIN_USER = 'LOGIN_USER'
const SOA_LOGIN = 'SOA_LOGIN'
const BASEDATA = 'BASEDATA_'
const MENUDATA = 'MENUDATA'
const PRIVDATA = 'PRIVDATA'
const PATHS = 'PATHS'

export default {
	setLoginUser (user) {
		if (typeof (user) === 'object') {
			window.sessionStorage.setItem(LOGIN_USER, JSON.stringify(user))	
		} else {
			window.sessionStorage.setItem(LOGIN_USER, '')
		}
	},
	getLoginUser () {
		let jsonstr = window.sessionStorage.getItem(LOGIN_USER)
		if (jsonstr && jsonstr !== '') {
			try {
				return JSON.parse(jsonstr)
			} catch (e) {
				console.error(e)
				return null
			}
		}
		return null
	},
	getBaseData (system) {
		let jsonstr = window.sessionStorage.getItem(BASEDATA + system)
		if (jsonstr && jsonstr !== '') {
			try {
				return JSON.parse(jsonstr)
			} catch (e) {
				console.error(e)
				return null
			}
		}
		return null
	},
	setBaseData (system, data) {
		window.sessionStorage.setItem(BASEDATA + system, JSON.stringify(data))
	},
	setMenuData (data) {
		window.sessionStorage.setItem(MENUDATA, JSON.stringify(data))
	},
	getMenuData () {
		let jsonstr = window.sessionStorage.getItem(MENUDATA)
		if (jsonstr && jsonstr !== '') {
			try {
				return JSON.parse(jsonstr)
			} catch (e) {
				console.error(e)
				return null
			}
		}
		return null
	},
	setPrivData (data) {
		window.sessionStorage.setItem(PRIVDATA, JSON.stringify(data))
	},
	getPrivData () {
		let jsonstr = window.sessionStorage.getItem(PRIVDATA)
		if (jsonstr && jsonstr !== '') {
			try {
				return JSON.parse(jsonstr)
			} catch (e) {
				console.error(e)
				return null
			}
		}
		return null
	},
	setPaths (data) {
		window.sessionStorage.setItem(PATHS, JSON.stringify(data))
	},
	getPaths () {
		let jsonstr = window.sessionStorage.getItem(PATHS)
		if (jsonstr && jsonstr !== '') {
			try {
				return JSON.parse(jsonstr)
			} catch (e) {
				console.error(e)
				return null
			}
		}
		return null
	}
}

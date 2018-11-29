import api from '../conf/api'
import Vue from 'vue'
import vueResource from 'vue-resource'
import store from '../store'

Vue.use(vueResource)

let config = window.config

function getApiConf (value) {
	if (value) {
		if (typeof (value) === 'string') {
			return { 
				path: value,
				method: 'GET'
			}
		} else {
			if (!value) {
				throw new Error('Api未配置' + JSON.stringify(value))
			}
			if (typeof (value) !== 'object') {
				throw new Error('Api配置错误' + JSON.stringify(value))
			}
			if (!value.method) {
				throw new Error('Api配置错误，缺少method属性' + JSON.stringify(value))
			}
			if (!value.path) {
				throw new Error('Api配置错误，缺少path属性' + JSON.stringify(value))
			}
			return { 
				path: value.path,
				method: value.method.toUpperCase(),
				server: value.server
			}
		}
	}
	throw new Error('Api path is null')
}

function getUrl (api) {
	if (process.env.NODE_ENV === 'development') {
		return api.path
	} else {
		let server = api.server || 'default'
		return config.servers[server] + api.path
	}
}

function buildQuery (json, restful) {
	if (!json) {
		return ''
	}
	let count = 0
	for (let i in json) {
		count++
	}
	let query = restful ? '/' : '?'
	let paramConcat = restful ? '/' : '&'

	for (let i in json) {
		let flag = !restful || count > 1 || (count === 1 && i !== 'value')
		if (flag) {
			query += (i + '=' + encodeURIComponent(json[i]) + paramConcat)
		} else {
			query += json[i]
		}
	}
	if (query.charAt(query.length - 1) === paramConcat) {
		query = query.substr(0, query.length - 1)
	}
	return query
}

function request (settings) {
	let api = settings.api
	let data = settings.data
	let options = settings.options || {}
	let query = settings.query
	let restful = settings.restful || true
	
	api = getApiConf(api)
	let url = getUrl(api)
	if (api.method === 'GET') {
		url += buildQuery(data, restful)
		return Vue.http.get(url, null, options)
	} else if (api.method === 'POST') {
		url += buildQuery(query, restful)
		return Vue.http.post(url, data, options)
	} else if (api.method === 'PUT') {
		url += buildQuery(query, restful)
		return Vue.http.put(url, data, options)
	} else if (api.method === 'DELETE') {
		url += buildQuery(data, restful)
		return Vue.http.delete(url, null, options)
	} else {
		throw new Error('Http method not support => ' + api.method)
	}
}

/**
 * 请求代理类
 */
export default {
	/**
	 * 获取url
	 */
	getUrl (apiKey, data) {
		let api = getApiConf(apiKey)
		let url = getUrl(api)
		if (typeof data === 'object') {
			url += buildQuery(data)
		}
		return url
	},
	/**
	 * 请求后端
	 * @param apiKey 获取URL用，即定义在src/conf/api.js中的api的Key
	 * @param data JSON数据
	 * @param options ajax附件参数，主要是http header，用的比较少
	 */
	request (api, data, options, isShowLoad = true) {
		if (isShowLoad) {
			store.commit('global.changeisLoading', true)
		}
		return new Promise((resolve, reject) => {
			request({
				api,
				data,
				options
			}).then((response) => {
				resolve(response.data)
			}, (response) => {
				reject(response)
			})
		})
	},
	/**
	 * @param {
	 * 	api: '' // piKey 获取URL用，即定义在src/conf/api.js中的api的Key
	 *  data: JSNO对象，POST或者PUT到服务端的JOSON数据，如果是GET或者Delete则实际转换成url参数
	 *  query: FormData
	 * }
	 */
	send (settings, isShowLoading = true) {
		if (isShowLoading) {
			store.commit('global.changeisLoading', true)
		}
		return new Promise((resolve, reject) => {
			request(settings).then((response) => {
				resolve(response.data)
			}, (response) => {
				reject(response)
			})
		})
	}
}
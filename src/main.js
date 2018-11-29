import Vue from 'vue'
import store from './store'
import router from './router'
import api from 'conf/api'
import backend from 'utils/backend'
import tydicUI from '../tydic-ui'
import time from 'src/conf/time'
Vue.use(tydicUI)
require('imports?define=>false&exports=>false!lib/laydate/need/laydate.css')
require('imports?define=>false&exports=>false!lib/laydate/skins/default/laydate.css')
require('imports?define=>false&exports=>false!lib/laydate/laydate.dev.js')
let echarts = require('echarts') 
Object.defineProperty(Vue.prototype, '$api', {
	get () {
		return api
	}
})
Object.defineProperty(Vue.prototype, '$backend', {
	get () {
		return backend
	}
})
Object.defineProperty(Vue.prototype, '$echarts', {
	get () {
		return echarts
	}
})

import App from './app'

new Vue({
	el: '#app',
	store,
	router,
	render: createElement => {
		return createElement(App)
	}
})
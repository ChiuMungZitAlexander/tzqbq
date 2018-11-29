<template>
<div id="app">
	<div class="main">
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
	
	<!--<div class="footer">
		版权所有：泰州市公安局
	</div>-->
</div>
</template>

<script>
import Vue from 'vue'
import header from './views/default/header'

export default {
	components: {
		cHeader: header
	},
	mounted () {
		this.handleVueResource()
	},
	methods: {
		/**
		 * vue-resource处理
		 * 针对服务器无响应或者业务错误的处理
		 */
		handleVueResource () {
			let self = this
			Vue.http.interceptors.push((request, next) => {
				next((response) => {
					if (response.status === 200) {
						let result = response.data
						if (!result.success) {
							if (parseInt(result.code) === 120000) {
								this.$tDialog.alert({
									message: '未登录或登录超时',
									onOk: () => {
										self.$router.push({ name: 'login' })
									}
								})
							} else {
								this.$tDialog.info(result.msg || '操作有误')
							}
							return { response: response, result: result }
						}
					} else {
						if (response.status >= 500) {
							this.$tDialog.info('服务器繁忙，请稍后再试', request.url)
						} else if (response.status === 404) {
							this.$tDialog.info('接口请求失败，未找到接口', request.url)
						}
						return { response: response }
					}
				})
			})
		}
	}
}
</script>

<style lang="scss">
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');
@import url('assets/css/index.css');
</style>

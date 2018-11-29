<!--
	文件：components/Button.vue
	作者：bruce.yang
	时间：2017-01-09
	描述：超链接组件
-->
<template>
	<button v-text="buttonText" v-if="showButton" @click.stop="clickEvent" @dblclick.stop="dblclickEvent" :class="[buttonClass]"></button>
</template>

<script>
import session from 'utils/session'
export default {
	name: 'tydic-button',
	props: {
		buttonText: {
			type: String,
			default: ''
		},
		buttonClass: {
			type: String,
			default: ''
		},
		clickCb: {
			type: Function,
			default: null
		},
		dblclickCb: {
			type: Function,
			default: null
		},
		privKey: {
			type: String,
			default: '',
			required: true
		},
		data: null
	},
	computed: {
		showButton () {
			let keys = session.getPrivData()
			if (keys.length === 0 || keys.indexOf(this.privKey) === -1) {
				return false
			}
			return true
		}
	},
	// 定义其他所有方法 
	methods: {
		clickEvent () {
			if (this.clickCb && this.clickCb instanceof Function) {
				if (this.data instanceof Array) {
					this.clickCb(this.data)
				} else {
					this.clickCb(this.data)
				}
			}
		},
		dblclickEvent () {
			if (this.dblclickCb && this.dblclickCb instanceof Function) {
				if (this.data instanceof Array) {
					this.dblclickCb(this.data)
				} else {
					this.dblclickCb(this.data)
				}
			}
		}
	}
}
</script>
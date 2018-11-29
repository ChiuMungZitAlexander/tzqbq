<!--
	文件：components/Span.vue
	作者：bruce.yang
	时间：2017-01-09
	描述：超链接组件
-->
<template>
	<span v-text="spanText" v-if="showSpan" @click.stop="clickEvent" @dblclick.stop="dblclickEvent" :class="[spanClass]"></span>
</template>

<script>
import session from 'utils/session'
export default {
	name: 'tydic-span',
	props: {
		spanText: {
			type: String,
			default: ''
		},
		spanClass: {
			type: String,
			default: ''
		},
		clickCb: {
			type: Function,
			default: null
		},
		dblclick: {
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
		showSpan () {
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
			if (this.dblclick && this.dblclick instanceof Function) {
				if (this.data instanceof Array) {
					this.clickCb(this.data)
				} else {
					this.clickCb(this.data)
				}
			}
		}
	}
}
</script>
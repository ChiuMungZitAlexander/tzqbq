<!--
	文件：components/Link.vue
	作者：bruce.yang
	时间：2017-01-09
	描述：超链接组件
-->
<template>
	<a v-if="showLink" @click.stop="clickEvent" @dblclick.stop="dblclickEvent" :class="[linkClass]">
	 	<slot name="content"></slot>
	 	{{linkText}}
	</a>
</template>

<script>
import session from 'utils/session'
export default {
	name: 'tydic-link',
	props: {
		linkText: {
			type: String,
			default: ''
		},
		linkClass: {
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
		showLink () {
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
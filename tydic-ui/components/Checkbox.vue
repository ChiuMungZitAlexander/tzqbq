<!--
	文件：components/Checkbox.vue
	作者：bruce.yang
	时间：2017-01-09
	描述：复选框组件
-->
<template>
	<input type="checkbox" @change="changeFun" v-model="checkModel" :class="[checkboxClass]" :value="checkboxValue" v-if="showCheckbox"/>
</template>

<script>
import session from 'utils/session'
export default {
	name: 'tydic-checkbox',
	props: {
		checkboxClass: {
			type: String,
			default: ''
		},
		changeCb: null,
		checkboxModel: null,
		checkboxValue: null,
		privKey: {
			type: String,
			default: '',
			required: true
		}
	},
	watch: {
		checkboxModel (_checkboxModel) {
			this.checkModel = _checkboxModel
		}
	},
	data () {
		return {
			checkModel: false
		}
	},
	computed: {
		showCheckbox () {
			let keys = session.getPrivData()
			if (keys.length === 0 || keys.indexOf(this.privKey) === -1) {
				return false
			}
			return true
		}
	},
	// 定义其他所有方法 
	methods: {
		changeFun () {
			if (this.changeCb && this.changeCb instanceof Function) {
				this.changeCb(this.checkboxValue, this.checkModel)
			}
		}
	}
}
</script>
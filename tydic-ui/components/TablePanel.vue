<!--
	文件：components/TablePanel.vue
	作者：tangxianrong
	时间：2016-10-06
	描述：可折叠收缩面板组件
-->
<template>
	<div :class="['panel',panelStyle]">
		  <div class="panel-heading" @click="toggle()">
		    <span :class="['dic-panel-chevron',isActive ? 'dic-panel-close' : 'dic-panel-open']"></span>
		    <div class="panel-title" v-html="title"></div>
		  </div>
		  <div class="panel-collapse" v-show="isActive">
			  <div class="panel-body">
			  	<slot></slot>
			  </div>
		  </div>
	</div>
</template>

<script>
export default {
	name: 'tydic-table-panel',
	// 定义公有属性，类型一般有：Boolean Number String Array Object Function
	props: {
		// 页签样式 panel-default panel-primary panel-success panel-info panel-warning panel-danger
		panelStyle: {type: String, default: 'panel-info'},
		title: {type: String, default: '信息面板'},
		active: {type: Boolean, default: null}
	},
	data () {
		return {
			// 是否显示主面板内容
			isActive: true
		}
	},
	created () {
	    if (this.active === null) {
	      this.isActive = !this.inAccordion
	    }
	},
	// 定义其他所有方法 
	methods: {
		/**
		 * 切换面板状态
		 */
		toggle () {
			this.isActive = !this.isActive
		},
		/**
		 * 关闭面板
		 */
		close () {
			this.isActive = false
		},
		/** 
		 * 显示面板
		 * @param {Boolean} nofire true=不触发showed回调函数
		 */
		show (nofire) {
			this.isActive = true
		} 
	},
	computed: {
	    inAccordion () {
	      return this.$parent && this.$parent._isAccordion
	    }
	},
	watch: {
		active (_active) {
			this.isActive = _active
		},
		isActive (_isActive) {
			if (_isActive && this.inAccordion) {
				this.$parent.whenToggle(this)
			}
		}
	}
}
</script>
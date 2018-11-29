<!--
	文件：components/Modal.vue
	作者：tangxianrong
	时间：2016-10-05
	描述：弹出面板窗口组件
-->
<template>
	<section class="tydic-modal" v-show="isShow">
		<!--遮罩层-->
		<section class="devin-overlay" style="display: block" @click.stop="close()"></section>
		<section :class="{
			'ovy': true,
			'dic_modal': true,
			'showDevinAlert': isShow,
			'hideDevinAlert': !isShow
		}" :style="style">
				<section :class="['panel',modalStyle]">
				  	<section class="panel-heading">
			   	 		<button v-if="showClose" type="button" class="close" @click.stop="close()">
							<span aria-hidden="true">&times;</span>
						</button>
				    <section class="panel-title" v-html="title"></section>
			  	</section>
			  	<section :class="['panel-body', bodyClass]" :style="bodyStyle">
				    <slot name="body"></slot>
			  	</section>
			 	<section v-if="showFooter" class="panel-footer">
				  	<slot name="footer"></slot>
			  	</section>
			</section>
		</section>
	</section>
</template>

<script>
export default {
	name: 'tydic-modal',
	// 定义公有属性，类型一般有：Boolean Number String Array Object Function
	props: {
		// 页签样式 panel-default panel-primary panel-success panel-info panel-warning panel-danger
		modalStyle: {type: String, default: 'panel-default'},
		bodyClass: {type: String, default: ''},
		width: {type: String, default: '350'},
		height: {type: String, default: '500'},
		title: {type: String, default: '信息面板'},
		// 是否显示底部内容栏
		showFooter: {type: Boolean, default: false},
		// 是否显示右上角取消按钮
		showClose: {type: Boolean, default: true},
		// 显示后的回调函数
		showed: null,
		// 关闭后的回调函数
		closed: null
	},
	data () {
		return {
			bodyStyle: '',
			style: '',
			// 是否显示
			isShow: false
		}
	},
	// 定义其他所有方法
	methods: {
		/**
		 * 关闭面板
		 * @param {Boolean} nofire true=不触发closed回调函数
		 */
		close (nofire) {
			this.isShow = false
			if (!nofire && this.closed && typeof this.closed === 'function') {
				this.closed()
			}
		},
		/**
		 * 显示面板
		 * @param {Boolean} nofire true=不触发showed回调函数
		 */
		show (nofire) {
			let s = this.isShow
			this.isShow = true
			if (!nofire && !s && this.showed) {
				this.showed()
			}
			this.setStyles()
		},
		setStyles () {
			let cWidth = window.screen.availWidth
			let cHeight = window.screen.availHeight

			let width = Number(this.width)
			let height = Number(this.height)
			if (width > cWidth) {
				width = cWidth
			}
			if (height > cHeight) {
				height = cHeight
			}
			let top = 'calc(50% - ' + height / 2 + 'px)'
			let left = 'calc(50% - ' + width / 2 + 'px)'

			this.style = 'width:' + width + 'px;height:' + height + 'px;top:' + top + ';left:' + left
			this.bodyStyle = 'height:' + (height - 80) + 'px; overflow-y:auto;'
		}
	}
}
</script>

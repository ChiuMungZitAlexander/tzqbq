<!--
	文件：components/Dialog.vue
	作者：tangxianrong
	时间：2016-10-04
	描述：弹出提示窗口组件
-->
<template>
	<div class="tydic-dialog">
		<!--遮罩层-->
		<div v-show="visible" class="devin-overlay"></div>
		<div 
			v-show="visible" 
			v-bind:class="{
			'devin_alert': true,
			'showDevinAlert': visible,
			'hideDevinAlert': !visible
			}">
			<!--错误弹出-->
			<div v-if="showType == 'error'" class="sa-icon sa-error animateErrorIcon">
				<span class="sa-x-mark animateXMark">
        			<span class="sa-line sa-left"></span>
					<span class="sa-line sa-right"></span>
				</span>
			</div>
			<!--警告弹出-->
			<div v-if="showType == 'warn'" class="sa-icon sa-warning">
				<span class="sa-body"></span>
				<span class="sa-dot"></span>
			</div>
			<!--成功弹出窗-->
			<div v-if="showType == 'success'" class="sa-icon sa-success animate">
				<span class="sa-line sa-tip animateSuccessTip"></span>
				<span class="sa-line sa-long animateSuccessLong"></span>
				<div class="sa-placeholder"></div>
				<div class="sa-fix"></div>
			</div>
			
			<!--确认弹窗-->
			<!--<div v-if="showType == 'warn'" class="sa-icon sa-info"></div>-->
			<!--动态效果参考网站，字号18, #78b6d3！-->
			<h2 class="alert-content">{{title}}</h2>
			<!-- <b>需要特殊颜色加B标签</b>-->
			<p class="alert-subcontent"  v-html="message"></p>

			<!--按钮-->
			<div class="sa-button-container">
				<button v-show="showType == 'confirm' || showType == 'warn'" 
					class="cancel" 
					style="box-shadow: none;" 
					@click="onBtnCancelClick()">取&nbsp;&nbsp;消</button>
				<button v-bind:class="{
					confirm: true,
					'warnningcolor': (showType == 'confirm' || showType == 'warn' || showType == 'error')
				}" 
					@click="onBtnOkClick()">确&nbsp;&nbsp;定</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tydic-dialog',
	props: {
		visible: {
	      type: Boolean,
	      twoWay: true,
	      default: false
	   }
	},
	data () {
		return {
			showType: 'info',
			title: '温馨提示',
			message: '',
			onOk: null,
			onCancel: null
		}
	},
	// 定义其他所有方法 
	methods: {
		/**
		 * 确认时回调函
		 */
		onBtnOkClick () {
			this.visible = false
			if (this.onOk) {
				this.onOk()
			}
		},
		/**
		 * 取消时回调函
		 */
		onBtnCancelClick () {
			this.visible = false
			if (this.onCancel) {
				this.onCancel()
			}
		}
	}
}
</script>
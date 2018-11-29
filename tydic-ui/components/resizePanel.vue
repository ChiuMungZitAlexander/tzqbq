<!--
	文件：components/resizePanel.vue
	作者：bruce.yang
	时间：2016-12-7
	描述：上下可按下移动改变每个面板的高度
-->
<template>
	<section :class="['tydic-resizePanel', {movePanel: isShow}]">
		<section :class="['topPanel', {mih100p: !isShow}]">
			<slot name="topPanel"></slot>
		</section>
		<section class="boundary" @mousedown.stop="boundaryMouseDown($event)" v-show="isShow"></section>
		<section class="bottomPanel" v-show="isShow">
			<slot name="bottomPanel"></slot>
		</section>
	</section>
</template>

<script>
export default {
	name: 'tydic-resizePanel',
	props: {
		mouseUpCallback: null
	},
	data () {
		return {
			bottomStyle: '',
			topStyle: '',
			isShow: false,
			startY: 0,
			moveDistance: 0
		}
	},
	created () {
	    
	},
	methods: {
		bodyMouseMove (e) {
			let moveHeight = this.startY - e.pageY 
			let topPanel = this.$el.querySelector('.topPanel')
			let bottomPanel = this.$el.querySelector('.bottomPanel')
			if (topPanel.style.height === '' || topPanel.style.height === undefined) {
				topPanel.style.height = (this.$el.clientHeight - 10) * 0.7 + 'px'	
				bottomPanel.style.height = (this.$el.clientHeight - 10) * 0.3 + 'px'	
			}
			if (parseFloat(topPanel.style.height) - moveHeight < 1) {
				topPanel.style.height = '1px' 	
				bottomPanel.style.height = this.$el.clientHeight - 11 + 'px'
			} else if (parseFloat(topPanel.style.height) - moveHeight > this.$el.clientHeight - 11) {
				topPanel.style.height = this.$el.clientHeight - 11 + 'px' 	
				bottomPanel.style.height = '1px'
			} else {
				topPanel.style.height = parseFloat(topPanel.style.height) - moveHeight + 'px' 	
				bottomPanel.style.height = parseFloat(bottomPanel.style.height) + moveHeight + 'px' 	
			}
			this.startY = e.pageY
		},
		bodyMouseUp (e) {
//			let moveHeight = this.startY - e.pageY 
//			if (this.$el.clientHeight * 0.7 - 10 - (moveHeight + this.moveDistance) < 1) {
//				console.log('1')
//				this.moveDistance = this.$el.clientHeight * 0.7 - 11
//			} else if (this.$el.clientHeight * 0.7 - 10 - (moveHeight + this.moveDistance) > this.$el.clientHeight - 11) {
//				console.log('2')
//				this.moveDistance = -this.$el.clientHeight * 0.3 - 1
//			} else {
//				console.log('3')
//				this.moveDistance = this.startY - e.pageY
//			}
			document.body.removeEventListener('mousemove', this.bodyMouseMove)
			document.body.removeEventListener('mouseup', this.bodyMouseUp)
			if (this.mouseUpCallback && typeof this.mouseUpCallback === 'function') {
				this.mouseUpCallback()
			}
		},
		boundaryMouseDown ($event) {
			this.startY = $event.pageY
			document.body.addEventListener('mousemove', this.bodyMouseMove)
          	document.body.addEventListener('mouseup', this.bodyMouseUp)
		},
		show () {
			this.isShow = true
		},
		close () {
			this.isShow = false
		}
	},
	watch: {
		
	}
}
</script>
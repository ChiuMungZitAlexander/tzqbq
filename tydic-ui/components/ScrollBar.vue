<!--
	文件：components/ScrollBar.vue
	作者：bruce.yang
	时间：2016-12-29
	描述：滚动条组件
-->
<template>
  	<section @click.stop class="tydic-scrollBar" :style="scrollBarStyle" v-show="isShow" @mouseover="mouseover($event)" @mouseleave="mouseleave($event)">
  		<section class="row fdc">
  			<section class="column f1">
  				<i :class="['arrowUp', {disable: isUpDisable}]"></i>
  			</section>
  			<section class="column f1" :style="moveStyle">
  				<span class="moveEl" @mousedown="mousedown($event)"></span>
  			</section>
  			<section class="column f1">
  				<i :class="['arrowDown', {disable: isDownDisable}]"></i>
  			</section>
  		</section>
  	</section>
</template>

<script>
export default {
	name: 'tydic-scrollBar',
	mounted () {
	},
	watch: {
		el (_el) {
			this.el = _el
			this.el.style.userSelect = 'none'
			this.moveEl = this.$el.querySelector('.moveEl')
			this.scrollBarStyle = {
				height: this.el.offsetHeight + 'px',
				top: this.el.offsetTop + 'px',
				left: this.el.offsetLeft + this.el.offsetWidth + 'px'
			}
			this.maxMoveHeight = parseFloat(this.scrollBarStyle.height) - 60
			this.moveStyle = {
				height: this.maxMoveHeight + 30 + 'px'
			}
		}
	},
	props: {
		el: null,
		callback: null
	},
	data () {
		return {
			startY: 0,
			isMove: false,
			moveEl: null,
			maxMoveHeight: 0,
			moveStyle: '',
			scrollBarStyle: '',
			isUpDisable: true,
			isDownDisable: false,
			isShow: false
		}
	},
	// 定义其他所有方法 
	methods: {
		show () {
			if (this.isMove) {
				return
			}
			this.scrollBarStyle = {
				height: this.el.offsetHeight + 'px',
				top: this.el.offsetTop + 'px',
				left: this.el.offsetLeft + this.el.offsetWidth + 'px'
			}
			this.maxMoveHeight = parseFloat(this.scrollBarStyle.height) - 60
			this.moveStyle = {
				height: this.maxMoveHeight + 30 + 'px'
			}
			this.isShow = true
		},
		hide () {
			if (this.isMove) {
				return
			}
			this.isShow = false
		},
		mousedown ($event) {
			this.isMove = true
			this.startY = $event.pageY
			document.body.addEventListener('mousemove', this.mouseMove)
          	document.body.addEventListener('mouseup', this.mouseUp)
		},
		mouseover ($event) {
			this.show()
		},
		mouseleave ($event) {
			this.hide()
		},
		mouseMove ($event) {
			let moveEl = this.$el.querySelector('.moveEl')
			let top = parseFloat(moveEl.style.top === '' ? 0 : moveEl.style.top)
          	moveEl.style.top = top + $event.pageY - this.startY + 'px'
          	top = parseFloat(moveEl.style.top)
          	if (top < 0) {
          		moveEl.style.top = '0px'
          		this.$set(this, 'isUpDisable', true)
          		this.$set(this, 'isDownDisable', false)
          	} else if (top > this.maxMoveHeight) {
          		moveEl.style.top = this.maxMoveHeight + 'px'
          		this.$set(this, 'isUpDisable', false)
          		this.$set(this, 'isDownDisable', true)
          	}
          	if (this.callback && typeof this.callback === 'function') {
          		this.callback(parseFloat(moveEl.style.top) / this.maxMoveHeight)
          	}
          	this.startY = $event.pageY
		},
		mouseUp () {
			this.isMove = false
			document.body.removeEventListener('mousemove', this.mouseMove)
          	document.body.removeEventListener('mouseup', this.mouseUp)
		},
		mouseWheel (isAdd) {
			let moveEl = this.$el.querySelector('.moveEl')
			let top = parseFloat(moveEl.style.top === '' ? 0 : moveEl.style.top)
			if (isAdd) {
				moveEl.style.top = top + this.maxMoveHeight / 30 + 'px'
			} else {
				moveEl.style.top = top - this.maxMoveHeight / 30 + 'px'
			}
          	top = parseFloat(moveEl.style.top)
          	if (top < 0) {
          		moveEl.style.top = '0px'
          		this.$set(this, 'isUpDisable', true)
          		this.$set(this, 'isDownDisable', false)
          	} else if (top > this.maxMoveHeight) {
          		moveEl.style.top = this.maxMoveHeight + 'px'
          		this.$set(this, 'isUpDisable', false)
          		this.$set(this, 'isDownDisable', true)
          	}
          	if (this.callback && typeof this.callback === 'function') {
          		this.callback(parseFloat(moveEl.style.top) / this.maxMoveHeight)
          	}
		}
 	},
	created () {
		
	}
}
</script>
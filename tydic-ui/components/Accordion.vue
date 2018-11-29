<!--
	文件：components/Accordion.vue
	作者：tangxianrong
	时间：2016-10-06
	描述：弹出面板窗口组件
-->
<template>
  	<section @click.stop class="tydic-accordion" :style="accordionStyle" v-show="isShow">
  		<ul>
  			<li v-for="(data, index) in dataList" @click.stop="selected(data)">
  				{{getName(data)}}
  			</li>
  		</ul>
  	</section>
</template>

<script>
export default {
	name: 'tydic-accordion',
	mounted () {
		let self = this
		document.body.addEventListener('click', () => {
			self.close()
		})
	},
	props: {
		// 每一次是否只有一个面板显示
		dataList: {
			type: Array,
			default: []
		},
		mapping: {
			name: 'name',
			name1: 'name1'
		},
		accordionStyle: {
			type: Object,
			default: {}
		},
		showName: null,
		callback: null
	},
	data () {
		return {
			isShow: false
		}
	},
	// 定义其他所有方法 
	methods: {
		show () {
			this.$el.style.display = 'block'
			this.$el.scrollTop = 0
		},
		close () {
			this.$el.style.display = 'none'
		},
		selected (data) {
			if (this.callback && typeof this.callback === 'function') {
				this.callback(data)
			}
			this.close()
		},
		getName (data) {
			let name = ''
			if (this.showName && typeof this.showName === 'function') {
				name = this.showName(data)
			} else {
				for (let key in this.mapping) {
					name = data[this.mapping[key]]
					if (name !== undefined && name !== null && name.trim() !== '') {
						break
					}
				}
			}
			return name
		}
	},
	created () {
		
	}
}
</script>
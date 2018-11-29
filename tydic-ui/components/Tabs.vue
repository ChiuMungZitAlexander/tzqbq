<!--
	文件：components/Tabs.vue
	作者：tangxianrong
	时间：2016-10-03
	描述：页签组件
-->
<template>
	<div>
		<ul :class="['tabs']" role="tablist" style="height: 55px;background:transparent">
			<template v-for="t in headers">
				<li role="presentation" :class="{active:t.active, disabled:t.disabled}" @click="selectTab(t)" style="margin-bottom: -2px;">
					<a>{{t.header}}</a>
				</li>
			</template>
		</ul>
		<div class="panel panel-default">
		    <slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'tydic-tabs',
	// 定义公有属性，类型一般有：Boolean Number String Array Object Function
	props: {
		// 页签样式 nav-tabs nav-pills
		tabStyle: {
	    	type: String,
	    	default: 'nav-tabs'
	    },
	    // 页签切换动效
	    effect: {
	    	type: String,
	    	default: 'fadein'
	    }

	},
	// 定义私有属性
	data () {
		return {
			// 激活页签的下标
	    	active: 0,
			// 当前激活的页签
			show: null,
			// 当前页签头部信息数组
		    headers: [],
		    // 当前页签信息数组
		    tabs: []
		}
	},
	// 相当于组件的构造函数一样，初始化时被调用
	mounted () {
		this.show = this.tabs[this.active]
		this.headers[this.active].active = true
	},
	// 当组件的创建时被调用
	created () {
		this._tabset = true
	},
	watch: {
	    active (_active) {
	      this.show = this.tabs[_active]
	    }
	},
	// 定义其他所有方法
	methods: {
		/**
		 * 切换页签
		 */
		selectTab (_tab) {
			if (!_tab.disabled) {
				for (let temp of this.headers) {
					temp.active = false
				}
				_tab.active = true
		       this.active = _tab.index
		       this.show = this.tabs[_tab.index]
		    }
		},
		/**
		 * 切换页签
		 */
		showTab (_index) {
			let _tab = this.tabs[_index]
			this.selectTab(_tab)
		}
	}
}
</script>

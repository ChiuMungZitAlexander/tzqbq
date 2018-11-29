<!--
	文件：components/Page.vue
	作者：yinpingkai tangxianrong 杨智
	时间：2016-10-14
	描述：分页组件
-->
<template>
	<section class="tydic-page">
		<section v-show="totalPage > 0" class="Pagination Page-btn">
			<span @click="toPage(1)" :class="{'unmore': cur < 2}">首页</span>
	        <span @click="onPre" :class="{'unmore': cur < 2}">&lt;上一页</span>
	        <span v-for="t in pageList" @click="toPage(t.page)" :class="{'active': cur === t.page, 'more': 0 === t.page}">{{t.title}}</span>
	        <span @click="onNext" :class="{'unmore': cur >= totalPage}">下一页&gt;</span>
	        <span @click="toPage(totalPage)" :class="{'unmore': cur >= totalPage}">尾页</span>
	   </section>
	   <section v-show="totalPage === 0 && showNone" class="Page-none">
	        <span>没有相关记录！</span>
	   </section>
	</section>
</template>
<script>
export default {
	name: 'tydic-page',
	props: {
		// 显示后的回调函数
		action: null,
		// 总记录数
		total: 0,
		// 当前页的页码
		nowCur: {
			default: 1
		},
		// 页大小,即每页显示的记录数量
		pageSize: {type: String, default: '9'},
		// 是否自动显无查询结果
		showNone: {
			default: true
		}
	},
	data () {
		return {
			// 总页码个数上限
			showMax: 8,
			// 每批页码移动时的偏移量
			offset: 2,
			// 显示的页码数组
			pageList: [],
			// 总记页码数，即一共有几页
			totalPage: 0,
			// 每批页码的开始页码
			curStart: 1,
			cur: 0
		}
	},
	watch: {
		/**
		 * 前部分页码前显示的页码数组
		 */
		cur (_cur) {
			if (!_cur || _cur < 1) {
				return
			}
			this.forChageCur()
		},
		nowCur (_nowCur) {
			this.cur = _nowCur
		},
		/**
		 * 当总记录数变化时,应该重新构建组件的页码
		 */
		total (_tatal) {
			this.init()
			if (_tatal === 0) {
				this.totalPage = 0
			}
		},
		/**
		 * 当页大小变化时,应该重新构建组件的页码
		 */
		pageSize (_pageSize) {
			this.init()
		}
	},
	created () {
		this.init()
	},
	methods: {
		init () {
			if (!this.total || this.total < 1 || !this.pageSize || this.pageSize < 1) {
				return
			}
			if (this.total % this.pageSize !== 0) {
				this.totalPage = parseInt(this.total / this.pageSize) + 1
			} else {
				this.totalPage = parseInt(this.total / this.pageSize)
			}
			this.cur = 1
			this.forChageCur()
		},
		/**
		 * 当切换当前页码时,变化页码批次
		 */
		forChageCur () {
			let me = this
			me.pageList = []
			let j = 0
			let i = 0
			let max = me.showMax
			if (me.isFirst()) {
				me.curStart = 1
			} else if (me.isEnd()) {
				me.curStart = me.totalPage - me.showMax + 2
			} 
			if (!me.isEnd() && me.totalPage > me.showMax) {
				if (!me.isFirst()) {
					me.curStart = me.cur - me.offset
				}
				i = me.totalPage - 1
				me.pageList[me.showMax - 3] = {title: '...', page: 0}
				me.pageList[me.showMax - 2] = {title: i, page: i}
				me.pageList[me.showMax - 1] = {title: me.totalPage, page: me.totalPage}
				max = me.showMax - 3
			}
//			if (me.curStart >= me.offset * 2) {
//				me.pageList[j] = {title: '首页', page: 1}
//				j++
//				me.pageList[j] = {title: me.curStart, page: me.curStart}
//				j++
//			}
			if (j > 0) {
				i = me.pageList[j - 1].page + 1
			} else {
				i = me.curStart
			}
			
			for (; j < max; j++) {
				if (i <= me.totalPage) {
					me.pageList[j] = {title: i, page: i}
					i++
				} else {
					break
				}
			}
		},
		/**
		 * 是否是第一批页码
		 */
		isFirst () {
			if (this.cur - this.offset <= 1 || this.totalPage <= this.showMax) {
				return true
			}
			return false
		},
		/**
		 * 是否是最后一批页码
		 */
		isEnd () {
			if (this.totalPage - this.cur <= this.showMax - this.offset - 1) {
				return true
			}
			return false
		},
		/**
		 * 上一页
		 */
		onPre () {
			if (this.cur > 1) {
				this.toPage(this.cur - 1)
			}
		},
		/**
		 * 下一页
		 */
		onNext () {
			if (this.cur < this.totalPage) {
				this.toPage(this.cur + 1)
			}
		},
		/**
		 * 去到指定页
		 */
		toPage (page) {
			if (page > 0 && page !== this.cur && page <= this.totalPage) {
				this.cur = page
				if (this.action) this.action(page)
			}
		}
	}
}
</script>
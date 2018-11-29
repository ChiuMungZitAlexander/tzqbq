<!--
	文件：components/Tree.vue
	作者：杨智
	时间：2016-10-27
	描述：树组件
-->
<template>
	<li v-show="nodeList !== null" class="w100">
		<span :class="['button switch', {roots_close: !isClose, roots_open: isClose}]" @click="open" v-show="isChildren"></span>
		<span class="button switch center_docu" v-if="!isChildren"></span>
		<label v-show="isCheckbox && !isChildren && nodeList[mapping.title]!='无'">
			<input type="checkbox" @change="checkBoxChange($event, nodeList)" v-model="nodeList.checked"/>
		</label>
		<a :title="nodeList[mapping.title]" @click="open($event)" :class="{curSelectedNode:isCurNode}">
			<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
			<span class="button ico_docu" v-if="!isChildren"></span>
			<span >{{nodeList[mapping.title]}}</span>
		</a>
		<ul v-show="isClose" v-if="isChildren" class="line">
			<tydic-newTree v-for="temp in nodeList[mapping.children]" 
				:nodeList="temp"
				:mapping="mapping"
				:curNode="curNode"
				:isCheckbox="isCheckbox" 
				:defaultOpen="defaultOpen" 
				:isChecked="isChecked" 
				:checkedList="checkedList">
			</tydic-newTree>
		</ul>
	</li>
</template>
<script>
export default {
	name: 'tydic-newTree',
	data () {
	  	return {
	  		isClick: false,
			isClose: false,
			spanClass: '',
			rootsClose: false,
			rootsOpen: false
	  	}
	},
	computed: {
		isCurNode () {
			if (this.curNode !== null) {
				return this.curNode === this.nodeList.id  + '-' +  this.nodeList.pid
			} 
			return false
		},
		isChildren () {
			if (this.nodeList && this.nodeList[this.mapping.children] && this.nodeList[this.mapping.children].length) {
				return true
			}
			return false
		}
	},
	props: {
		curNode: null,
		openFun: null, // 展开收缩方法
		changeFun: null, // 复选框改变方法
		nodeList: null,
		checkedList: null, // 复选框选中的id数组 checkedList
		isChecked: false, // 是否默认勾选复选框
		isCheckbox: false, // 是否带复选框
		openRoot: false,
		defaultOpen: false, // 是否默认全部展开
		mapping: {
			type: Object,
			default: {
				title: 'title',
				children: 'children'
			}
		}
	},
	created () {
		if (this.openRoot) {
			this.isClose = true
		}
		if (this.defaultOpen) {
			this.isClose = true
		}
		if (this.isChildren) {
			if (this.isClose) {
				this.rootsClose = true
			} else {
				this.rootsOpen = true
			}
		}
		this._isTydicNewTree = false
	},
	watch: {
		'nodeList.checked' (val, oldVal) {
			if (this.nodeList && this.nodeList[this.mapping.children]) {
				if (val) {
					this.checkedList.push(this.nodeList.id)
				} else {
					let index = this.checkedList.indexOf(this.nodeList.id)
					if (index !== -1) {
						this.checkedList.splice(index, 1)
					}
				}
				for (let temp of this.nodeList[this.mapping.children]) {
					if (val) {
						this.checkedList.push(temp.id)
					} else {
						let index = this.checkedList.indexOf(temp.id)
						if (index !== -1) {
							this.checkedList.splice(index, 1)
						}
					}
					temp.checked = val
				}	
			}
		}
	},
	methods: {
		open ($event) {
			let pTree = this
			if (pTree.nodeList.id === '-7777777') {
				return
			}
			if (pTree.$parent && pTree.$parent._isTydicNewTree === false) {
				while (pTree && pTree._isTydicNewTree === false) {
					pTree = pTree.$parent
				}
			}
			pTree.curNode = this.nodeList.id + '-' + this.nodeList.pid
//			if ($event) {
//				document.querySelectorAll('.tydic-Tree .curSelectedNode').forEach((dom) => {
//					dom.className = ''
//				})
//				if ($event.target.nodeName.toLowerCase() !== 'a') {
//					$event.target.parentNode.className = 'curSelectedNode'
//				} else {
//					$event.target.className = 'curSelectedNode'
//				}
//			}
			if (this.isChildren) {
//				if (this.openFun && typeof this.openFun === 'Function') {
//					this.openFun()
//				}
				this.isClose = !this.isClose
			}
			if (this.nodeList.click) {
				this.nodeList.click(this.nodeList)
			}
		},
		checkBoxChange ($event, obj) {
			if (this.changeFun && typeof this.changeFun === 'function') {
				this.changeFun()
			}
			if ($event.target.checked) {
				this.checkedList = this.checkedList || []
				this.checkedList.push(obj)
			} else {
				let index = this.checkedList.indexOf(this.nodeList)
				this.checkedList[this.nodeList.id] = false
				if (index !== -1) {
					this.checkedList.splice(index, 1)
				}
			}
		}
	}
}
</script>
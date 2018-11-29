<!--
	文件：components/Tree.vue
	作者：杨智
	时间：2016-10-27
	描述：树组件
-->
<template>
	<li v-if="nodeList !== null">
		<span :class="['button switch', {roots_close: !isClose, roots_open: isClose}]" @click="open" v-if="isChildren"></span>
		<span class="button switch center_docu" v-if="!isChildren"></span>
		<label v-if="isCheckbox">
			<input type="checkbox" v-model="nodeList.checked"/>
		</label>
		<template v-if="isDragAndDrop && !isChildren">
			<a @click="open" @mouseover="over($event, nodeList)" @mouseleave="leave" :class="{curSelectedNode:isCurNode}" draggable="true" @dragstart="dragstart($event, nodeList)">
				<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
				<span class="button ico_docu" v-if="!isChildren"></span>
				<span>{{nodeList[mapping.title]}}</span>
			</a>
		</template>
		<template v-else>
			<a @click="open" :class="{curSelectedNode:isCurNode}">
				<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
				<span class="button ico_docu" v-if="!isChildren"></span>
				<span>{{nodeList[mapping.title] + ' ' + nodeList.diTables.length + '张表'}}</span>
			</a>
		</template>
		<ul v-show="isClose" v-if="isChildren" class="line">
			<tydic-dbfx-tree v-for="temp in nodeList[mapping.children]"
				:nodeList="temp"
				:curNode="curNode"
				:isSelected="isSelected"
				:mapping="mapping"
				:isCheckbox="isCheckbox"
				:defaultOpen="defaultOpen"
				:showPopup="showPopup"
                :hidePopup="hidePopup"
				:isChecked="isChecked"
				:isDragAndDrop="isDragAndDrop"
				:dragCallback="dragCallback"
				:checkedList="checkedList">
			</tydic-dbfx-tree>
		</ul>
	</li>
</template>
<script>
export default {
	name: 'tydic-dbfx-tree',
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
			if (this.curNode !== null && this.curNode !== undefined) {
				return this.curNode === this.nodeList.appSysCode || this.curNode === this.nodeList.resourceTableCode
			}
		},
		isChildren () {
			if (this.mapping !== null) {
				return this.nodeList && this.nodeList[this.mapping.children] && this.nodeList[this.mapping.children].length
			}
			return this.nodeList && this.nodeList.children && this.nodeList.children.length
		}
	},
	props: {
		showPopup: null,
		hidePopup: null,
		mapping: {
			title: 'title',
			children: 'children'
		}, // 映射对象
		isSelected: {
			type: Boolean,
			default: true
		}, // 是否有选中效果
		curNode: {
			type: String,
			default: null
		},
		dragCallback: null,
		isDragAndDrop: false, // 是否允许拖放
		isChildDragAndDrop: true, // 是否只允许子节点拖放
		openFun: null, // 展开收缩方法
		changeFun: null, // 复选框改变方法
		nodeList: null,
		checkedList: null, // 复选框选中的id数组
		isChecked: false, // 是否默认勾选复选框
		isCheckbox: false, // 是否带复选框
		openRoot: false,
		defaultOpen: false // 是否默认全部展开
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
		},
		openRoot (val, old) {
			this.isClose = val
		}
	},
	methods: {
		open ($event) {
			let pTree = this
			if (pTree.$parent && pTree.$parent._isTydicNewTree === false) {
				while (pTree && pTree._isTydicNewTree === false) {
					let nodeName = pTree.$parent.$el.nodeName.toUpperCase()
					if (nodeName !== 'DIV' && nodeName !== 'SECTION') {
						pTree = pTree.$parent
					} else {
						break
					}
				}
			}
//			if (!pTree.curNode && pTree.curNode !== undefined) {
//				console.log('pTree.curNode:' + pTree.curNode)
//				Object.defineProperty(pTree, 'curNode', {
//					get () {
//						return this.nodeList.appSysCode || this.nodeList.resourceTableCode
//					}
//				})
//			} else {
				pTree.curNode = this.nodeList.appSysCode || this.nodeList.resourceTableCode
//			}
			if (this.isChildren) {
				this.isClose = !this.isClose
			}
			if (this.nodeList.click) {
				this.nodeList.click(this.nodeList)
			}
		},
		dragstart ($event, data) {
		 	if (this.dragCallback && typeof this.dragCallback === 'function') {
				this.dragCallback($event, data)
			}
		},
		over ($event, data) {
			if (this.showPopup && typeof this.showPopup === 'function') {
				this.showPopup($event, data, 1)
			}
		},
		leave () {
			if (this.hidePopup && typeof this.hidePopup === 'function') {
				this.hidePopup()
			}
		}
	}
}
</script>

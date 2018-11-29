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
		<template v-if="isCheckbox">
			<template v-if="isChildNodeCheckbox">
				<template v-if="!isChildren">
					<label>
						<input type="checkbox" v-model="nodeList.checked"/>
					</label>
				</template>
			</template>
			<template v-else>
				<template v-if="curLevel >= showCheckboxLevel">
					<label>
						<input type="checkbox" v-model="nodeList.checked"/>
					</label>
				</template>
			</template>
		</template>
		<template v-if="isDragAndDrop">
			<template v-if="isChildNodeDragAndDrop">
				<template v-if="!isChildren">
					<a @click="open" @mouseover="over($event, nodeList)" @mouseleave="leave" :class="{curSelectedNode:isCurNode}" draggable="true" @dragstart="dragstart($event, nodeList)" @drop="drop($event, nodeList)" @dragover="allowDrop($event)">
						<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
						<span class="button ico_docu" v-if="!isChildren"></span>
						<span>{{nodeList[mapping.title]}}</span>
					</a>
				</template>
				<template v-else>
					<a @click="open" :class="{curSelectedNode:isCurNode}">
						<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
						<span class="button ico_docu" v-if="!isChildren"></span>
						<span>{{nodeList[mapping.title]}}</span>
					</a>
				</template>
			</template>
			<template v-else>
				<template v-if="curLevel >= dragAndDropLevel">
					<a @click="open" @mouseover="over($event, nodeList)" @mouseleave="leave" :class="{curSelectedNode:isCurNode}" draggable="true" @dragstart="dragstart($event, nodeList)" @drop="drop($event, nodeList)" @dragover="allowDrop($event)">
						<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
						<span class="button ico_docu" v-if="!isChildren"></span>
						<span>{{nodeList[mapping.title]}}</span>
					</a>
				</template>
				<template v-else>
					<a @click="open" :class="{curSelectedNode:isCurNode}">
						<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
						<span class="button ico_docu" v-if="!isChildren"></span>
						<span>{{nodeList[mapping.title]}}</span>
					</a>
				</template>
			</template>
		</template>
		<template v-else>
			<a @click="open" :class="{curSelectedNode:isCurNode}">
				<span :class="['button',{ico_close: isClose, ico_open: !isClose}]" v-if="isChildren"></span>
				<span class="button ico_docu" v-if="!isChildren"></span>
				<span>{{nodeList[mapping.title]}}</span>
			</a>
		</template>
		<ul v-show="isClose" v-if="isChildren" class="line">
			<tydic-tree v-for="temp in nodeList[mapping.children]"
				:nodeList="temp"
				:curNode="curNode"
				:isSelected="isSelected"
				:mapping="mapping"
				:isCheckbox="isCheckbox"
				:defaultOpen="defaultOpen"
				:showPopup="showPopup"
                :hidePopup="hidePopup"
				:isChecked="isChecked"
				:curLevel="curLevel + 1"
				:isChildNodeCheckbox="isChildNodeCheckbox"
				:showCheckboxLevel="showCheckboxLevel"
				:isDragAndDrop="isDragAndDrop"
				:dragCallback="dragCallback"
				:dropCallback="dropCallback"
				:checkedList="checkedList">
			</tydic-tree>
		</ul>
	</li>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
	name: 'tydic-tree',
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
		...mapGetters({
			dragObj: 'tydic-tree.dragObj',
			curNode: 'tydic-tree.curNode',
			chooseNode: 'tydic-tree.chooseNode'
		}),
		isCurNode () {
			if (this.curNode !== null && this.curNode !== undefined) {
				return this.curNode === this.nodeList[this.mapping.id]
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
		curLevel: {
			type: Number,
			default: 0
		}, // 当前树节点的层数
		showCheckboxLevel: {
			type: Number,
			default: 0
		}, // 显示复选框的层次 0 标示根节点显示
		isChildNodeCheckbox: {
			type: Boolean,
			default: false
		}, // 是否是没有子节点的节点显示复选框 当为true时 showCheckboxLevel失效
		showPopup: null, // 鼠标光标移动到节点的回调
		hidePopup: null, // 鼠标光标离开节点的回调
		mapping: {
			type: Object,
			default: {
				id: 'id',
				pId: 'pId',
				title: 'title',
				children: 'children'
			}
		}, // 映射对象
		isSelected: {
			type: Boolean,
			default: true
		}, // 是否有选中效果
		curNode: {
			type: String,
			default: null
		}, // 选中的节点id
		dragCallback: null, // 拖放开始获取对象的回调事件
		dropCallback: null, // 放入的回调事件
		isDragAndDrop: {
			type: Boolean,
			default: false
		}, // 是否允许拖放
		isChildNodeDragAndDrop: {
			type: Boolean,
			default: false
		}, // 是否只允许子节点拖放 为true时 dragAndDropLevel无效
		dragAndDropLevel: {
			type: Number,
			default: 0
		}, // 允许拖放的节点层数 0 是根节点
		openFun: null, // 展开收缩方法
		changeFun: null, // 复选框改变方法
		nodeList: null, // 树对象集合
		checkedList: null, // 复选框选中的对象数组
		isChecked: {
			type: Boolean,
			default: false
		}, // 是否默认勾选复选框
		isCheckbox: {
			type: Boolean,
			default: false
		}, // 是否带复选框
		openRoot: {
			type: Boolean,
			default: false
		}, // 是否默认展开根节点
		defaultOpen: {
			type: Boolean,
			default: false
		} // 是否默认全部展开
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
			if (val && this.isSelected) {
				this.$store.commit('tydic-tree.changeChooseNode', this.chooseNode.add(this.nodeList[this.mapping.id]))
			} else {
				this.chooseNode.delete(this.nodeList[this.mapping.id])
				this.$store.commit('tydic-tree.changeChooseNode', this.chooseNode)
			}
			if (this.nodeList[this.mapping.children]) {
				for (let temp of this.nodeList[this.mapping.children]) {
					if (val) {
						this.$store.commit('tydic-tree.changeChooseNode', this.chooseNode.add(temp[this.mapping.id]))
					} else {
						this.chooseNode.delete(temp[this.mapping.id])
						this.$store.commit('tydic-tree.changeChooseNode', this.chooseNode)
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
			this.$store.commit('tydic-tree.changeCurNode', this.nodeList[this.mapping.id])
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
		 	this.$store.commit('tydic-tree.changeDragObj', data)
		},
		/**
       	  * 拖放 放的地方函数
	      */
      	allowDrop ($event) {
          	$event.preventDefault()
      	},
      	drop ($event, data) {
      		let id = this.mapping.id
      		let pId = this.mapping.pId
      		let childrenName = this.mapping.children
      		let self = this
      		let getChildNode = (tree) => {
      			for (let temp of tree) {
      				if (temp[id] === data[id]) {
      					return true
      				}
      				if (temp[childrenName] && temp[childrenName].length > 0) {
      					getChildNode(temp[childrenName])
      				}
      			}
      			return false
      		}
      		// 判断放入的节点不能使拖入的节点的子节点
      		if (self.dragObj[childrenName] && self.dragObj[childrenName].length > 0) {
      			if (data[pId] === this.dragObj[id]) {
      				self.$tydic.dialog.alert({
      					title: '放入对象不能使拖放对象的子节点'
      				})
      				return
      			}
      			if (getChildNode(self.dragObj[childrenName])) {
      				self.$tydic.dialog.alert({
      					title: '放入对象不能使拖放对象的子节点'
      				})
      				return
      			}
      		}
  			if (this.dropCallback && typeof this.dropCallback === 'function') {
				this.dropCallback($event, data)
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

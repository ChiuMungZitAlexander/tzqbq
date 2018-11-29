<template>
    <section :class="['tydic-grid', gridClass]"
        :style="gridStyle">
        <section class="table" v-if="isShowGrid">
            <section class="thead">
                <template v-for="(tr, index) in thead">
                    <section class="tr">
                        <template v-if="index === thead.length - 1">
                            <template v-if="isNo">
                                <section class="th w50">
                                   	序号
                                </section>
                            </template>
                            <template v-if="isCheckbox">
                                <section class="th w50">
                                    <label class="w100p h100p cup dif jcc aic">
                                        <input type="checkbox" class="mr0" v-model="allCheckbox" @change="selectedAll">
                                    </label>
                                </section>
                            </template>
                            <template v-if="isRadio">
                                <section class="th w50">
                            		选择        	
                                </section>
                            </template>
                        </template>
                        <section :class="['th', th.class]" v-for="(th, index) in tr.thArr" :style="th.width">
                                {{getContent(th, index, 'th')}}
                        </section>
                        <template v-if="index === thead.length - 1">
                    		<section class="th" :style="operateWidth" v-if="isOperate">
                               	操作
                           </section>
                    	</template>
                    </section>
                </template>
            </section>
            <section class="bodySection" :style="bodyMaxHeight" @mouseover="mouseover" @mouseleave="mouseleave">
        	 	<section class="tbody">
	                <template v-if="tbody.length === 0">
	                    <section class="tr bgc-t">
	                        <section class="td bgc-t">
	                            <p class="p5 w100p h100p dif jcc aic" v-text="msg"></p>
	                        </section>
	                    </section>
	                </template>
	                <template v-else>
	                    <template v-if="isCheckbox">
	                        <section :class="['tr', {selectedClass: getSelectedClass(tr)}]" v-for="(tr, index) in tbody" @click.stop="selectCheckbox($event, tr, index)">
	                            <template v-if="isNo">
	                                <section class="td w50">
	                                    {{mapping.isNo && mapping.isNo !== '' ? tr[mapping.isNo] : (index + 1)}}
	                                </section>
	                            </template>
	                            <section class="td w50">
	                                <label class="w100p h100p cup dif jcc aic">
	                                    <template v-if="isArray(tr)">
	                                        <template v-if="isMappingChecked()">
	                                            <input type="checkbox" class="mr0" v-model="tr[tr.length - 1][mapping.checked]">
	                                        </template>
	                                        <template v-else>
	                                            <input type="checkbox" class="mr0" v-model="tr[tr.length - 1].checked">
	                                        </template>
	                                    </template>
	                                    <template v-else>
	                                        <template v-if="isMappingChecked()">
	                                            <input type="checkbox" class="mr0" v-model="tr[mapping.checked]">
	                                        </template>
	                                        <template v-else>
	                                            <input type="checkbox" class="mr0" v-model="tr.checked">
	                                        </template>
	                                    </template>
	                                </label>
	                            </section>
	                            <section :class="['td']" v-for="(th, index) in thead[rowNum].thArr" :style="th.width">
	                                <p class="p5 mih40 w100p h100p dif jcc aic">
	                                    {{getContent(tr, index, 'td')}}
	                                </p>
	                            </section>
	                    		<section class="td" :style="operateWidth" v-if="isOperate">
	                               	<template v-for="op in operateArr">
	                    				<a :class="['mr10', op.className]" @click.stop="op.callback(tr)">{{op.name}}</a>
	                    			</template>
	                           </section>
	                        </section>
	                    </template>
	                    <template v-else>
	                    	<template v-if="isRadio">
	                    		<section :class="['tr', {selectedClass: getSelectedClass(tr)}]" v-for="(tr, index) in tbody" @click.stop="selectCheckbox($event, tr, index)">
		                    		<template v-if="isNo">
		                                <section class="td w50">
		                                    {{mapping.isNo && mapping.isNo !== '' ? tr[mapping.isNo] : (index + 1)}}
		                                </section>
		                            </template>
		                            <section class="td w50">
		                                <label class="w100p h100p cup dif jcc aic">
		                                    <template v-if="isArray(tr)">
		                                        <template v-if="isMappingChecked()">
		                                            <input type="radio" :name="radioName" class="mr0" :value="tr">
		                                        </template>
		                                        <template v-else>
		                                            <input type="radio" :name="radioName" class="mr0" :value="tr">
		                                        </template>
		                                    </template>
		                                    <template v-else>
		                                        <template v-if="isMappingChecked()">
		                                            <input type="radio" :name="radioName" class="mr0" :value="tr">
		                                        </template>
		                                        <template v-else>
		                                            <input type="radio" :name="radioName" class="mr0" :value="tr">
		                                        </template>
		                                    </template>
		                                </label>
		                            </section>
		                            <section :class="['td']" v-for="(th, index) in thead[rowNum].thArr" :style="th.width">
		                                <p class="p5 mih40 w100p h100p dif jcc aic">
		                                    {{getContent(tr, index, 'td')}}
		                                </p>
		                            </section>
	                        		<section class="td" :style="operateWidth" v-if="isOperate">
	                                   	<template v-for="op in operateArr">
	                        				<a :class="['mr10', op.className]" @click.stop="op.callback(tr)">{{op.name}}</a>-->
	                        			</template>
	                                </section>
		                        </section>    
		                    </template>
		                    <template v-else>
		                    	<section class="tr" v-for="(tr, index) in tbody">
		                            <template v-if="isNo">
		                                <section class="td w50">
		                                    {{mapping.isNo && mapping.isNo !== '' ? tr[mapping.isNo] : (index + 1)}}
		                                </section>
		                            </template>
		                            <section :class="['td']" v-for="(th, index) in thead[rowNum].thArr" :style="th.width">
		                                <p class="p5 mih40 w100p h100p dif jcc aic">
		                                    {{getContent(tr, index, 'td')}}
		                                </p>
		                            </section>
	                            	<section class="td operates" :style="operateWidth" v-if="isOperate">
	                        			<template v-for="op in operateArr">
	                        				<a :class="['mr10', op.className]" @click.stop="op.callback(tr)">{{op.name}}</a>
	                        			</template>
	                            	</section>
		                        </section>
		                    </template>
	                    </template>
	                </template>
	            </section>
            </section>
        </section>
        <span class="vh spanWidth"></span>
        <template v-if="gridClass.indexOf('fixedHead') !== -1">
        	<tydic-scrollBar ref="scrollBar" :el="el" :callback="move"></tydic-scrollBar>
        </template>
    </section>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'tydic-grid',
    props: {
        // 是否显示序号
        isNo: {
            type: Boolean,
            default: false
        },
        // 是否显示复选框
        isCheckbox: {
            type: Boolean,
            default: false
        },
        // 是否显示单选按钮
        isRadio: {
            type: Boolean,
            default: false
        },
        // 是否显示操作栏
        isOperate: {
            type: Boolean,
            default: false
        },
        // 操作栏的按钮数组
        operateArr: [],
        /**
         *
         operateArr: [{
             name: '新增',
             className: '',
             callback: null
         }]
         */
        // 表格样式 固定表头fixedHead 多列切自适应adaptiveWidth
        gridClass: {
            type: String,
            default: ''
        },
        // 表格宽度高度 可以是number 或者string
        gridStyle: {
            type: Object,
            default: {
            	width: '100%',
            	height: '100%'
            }
        },
        mapping: {
            type: Object,
            default: {
            	thead: [],
	            tbody: [],
	            isNo: '', // 表格对象中有序号的属性时的属性名称
	            checked: '' // 表格对象中有复选框的属性时的属性名称
            }
        },
        // 表格列是否在长度没有达到100%的时候撑满宽度
        isAdaptive: {
            type: Boolean,
            default: true
        },
        isMoreHeader: {
            type: Boolean,
            default: false
        },
        msg: {
            type: String,
            default: '表数据为空'
        },  // 表数据为空的提示语句
        isShowPage: true, // 是否显示分页
        getThContent: null,
        getTdContent: null,
        radioName: {
        	type: String,
        	default: 'gridRadio'
        },
        thWidthArr: {
            type: Array,
            default: []
        }, // 每一列的宽度 不包括序号、复选框、操作这3列的宽度
        tdPadding: {
            type: Number,
            default: 10
        }, // 表格列的padding值
        selectedClass: {
            type: String,
            default: ''
        }, // 复选框选中后的行样式
        theadArr: {
            type: Array,
            default: []
        },
        tbodyArr: {
            type: Array,
            default: []
        }
    },
    watch: {
    	operateArr (_operateArr) {
    		this.operateArr = _operateArr
    	},
        theadArr (_theadArr) {	
        	let spanWidthTag = this.$el.querySelector('.spanWidth')
        	this.thead = []
        	this.$set(this, 'isTheadInit', false)
        	spanWidthTag.style.display = 'inline-block'
            this.theadArr = _theadArr
            if (_theadArr.length > 0) {
//              this.tableWidth = {
//                  width: this.$el.clientWidth + 'px'
//              }
                let gridWidth = this.$el.clientWidth - 17
                if (!this.gridStyle.width && this.gridClass.indexOf('fixedHead') !== -1) {
                	gridWidth = gridWidth - 15
                	this.gridStyle.width = gridWidth + 'px'
                }
                if (this.isNo) {
                    gridWidth -= 50
                }
                if (this.isCheckbox) {
                    gridWidth -= 50
                }
                if (this.isRadio) {
                    gridWidth -= 50
                }
                if (this.isOperate && this.operateArr.length > 0) {
                	this.operateWidth = {
                		width: this.tdPadding * 2
                	} 
                    gridWidth -= this.tdPadding * 2
                    for (let temp of this.operateArr) {
                        if (!this.$util.stringUtil.isEmpty(temp.class)) {
                            spanWidthTag.className = 'vh ' + temp.class
                        } else {
                        	spanWidthTag.className = 'vh'
                        }
                        spanWidthTag.innerHTML = temp.name
                        gridWidth -= this.$util.tag.getTagComputedStyle(spanWidthTag, 'width', true)
                        this.operateWidth = {
	                		width: this.operateWidth.width + this.$util.tag.getTagComputedStyle(spanWidthTag, 'width', true)
	                	} 
                    }
                    spanWidthTag.className = 'vh'
                    gridWidth -= (this.operateArr.length - 1) * 10
                    this.operateWidth = {
                		width: this.operateWidth.width + (this.operateArr.length - 1) * 10 + 'px' 
                	}
                }
                let countLen = 0
                let len
                // 判断哪一行的表头列数和td的列数一致 多行表头用到
                // 判断是否是多行表头
                if (this.isMoreHeader) {
                    // 如果tbody的数组长度不为空
                    if (this.tbodyArr.length > 0) {
                        for (let i = 0; i < this.theadArr.length; i++) {
                            if (this.tbodyArr[0] instanceof Object) {
                                if (this.theadArr[i].length === Object.getOwnPropertyNames(this.tbodyArr[0]).length - 1) {
                                    this.rowNum = i
                                    break
                                }
                            } else if (this.tbodyArr[0] instanceof Array) {
                                if (this.theadArr[i].length === this.tbodyArr[0].length) {
                                    this.rowNum = i
                                    break
                                }
                            }
                        }
                    } else {
                        // 获取列数最长的表头行
                        let maxLen = 0
                        for (let i = 0; i < this.theadArr.length; i++) {
                            let len = this.theadArr[i].length
                            if (maxLen < len) {
                                maxLen = len
                                this.rowNum = i
                            }
                        }
                    }
                    len = this.theadArr[this.rowNum].length - 1
                    // 计算每列的长度
                    this.thWidthArr = this.$util.array.addItem(this.thWidthArr, this.theadArr.length - this.thWidthArr.length)
                    for (let i = 0; i < this.theadArr[this.rowNum].length; i++) {
                        let temp = this.theadArr[this.rowNum][i]
                        spanWidthTag.innerHTML = this.getContent(temp, i, 'th')
                        let width = this.$util.tag.getTagComputedStyle(spanWidthTag, 'width', true) + this.tdPadding * 2 + (len !== i ? 1 : 0)
                        console.log(spanWidthTag.innerHTML + ': ' + width)
                        if (this.thWidthArr[this.rowNum].length === 0 || this.thWidthArr[this.rowNum].length < i || this.$util.stringUtil.isEmpty(this.thWidthArr[this.rowNum][i])) {
                            this.thWidthArr[this.rowNum][i] = width + 'px'
                        }
                    }
                    if (this.isAdaptive) {
                        // 判断列的总产度是否小于grid 100%的长度
                        for (let i = 0; i < this.thWidthArr[this.rowNum].length; i++) {
                            try {
                                if (this.thWidthArr[this.rowNum][i].indexOf('%') === this.thWidthArr[this.rowNum][i].length - 1) {
                                    gridWidth -= this.$el.querySelector('.tydic-grid').clientWidth * parseFloat(this.thWidthArr[i])
                                    continue
                                }
                                gridWidth -= parseFloat(this.thWidthArr[this.rowNum][i])
                            } catch (e) {

                            }
                        }
                        if (gridWidth > 0) {
                            let addWidth = gridWidth / this.thWidthArr[this.rowNum].length
                            for (let i = 0; i < this.thWidthArr[this.rowNum].length; i++) {
                                let temp = this.thWidthArr[this.rowNum][i]
                                temp = parseFloat(temp) + addWidth + 'px'
                            }
                        }
                    }
                    // 计算多列表头每行的列宽
                    for (let i = 0; i < this.theadArr.length; i++) {
                        let widthArr = this.$util.objUtil.deepCopy(this.thWidthArr[i])
                        let maxThRowWidthArr = this.$util.objUtil.deepCopy(this.thWidthArr[this.rowNum])
                        // 判断表头的每行的列长度是否和最多列的的长度一致
                        let rowLen = 0
                        let countType = 0 // 计算类型
                        for (let j = 0; j < this.theadArr[i].length; j++) {
                            let temp = this.theadArr[i][j]
                            rowLen += temp.colspan ? parseInt(temp.colspan) : 1
                        }
                        if (rowLen === maxThRowWidthArr.length) {
                            countType = 0
                        } else if (rowLen === maxThRowWidthArr.length + (this.isNo ? 1 : 0) + (this.isCheckbox ? 1 : 0) + (this.isRadio ? 1 : 0)) {
                            countType = 1
                        } else if (rowLen + (this.isNo ? 1 : 0) + (this.isCheckbox ? 1 : 0) + (this.isRadio ? 1 : 0) === maxThRowWidthArr.length) {
                            countType = 2
                        }
                        // widthArr = this.$util.array.replaceItem(widthArr, maxThRowWidthArr)
                        for (let j = 0; j < this.theadArr[i].length; j++) {
                            let temp = this.theadArr[i][j]
                            if (i !== this.rowNum) {
                                if (temp.colspan && parseInt(temp.colspan) > 1) {
                                    let width
                                    if (j === 0) {
                                        // console.log('countType:' + countType)
                                        switch (countType) {
                                            case 0:
                                                width = this.$util.array.sum(maxThRowWidthArr.splice(0, parseInt(temp.colspan)))
                                                break
                                            case 1:
                                                width = this.$util.array.sum(maxThRowWidthArr.splice(0, parseInt(temp.colspan) - (this.isNo ? 1 : 0) - (this.isCheckbox ? 1 : 0) - (this.isRadio ? 1 : 0))) + (this.isNo ? 50 : 0) + (this.isCheckbox ? 50 : 0) + (this.isRadio ? 50 : 0)
                                                break
                                            case 2:
                                                width = this.$util.array.sum(maxThRowWidthArr.splice(0, parseInt(temp.colspan) - (this.isNo ? 1 : 0) - (this.isCheckbox ? 1 : 0) - (this.isRadio ? 1 : 0))) + (this.isNo ? 50 : 0) + (this.isCheckbox ? 50 : 0) + (this.isRadio ? 50 : 0)
                                                break
                                        }
                                    } else {
                                        width = this.$util.array.sum(maxThRowWidthArr.splice(0, parseInt(temp.colspan)))
                                    }
                                    if (this.$util.stringUtil.isEmpty(widthArr[j]) || parseFloat(widthArr[j]) < width) {
                                        this.$set(temp, 'width', {
                                            width: width + 'px'
                                        })
                                    } else {
                                        this.$set(temp, 'width', {
                                            width: widthArr[j]
                                        })
                                    }
                                } else {
                                    let width = parseFloat(maxThRowWidthArr.splice(0, 1))
                                    if (j === 0) {
                                        width += (this.isNo ? 50 : 0) + (this.isCheckbox ? 50 : 0) + (this.isRadio ? 50 : 0)
                                    }
                                    if (this.$util.stringUtil.isEmpty(widthArr[j]) || parseFloat(widthArr[j]) < width) {
                                        this.$set(temp, 'width', {
                                            width: width + 'px'
                                        })
                                    } else {
                                        this.$set(temp, 'width', {
                                            width: widthArr[j]
                                        })
                                    }
                                }
                            } else {
                                this.$set(temp, 'width', {
                                    width: widthArr[j]
                                })
                            }
                        }
                    }
                    let tempArr = []
                    for (let temp of this.theadArr) {
                        tempArr.push({
                            thArr: temp
                        })
                    }
                    this.thead = tempArr
                    this.$set(this, 'isTheadInit', true)
                } else {
                    len = this.theadArr.length - 1
                    this.thWidth = this.$util.objUtil.deepCopy(this.thWidthArr)
                    // 计算每列的长度
                    for (let i = 0; i < this.theadArr.length; i++) {
                        let temp = this.theadArr[i]
                        spanWidthTag.innerHTML = this.getContent(temp, i, 'th')
                        let width = this.$util.tag.getTagComputedStyle(spanWidthTag, 'width', true) + (len !== i ? 1 : 0) + this.tdPadding * 2
                        if ((this.thWidthArr.length > i && this.$util.stringUtil.isEmpty(this.thWidthArr[i])) || this.thWidthArr.length < i || this.thWidthArr.length === 0) {
                            // console.log('innerHTML:' + spanWidthTag.innerHTML + '   width:' + width)
                            this.thWidth.push({
                                width: width + 'px'
                            })
                        }
                    }
                    // 判断是否自适应列
                    if (this.isAdaptive) {
                        // 判断列的总产度是否小于grid 100%的长度
                        for (let i = 0; i < this.thWidth.length; i++) {
                            try {
                                let width = this.thWidth[i]
                                if (width instanceof Object) {
                                    if (width.width.indexOf('%') === width.width.length - 1) {
                                        gridWidth -= this.$el.querySelector('.tydic-grid').clientWidth * parseFloat(width.width)
                                        continue
                                    }
                                    gridWidth -= parseFloat(width.width)
                                } else {
                                    if (width.indexOf('%') === width.length - 1) {
                                        gridWidth -= this.$el.querySelector('.tydic-grid').clientWidth * parseFloat(width)
                                        continue
                                    }
                                    gridWidth -= parseFloat(width)
                                }
                            } catch (e) {

                            }
                        }
                        if (gridWidth > 0) {
                            let addWidth = gridWidth / this.thWidth.length
                            for (let temp of this.thWidth) {
                                temp.width = parseFloat(temp.width) + addWidth + 'px'
                            }
                        }
                    }
                    for (let i = 0; i < this.theadArr.length; i++) {
                        let temp = this.theadArr[i]
                        if (this.thWidth[i] instanceof Object) {
                            temp.width = this.thWidth[i]
                        } else {
                            temp.width = {
                                width: this.thWidth[i]
                            }
                        }
                    }
                    this.thead[0] = {}
                    this.thead[0].thArr = this.theadArr
                    this.$set(this, 'isTheadInit', true)
                }
            }
        },
        tbodyArr (_tbodyArr) {
        	let self = this
        	let spanWidthTag = this.$el.querySelector('.spanWidth')
        	self.$set(self, 'isTbodyInit', false)
        	spanWidthTag.style.display = 'inline-block'
        	self.tbody = []
            let num1 = 0
            function initTbody () {
                if (self.thead.length === 0) {
                    setTimeout(initTbody, 200)
                    return
                }
                if (self.isTbodyInit) {
                    return
                }
                num1 += 1
                self.tbodyArr = _tbodyArr
                if (self.tbodyArr.length > 0) {
                    if (self.isCheckbox === true || self.isRadio === true) {
                        for (let temp of self.tbodyArr) {
                            if (temp instanceof Array) {
                                temp.push({})
                                if (!self.$util.stringUtil.isEmpty(self.mapping.checked) && typeof self.mapping.checked === 'string') {
                                    Vue.util.defineReactive(temp[temp.length - 1], self.mapping.checked, false)
                                } else {
                                    Vue.util.defineReactive(temp[temp.length - 1], 'checked', false)
                                }
                            } else if (temp instanceof Object) {
                                if (!self.$util.stringUtil.isEmpty(self.mapping.checked) && typeof self.mapping.checked === 'string') {
                                    Vue.util.defineReactive(temp, self.mapping.checked, false)
                                } else {
                                    Vue.util.defineReactive(temp, 'checked', false)
                                }
                            }
                        }
                    }
                }
                self.tbody = self.tbodyArr
                self.$set(self, 'isTbodyInit', true)
            }
            initTbody()
        }
    },
    data () {
        return {
        	el: null,
        	bodyMaxHeight: {
        		height: '200px'
        	},
        	operateWidth: '',
            isTheadInit: false,
            isTbodyInit: false,
            tableWidth: '',
            rowNum: 0,
            thead: [],
            tbody: [],
            selectedRadio: null, // 单选按钮选中的对象
            thWidth: [],
            tdWidth: [], // 如果不是多行表头则和表头的每列宽度一致
            allCheckbox: ''
        }
    },
    computed: {
        isShowGrid () {
        	let self = this
        	if (this.isTheadInit && this.isTbodyInit) {
        		setTimeout(() => {
	        		if (self.gridClass && self.gridClass.indexOf('fixedHead') !== -1) {
		        		let height = self.gridStyle.height
		        		if (height.indexOf('%') === height.length - 1) {
		        			height = self.$el.clientHeight * parseFloat(height) / 100 - self.$el.querySelector('.thead').clientHeight
		        		} else if (height.indexOf('px') === height.length - 2) {
		        			height = parseFloat(height) - self.$el.querySelector('.thead').clientHeight
		        		}
		        		self.$set(self.bodyMaxHeight, 'height', height + 'px')
			    		self.el = self.$el.querySelector('.bodySection')
			    		if (self.el.clientHeight < self.el.querySelector('.tbody').clientHeight) {
			    			self.$el.querySelector('.bodySection').addEventListener('mousewheel', self.mouseWheel)
			    		}
		        	}
	        		if (self.gridClass && self.gridClass.indexOf('adaptiveWidth') !== -1) {
	        			self.$el.querySelector('.bodySection').addEventListener('scroll', self.scrollFun)
	        		}
	        	}, 500)
        		this.$el.querySelector('.spanWidth').style.display = 'none'
        		return true
        	}
        }
    },
    beforeMount () {
    	this.isTheadInit = false
    	this.isTbodyInit = false
    },
    mounted () {
    	
    },
    methods: {
        /**
         * 表格数据未初始化前获取值得方法
         */
        initGetContent (obj, index, type) {
            if (type === 'th') {
                if (this.getThContent && this.getThContent instanceof Function) {
                    return this.getThContent(obj, index)
                }
                if (typeof obj === 'string') {
                    return obj
                } else if (obj instanceof Array) {
                    if (index < obj.length - 1) {
                        return obj[index]
                    }
                    return ''
                } else if (obj instanceof Object) {
                    let arrs = this.theadArr
                    if (this.isMoreHeader) {
                        this.mapping.thead.length < arrs[this.rowNum].length
                    } else {

                    }
                }
            }
        },
        // 通过字段映射获取对应的值
        getContent (obj, index, type) {
            if (type === 'th') {
                if (this.getThContent && this.getThContent instanceof Function) {
                    return this.getThContent(obj, index)
                }
                if (typeof obj === 'string') {
                    return obj
                } else if (obj instanceof Array) {
                    if (index < obj.length - 1) {
                        return obj[index]
                    }
                    return ''
                } else if (obj instanceof Object) {
                    let arrs = this.thead
                    if (arrs.length === 0) {
                        arrs = this.theadArr
                    }
                    if ((!this.isShowGrid && (this.isMoreHeader && this.mapping.thead.length < arrs[this.rowNum].length) || (!this.isMoreHeader && this.mapping.thead.length < arrs.length)) || (this.isShowGrid && this.mapping.thead.length < arrs[this.rowNum].thArr.length)) {
                        for (let i = 0; i < this.mapping.thead.length; i++) {
                            let temp = this.mapping.thead[i]
                            if (typeof temp === 'string') {
                                if (obj[temp] !== null && obj[temp] !== undefined && obj[temp].trim() !== '') {
                                    return obj[temp]
                                }
                            } else if (temp instanceof Function) {
                                return temp(obj, index)
                            }
                        }
                    } else {
                        let mapping = this.mapping.thead[index]
                        if (typeof mapping === 'string') {
                            let content
                            try {
                                content = obj[mapping]
                            } catch (e) {
                                content = ''
                            }
                            return content
                        } else if (mapping instanceof Function) {
                            return mapping(obj)
                        }
                    }
                }
            } else if (type === 'td') {
                if (this.getTdContent && this.getTdContent instanceof Function) {
                    return this.getTdContent(obj, index)
                }
                if (typeof obj === 'string') {
                    return obj
                } else if (obj instanceof Array) {
                    if (index < obj.length - 1) {
                        return obj[index]
                    }
                    return ''
                } else if (obj instanceof Object) {
                    if (this.mapping.tbody.length < this.thead[this.rowNum].thArr.length) {
                        for (let i = 0; i < this.mapping.tbody.length; i++) {
                            let temp = this.mapping.tbody[i]
                            if (typeof temp === 'string') {
                                if (obj[temp] !== null && obj[temp] !== undefined && obj[temp].trim() !== '') {
                                    return obj[temp]
                                }
                            } else if (temp instanceof Function) {
                                return temp(obj, index)
                            }
                        }
                    } else {
                        let mapping = this.mapping.tbody[index]
                        if (typeof mapping === 'string') {
                            let content
                            try {
                                content = obj[mapping]
                            } catch (e) {
                                content = ''
                            }
                            return content
                        } else if (mapping instanceof Function) {
                            return mapping(obj)
                        }
                    }
                }
            }
            return ''
        },
        /**
         * 单机行改变复选框选中状态
         */
        selectCheckbox ($event, obj, index) {
        	if (this.isCheckbox) {
        		if (obj instanceof Array) {
	                this.$set(obj[obj.length - 1], 'checked', !obj[obj.length - 1].checked)
	            } else if (obj instanceof Object) {
	                this.$set(obj, 'checked', !obj.checked)
	            }
        	} else if (this.isRadio) {
        		this.$el.querySelectorAll('input[type="radio"]')[index].checked = true
        		this.selectedRadio = obj
        	}
        },
        /**
         * 全选和全不选 
         */
        selectedAll () {
        	if (this.tbody.length === 0) {
        		return
        	}
        	for (let temp of this.tbody) {
        		if (temp instanceof Array) {
	                this.$set(temp[temp.length - 1], 'checked', this.allCheckbox)
	            } else if (temp instanceof Object) {
	                this.$set(temp, 'checked', this.allCheckbox)
	            }
        	}
        },
        /**
         * 获取选中的复选框或者单选按钮 
         */
        getSelectedAll () {
        	if (this.isCheckbox) {
        		let arr = []
        		for (let temp of this.tbody) {
	        		if (temp instanceof Array) {
		              	if (temp[temp.length - 1].checked) {
		              		arr.push(temp)
		              	}
		            } else if (temp instanceof Object) {
		                if (temp.checked) {
		              		arr.push(temp)
		              	}
		            }
	        	}
        		return arr
        	} else if (this.isRadio) {
        		return this.selectedRadio
        	}
        	return ''
        },
        /**
         * 选中复选框的航样式
         */
        getSelectedClass (obj) {
            if (this.selectedClass === '') {
                return false
            }
            if (obj instanceof Array) {
                return obj[obj.length - 1].checked
            } else if (obj instanceof Object) {
                return obj.checked
            }
            return false
        },
        /**
         * 验证多列表头每列的长度
         */
        validationThWidht () {
            let maxLen = this.thWidthArr[this.rowNum].length
            for (let i = 0; i < this.thWidthArr.length; i++) {
                if (i !== this.rowNum) {
                    let arr = this.thWidthArr[i]
                    if (arr.length < this.theadArr[i].length) {
                        arr = this.$util.array.addItem(arr, this.theadArr[i].length - arr.length)
                    }
                }
            }
        },
        /**
         * 判断对象是否是数组
         */
        isArray (obj) {
            if (obj instanceof Array) {
                return true
            }
            return false
        },
        /**
         * 判断mapping中的checked 是否有值
         */
        isMappingChecked () {
            if (this.mapping.checked !== undefined && this.mapping.checked !== '' && this.mapping.checked !== null && typeof this.mapping.checked === 'string') {
                return true
            }
            return false
        },
        mouseover () {
        	if (this.gridClass.indexOf('fixedHead') === -1) {
        		return
        	}
        	let moveSection = this.$el.querySelector('.tbody')
			let moveHeight = moveSection.offsetHeight - this.$el.querySelector('.bodySection').clientHeight
			if (moveHeight <= 0) {
				return
			}
			this.$refs.scrollBar.show()
		},
		mouseleave () {
			if (this.gridClass.indexOf('fixedHead') === -1) {
        		return
        	}
			this.$refs.scrollBar.hide()
		},
        move (h) {
			let moveSection = this.$el.querySelector('.tbody')
			let moveHeight = moveSection.offsetHeight - this.$el.querySelector('.bodySection').clientHeight
			moveSection.style.transform = 'translateY(' + -moveHeight * h  + 'px)'
		},
		mouseWheel (e) {
			e.stopPropagation()
			e.preventDefault()
			if (e.wheelDeltaY > 0) {
				this.$refs.scrollBar.mouseWheel(false)
				return
			} 
			this.$refs.scrollBar.mouseWheel(true)
		},
		scrollFun (e) {
			let thead = this.$el.querySelector('.thead')
			let left = this.$el.querySelector('.bodySection').scrollLeft
			thead.style.transform = 'translateX(' + -left + 'px)'
		}
    }
}
</script>

<!--
	作者：bruce.yang
	时间：2017-03-22
	描述：人口情报墙页面
-->
<template>
	<section class="infoWall">
		<section class="population" v-if="isLoad">
			<section class="layer">
				<section class="main">
		        	<!--标题-->
		            <section class="title">
		                <section class="t-left"></section>
		                <section class="t-center">
		                    <img src="/static/img/src/assets/images/population/logo.png">
                    		泰州实有人口分布
		                    <section class="t-line"></section>
		                </section>
		                <section class="t-right"></section>
		            </section>
		        	<!--标题-->
			        <!--content-->
			        <section class="wrap">
			            <section class="left-side fl">
			                <section class="s-box fl">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <section class="title">常住人口年龄段分布</section>
			                        <section class="echart">
			                            <age-distribution :data="agedistributed"></age-distribution>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <section class="title">常住人口区域分布</section>
			                        <section class="echart">
			                            <area-distribution :data="residentPopulation"></area-distribution>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fl mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <ul class="tab">
			                            <li class="fl" :class="{active: dataTab[0]}"><span @click="showTab(0)">历年常住人口变化趋势</span></li>
			                            <li class="fl" :class="{active: dataTab[1]}"><span @click="showTab(1)">人口迁入分布</span></li>
			                        </ul>
			                        <section class="echart">
			                        	<historical-trend v-show="dataTab[0]" :data="varietytrend"></historical-trend>
			                            <section class="date-wrap" v-show="dataTab[1]">
			                            	<input type="text" id="countTimeFrom" placeholder="请选择日期" class="laydate-icon h30 w180" @click="startFun($event)"/>
											<span>至</span>
											<input type="text" id="countTimeTo" placeholder="请选择日期" class="laydate-icon  h30 w180" @click="endFun($event)"/>
			                                <button @click="onSearchMove">查询</button>
			                                <to-move-in :data="populationdistributed"></to-move-in>
			                            </section>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouse(0)" @mouseleave="onMouseOut(0)">
			                        <section class="title">城镇、农村人口分布</section>
			                        <img src="static/img/src/assets/images/population/changeBtn.png" class="changeBtn" @click="changeByHand(0)" />
			                        <section class="echart">
			                            <city-or-country v-show="!isChange[0]" :data="twodata"></city-or-country>
			                            <city-country-histogram v-show="isChange[0]" :data="twodata"></city-country-histogram>
			                        </section>
			                    </section>
			                </section>
			            </section>
			            <section class="center-side">
			                <section class="echart">
			                    <section class="num-wrap">
			                        <section class="person-data">
			                            <p>总人口数</p>
			                            <ul>
			                                <li v-for="item in reallytotal.total" :class="{dhao: item === ','}">{{item}}</li>
			                            </ul>
			                        </section>
			                        <section class="person-data">
			                            <p>常住人口数</p>
			                            <ul>
			                                <li v-for="item in reallytotal.residentTotal" :class="{dhao: item === ','}">{{item}}</li>
			                            </ul>
			                        </section>
			                        <section class="person-data">
			                            <p>流动人口数</p>
			                            <ul>
			                                <li v-for="item in reallytotal.flowTotal" :class="{dhao: item === ','}">{{item}}</li>
			                            </ul>
			                        </section>
			                    </section>			                 
			                </section>
			                <section class="line1"></section>
			                <section class="line2"></section>
			                <section id="tzPopulationMap" class="tzPopulationMap"></section>
			                <center-map-chart class="tzMapChart" :data="reallypopulation"></center-map-chart>
			            </section>
			            <section class="left-side fr">
			                <section class="s-box fl">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <section class="title">流动人口在泰州分布</section>
			                        <section class="echart">
			                           <tz-flow :data="flowdistributed"></tz-flow>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouse(1)" @mouseleave="onMouseOut(1)">
			                        <section class="title">来泰流动人口分布</section>
			                        <img src="static/img/src/assets/images/population/changeBtn.png" class="changeBtn" @click="changeByHand(1)" />
			                        <to-the-flow v-show="isChange[1]" :data="comeflowdistributed"></to-the-flow>
			                        <section id="ltzldrkfb1" class="ltzldrkfb1" v-show="!isChange[1]"></section>
			                    </section>
			                </section>
			                <section class="s-box fl mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <section class="title">流动人口月变化趋势</section>
			                        <section class="echart">
			                            <flow-trend :data="flowmonth"></flow-trend>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <section class="title">流动人口从业分布</section>
			                        <section class="echart">
			                            <flow-from :data="flowPractitioners"></flow-from>
			                        </section>
			                    </section>
			                </section>
			            </section>
			        </section>
			        <!--content-->
			        <section class="round1"></section>
			        <section class="round2"></section>
			        <section class="round3"></section>
			        <section class="round4"></section>
		   	 	</section>
				<section class="stone1"></section>
				<section class="stone2"></section>
				<section class="stone3"></section>
				<section class="stone4"></section>
				<section class="stone5"></section>
			</section>
		</section>
		<canvas id="canvas1" class="canvas1" v-if="!isLoad"></canvas>
	</section>
</template>
<script>
import ageDistribution from './components/ageDistribution'
import areaDistribution from './components/areaDistribution'
import cityOrCountry from './components/cityOrCountry.vue'
import historicalTrend from './components/historicalTrend'
import flowFrom from './components/flowFrom'
import flowTrend from './components/flowTrend'
import tzFlow from './components/tzFlow'
import centerMapChart from './components/centerMapChart'
import toTheFlow from './components/toTheFlow'
import cityCountryHistogram from './components/cityCountryHistogram'
import toMoveIn from './components/toMoveIn'

import chinaMapData from '../map/china.json'
import taizhouMapData from '../map/taizhou.json'
import paramJSON from '../map/loading.json'

import util from 'utils/canvas'
import map from 'utils/map'
import array from 'utils/array'

export default {
	components: {
		ageDistribution,
		areaDistribution,
		cityOrCountry,
		historicalTrend,
		flowFrom,
		flowTrend,
		tzFlow,
		centerMapChart,
		toTheFlow,
		cityCountryHistogram,
		toMoveIn
	},
	data () {
		return {
			dataTab: [true, false],
			isChange: [false, false],
			isMoveOn: [false, false],
			canvas1: null,
			ctx1: null,
			currentNum: 0,
			isLoad: false,
			agedistributed: [],
			populationdistributed: {},
			varietytrend: {},
			flowdistributed: [],
			flowmonth: [],
			reallypopulation: [],
			tzList: [], // 实有人口最大值list
			flowPractitioners: [],
			comeflowdistributed: [],
			comeflowdall: [],
			flowList: [], // 全国人口值最大值list
			residentPopulation: [],
			reallytotal: {},
			twodata: {},
			start: {}, // 日期1
            end: {}, // 日期1
            staTime: '',
        	endTime: ''
		}
	},
	watch: {
		comeflowdall (val) {
			if (val !== [] && this.isLoad === true) {
				this.comePopulationMap()
			}
		},
		reallypopulation (val) {
			if (val !== [] && this.isLoad === true) {
				this.tzMap()
			}
		}
	},
	mounted () {
		let self = this
		self.canvas1 = self.$el.querySelector('#canvas1')
		self.ctx1 = self.canvas1.getContext('2d')
		self.canvas1.width = paramJSON.defaultWinW
		self.canvas1.height = paramJSON.defaultWinH
		this.onGetData()
		this.onLoading()
	},
	methods: {
		onGetData () {
			// 常驻人口年龄段分布
			this.$backend.request(this.$api.population.agedistributed, {})
				.then((result) => {
					this.agedistributed = result.data
					this.currentNum++
				})
			// 人口迁入分布
			this.$backend.request(this.$api.population.populationdistributed, {})
				.then((result) => {
					this.populationdistributed = result.data
					this.currentNum++
				})
			// 历年常驻人口变化趋势
			this.$backend.request(this.$api.population.varietytrend, {})
				.then((result) => {
					this.varietytrend = result.data
					this.currentNum++
				})
			// 流动人口在泰州分布
			this.$backend.request(this.$api.population.flowdistributed, {})
				.then((result) => {
					this.flowdistributed = result.data
					this.currentNum++
				})
			// 流动人口月变化趋势
			this.$backend.request(this.$api.population.flowmonth, {})
				.then((result) => {
					this.flowmonth = result.data
					this.currentNum++
				})
			// 实有人口分布
			this.$backend.request(this.$api.population.reallypopulation, {})
				.then((result) => {
					this.reallypopulation = []
					this.tzList = []
					setTimeout(() => {
						for (let temp of result.data) {
							if (temp.name !== '水上') {
								temp.name = map.tzMap(temp.name)
								this.reallypopulation.push(temp)
								this.tzList.push(parseInt(temp.value))
							}
						}
						this.currentNum++
					}, 30)
				})
			// 实有人口分布总数
			this.$backend.request(this.$api.population.reallytotal, {})
				.then((result) => {
					this.reallytotal.flowTotal = result.data.flowTotal.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,').split('')
					this.reallytotal.residentTotal = result.data.residentTotal.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,').split('')
					this.reallytotal.total = result.data.total.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,').split('')
					this.currentNum++
				})
			// 常住人口
			this.$backend.request(this.$api.population.residentPopulation, {})
				.then((result) => {
					this.residentPopulation = result.data
					this.currentNum++
				})
			// 来泰流动人口分布
			this.$backend.request(this.$api.population.comeflowdistributed, {})
				.then((result) => {
					this.comeflowdistributed = result.data
					this.currentNum++
				})
			// 来泰流动人口分布全部
			this.$backend.request(this.$api.population.comeflowdall, {})
				.then((result) => {
					this.flowList = []
					setTimeout(() => {
						for (let temp of result.data) {
							this.flowList.push(parseInt(temp.value))
						}
					}, 30)
					this.comeflowdall = result.data
					this.currentNum++
				})
			// 流动人口从业分布
			this.$backend.request(this.$api.population.flowPractitioners, {})
				.then((result) => {
					this.flowPractitioners = result.data
					this.currentNum++
				})
			// 城镇、农村人口分布
			this.$backend.request(this.$api.population.twodata, {})
				.then((result) => {
					this.twodata = result.data
					this.currentNum++
				})
		},
		// 人口迁入分布查询接口
		onSearchMove () {
			let condition = {
				staTime: this.staTime,
				endTime: this.endTime
			}
			this.$backend.request(this.$api.population.populationdistributed, condition)
				.then((result) => {
					this.populationdistributed = result.data
					this.currentNum++
				})
		},
		// 数据初始化后加载页面
		init () {
			let self = this
			self.ctx1.clearRect(0, 0, paramJSON.defaultWinW, paramJSON.defaultWinH)
			self.isLoad = true
			self.onChange(0)
			self.onChange(1)
			setTimeout(() => {
				self.$echarts.registerMap('china', chinaMapData)
				self.$echarts.registerMap('泰州', taizhouMapData)	
				self.comePopulationMap()
				self.tzMap()
				self.start = {
					elem: '#countTimeFrom',
				 	format: 'YYYY-MM-DD',
				 	istime: false,
				 	init: false,
				  	festival: true,
				  	choose (datas) {
				  		self.end.min = datas
				      	self.staTime = datas
				  	}
				}
				self.end = {
					elem: '#countTimeTo',
				 	format: 'YYYY-MM-DD',
				 	istime: false,
				 	init: false,
		          	festival: true,
		          	choose (datas) {
			          	self.start.max = datas
			            self.endTime = datas
		          	}
				}
			}, 30)
		},
		/**
		 * 统计开始时间方法
		 */
		startFun ($event) {
    		this.start.elem = $event.target
    		this.start.isClick = true
    		window.laydate(this.start)
    	},
    	/**
    	 * 统计结束时间方法
    	 */
    	endFun ($event) {
    		this.end.elem = $event.target
    		this.end.isClick = true
    		window.laydate(this.end)
    	},
		/**
		 * 定时15秒切换展示层
		 */
		onChange (index) {
			let self = this
			setTimeout(() => {
				if (!self.isMoveOn[index]) {
					if (self.isChange[index] === true) {
						self.$set(self.isChange, index, false)
					} else {
						self.$set(self.isChange, index, true)
					}
				}
				self.onChange(index)
			}, 15000)
		},
		changeByHand (index) {
			if (this.isChange[index] === true) {
				this.$set(this.isChange, index, false)
			} else {
				this.$set(this.isChange, index, true)
			}
		},
		/**
		 * 鼠标移上展示不切换
		 */
		onMouse (index) {
			this.$set(this.isMoveOn, index, true)
		},
		/**
		 * 鼠标移出展示切换
		 */
		onMouseOut (index) {
			this.$set(this.isMoveOn, index, false)
		},
		/**
		 * 泰州市人口地图
		 */
		tzMap () {
			let tzPopulationMap = this.$echarts.init(this.$el.querySelector('#tzPopulationMap'))
			let option = {
				title: {
			        text: ''
			    },
			    tooltip: {
			        trigger: 'item',
					formatter: '{b}: {c}'
			    },
			    visualMap: {
			        min: 1,
			        max: array.max(this.tzList),
			        left: 'left',
			        top: 'bottom',
			        show: false,
			        color: ['rgba(28, 228, 221, 0.35)', 'rgba(27, 223, 216, 0.9)'],
			        text: ['高', '低'],           // 文本，默认为数值文本
			        calculable: false
			    },
			    series: [
			        {
			            name: '',
			            type: 'map',
			            mapType: '泰州',
			            roam: false,
			            label: {
			                normal: {
			                    show: true,
			                    textStyle: {
			                    	fontSize: 6,
			                    	color: '#fff'
			                    }
			                },
			                emphasis: {
			                	show: true,
			                	textStyle: {
			                    	fontSize: 6,
			                    	color: '#fff'
			                    }
			                }
			            },
						itemStyle: {
							normal: {
								borderWidth: 1,
								borderColor: 'rgba(27, 223, 216, 0.9)',
								color: '#fff',
								label: {
									show: false
								}
							}
						},
			            data: this.reallypopulation
			        }
			    ]
			}
       		tzPopulationMap.setOption(option)
		},
		/**
		 * 来泰流动人口分布地图效果图
		 */
		comePopulationMap () {
			let ltzldrkfb1 = this.$echarts.init(this.$el.querySelector('#ltzldrkfb1'))
			let option = {
				title: {
			        text: ''
			    },
			    tooltip: {
			        trigger: 'item',
					formatter: '{b}: {c}'
			    },
			    visualMap: {
			        min: 0,
					max: array.max(this.flowList),
			        left: 'left',
			        top: 'bottom',
			        show: true,
			        color: ['orangered', 'yellow', 'lightskyblue'],
					itemStyle: {
						normal: {
							color: '#fff',
							label: {
								show: false
							}
						}
					},
					textStyle: {
						color: '#fff'
					},
			        text: ['高', '低'],           // 文本，默认为数值文本
			        calculable: false
			    },
			    series: [
			        {
			            name: '',
			            type: 'map',
			            mapType: 'china',
			            roam: false,
			            label: {
			                normal: {
			                    show: true,
//			                    formatter: '{c}',
			                    textStyle: {
			                    	fontSize: 8
			                    }
			                }
			            },
						itemStyle: {
							normal: {
								borderWidth: 2,
								borderColor: '#58b1fa',
								color: '#000',
								label: {
									show: false
								}
							}
						},
			            data: this.comeflowdall 
			        }
			    ]
			}
       		ltzldrkfb1.setOption(option)
		},
		showTab (num) {
			for (let temp in this.dataTab) {
				this.$set(this.dataTab, temp, false)
			}
			this.$set(this.dataTab, num, true)
		},
		/**
		 * 请求数据进度
		 */
		onLoading () {
			let self = this
			let num = 10
			let loading = paramJSON.loading
			let bgCircular = {
				x: paramJSON.defaultWinW / 2,
				y: paramJSON.defaultWinH / 2,
				r: loading.r,
				sAngle: 0,
				eAngle: 2,
				strokeStyle: loading.rFillStyle,
				fillStyle: loading.rFillStyle
			}
			let grd = self.ctx1.createLinearGradient(bgCircular.x, bgCircular.y - bgCircular.r, bgCircular.x, bgCircular.y + bgCircular.r)
			grd.addColorStop(0, loading.progressBarFillStyle[0])
			grd.addColorStop(1, loading.progressBarFillStyle[1])
			let drawProgressBar = () => {
				self.ctx1.fillStyle = loading.bgFillStyle
				self.ctx1.fillRect(0, 0, paramJSON.defaultWinW,  paramJSON.defaultWinH)
				bgCircular.r = loading.r
				// 画进度条
				let progressBarSector = {
					x: bgCircular.x,
					y: bgCircular.y,
					r: loading.r,
					strokeStyle: grd,
					fillStyle: grd
				}
				util.drawCircular(self.ctx1, bgCircular)
				let progressBar = Math.floor(self.currentNum / num * 100)
				progressBarSector.sAngle = 1.5
				progressBarSector.eAngle = 1.5 + 2 * progressBar / 100
				util.drawSector(self.ctx1, progressBarSector)
				bgCircular.r = bgCircular.r - loading.progressBarW
				util.drawCircular(self.ctx1, bgCircular)
				// 进度文字
				util.fillText(self.ctx1, loading.progressBarFont, progressBar +　'%', bgCircular.x, bgCircular.y)
				if (self.currentNum === num) {
					this.init()
				} else {
					setTimeout(drawProgressBar, 16)
				}
			}
			drawProgressBar()
		}
	}
}
</script>

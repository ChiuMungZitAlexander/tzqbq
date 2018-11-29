<!--
	作者：徐可心
	时间：2017-04-01
	描述：警情分析
-->
<template>
	<section class="infoWall">
		<section class="alarmAnalysis" v-if="isLoad">
			<section class="layer">
				<section class="main">
		        	<!--标题-->
		            <section class="title">
		                <section class="t-left"></section>
		                <section class="t-center">
		                    <img src="/static/img/src/assets/images/population/logo.png">
                    		警情数据分析
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
									<section class="title">
										<span v-show="isTendencyShowed[0]">违法犯罪趋势图(近一周)</span>
										<span v-show="isTendencyShowed[1]">违法犯罪趋势图(近一个月)</span>
										<span v-show="isTendencyShowed[2]">违法犯罪趋势图(近一年)</span>
										<span class="title_btn" v-show="isTendencyShowed[0]" @click="onTendencyChange(1)"><i></i>近一个月</span>
										<span class="title_btn" v-show="isTendencyShowed[1]" @click="onTendencyChange(2)"><i></i>近一年</span>
										<span class="title_btn" v-show="isTendencyShowed[2]" @click="onTendencyChange(0)"><i></i>近一周</span>
									</section>
			                        <section class="echart">
			                        	<crime-tendency-weekly v-show="isTendencyShowed[0]" :data="getCrimeTrendByDate"></crime-tendency-weekly>
			                        	<crime-tendency-monthly v-show="isTendencyShowed[1]" :data="getCrimeTrendByWeek"></crime-tendency-monthly>
			                        	<crime-tendency-yearly v-show="isTendencyShowed[2]" :data="getCrimeTrendByMonth"></crime-tendency-yearly>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(0)" @mouseleave="onMouseLeave(0)">
									<section class="title">
										<span v-show="isShowed[0]">警情地区分布(当天)</span>
										<span v-show="!isShowed[0]">警情地区分布(近一周)</span>
										<span class="title_btn" v-show="isShowed[0]" @click="onChange(0)"><i></i>近一周</span>
										<span class="title_btn" v-show="!isShowed[0]" @click="onChange(0)"><i></i>当　天</span>
									</section>
			                        <section class="echart">
			                        	<alarm-distribution-regional-intraday v-show="isShowed[0]"></alarm-distribution-regional-intraday>
			                        	<alarm-distribution-regional-weekly v-show="!isShowed[0]"></alarm-distribution-regional-weekly>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fl mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(1)" @mouseleave="onMouseLeave(1)">
									<section class="title">
										<span v-show="isShowed[1]">警情类别分布图(近半个月)</span>
										<span v-show="!isShowed[1]">警情类别分布图(近一个月)</span>
										<span class="title_btn" v-show="isShowed[1]" @click="onChange(1)"><i></i>近一个月</span>
										<span class="title_btn" v-show="!isShowed[1]" @click="onChange(1)"><i></i>近半个月</span>
									</section>
			                        <section class="echart">
			                            <section class="date-wrap" >
			                            </section>
			                            <alarm-distribution-categorial-semimonthly v-show="isShowed[1]" :data="alarmTypeMonth"></alarm-distribution-categorial-semimonthly>
			                            <alarm-distribution-categorial-monthly v-show="!isShowed[1]" :data="alarmType"></alarm-distribution-categorial-monthly>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(2)" @mouseleave="onMouseLeave(2)">
									<section class="title">
										<span v-show="isShowed[2]">警情类比环比(近一个月)</span>
										<span v-show="!isShowed[2]">警情类比环比(近半个月)</span>
										<span class="title_btn" v-show="isShowed[2]"><i></i>近半个月</span>
										<span class="title_btn" v-show="!isShowed[2]"><i></i>近一个月</span>
									</section>
			                        <div class="echart case_compare" v-show="isShowed[2]">
										<div class="case1 ">
											<div class="bdjq">
												<h4>{{ alarmTypeMom[0].type }}</h4>
												<div class="show_num">{{ alarmTypeMom[0].mum }}</div>
											</div>
											<div class="hbqn">
												<h4>环比去年</h4>
												<div class="show_num">{{ alarmTypeMom[0].mum }}</div>
											</div>
											<div class="tbqn">
												<h4>同比去年</h4>
												<div class="show_num">{{ alarmTypeMom[0].an }}</div>
											</div>
										</div>
										<div class="case2  ">
											<div class="bdjq">
												<h4>{{ alarmTypeMom[1].type }}</h4>
												<div class="show_num">{{ alarmTypeMom[1].mum }}</div>
											</div>
											<div class="hbqn">
												<h4>环比去年</h4>
												<div class="show_num">{{ alarmTypeMom[1].mum }}</div>
											</div>
											<div class="tbqn">
												<h4>同比去年</h4>
												<div class="show_num">{{ alarmTypeMom[1].an }}</div>
											</div>
										</div>
										<div class="case3  ">
											<div class="bdjq">
												<h4>{{ alarmTypeMom[2].type }}</h4>
												<div class="show_num">{{ alarmTypeMom[2].mum }}</div>
											</div>
											<div class="hbqn">
												<h4>环比去年</h4>
												<div class="show_num">{{ alarmTypeMom[2].mum }}</div>
											</div>
											<div class="tbqn">
												<h4>同比去年</h4>
												<div class="show_num">{{ alarmTypeMom[2].an }}</div>
											</div>
										</div>
										<div class="case4  ">
											<div class="bdjq">
												<h4>{{ alarmTypeMom[3].type }}</h4>
												<div class="show_num">{{ alarmTypeMom[3].mum }}</div>
											</div>
											<div class="hbqn">
												<h4>环比去年</h4>
												<div class="show_num">{{ alarmTypeMom[3].mum }}</div>
											</div>
											<div class="tbqn">
												<h4>同比去年</h4>
												<div class="show_num">{{ alarmTypeMom[3].an }}</div>
											</div>
										</div>
									</div>
			                    </section>
			                </section>
			            </section>
			            <section class="center-side">
			                <section class="echart">
			                    <div class="echart_left">
                        			<section id="tzPopulationMap" class="tzPopulationMap"></section>
								</div>
								<div class="echart_right">
									<div class="num-wrap">
										<div class="person-data">
											<p>实时警情分布</p>
											<ul>
												<li><i class="number_line"></i>6</li>
												<li><i class="number_line"></i>8</li>
												<li><i class="number_line"></i>3</li>
											</ul>
										</div>
										<div class="person-data">
											<p>实时违法警情总数</p>
											<ul>
												<li><i class="number_line"></i>4</li>
												<li><i class="number_line"></i>6</li>
												<li><i class="number_line"></i>6</li>
											</ul>
										</div>
									</div>
								</div>
			                </section>
			                <section class="line1"></section>
			                <section class="line2"></section>
							<center-alarm-analysis class="tzMapChart"></center-alarm-analysis>
			            </section>
			            <section class="left-side fr">
			                <section class="s-box fl">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(3)" @mouseleave="onMouseLeave(3)">
									<section class="title">
										<span v-show="isShowed[3]">交通事故类型警情(近一个月)</span>
										<span v-show="!isShowed[3]">交通事故类型警情(近一周)</span>
										<span class="title_btn" v-show="isShowed[3]" @click="onChange(3)"><i></i>近一周</span>
										<span class="title_btn" v-show="!isShowed[3]" @click="onChange(3)"><i></i>近一个月</span>
									</section>
			                        <section class="echart">
										<traffic-accident-month v-show="isShowed[3]" :data="trafficAccidentMonth"></traffic-accident-month>
										<traffic-accident-week v-show="!isShowed[3]" :data="trafficAccidentWeek"></traffic-accident-week>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(4)" @mouseleave="onMouseLeave(4)">
									<section class="title">
										<span v-show="isShowed[4]">火灾类警情(按日)</span>
										<span v-show="!isShowed[4]">火灾类警情(按地区)</span>
										<span class="title_btn" v-show="isShowed[4]" @click="onChange(4)"><i></i>按地区</span>
										<span class="title_btn" v-show="!isShowed[4]" @click="onChange(4)"><i></i>按　日</span>
									</section>
									<section class="echart">
										<fire-alert-region v-show="isShowed[4]" :data="getFireAlarmByArea"></fire-alert-region>
										<fire-alert-week v-show="!isShowed[4]" :data="getAreaAlarmTotal"></fire-alert-week>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fl mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(5)" @mouseleave="onMouseLeave(5)">
									<section class="title">
										<span v-show="isShowed[5]">求助类警情(近一个月)</span>
										<span v-show="!isShowed[5]">求助类警情(近一周)</span>
										<span class="title_btn" v-show="isShowed[5]" @click="onChange(5)"><i></i>近一周</span>
										<span class="title_btn" v-show="!isShowed[5]" @click="onChange(5)"><i></i>近一个月</span>
									</section>
			                        <section class="echart">
										<for-help-month v-show="isShowed[5]" :data="getHelpAlarmByWeek"></for-help-month>
										<for-help-week v-show="!isShowed[5]" :data="getHelpAlarmByDate"></for-help-week>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content" @mouseover="onMouseOver(6)" @mouseleave="onMouseLeave(6)">
									<section class="title">
										<span v-show="isShowed[6]">纠纷类警情(近一个月)</span>
										<span v-show="!isShowed[6]">纠纷类警情(近一周)</span>
										<span class="title_btn" v-show="isShowed[6]" @click="onChange(6)"><i></i>近一周</span>
										<span class="title_btn" v-show="!isShowed[6]" @click="onChange(6)"><i></i>近一个月</span>
									</section>
			                        <section class="echart">
										<disputes-alert-month v-show="isShowed[6]" :data="getDisputeAlarmByWeek"></disputes-alert-month>
										<disputes-alert-week v-show="!isShowed[6]" :data="getDisputeAlarmByDate"></disputes-alert-week>
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
import trafficAccidentMonth from './components/trafficAccidentMonth'
import trafficAccidentWeek from './components/trafficAccidentWeek'
import disputesAlertMonth from './components/disputesAlertMonth'
import disputesAlertWeek from './components/disputesAlertWeek'
import fireAlertRegion from './components/fireAlertRegion'
import fireAlertWeek from './components/fireAlertWeek'
import forHelpMonth from './components/forHelpMonth'
import forHelpWeek from './components/forHelpWeek'
import crimeTendencyWeekly from './components/crimeTendencyWeekly'
import crimeTendencyMonthly from './components/crimeTendencyMonthly'
import crimeTendencyYearly from './components/crimeTendencyYearly'
import centerAlarmAnalysis from './components/centerAlarmAnalysis'
import alarmDistributionRegionalIntraday from './components/alarmDistributionRegionalIntraday'
import alarmDistributionRegionalWeekly from './components/alarmDistributionRegionalWeekly'
import alarmDistributionCategorialSemimonthly from './components/alarmDistributionCategorialSemimonthly'
import alarmDistributionCategorialMonthly from './components/alarmDistributionCategorialMonthly'

import paramJSON from '../map/loading.json'
import taizhouMapData from '../map/taizhou.json'
import util from 'utils/canvas'
import map from 'utils/map'
import array from 'utils/array'

export default {
	components: {
		trafficAccidentMonth,
		trafficAccidentWeek,
		disputesAlertMonth,
		disputesAlertWeek,
		fireAlertRegion,
		fireAlertWeek,
		forHelpMonth,
		forHelpWeek,
		crimeTendencyWeekly,
		crimeTendencyMonthly,
		crimeTendencyYearly,
		centerAlarmAnalysis,
		alarmDistributionRegionalIntraday,
		alarmDistributionRegionalWeekly,
		alarmDistributionCategorialSemimonthly,
		alarmDistributionCategorialMonthly
	},
	data () {
		return {
			canvas1: null,
			ctx1: null,
			currentNum: 0,
			isLoad: false,
			reallyAlert: [],
			tzList: [], // 实有人口最大值list
			isShowed: [true, true, true, true, true, true, true], // 组件显示控制
			isTendencyShowed: [true, false, false], // 违法犯罪趋势图三层钻取控制
			isMoveOn: [false, false, false, false, false, false, false], // 判断鼠标是否悬浮
			getCrimeTrendByDate: {}, // 违法犯罪趋势图（近一周）
			getCrimeTrendByWeek: {}, // 违法犯罪趋势图（近一个月）
			getCrimeTrendByMonth: {}, // 违法犯罪趋势图（近一年）
			alarmType: [], // 警情类别分布（近半个月）
			alarmTypeMonth: [], // 警情类别分布（近一个月）
			alarmTypeMom: [], // 警情类比环比(近一个月)
			alarmTypeHaifMom: [], // 警情类比环比(近一个月)
			trafficAccidentWeek: [], // 交通事故类型警情(近一周)
			trafficAccidentMonth: [], // 交通事故类型警情(近一个月)
			getFireAlarmByArea: [], // 火灾类警情(按地区)
			getAreaAlarmTotal: [], // 火灾类警情(按日)
			getHelpAlarmByWeek: [], // 求助类警情(近一个月)
			getHelpAlarmByDate: [], // 求助类警情(近一周)
			getDisputeAlarmByWeek: [], // 纠纷类警情(近一个月)
			getDisputeAlarmByDate: [] // 纠纷类警情(近一周)
		}
	},
	watch: {
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
			// 违法犯罪趋势（近一周）
			this.$backend.request(this.$api.alarmAnalysis.getCrimeTrendByDate, {})
				.then((result) => {
					this.getCrimeTrendByDate = result.data
					this.currentNum++
				})
			// 违法犯罪趋势（近一月）
			this.$backend.request(this.$api.alarmAnalysis.getCrimeTrendByWeek, {})
				.then((result) => {
					this.getCrimeTrendByWeek = result.data
					this.currentNum++
				})
			// 违法犯罪趋势（近一年）
			this.$backend.request(this.$api.alarmAnalysis.getCrimeTrendByMonth, {})
				.then((result) => {
					this.getCrimeTrendByMonth = result.data
					this.currentNum++
				})
			// 警情类别分布（近半月）
			this.$backend.request(this.$api.alarmAnalysis.alarmType, {})
				.then((result) => {
					this.alarmType = result.data
					this.currentNum++
				})
			// 警情类别分布（近一个月）
			this.$backend.request(this.$api.alarmAnalysis.alarmTypeMonth, {})
				.then((result) => {
					this.alarmTypeMonth = result.data
					this.currentNum++
				})
			// 警情类比环比(近一个月)
			this.$backend.request(this.$api.alarmAnalysis.alarmTypeMom, {})
				.then((result) => {
					this.alarmTypeMom = result.data
					this.currentNum++
				})
			// 警情类比环比(近半个月)
			this.$backend.request(this.$api.alarmAnalysis.alarmTypeHaifMom, {})
				.then((result) => {
					this.alarmTypeHaifMom = result.data
					this.currentNum++
				})
			// 交通事故类型警情(近一周)
			this.$backend.request(this.$api.alarmAnalysis.trafficAccidentWeek, {})
				.then((result) => {
					this.trafficAccidentWeek = result.data
					this.currentNum++
				})
			// 交通事故类型警情(近一个月)
			this.$backend.request(this.$api.alarmAnalysis.trafficAccidentMonth, {})
				.then((result) => {
					this.trafficAccidentMonth = result.data
					this.currentNum++
				})
			// 火灾类警情(按地区)
			this.$backend.request(this.$api.alarmAnalysis.getFireAlarmByArea, {})
				.then((result) => {
					this.getFireAlarmByArea = result.data
					this.currentNum++
				})
			// 火灾类警情(按日)
			this.$backend.request(this.$api.alarmAnalysis.getAreaAlarmTotal, {})
				.then((result) => {
					this.getAreaAlarmTotal = result.data
					this.currentNum++
				})
			// 求助类警情(近一个月)
			this.$backend.request(this.$api.alarmAnalysis.getHelpAlarmByWeek, {})
				.then((result) => {
					this.getHelpAlarmByWeek = result.data
					this.currentNum++
				})
			// 求助类警情(近一周)
			this.$backend.request(this.$api.alarmAnalysis.getHelpAlarmByDate, {})
				.then((result) => {
					this.getHelpAlarmByDate = result.data
					this.currentNum++
				})
			// 纠纷类警情(近一个月)
			this.$backend.request(this.$api.alarmAnalysis.getDisputeAlarmByWeek, {})
				.then((result) => {
					this.getDisputeAlarmByWeek = result.data
					this.currentNum++
				})
			// 纠纷类警情(近一周)
			this.$backend.request(this.$api.alarmAnalysis.getDisputeAlarmByDate, {})
				.then((result) => {
					this.getDisputeAlarmByDate = result.data
					this.currentNum++
				})
		},
		/*
		 * 点击切换周、月等
		 * @param index 需要切换的组件在数组中的下标
		 */
		onChange (index) {
			if (this.isShowed[index] === true) {
				this.$set(this.isShowed, index, false)
			} else {
				this.$set(this.isShowed, index, true)
			}
		},
		/*
		 * 点击切换违法犯罪趋势图周、月、年
		 * @param index 需要切换的组件在数组中的下标
		 */
		onTendencyChange (index) {
			for (let item in this.isTendencyShowed) {
				this.$set(this.isTendencyShowed, item, false)
			}
			this.$set(this.isTendencyShowed, index, true)
		},
		/*
		 *  鼠标悬停暂停计时器
		 *  @param index 需要暂停的组件在数组中的下标
		 */
		onMouseOver (index) {
			this.$set(this.isMoveOn, index, true)
		},
		/*
		 *  鼠标移开恢复计时器
		 *  @param index 需要恢复计时的组件在数组中的下标
		 */
		onMouseLeave (index) {
			this.$set(this.isMoveOn, index, false)
		},
		/*
		 *  自动切换周、月等
		 *  @param index 需要切换的组件在数组中的下标
		 *  @param value 需要切换的组件在配置js中的名称
		 */
		autoChange (index, value) {
			let self = this
			let time = window.time[value]
			setTimeout(() => {
				if (!self.isMoveOn[index]) {
					if (self.isShowed[index] === true) {
						self.$set(self.isShowed, index, false)
					} else {
						self.$set(self.isShowed, index, true)
					}
				}
				self.autoChange(index, value)
			}, time)
		},
		// 数据初始化后加载页面
		init () {
			let self = this
			// 轮播组件分别开始计时
			self.autoChange(1, 'alarmDistributionCategorial')
			self.autoChange(3, 'trafficAccident')
			self.autoChange(4, 'fireAlert')
			self.autoChange(5, 'forHelp')
			self.autoChange(6, 'disputesAlert')
			self.ctx1.clearRect(0, 0, paramJSON.defaultWinW, paramJSON.defaultWinH)
			self.isLoad = true
			let list = [
				{name: '医药高新区', value: '50327'},
				{name: '泰兴', value: '1238260'},
				{name: '水上', value: '6'},
				{name: '兴化', value: '1614722'},
				{name: '高港', value: '304156'},
				{name: '靖江', value: '776607'},
				{name: '姜堰', value: '815360'},
				{name: '海陵', value: '605812'}
			]
			for (let temp of list) {
				if (temp.name !== '水上') {
					temp.name = map.tzMap(temp.name)
					this.reallyAlert.push(temp)
					this.tzList.push(parseInt(temp.value))
				}
			}
			setTimeout(() => {
				self.$echarts.registerMap('泰州', taizhouMapData)	
				self.tzMap()
			}, 30)
		},
		/*
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
			        color: ['rgba(232, 199, 13, 0.35)', 'rgba(232, 199, 13, 0.9)'],
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
								borderColor: 'rgba(232, 199, 13, 0.9)',
								color: '#fff',
								label: {
									show: false
								}
							}
						},
			            data: this.reallyAlert
			        }
			    ]
			}
       		tzPopulationMap.setOption(option)
		},
		/*
		 * 请求数据进度
		 */
		onLoading () {
			let self = this
			let num = 11 // 总需要加载的组件数
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
				if (self.currentNum >= num) {
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

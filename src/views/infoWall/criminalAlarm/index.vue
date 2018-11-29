<!--
	作者：徐可心
	时间：2017-04-01
	描述：刑事警情数据展示
-->
<template>
	<section class="infoWall">
		<section class="criminalAlarm" v-if="isLoad">
			<section class="layer">
				<section class="main">
		        	<!--标题-->
		            <section class="title">
		                <section class="t-left"></section>
						<section class="t-center">
		                    <img src="/static/img/src/assets/images/population/logo.png">
                    		刑事警情数据展示
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
									<div class="title">
										近三年来立案数的同比状况
										<!--近三年来破案数的同比状况
										近三年来抓获人数的同比状况-->
										<span class="title_btn"></span>
									</div>
			                        <section class="echart">
										<registered-status></registered-status>
										<!--<solve-status></solve-status>
										<captured-status></captured-status>-->
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
									<div class="title">
										<!--立案数近三年同比
										破案数近三年同比
										抓获人数近三年同比-->
										<span class="title_btn"></span>
									</div>
			                        <section class="echart">
										<registered-year-on-year></registered-year-on-year>
										<!--<solve-year-on-year></solve-year-on-year>
										<captured-year-on-year></captured-year-on-year>-->
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fl mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <div class="title">
										近三十天案件类别分析图
										<!--频发生案件-->
									</div>
			                        <section class="echart">
			                            <section class="date-wrap" >
											<case-category-analysis></case-category-analysis>
											<!--<frequency-cases></frequency-cases>-->
			                            </section>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <div class="title">
										抓获违法犯罪人员占比
										<span class="title_btn"></span>
									</div>
			                        <section class="echart">
										<captured-personnel-accounted></captured-personnel-accounted>
			                        </section>
			                    </section>
			                </section>
			            </section>
			            <section class="center-side">
			                <section class="echart">
			                    <div class="num-wrap">
									<div class="person-data round_bg1">
										<p>立案数</p>
										<div class="number">664</div>
									</div>
									<div class="person-data round_bg2">
										<p>破案数</p>
										<div class="number">664</div>
									</div>
									<div class="person-data round_bg3">
										<p class="font14">犯罪嫌疑人数</p>
										<div class="number">1908</div>
									</div>
								</div>
								<center-registered></center-registered>
								<!--<center-solve></center-solve>			                 -->
			                </section>
			                <section class="line1"></section>
			                <section class="line2"></section>
			            </section>
			            <section class="left-side fr">
			                <section class="s-box fl">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
									<div class="title">
										八类案件情况及同比
										<span class="title_btn"></span>
									</div>
			                        <section class="echart">
										<eight-cases></eight-cases>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
			                        <div class="title">
										诈骗类案件立案数
										<span class="title_btn"></span>
									</div>
									<section class="echart">
										<fraud-cases-registered></fraud-cases-registered>
									</section>
			                    </section>
			                </section>
			                <section class="s-box fl mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
									<div class="title">
										侵财案件立案
										<span class="title_btn"></span>
									</div>
			                        <section class="echart">
										<case-against-property-file></case-against-property-file>
			                        </section>
			                    </section>
			                </section>
			                <section class="s-box fr mt60">
			                    <section class="box-top-left"></section>
			                    <section class="box-top-right"></section>
			                    <section class="box-bottom-left"></section>
			                    <section class="box-bottom-right"></section>
			                    <section class="content">
									<div class="title">
										涉毒类案件立案数
										<span class="title_btn"></span>
									</div>
			                        <section class="echart">
										<drug-cases-registered></drug-cases-registered>
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
import paramJSON from '../map/loading.json'
import util from 'utils/canvas'
import registeredStatus from './components/registeredStatus'
import solveStatus from './components/solveStatus'
import capturedStatus from './components/capturedStatus'
import registeredYearOnYear from './components/registeredYearOnYear'
import solveYearOnYear from './components/solveYearOnYear'
import capturedYearOnYear from './components/capturedYearOnYear'
import caseCategoryAnalysis from './components/caseCategoryAnalysis'
import frequencyCases from './components/frequencyCases'
import capturedPersonnelAccounted from './components/capturedPersonnelAccounted'
import centerRegistered from './components/centerRegistered'
import centerSolve from './components/centerSolve'
import eightCases from './components/eightCases'
import fraudCasesRegistered from './components/fraudCasesRegistered'
import caseAgainstPropertyFile from './components/caseAgainstPropertyFile'
import drugCasesRegistered from './components/drugCasesRegistered'

export default {
	components: {
		registeredStatus,
		solveStatus,
		capturedStatus,
		registeredYearOnYear,
		solveYearOnYear,
		capturedYearOnYear,
		caseCategoryAnalysis,
		frequencyCases,
		capturedPersonnelAccounted,
		centerRegistered,
		centerSolve,
		eightCases,
		fraudCasesRegistered,
		caseAgainstPropertyFile,
		drugCasesRegistered
	},
	data () {
		return {
			canvas1: null,
			ctx1: null,
			currentNum: 0,
			isLoad: false
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
			this.currentNum++
		},
		// 数据初始化后加载页面
		init () {
			let self = this
			self.ctx1.clearRect(0, 0, paramJSON.defaultWinW, paramJSON.defaultWinH)
			self.isLoad = true
		},
		/**
		 * 请求数据进度
		 */
		onLoading () {
			let self = this
			let num = 1
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

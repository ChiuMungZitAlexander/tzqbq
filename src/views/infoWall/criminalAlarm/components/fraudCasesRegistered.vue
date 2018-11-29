<!--
	文件：views/infoWall/criminalAlarm/components/fraudCasesRegistered.vue
	作者：徐可心
	时间：2017-04-11
	描述：诈骗类案件立案数
-->
<template>
	<section id="fraudCasesRegistered" style="width: 562px; height: 288px;">
		
	</section>
</template>

<script>
import fraudCasesRegistered from '../json/fraudCasesRegistered.json'

export default {
	props: {
		
	},
	watch: {
		data () {
			this.onLoadChart()
		}
	},
	mounted () {
		this.onLoadChart()
	},
	methods: {
		// 加载违法犯罪趋势（近一周）折线图json配置
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('fraudCasesRegistered'))
			// ageDistribution.series[0].data = this.data
			let option = fraudCasesRegistered
			myChart.setOption(option)
		}
	}
}
</script>

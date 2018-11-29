<!--
	文件：views/infoWall/criminalAlarm/components/solveStatus.vue
	作者：徐可心
	时间：2017-04-11
	描述：近三年破案数的同比状况
-->
<template>
	<section id="solveStatus" style="width: 562px; height: 288px;">
		
	</section>
</template>

<script>
import solveStatus from '../json/solveStatus.json'

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
			let myChart = this.$echarts.init(document.getElementById('solveStatus'))
			// ageDistribution.series[0].data = this.data
			let option = solveStatus
			myChart.setOption(option)
		}
	}
}
</script>

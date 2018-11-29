<!--
	文件：views/infoWall/criminalAlarm/components/drugCasesRegistered.vue
	作者：徐可心
	时间：2017-04-12
	描述：涉毒类案件立案数
-->
<template>
	<section id="drugCasesRegistered" style="width: 562px; height: 288px;">
		
	</section>
</template>

<script>
import drugCasesRegistered from '../json/drugCasesRegistered.json'

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
			let myChart = this.$echarts.init(document.getElementById('drugCasesRegistered'))
			// ageDistribution.series[0].data = this.data
			let option = drugCasesRegistered
			myChart.setOption(option)
		}
	}
}
</script>

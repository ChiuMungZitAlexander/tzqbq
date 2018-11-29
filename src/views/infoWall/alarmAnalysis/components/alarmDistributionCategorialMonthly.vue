<!--
	文件：views/infoWall/alarmAnalysis/alarmDistributionCategorialMonthly.vue
	作者：赵梦哲Alexander
	时间：2017-04-05
	描述：警情类别分布（近一个月）柱状图
-->
<template>
	<section id="alarmDistributionCategorialMonthly" style="height: 278px; width: 562px;">
		
	</section>
</template>

<script>
import alarmDistributionCategorialMonthly from '../json/alarmDistributionCategorialMonthly.json'

export default {
	props: {
		data: Array
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
		// 加载警情类别分布（近一个月）柱状图json配置
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('alarmDistributionCategorialMonthly'))
			alarmDistributionCategorialMonthly.series[0].data = this.data
			let option = alarmDistributionCategorialMonthly
			myChart.setOption(option)
		}
	}
}
</script>

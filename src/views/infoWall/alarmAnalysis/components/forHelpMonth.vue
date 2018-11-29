<!--
	文件：views/infoWall/alarmAnalysis/components/forHelpMonth.vue
	作者：徐可心
	时间：2017-04-05
	描述：求助类警情近一个月
-->
<template>
	<div id="forHelpMonth" style="width: 562px; height: 278px;"></div>
</template>
<script>
import forHelpMonth from '../json/forHelpMonth.json'

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
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('forHelpMonth'))
			forHelpMonth.series[0].data = this.data
			let option = forHelpMonth
			myChart.setOption(option)
		}
	}
}
</script>
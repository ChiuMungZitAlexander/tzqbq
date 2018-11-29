<!--
	文件：views/infoWall/alarmAnalysis/components/forHelpWeek.vue
	作者：徐可心
	时间：2017-04-05
	描述：求助类警情近一周
-->
<template>
	<div id="forHelpWeek" style="width: 562px; height: 278px;"></div>
</template>
<script>
import forHelpWeek from '../json/forHelpWeek.json'

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
			let myChart = this.$echarts.init(document.getElementById('forHelpWeek'))
			forHelpWeek.series[0].data = this.data
			let option = forHelpWeek
			myChart.setOption(option)
		}
	}
}
</script>
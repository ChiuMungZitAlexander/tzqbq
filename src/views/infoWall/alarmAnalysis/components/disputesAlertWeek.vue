<!--
	文件：views/infoWall/alarmAnalysis/components/disputesAlertWeek.vue
	作者：徐可心
	时间：2017-04-05
	描述：纠纷类警情近一周
-->
<template>
	<div id="disputesAlertWeek" style="width: 562px; height: 278px;"></div>
</template>
<script>
import disputesAlertWeek from '../json/disputesAlertWeek.json'

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
			let myChart = this.$echarts.init(document.getElementById('disputesAlertWeek'))
			disputesAlertWeek.series[0].data = this.data
			let option = disputesAlertWeek
			myChart.setOption(option)
		}
	}
}
</script>
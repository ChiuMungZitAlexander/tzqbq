<!--
	文件：views/infoWall/alarmAnalysis/components/disputesAlertMonth.vue
	作者：徐可心
	时间：2017-04-05
	描述：纠纷类警情近一个月
-->
<template>
	<div id="disputesAlertMonth" style="width: 562px; height: 278px;"></div>
</template>
<script>
import disputesAlertMonth from '../json/disputesAlertMonth.json'

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
			let myChart = this.$echarts.init(document.getElementById('disputesAlertMonth'))
			disputesAlertMonth.series[0].data = this.data
			let option = disputesAlertMonth
			myChart.setOption(option)
		}
	}
}
</script>
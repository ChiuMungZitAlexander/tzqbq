<!--
	文件：views/infoWall/alarmAnalysis/components/fireAlertWeek.vue
	作者：徐可心
	时间：2017-04-05
	描述：火灾警情近一周
-->
<template>
	<div id="fireAlertWeek" style="width: 562px; height: 278px;"></div>
</template>
<script>
import fireAlertWeek from '../json/fireAlertWeek.json'

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
			let myChart = this.$echarts.init(document.getElementById('fireAlertWeek'))
			fireAlertWeek.series[0].data = this.data
			let option = fireAlertWeek
			myChart.setOption(option)
		}
	}
}
</script>
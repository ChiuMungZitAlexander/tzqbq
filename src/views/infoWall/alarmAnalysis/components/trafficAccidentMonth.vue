<!--
	文件：views/infoWall/alarmAnalysis/components/trafficAccidentMonth.vue
	作者：徐可心
	时间：2017-04-05
	描述：交通事故类型警情近一个月
-->
<template>
	<div id="trafficAccidentMonth" style="width: 562px; height: 278px;"></div>
</template>
<script>
import trafficAccidentMonth from '../json/trafficAccidentMonth.json'

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
			let myChart = this.$echarts.init(document.getElementById('trafficAccidentMonth'))
			trafficAccidentMonth.series[0].data = this.data
			let option = trafficAccidentMonth
			myChart.setOption(option)
		}
	}
}
</script>
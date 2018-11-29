<!--
	文件：views/infoWall/alarmAnalysis/components/trafficAccidentWeek.vue
	作者：徐可心
	时间：2017-04-05
	描述：交通事故类型警情近一周
-->
<template>
	<div id="trafficAccidentWeek" style="width: 562px; height: 278px;"></div>
</template>
<script>
import trafficAccidentWeek from '../json/trafficAccidentWeek.json'

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
			let myChart = this.$echarts.init(document.getElementById('trafficAccidentWeek'))
			trafficAccidentWeek.series[0].data = this.data
			let option = trafficAccidentWeek
			myChart.setOption(option)
		}
	}
}
</script>
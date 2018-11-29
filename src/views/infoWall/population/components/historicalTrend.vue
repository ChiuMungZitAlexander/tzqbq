<!--
	文件：views/infoWall/population/historicalTrend.vue
	作者：徐可心
	时间：2017-03-30
	描述：历年常住人口变化趋势混搭图
-->
<template>
	<div id='historicalTrend' style='width: 562px; height: 278px;'></div>
</template>
<script>
import historicalTrend from '../json/historicalTrend.json'

export default {
	props: {
		data: Object
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
			let myChart = this.$echarts.init(document.getElementById('historicalTrend'))
			historicalTrend.series[0].data = []
			historicalTrend.series[1].data = []
			historicalTrend.series[2].data = []
			historicalTrend.xAxis[0].data = []
			for (let temp in this.data) {
				historicalTrend.series[0].data.push(this.data[temp].total)
				historicalTrend.series[1].data.push(this.data[temp].moveIn)
				historicalTrend.series[2].data.push((this.data[temp].moveOut))
				historicalTrend.xAxis[0].data.push(temp)
			}
			let option = historicalTrend
			myChart.setOption(option)
		}
	}
}
</script>
<!--
	文件：views/infoWall/population/flowTrend.vue
	作者：徐可心
	时间：2017-03-30
	描述：流动人口月变化趋势折线图
-->
<template>
	<div id="flowTrend" style="width: 562px; height: 278px;"></div>
</template>
<script>
import flowTrend from '../json/flowTrend.json'

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
			let myChart = this.$echarts.init(document.getElementById('flowTrend'))
			flowTrend.series[0].data = []
			flowTrend.xAxis[0].data = []
			for (let temp in this.data) {
				flowTrend.series[0].data.push(this.data[temp].value)
				flowTrend.xAxis[0].data.push(this.data[temp].name)
			}
			let option = flowTrend
			myChart.setOption(option)
		}
	}
}
</script>
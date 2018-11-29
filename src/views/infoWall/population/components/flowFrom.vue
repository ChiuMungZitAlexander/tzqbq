<!--
	文件：views/infoWall/population/flowFrom.vue
	作者：徐可心
	时间：2017-03-30
	描述：流动人口从业分布饼图
-->
<template>
	<div id="flowFrom" style="width: 562px; height: 278px;"></div>
</template>
<script>
import flowFrom from '../json/flowFrom.json'

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
			let myChart = this.$echarts.init(document.getElementById('flowFrom'))
			flowFrom.series[0].data = this.data
			let option = flowFrom
			myChart.setOption(option)
		}
	}
}
</script>
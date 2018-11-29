<!--
	文件：views/infoWall/alarmAnalysis/components/fireAlertRegion.vue
	作者：徐可心
	时间：2017-04-05
	描述：火灾警情近一个月
-->
<template>
	<div id="fireAlertRegion" style="width: 562px; height: 278px;"></div>
</template>
<script>
import fireAlertRegion from '../json/fireAlertRegion.json'

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
			let myChart = this.$echarts.init(document.getElementById('fireAlertRegion'))
			fireAlertRegion.series[0].data = this.data
			let option = fireAlertRegion
			myChart.setOption(option)
		}
	}
}
</script>
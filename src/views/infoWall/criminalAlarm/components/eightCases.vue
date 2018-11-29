<!--
	文件：views/infoWall/criminalAlarm/eightCases.vue
	作者：徐可心
	时间：2017-04-11
	描述：八类案件情况及同比
-->
<template>
	<div id="eightCases" style="width: 562px; height: 278px;"></div>
</template>
<script>
import eightCases from '../json/eightCases.json'

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
			let myChart = this.$echarts.init(document.getElementById('eightCases'))
			let option = eightCases
			myChart.setOption(option)
		}
	}
}
</script>
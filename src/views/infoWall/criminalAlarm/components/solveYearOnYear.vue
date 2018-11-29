<!--
	文件：views/infoWall/criminalAlarm/solveYearOnYear.vue
	作者：徐可心
	时间：2017-04-11
	描述：破案数近三年同比
-->
<template>
	<div id="solveYearOnYear" style="width: 562px; height: 278px;"></div>
</template>
<script>
import solveYearOnYear from '../json/solveYearOnYear.json'

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
			let myChart = this.$echarts.init(document.getElementById('solveYearOnYear'))
			let option = solveYearOnYear
			myChart.setOption(option)
		}
	}
}
</script>
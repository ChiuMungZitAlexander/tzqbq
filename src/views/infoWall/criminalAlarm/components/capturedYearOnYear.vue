<!--
	文件：views/infoWall/criminalAlarm/capturedYearOnYear.vue
	作者：徐可心
	时间：2017-04-11
	描述：抓获人数近三年同比
-->
<template>
	<div id="capturedYearOnYear" style="width: 562px; height: 278px;"></div>
</template>
<script>
import capturedYearOnYear from '../json/capturedYearOnYear.json'

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
			let myChart = this.$echarts.init(document.getElementById('capturedYearOnYear'))
			let option = capturedYearOnYear
			myChart.setOption(option)
		}
	}
}
</script>
<!--
	文件：views/infoWall/criminalAlarm/registeredYearOnYear.vue
	作者：徐可心
	时间：2017-04-11
	描述：立案数近三年同比
-->
<template>
	<div id="registeredYearOnYear" style="width: 562px; height: 278px;"></div>
</template>
<script>
import registeredYearOnYear from '../json/registeredYearOnYear.json'

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
			let myChart = this.$echarts.init(document.getElementById('registeredYearOnYear'))
			let option = registeredYearOnYear
			myChart.setOption(option)
		}
	}
}
</script>
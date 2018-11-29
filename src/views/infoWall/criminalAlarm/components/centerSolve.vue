<!--
	文件：views/infoWall/population/centerSolve.vue
	作者：徐可心
	时间：2017-04-11
	描述：刑事案件墙的核心破案数
-->
<template>
	<div id="centerSolve" style="width: 350px; height: 440px;"></div>
</template>
<script>
import centerSolve from '../json/centerSolve.json'

export default {
	props: {
		data: Array
	},
	mounted () {
		this.onLoadChart()
	},
	watch: {
		data () {
			this.onLoadChart()
		}
	},
	methods: {
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('centerSolve'))
			centerSolve.yAxis[0].data = ['靖江市', '泰州市', '海陵市', '高港市', '泰兴市', '兴化市']
			centerSolve.series[0].data = ['10', '20', '30', '40', '50', '60']
			centerSolve.series[0].label.normal.formatter = function (params) {
				return params.data / 20 + '%'
			}
			let option = centerSolve
			myChart.setOption(option)
		}
	}
}
</script>
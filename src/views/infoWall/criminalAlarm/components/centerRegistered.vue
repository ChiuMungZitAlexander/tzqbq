<!--
	文件：views/infoWall/population/centerRegistered.vue
	作者：徐可心
	时间：2017-04-11
	描述：刑事案件墙的核心立案数
-->
<template>
	<div id="centerRegistered" style="width: 350px; height: 440px;"></div>
</template>
<script>
import centerRegistered from '../json/centerRegistered.json'

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
			let myChart = this.$echarts.init(document.getElementById('centerRegistered'))
			centerRegistered.yAxis[0].data = ['靖江市', '泰州市', '海陵市', '高港市', '泰兴市', '兴化市']
			centerRegistered.series[0].data = ['10', '20', '30', '40', '50', '60']
			centerRegistered.series[0].label.normal.formatter = function (params) {
				return params.data / 20 + '%'
			}
			let option = centerRegistered
			myChart.setOption(option)
		}
	}
}
</script>
<!--
	文件：views/infoWall/population/cityCountryHistogram.vue
	作者：徐可心
	时间：2017-03-30
	描述：城镇、农村人口分布柱状图
-->
<template>
	<div id="cityCountryHistogram" style="width: 562px; height: 278px;"></div>
</template>
<script>
import cityCountryHistogram from '../json/cityCountryHistogram.json'

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
			let myChart = this.$echarts.init(document.getElementById('cityCountryHistogram'))
			cityCountryHistogram.xAxis[0].data = []
			cityCountryHistogram.series[0].data = []
			cityCountryHistogram.series[1].data = []
			for (let temp in this.data) {
				cityCountryHistogram.xAxis[0].data.push(temp)
				cityCountryHistogram.series[0].data.push(this.data[temp].city)
				cityCountryHistogram.series[1].data.push(this.data[temp].rural)
			}
			let option = cityCountryHistogram
			myChart.setOption(option)
		}
	}
}
</script>
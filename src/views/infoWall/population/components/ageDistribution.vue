<!--
	文件：views/infoWall/population/ageDistribution.vue
	作者：徐可心
	时间：2017-03-30
	描述：常住人口年龄段分布饼图
-->
<template>
	<div id="age" style="width: 562px; height: 278px;"></div>
</template>
<script>
import ageDistribution from '../json/age.json'

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
			let myChart = this.$echarts.init(document.getElementById('age'))
			ageDistribution.series[0].data = this.data
			let option = ageDistribution
			myChart.setOption(option)
		}
	}
}
</script>
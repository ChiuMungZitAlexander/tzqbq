<!--
	文件：views/infoWall/population/cityOrCountry.vue
	作者：徐可心
	时间：2017-03-30
	描述：城镇、农村人口分布环形饼图
-->
<template>
	<div id="cityOrCountry" style="width: 562px; height: 278px;"></div>
</template>
<script>
import cityOrCountry from '../json/cityOrCountry.json'

export default {
	props: {
		data: Object
	},
	data () {
		return {
			list: []
		}
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
			let myChart = this.$echarts.init(document.getElementById('cityOrCountry'))
			this.list = []
			for (let temp in this.data) {
				this.list.push(temp)
			}
			cityOrCountry.series[0].name = this.list[0] + '年'
			cityOrCountry.series[0].data[0].value = this.data[this.list[0]].city
			cityOrCountry.series[0].data[1].value = this.data[this.list[0]].rural
			cityOrCountry.series[1].name = this.list[0] + '年'
			cityOrCountry.series[1].data[0].name = this.list[0] + '年'
			cityOrCountry.series[2].name = this.list[1] + '年'
			cityOrCountry.series[2].data[0].value = this.data[this.list[1]].city
			cityOrCountry.series[2].data[1].value = this.data[this.list[1]].rural
			cityOrCountry.series[3].name = this.list[1] + '年'
			cityOrCountry.series[3].data[0].name = this.list[1] + '年'
			let option = cityOrCountry
			myChart.setOption(option)
		}
	}
}
</script>
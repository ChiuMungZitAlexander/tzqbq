<!--
	文件：views/infoWall/population/centerMapChart.vue
	作者：徐可心
	时间：2017-03-30
	描述：实有人口柱状图
-->
<template>
	<div id="centerMapChart" style="width: 500px; height: 440px;"></div>
</template>
<script>
import centerMapChart from '../json/centerMapChart.json'

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
			let myChart = this.$echarts.init(document.getElementById('centerMapChart'))
			centerMapChart.yAxis[0].data = []
			centerMapChart.series[0].data = []
			for (let temp of this.data) {
				centerMapChart.yAxis[0].data.push(temp.name)
				centerMapChart.series[0].data.push(temp.value)
			}
			centerMapChart.series[0].itemStyle = {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            {offset: 0, color: '#34ffff'},
                            {offset: 1, color: '#b8ffff'}
                        ]
                    )
                },
                emphasis: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            {offset: 0, color: '#34ffff'},
                            {offset: 1, color: '#b8ffff'}
                        ]
                    )
           	    }
			}
			let option = centerMapChart
			myChart.setOption(option)
		}
	}
}
</script>
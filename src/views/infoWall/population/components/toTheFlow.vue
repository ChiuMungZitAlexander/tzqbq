<!--
	文件：views/infoWall/population/toTheFlow.vue
	作者：徐可心
	时间：2017-03-30
	描述：来泰流动人口分布柱状图
-->
<template>
	<div id="toTheFlow" style="width: 562px; height: 278px;"></div>
</template>
<script>
import toTheFlow from '../json/toTheFlow.json'

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
			let myChart = this.$echarts.init(document.getElementById('toTheFlow'))
			toTheFlow.xAxis[0].data = []
			toTheFlow.series[0].data = []
			for (let temp of this.data) {
				toTheFlow.xAxis[0].data.push(temp.name)
				toTheFlow.series[0].data.push(temp.value)
			}
			toTheFlow.series[0].itemStyle = {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#fff2d3'},
                            {offset: 1, color: '#f2ff14'}
                        ]
                    )
                },
                emphasis: {
                    color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#fff2d3'},
                            {offset: 1, color: '#f2ff14'}
                        ]
                    )
           	    }
			}
			let option = toTheFlow
			myChart.setOption(option)
		}
	}
}
</script>
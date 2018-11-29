<!--
	文件：views/infoWall/population/areaDistribution.vue
	作者：徐可心
	时间：2017-03-30
	描述：常住人口区域分布柱状图
-->
<template>
	<div id='areaDistribution' style='width: 562px; height: 278px;'></div>
</template>
<script>
import areaDistribution from '../json/area.json'

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
			let myChart = this.$echarts.init(document.getElementById('areaDistribution'))
			areaDistribution.xAxis[0].data = []
			areaDistribution.series[0].data = []
			for (let temp of this.data) {
				areaDistribution.xAxis[0].data.push(temp.name)
				areaDistribution.series[0].data.push(temp.value)
			}
			areaDistribution.series[0].itemStyle = {
				normal: {
					color: function (params) {
						let colorList = ['#e42889', '#35a1f5', '#f7df11', '#a6cb09', '#43e2ff', '#1ee77d', '#f9bc01']
						return colorList[params.dataIndex]
					}
				},
				label: {
					show: true,
					position: 'top',
					formatter: '{b}\n{c}'
				}
			}
			let option = areaDistribution
			myChart.setOption(option)
		}
	}
}
</script>
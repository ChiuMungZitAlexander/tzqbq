<!--
	文件：views/infoWall/population/toMoveIn.vue
	作者：徐可心
	时间：2017-03-30
	描述：人口迁入分布柱状图
-->
<template>
	<div id="toMoveIn" style="width: 562px; height: 220px;margin-top: -15px;"></div>
</template>
<script>
import toMoveIn from '../json/toMoveIn.json'

export default {
	props: {
		data: Object
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
			let myChart = this.$echarts.init(document.getElementById('toMoveIn'))
			toMoveIn.series[0].data = []
			toMoveIn.series[0].data.push(this.data.otherProvince)
			toMoveIn.series[0].data.push(this.data.otherCity)
			toMoveIn.series[0].itemStyle = {
				normal: {
					color: function (params) {
						let colorList = ['#fff59e', '#6ce8ff', '#1e99f9']
						return colorList[params.dataIndex]
					}
				},
				label: {
					show: true,
					position: 'top',
					formatter: '{b}\n{c}'
				}
			}
			let option = toMoveIn
			myChart.setOption(option)
		}
	}
}
</script>
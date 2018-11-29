<!--
	文件：views/infoWall/population/tzFlow.vue
	作者：徐可心
	时间：2017-03-30
	描述：流动人口在泰州分布雷达图
-->
<template>
	<div id="tzFlow1" style="width: 562px; height: 278px;"></div>
</template>
<script>
import tzFlow from '../json/tzFlow.json'
import array from 'utils/array'
import number from 'utils/number'

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
	data () {
		return {
			list: []
		}
	},
	methods: {
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('tzFlow1'))
			for (let max of this.data) {
				this.list.push(parseInt(max.value))
			}
			tzFlow.series[0].data[0] = {}
			tzFlow.series[0].data[0].value = []
			tzFlow.radar.indicator = []
			for (let temp of this.data) {
				if (temp.name !== '水上') {
					tzFlow.radar.indicator.push({name: temp.name + '(' + this.onHandle(temp.value) + ')', max: array.max(this.list) + 500})
					tzFlow.series[0].data[0].value.push(parseInt(temp.value))
				}
			}
			let option = tzFlow
			console.log(option)
			myChart.setOption(option)
		},
		/**
		 * 数据处理
		 **/
		onHandle (value) {
			if (parseInt(value) > 10000) {
				let unit = ['万']
				return number.numberToUnit(parseInt(value), 2, unit)
			}
			return value
		}
	}
}
</script>
<!--
	文件：views/infoWall/criminalAlarm/caseCategoryAnalysis.vue
	作者：徐可心
	时间：2017-04-11
	描述：近三十天案件类别分析图
-->
<template>
	<div id="caseCategoryAnalysis" style="width: 562px; height: 278px;"></div>
</template>
<script>
import caseCategoryAnalysis from '../json/caseCategoryAnalysis.json'

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
			let myChart = this.$echarts.init(document.getElementById('caseCategoryAnalysis'))
			caseCategoryAnalysis.series[0].data = [{name: '八类案件', value: '62007'},
            {name: '两枪', value: '66007'},
            {name: '侵财', value: '66600'},
            {name: '诈骗', value: '66047'},
			{name: '其他', value: '44444'}
            ]
			let option = caseCategoryAnalysis
			myChart.setOption(option)
		}
	}
}
</script>
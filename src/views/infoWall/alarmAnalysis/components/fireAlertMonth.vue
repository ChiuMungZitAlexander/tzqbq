<!--
	文件：views/infoWall/alarmAnalysis/components/fireAlertMonth.vue
	作者：徐可心
	时间：2017-04-05
	描述：火灾警情近一个月
-->
<template>
	<div id="fireAlertMonth" style="width: 562px; height: 278px;"></div>
</template>
<script>
import fireAlertMonth from '../json/fireAlertMonth.json'

export default {
	// props: {
	// 	data: Array
	// },
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
			let myChart = this.$echarts.init(document.getElementById('fireAlertMonth'))
			fireAlertMonth.series[0].data = [{name: '3月5日', value: '62007'},
            {name: '3月6日', value: '66007'},
            {name: '3月7日', value: '66600'},
            {name: '3月8日', value: '66047'}
            ]
			let option = fireAlertMonth
			myChart.setOption(option)
		}
	}
}
</script>
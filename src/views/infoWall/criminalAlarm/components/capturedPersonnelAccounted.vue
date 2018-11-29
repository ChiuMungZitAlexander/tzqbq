<!--
	文件：views/infoWall/criminalAlarm/capturedPersonnelAccounted.vue
	作者：徐可心
	时间：2017-04-11
	描述：抓获违法犯罪人员占比
-->
<template>
	<div id="capturedPersonnelAccounted" style="width: 562px; height: 278px;"></div>
</template>
<script>
import capturedPersonnelAccounted from '../json/capturedPersonnelAccounted.json'

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
			let myChart = this.$echarts.init(document.getElementById('capturedPersonnelAccounted'))
			capturedPersonnelAccounted.series[0].data = [{name: '八类案件', value: '62007'},
            {name: '移送', value: '66007'},
            {name: '调查', value: '66600'},
            {name: '拘留', value: '66047'},
			{name: '处罚', value: '44444'}
            ]
			let option = capturedPersonnelAccounted
			myChart.setOption(option)
		}
	}
}
</script>
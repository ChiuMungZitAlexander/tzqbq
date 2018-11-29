<!--
	文件：views/infoWall/alarmAnalysis/frequencyCases.vue
	作者：徐可心
	时间：2017-04-12
	描述：频发生案件 柱状图
-->
<template>
	<section id="frequencyCases" style="height: 278px; width: 562px;">
		
	</section>
</template>

<script>
import frequencyCases from '../json/frequencyCases.json'

export default {
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
			let myChart = this.$echarts.init(document.getElementById('frequencyCases'))
			let option = frequencyCases
			myChart.setOption(option)
		}
	}
}
</script>

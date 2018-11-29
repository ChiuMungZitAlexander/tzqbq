<!--
	文件：views/infoWall/alarmAnalysis/components/centerAlarmAnalysis.vue
	作者：徐可心
	时间：2017-04-05
	描述：接警数和违法犯罪警情数
-->
<template>
	<section id="centerAlarmAnalysis" style="height: 400px; width: 530px;">
		
	</section>
</template>

<script>
import centerAlarmAnalysis from '../json/centerAlarmAnalysis.json'

export default {
	props: {
		
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
		// 加载违法犯罪趋势（近一周）折线图json配置
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('centerAlarmAnalysis'))
			// ageDistribution.series[0].data = this.data
			let option = centerAlarmAnalysis
			myChart.setOption(option)
		}
	}
}
</script>

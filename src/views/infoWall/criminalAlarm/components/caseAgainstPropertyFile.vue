<!--
	文件：views/infoWall/criminalAlarm/components/caseAgainstPropertyFile.vue
	作者：徐可心
	时间：2017-04-12
	描述：侵财案件立案
-->
<template>
	<section id="caseAgainstPropertyFile" style="width: 562px; height: 288px;">
		
	</section>
</template>

<script>
import caseAgainstPropertyFile from '../json/caseAgainstPropertyFile.json'

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
			let myChart = this.$echarts.init(document.getElementById('caseAgainstPropertyFile'))
			// ageDistribution.series[0].data = this.data
			let option = caseAgainstPropertyFile
			myChart.setOption(option)
		}
	}
}
</script>

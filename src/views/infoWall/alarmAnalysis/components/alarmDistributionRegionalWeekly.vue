<!--
	文件：views/infoWall/alarmAnalysis/alarmDistributionRegionalWeekly.vue
	作者：赵梦哲Alexander
	时间：2017-04-05
	描述：警情地区分布（近一周）柱状图
-->
<template>
	<section id="alarmDistributionRegionalWeekly" style="height: 278px; width: 562px;">
		
	</section>
</template>

<script>
import alarmDistributionRegionalWeekly from '../json/alarmDistributionRegionalWeekly.json'

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
		// 加载警情地区分布（近一周）柱状图json配置
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('alarmDistributionRegionalWeekly'))
			let option = alarmDistributionRegionalWeekly
			myChart.setOption(option)
		}
	}
}
</script>

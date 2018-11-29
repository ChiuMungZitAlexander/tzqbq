<!--
	文件：views/infoWall/alarmAnalysis/crimeTendencyWeekly.vue
	作者：赵梦哲Alexander
	时间：2017-04-05
	描述：违法犯罪趋势（近一月）折线图
-->
<template>
	<section id="crimeTendencyMonthly" style="height: 278px; width: 562px;">
		
	</section>
</template>

<script>
import crimeTendencyMonthly from '../json/crimeTendencyMonthly.json'

export default {
	props: {
		data: Object
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
		// 加载违法犯罪趋势（近一月）折线图json配置
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('crimeTendencyMonthly'))
			for (let item in this.data.jjxx) {
				crimeTendencyMonthly.xAxis.data.push(this.data.jjxx[item].name)
				crimeTendencyMonthly.series[0].data.push(this.data.jjxx[item].value)
			}
			for (let item in this.data.cjxx) {
				crimeTendencyMonthly.series[1].data.push(this.data.cjxx[item].value)
			}
			let option = crimeTendencyMonthly
			myChart.setOption(option)
		}
	}
}
</script>

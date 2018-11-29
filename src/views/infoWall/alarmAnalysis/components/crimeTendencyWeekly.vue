<!--
	文件：views/infoWall/alarmAnalysis/crimeTendencyWeekly.vue
	作者：赵梦哲Alexander
	时间：2017-04-05
	描述：违法犯罪趋势（近一周）折线图
-->
<template>
	<section id="crimeTendencyWeekly" style="height: 278px; width: 562px;">
		
	</section>
</template>

<script>
import crimeTendencyWeekly from '../json/crimeTendencyWeekly.json'

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
		// 加载违法犯罪趋势（近一周）折线图json配置
		onLoadChart () {
			let myChart = this.$echarts.init(document.getElementById('crimeTendencyWeekly'))
			// crimeTendencyWeekly.xAxis.data = ['a', 'b']
			// crimeTendencyWeekly.series[0].data = [1, 2]
			// crimeTendencyWeekly.series[1].data = [8, 6]
			for (let item in this.data.jjxx) {
				crimeTendencyWeekly.xAxis.data.push(this.data.jjxx[item].name)
				crimeTendencyWeekly.series[0].data.push(this.data.jjxx[item].value)
			}
			for (let item in this.data.cjxx) {
				crimeTendencyWeekly.series[1].data.push(this.data.cjxx[item].value)
			}
			let option = crimeTendencyWeekly
			myChart.setOption(option)
		}
	}
}
</script>

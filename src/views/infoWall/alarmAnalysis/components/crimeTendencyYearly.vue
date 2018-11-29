<!--
	文件：views/infoWall/alarmAnalysis/crimeTendencyYearly.vue
	作者：赵梦哲Alexander
	时间：2017-04-05
	描述：违法犯罪趋势（近一周）折线图
-->
<template>
	<section id="crimeTendencyYearly" style="height: 278px; width: 562px;">
		
	</section>
</template>

<script>
import crimeTendencyYearly from '../json/crimeTendencyYearly.json'

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
			let myChart = this.$echarts.init(document.getElementById('crimeTendencyYearly'))
			for (let item in this.data.jjxx) {
				crimeTendencyYearly.xAxis.data.push(this.data.jjxx[item].name)
				crimeTendencyYearly.series[0].data.push(this.data.jjxx[item].value)
			}
			for (let item in this.data.cjxx) {
				crimeTendencyYearly.series[1].data.push(this.data.cjxx[item].value)
			}
			let option = crimeTendencyYearly
			myChart.setOption(option)
		}
	}
}
</script>

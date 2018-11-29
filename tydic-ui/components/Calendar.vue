<!--
	文件：components/Calendar.vue
	作者：bruce.yang
	时间：2016-10-06
	描述：日历组件
-->
<template>
	<section class="tydic-calendar">
		<input type="text" v-model="calendar" class="calendarInput" @click.stop @focus.stop="focus"/>
		<section @click.stop :class="['calendarPopup', calendarPopup]" :style="param.calendarStyle" v-show="isShow">
	  		<header>
	  			<section class="row">
	  				<section class="column db w120 bd1-s-c mr10">
	  					<section class="row">
	  						<section class="column jcc w21 bdr1-s-c cup" @click.stop="changeYear(-1)">
	  							<span class="arrowLeft">
	  							</span>
	  						</section>
	  						<section class="column db f1 pl0">
	  							<section class="row">
	  								<section class="column jcc f1" v-text="year + '年'"></section>
	  								<section class="column w20">
	  									<span class="arrowDown">
	  									</span>
	  								</section>
	  							</section>
	  						</section>
	  						<section class="column jcc w21  bdl1-s-c cup" @click.stop="changeYear(1)">
	  							<span class="arrowRight">
	  							</span>
	  						</section>
	  					</section>
	  				</section>
	  				<section class="column db w100 bd1-s-c pl0">
	  					<section class="row">
	  						<section class="column jcc w21 bdr1-s-c cup" @click.stop="changeMonth(-1)">
	  							<span class="arrowLeft">
	  							</span>
	  						</section>
	  						<section class="column db f1 pl0">
	  							<section class="row cup">
	  								<section class="column jcc f1" v-text="month + 1 + '月'"></section>
	  								<section class="column w20">
	  									<span class="arrowDown">
	  									</span>
	  								</section>
	  							</section>
	  						</section>
	  						<section class="column jcc w21 bdl1-s-c cup" @click.stop="changeMonth(1)">
	  							<span class="arrowRight">
	  							</span>
	  						</section>
	  					</section>
	  				</section>
	  			</section>
	  		</header>
	  		<section class="dayTabel">
				<section class="row header">
					<section class="column f1 jcc">日</section>
					<section class="column f1 jcc">一</section>
					<section class="column f1 jcc">二</section>
					<section class="column f1 jcc">三</section>
					<section class="column f1 jcc">四</section>
					<section class="column f1 jcc">五</section>
					<section class="column f1 jcc">六</section>
				</section>
	  			<section class="row day" v-for="dates in dateList">
	  				<template v-for="dayList in dates">
	  					<template v-if="!dayList.isInMonth">
	  						<template v-if="!dayList.isClick">
		  						<!-- 判断当前日期是否是能点击 -->
		  						<section class="column f1 jcc unMonth unClick">
		  							<span v-text="dayList.day"></span>
		  						</section>
			  				</template>
			  				<template v-else>
			  					<section class="column f1 jcc unMonth" @click="selected(dayList.day, dayList.month, dayList.year)">
		  							<span v-text="dayList.day"></span>
		  						</section>
			  				</template>
	  					</template>
	  					<template v-else>
	  						<template v-if="!dayList.isClick">
	  							<template v-if="dayList.isSelected">
		  							<section class="column f1 jcc selected unClick">
			  							<span v-text="dayList.day"></span>
			  						</section>
		  						</template>
		  						<template v-else>
			  						<!-- 判断当前日期是否是能点击 -->
			  						<section class="column f1 jcc unClick">
			  							<span v-text="dayList.day"></span>
			  						</section>
		  						</template>
			  				</template>
			  				<template v-else>
			  					<template v-if="dayList.isSelected">
		  							<section class="column f1 jcc selected"  @click="selected(dayList.day, dayList.month, dayList.year)">
			  							<span v-text="dayList.day"></span>
			  						</section>
		  						</template>
		  						<template v-else>
		  							<section class="column f1 jcc"  @click="selected(dayList.day, dayList.month, dayList.year)">
			  							<span v-text="dayList.day"></span>
			  						</section>
		  						</template>
		  					</template>
	  					</template>
	  				</template>
	  			</section>
	  		</section>
	  		<footer>
	  			<section class="row h22 miha mt5 mb5 jcfe">
	  				<section class="column w110" v-if="param.isTime">
	  					<span>时间</span>
	  					<span v-text="hour"></span>
	  					<span>:</span>
	  					<span v-text="minute"></span>
	  					<span>:</span>
	  					<span v-text="second"></span>
	  				</section>
	  				<section class="column jcfe w112 ml10 btnSection mr5">
	  					<span class="clearBtn" @click.stop="clear">清空</span>
	  					<span :class="['todayBtn', {disable: isToday}]" @click.stop="today">今天</span>
	  					<span :class="['makeSureBtn', {disable: isMakeSure}]" @click.stop="makeSure">确定</span>
	  				</section>
	  			</section>
	  		</footer>
	  	</section>
	</section>
</template>

<script>
/*
 * param 模型
 * minDate: 最小时间
 */
export default {
	name: 'tydic-calendar',
	props: {
		param: {
			type: Object,
			default: {}
		}
	},
	data () {
		return {
			setting: {},
			isToday: false,
			isMakeSure: false,
			calendarInput: null,
			calendarPopup: '',
			calendar: '',
			monthMaxDate: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 非闰年 每月最大天数
			yearList: [], // 年数组
			monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 月数组
			dateList: [], // 日期当月数组
			hourList: [], // 小时数组
			minuteList: [], // 分钟数组
			secondList: [], // 秒钟数组
			isShow: false,
			year: '', // 年
			month: '', // 月
			day: '', // 日
			hour: '00', // 时
			minute: '00', // 分
			second: '00', // 秒
		 	defaultParam: {
		 		calendarStyle: '',
				minYear: 1900, // 最小开始年选择
				maxYear: 2100, // 最大结束年选择
				minDate: '1900-01-01 00:00:00', // 最小能选择日期
				maxDate: '2100-12-12 23:59:00', // 最大能选择日期
				isTime: false, // 是否显示时分秒
				isNow: false, // 是否默认选中当前日期 
				dateFormat: 'yyyy-MM-dd', // 日期格式
				changeCallback: null, // 选中事件回调
				el: null // 当前日期input Model
			}
		}
	},
	watch: {
		param (_param) {
			this.setting = this.$util.objUtil.deepCopy(_param, this.defaultParam)
		}
	},
	beforeMount () {
		this.setting = this.$util.objUtil.deepCopy(this.param, this.defaultParam)
		// 初始化 年日时分秒数组
		// 判断是否显示 需要初始化时分秒
		if (this.setting.isTime) {
			for (let i = 0; i < 24; i++) {
				this.hourList.push(i)
			}
			for (let i = 0; i < 60; i++) {
				this.minuteList.push(i)
				this.secondList.push(i)
			}
		}
		let date = new Date()
		// 判断当前日期是否比最小日期小 如果是 获取最小日期的当月
		if (this.$util.dateUtil.getDatePoor(this.setting.minDate) > 0) {
			date = new Date(this.setting.minDate)
		}
		// 当前的日期
		let today = new Date().getDate()
		if (this.$util.dateUtil.compareDate(new Date(), this.setting.minDate) || this.$util.dateUtil.compareDate(this.setting.maxDate, new Date())) {
			this.isToday = true
		}
		this.isMakeSure = this.$util.stringUtil.isEmpty(this.calendar)
		this.year = new Date().getFullYear()
		this.month = new Date().getMonth()
		this.initDateList()
	},
	mounted () {
		let self = this
		self.calendarInput = self.$el.querySelector('.calendarInput')
		document.body.addEventListener('click', () => {
			self.close()
		})
	},
	// 定义其他所有方法 
	methods: {
		focus () {
			this.show()
		},
		show () {
			this.setting.calendarStyle = {
				top: this.calendarInput.offsetTop + this.calendarInput.offsetHeight,
				left: this.calendarInput.offsetLeft
			}
			this.isMakeSure = this.$util.stringUtil.isEmpty(this.calendar)
			this.initDateList()
			this.isShow = true
		},
		close () {
			this.isShow = false
		},
		/**
		 * 点击 时分秒 年月 显示不同的弹出层
		 */
		showType (type) {
			return type
		},
		/**
		 * 返回几天前或者几天后的的日期对象
		 * addDate 要新增或者减少的天数
		 */
		getAddDate (date, addDate) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() + addDate, date.getHours(), date.getMinutes(), date.getSeconds())
		},
		/**
		 * 判断当前日期是否小于最小日期
		 */
		isClick (date) {
			if (this.$util.dateUtil.getDatePoor(date, this.setting.minDate)) {
				return true
			}
			return false
		},
		/**
		 * 获取当前系统时间
		 */
		now () {
			return this.$util.dateUtil.dateFormat(new Date(), this.setting.dateFormat)
		},
		/**
		 * 上一年 下一年
		 */
		changeYear (year) {
			if (this.year + year < 1900) {
				this.year = 1900
			} else if (this.year + year > 2099) {
				this.year = 2099
			} else {
				this.year += year
			}
			this.initDateList()
		},
		/**
		 * 上一月 下一月
		 */
		changeMonth (month) {
			if (this.month + month < 0) {
				if (this.year - 1 < 1900) {
					this.month = 0
				} else {
					this.year--
					this.month = 11
				}
			} else if (this.month + month > 11) {
				if (this.year + 1 > 2099) {
					this.month = 11
				} else {
					this.year++
					this.month = 0
				}
			} else {
				this.month += month
			}
			this.initDateList()
		},
		initDateList () {
			this.dateList = []
			let date = new Date()
			date.setFullYear(this.year)
			date.setMonth(this.month)
			let weekList = this.$util.dateUtil.getMonthWeekList(date)
			let isInMonth = false
			for (let i = 0; i < weekList.length; i++) {
				let temp = weekList[i]
				let dayList = []
				for (let j = 0; j < temp.length; j++) {
					if (temp[j].day === 1) {
						isInMonth = !isInMonth
					}
					let isClick = this.$util.dateUtil.compareDate(temp[j].dateStr, this.setting.minDate)
					if (isClick) {
						isClick = this.$util.dateUtil.compareDate(this.setting.maxDate, temp[j].dateStr)
					}
					let isSelected = this.calendar !== '' && this.calendar.substring(0, 10) === temp[j].dateStr.substring(0, 10)
					dayList.push({
						isClick: isClick,
						day: temp[j].day,
						month: temp[j].month,
						year: temp[j].year, 
						isInMonth: isInMonth,
						isSelected: isSelected
					})
				}
				this.dateList.push(dayList)
			}
		},
		selected (day, month, year) {
			let date = new Date()
			date.setFullYear(year)
			date.setMonth(month)
			date.setDate(day)
			this.calendar = this.$util.dateUtil.dateFormat(date, this.setting.dateFormat)
			if (this.setting.change && typeof this.setting.change === 'function') {
				this.setting.change(this.calendar)
			}
			this.close()
		},
		today () {
			this.calendar = this.$util.dateUtil.dateFormat(new Date(), this.setting.dateFormat)
			if (this.setting.change && typeof this.setting.change === 'function') {
				this.setting.change(this.calendar)
			}
			this.close()
		},
		clear () {
			this.calendar = ''
			if (this.setting.change && typeof this.setting.change === 'function') {
				this.setting.change(this.calendar)
			}
			this.close()
		},
		makeSure () {
			this.close()
		}
	},
	created () {
		
	}
}
</script>
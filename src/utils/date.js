export default {
	// 计算时间差
	getDatePoor (start, end) {
		end = end || new Date()
		let startTime = new Date(start).getTime()
		let endTime = new Date(end).getTime()
		if (startTime > endTime) {
			let curTime = new Date().getTime()
			return curTime - startTime
		}
		return endTime - startTime
	},
	/**
	 * 秒转天时分秒
	 */
	secondToDate (second) {
		if (!second) {
			return ''
		}
		second = parseInt(second)
		let s = 0
		let m = 0
		let h = 0
		let d = 0
		s = second % 60
		m = parseInt(second / 60)
		if (m >= 60) {
			h = parseInt(m / 60)
			m = m % 60
		}
		if (h >= 24) {
			d = parseInt(h / 24)
		}
		h = h % 24
		if (d !== 0) {
			return d + '天' + h + '时' + m + '分' + s + '秒'
		}
		if (h !== 0) {
			return h + '时' + m + '分' + s + '秒'
		}
		if (m !== 0) {
			return m + '分' + s + '秒'
		}
		return s + '秒'
	},
	/**
	 * 日期格式化
	 */
	dateFormat (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
		date = typeof date === 'number' ? new Date(date) : date
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (let k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
			}
		}
		return fmt
	},
	/**
	 * 添加减少年  返回新的日期对象
	 */
	addYear (date, year = 0) {
		if (Math.abs(year) === 0) {
			return date
		}
		return new Date(date.getFullYear() + year, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
	},
	/**
	 * 添加减少月  返回新的日期对象
	 */
	addMonth (date, month = 0) {
		if (Math.abs(month) === 0) {
			return date
		}
		return new Date(date.getFullYear(), date.getMonth() + month, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
	},
	/**
	 * 添加减少天数  返回新的日期对象
	 */
	addDate (date, days = 0) {
		if (Math.abs(days) === 0) {
			return date
		}
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, date.getHours(), date.getMinutes(), date.getSeconds())
	},
	/**
	 * 添加减少小时  返回新的日期对象
	 */
	addHour (date, hour = 0) {
		if (Math.abs(hour) === 0) {
			return date
		}
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + hour, date.getMinutes(), date.getSeconds())
	},
	/**
	 * 添加减少分钟  返回新的日期对象
	 */
	addMinute (date, minute = 0) {
		if (Math.abs(minute) === 0) {
			return date
		}
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + minute, date.getSeconds())
	},
	/**
	 * 添加减少秒钟  返回新的日期对象
	 */
	addSecond (date, second = 0) {
		if (Math.abs(second) === 0) {
			return date
		}
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() + second)
	}
}

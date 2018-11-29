export default {
    /**
     * 数组求和
     */
    sum (arr) {
        let count = 0
        if (arr instanceof Array) {
            for (let i = 0; i < arr.length; i++) {
                if (typeof arr[i] === 'string' || typeof arr[i] === 'number') {
                    count += parseFloat(arr[i])
                }
            }
        }
        return count
    },
    addItem (arr, number) {
        if (arr instanceof Array) {
            for (let i = 0; i < number; i++) {
                arr.push([])
            }
            return arr
        }
        return arr
    },
    /**
     * 数组每项的值为空则用_now对应的值替换
     */
    replaceItem (_old, _now) {
        if (_old instanceof Array && _now instanceof Array) {
            for (let i = 0; i < _old.length; i++) {
                if (this.$util.stringUtil.isEmpty(_old[i]) && _now.length > i) {
                    _old[i] = _now[i]
                }
            }
        }
        return _old
    },
    max (list) {
    	let max = list[0]
    	for (let i in list) {
    		if (max < list[i]) {
    			max = list[i]
    		}
    	}
    	return max
    }
}

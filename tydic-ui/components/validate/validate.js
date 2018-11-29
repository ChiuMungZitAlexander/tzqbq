import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import stringUtil from '../../../src/utils/string'
import messages from './zh_CN'

Validator.updateDictionary({
	zh_CN: {
		messages
	}
})
const config = {
	errorBagName: 'errors',
	dalay: 0,
	locale: 'zh_CN',
	messages: null,
	strict: true
}
Vue.use(VeeValidate, config)

Validator.extend('mobile', {
    messages: {
        en: field => '电话必须是11位手机号'
    },
    validate: value => {
        return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
})
Validator.extend('special', {
    messages: {
        en: field => '不能有特殊字符'
    },
    validate: value => {
        return /^[^!|￥|【|】|……|#|$|%|&|'|*|+|-|/|=|?|？|`|{|}|~||]*$/.test(value)
    }
})
Validator.extend('space', {
    messages: {
        en: field => '不能有空格'
    },
    validate: value => {
        return !(/ /.test(value))
    }
})
Validator.extend('chinese', {
    messages: {
        en: field => '必须为中文'
    },
    validate: value => {
        return (/^[\u4e00-\u9fa5]*$/.test(value))
    }
})
Validator.extend('loginnum', {
    messages: {
        en: field => '请输入正确的账号格式'
    },
    validate: value => {
        return (/^[\u4e00-\u9fa5_a-zA-Z0-9_]{3,12}$/.test(value))
    }
})
Validator.extend('loginname', {
    messages: {
        en: field => '请输入正确的用户姓名'
    },
    validate: value => {
        return (/^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,16}$/.test(value))
    }
})
Validator.extend('number', {
    messages: {
        en: field => '必须是数字'
    },
    validate: value => {
        return !isNaN(value)
    }
})
Validator.extend('max4', {
    messages: {
        en: field => '最大长度为4'
    },
    validate: value => {
        return value.length <= 4
    }
})
Validator.extend('max6', {
    messages: {
        en: field => '最大长度为6'
    },
    validate: value => {
        return value.length <= 6
    }
})
Validator.extend('minLen6', {
    messages: {
        en: field => '最小长度为6个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
        return len >= 6
    }
})
Validator.extend('maxLen15', {
    messages: {
        en: field => '最大长度为15个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
        return len <= 15
    }
})
Validator.extend('max16', {
    messages: {
        en: field => '最大长度为16'
    },
    validate: value => {
        return value.length <= 16
    }
})
Validator.extend('max32', {
    messages: {
        en: field => '最大长度为32'
    },
    validate: value => {
        return value.length < 32
    }
})
Validator.extend('maxLen32', {
    messages: {
        en: field => '最大长度为30个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
        return len <= 30
    }
})

Validator.extend('max64', {
    messages: {
        en: field => '最大长度为64'
    },
    validate: value => {
        return value.length < 64
    }
})

Validator.extend('maxLen100', {
    messages: {
        en: field => '最大长度为100个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
        return len <= 100
    }
})

Validator.extend('max200', {
    messages: {
        en: field => '最大长度为200'
    },
    validate: value => {
        return value.length <= 200
    }
})
Validator.extend('maxCnEn200', {
    messages: {
        en: field => '最大长度为200字符'
    },
    validate: value => {
        return stringUtil.subStrLength(value) <= 200
    }
})
Validator.extend('maxLen200', {
    messages: {
        en: field => '最大长度为200个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
        return len <= 200
    }
})

Validator.extend('maxLen400', {
    messages: {
        en: field => '最大长度为400个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
    	console.log(len)
        return len <= 400
    }
})

Validator.extend('maxLen2000', {
    messages: {
        en: field => '最大长度为2000个字符'
    },
    validate: value => {
    	let len = 0
    	value.split('').forEach(val => {
    		if (/^[\u4e00-\u9fa5]*$/.test(val)) {
    			len += 2
    		} else {
    			len += 1
    		}
    	})
        return len <= 2000
    }
})

Validator.extend('chanden', {
    messages: {
        en: field => '只能包含中英文字符'
    },
    validate: value => {
        return (/^[\u4e00-\u9fa5a-zA-Z]*$/.test(value))
    }
})

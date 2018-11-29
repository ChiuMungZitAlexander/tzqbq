import Vue from 'vue'
import dialogVue from './Dialog.vue'

let defaults = {
  title: '',
  message: '',
  showType: ''
}

let merge = (target, ...theArgs) => {
    for (var need of theArgs) {
        for (var prop in need) {
           if (need.hasOwnProperty(prop)) {
             var value = need[prop]
             if (value !== undefined) {
               target[prop] = value
             }
           }
         }
    }
  return target
}

let DialogConstructor = Vue.extend(dialogVue)

let currentMsg, instance
let msgQueue = []

let initInstance = () => {
  instance = new DialogConstructor({
    el: document.createElement('div')
  })
	
  instance.callback = (action) => {
    if (currentMsg) {
      let callback = currentMsg.callback
      if (typeof callback === 'function') {
         callback(action)
      }
      if (currentMsg.resolve) {
        let showType = currentMsg.options.showType
        if (showType === 'confirm') {
          if (action === 'confirm') {
            currentMsg.resolve(action)
          } else if (action === 'cancel' && currentMsg.reject) {
            currentMsg.reject(action)
          }
        } else {
          currentMsg.resolve(action)
        }
      }
    }
  }
}

let showNextMsg = () => {
  if (!instance) {
    initInstance()
  }

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      let options = currentMsg.options
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }
      document.body.appendChild(instance.$el)
      // instance.$appendTo(document.body)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

let Dialog = (options, callback, ...theArgs) => {
	instance = undefined
  if (typeof options === 'string') {
    options = {
      title: options
    }
    if (theArgs[1]) {
      options.message = theArgs[1]
    }
    if (theArgs[2]) {
      options.showType = theArgs[2]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }
  options = merge({}, defaults, Dialog.defaults || {}, options)
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: options,
        callback: callback,
        resolve: resolve,
        reject: reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: options,
      callback: callback
    })

    showNextMsg()
  }
}

Dialog.setDefaults = defaults => {
  Dialog.defaults = defaults
}

Dialog.alert = (options, ...theArgs) => {
	let title, message, onOk, onCancel
	if (typeof (options) === 'string') {
		title = theArgs[0]
		onOk = theArgs[1] || true
	} else {
		title = options.content ||  '温馨提示'
		onOk = options.onOk
		onCancel = options.onCancel
	}
  return Dialog(merge({
    title,
    message,
    showType: options.onCancel ? 'confirm' : 'info'
  }, options))
}
// 信息提示框
Dialog.info = (title, message, onOk) => {
  return Dialog({
	    title,
	    message,
	    showType: 'info',
	    onOk
	})
}
// 警告弹框
Dialog.warn = (title, message, onOk, onCancel) => {
  return Dialog({
	    title,
	    message,
	    showType: 'warn',
	    onOk
	})
}
// 错误提示弹框
Dialog.error = (title, message, onOk) => {
  return Dialog({
	    title,
	    message,
	    showType: 'error',
	    onOk
	})
}
// 成功弹框
Dialog.success = (title, message, onOk) => {
  return Dialog({
	    title,
	    message,
	    showType: 'success',
	    onOk
	})
}
// 确认是否删除
Dialog.confirm = (title, message, onOk, onCancel) => {
  return Dialog({
    	title,
	    message,
	    showType: 'confirm',
	    onOk,
	    onCancel
  })
}

Dialog.close = function () {
  instance.visible = false
  msgQueue = []
  currentMsg = null
}

export default Dialog
export { Dialog }

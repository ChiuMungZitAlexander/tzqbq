<!--
	文件：components/UploadFile.vue
	作者：yangzhi
	时间：2016-10-21
	描述：上传文件类型
-->
<template>
	<section class="">
        <input id="uploadFile" type="file" @change="uploadFileChange" />
        <input type="button" v-show="uploadBtnIsShow" :value="uploadBtnText" @click="upload">
    </section>
</template>
<script>
import backend from 'utils/backend'
export default {
	name: 'tydic-uploadFile',
	props: {
		fileType: {type: Array,  default: []},
		// 上传按钮是否显示
		uploadBtnIsShow: {type: Boolean,  default: true},
		// file改变事件
		change: {type: Function, default: null},
		// 上传成功后回调函数
		success: {type: Function, default: null},
		// 上传失败后回调函数
		fail: {type: Function, default: null},
		// 上传地址
		url: {type: Object,  default: null},
		// 文件名称
		fileName: {type: Object,  default: {name: '', value: ''}},
		// 要传递的参数 [{name: '', value: ''}]
		params: {type: Array,  default: []}
	},
	data () {
		return {
			fileObj: null,
			uploadBtnText: '上传文件'
		}
	},
	methods: {
        upload () {
			let self = this
			// 获得上传文件DOM对象
			let uploadFile
			if (self.fileObj && self.fileObj !== null) {
				uploadFile = self.fileObj
			} else {
				uploadFile = document.querySelector('#uploadFile')
			}
            // 实例化一个表单数据对象
            let formData = new window.FormData()
            // 遍历图片文件列表，插入到表单数据中
            for (let i = 0; i < uploadFile.files.length; i++) {
            	let file = uploadFile.files[i]
            	// 判断上传文件的类型是否符合要求
				if (self.fileType.length > 0) {
					let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
					if (self.fileType.indexOf(fileType) === -1) {
						self.$tydic.dialog.alert({
							title: '上传文件类型不符合要求'
						})
						return
					}
				}
                // 文件名称，文件对象
                if (self.fileName.name !== '') {
					formData.append(self.fileName.name, file.name)
				}
                formData.append('file', file)
            }
            for (let i = 0; i < self.params.length; i++) {
				let param = self.params[i]
				formData.append(param.name, param.value)
			}
            return backend.request(self.url, formData)
				.then((response) => {
					if (self.success) {
						self.success(response)
					}
				}, (response) => {
					if (self.fail) {
						self.fail(response)
					}
			})
    	},
		uploadFileChange () {
			if (this.change) {
				this.change()
			}
		}
	}
}
</script>
<style lang="scss" scoped>
</style>

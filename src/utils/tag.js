export default {
	/**
	 * 获取标签的真实属性值 包含小数
	 * tag 标签对象
	 * attr 要获取的属性值
	 * isNumber 是否转换为number类型
	 */
    getTagComputedStyle (tag, attr, isNumber) {
        if (!tag || !tag.nodeName || typeof tag !== 'object') {
            return isNumber ? 0 : ''
        }
        let attrValue = window.getComputedStyle(tag)[attr]
        if (attrValue.indexOf('px') !== -1) {
            attrValue = attrValue.substring(0, attrValue.length - 2)
        }
        return isNumber ? Number(attrValue) : attrValue
　　 }
}

export default {
	//
	offsetTop ($event) {
		let target = $event.nodeName ? $event : $event.target
　　　　	let offsetTop = 0
		while (target.previousElementSibling !== null) {
			target = target.previousElementSibling
			offsetTop += target.offsetHeight
			if (target.style.marginTop !== '') {
				offsetTop += parseFloat(target.style.marginTop)
			}
			if (target.style.marginBottom !== '') {
				offsetTop += target.style.marginBottom
			}
		}
		return offsetTop
	},
	//
    offset ($event) {
    	let target = $event.nodeName ? $event : $event.target
　　　　	let site = {
			left: target.offsetLeft + 'px',
			top: target.offsetTop + 'px'
		}
　　　　	return site
　　 	},
	/**
	 * 
	 */
    position ($event) {
    	let target = $event.nodeName ? $event : $event.target
    	let stTarget = $event.nodeName ? $event : $event.target
    	let scrollTop = 0
    	let site = {
			left: target.offsetLeft,
			top: target.offsetTop - scrollTop
		}
    	while (target.offsetParent) {
    		target = target.offsetParent
    		site.left += target.offsetLeft
    		site.top += target.offsetTop
    	}
    	while (stTarget.parentNode && stTarget.parentNode.nodeName.toLowerCase() !== 'body') {
    		stTarget = stTarget.parentNode
    		scrollTop += stTarget.scrollTop
    	}
    	site.top -= scrollTop
    	return site
    }
}

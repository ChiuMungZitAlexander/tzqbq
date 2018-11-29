import stringUtil from './string'
export default {
	/**
     * canvas 画图方法
     */
    drawImg: (ctx, option, callback) => {
        let image = new window.Image()
        image.src = option.src
        let draw = () => {
            if (!isNaN(option.x) && !isNaN(option.y)) {
                if (!isNaN(option.w) && !isNaN(option.h)) {
                    if (!isNaN(option.sx) && !isNaN(option.sy) && !isNaN(option.sw) && !isNaN(option.sh)) {
                        ctx.drawImage(image, option.sx, option.sy, option.sw, option.sh, option.x, option.y, option.w, option.h)
                        return
                    }
                    ctx.drawImage(image, option.x, option.y, option.w, option.h)
                    return
                }
                ctx.drawImage(image, option.x, option.y)
            }
        }
        if (image.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            draw()
            if (callback && typeof callback === 'function') {                
                callback()
            }
            return
         }
         image.onload = () => {
             draw()
             if (callback && typeof callback === 'function') {
                 callback()
             }
         }
    },
    /**
     * canvas 画图方法 用户画布中画canvas
     */
    drawCanvas: (ctx, canvas, option) => {
        if (!isNaN(option.x) && !isNaN(option.y)) {
            if (!isNaN(option.w) && !isNaN(option.h)) {
                if (!isNaN(option.sx) && !isNaN(option.sy) && !isNaN(option.sw) && !isNaN(option.sh)) {
                    ctx.drawImage(canvas, option.sx, option.sy, option.sw, option.sh, option.x, option.y, option.w, option.h)
                    return
                }
                ctx.drawImage(canvas, option.x, option.y, option.w, option.h)
                return
            }
            ctx.drawImage(canvas, option.x, option.y)
        }
    },
    /**
     * canvas 画圆方法
     */
    drawCircular (ctx, option) {
       	ctx.beginPath()
	   	/**
    	  * 设置弧线的颜色
		  * @type {[type]}
	      */
        ctx.strokeStyle = option.strokeStyle
        /**
          * 设置背景颜色rgba(141, 141, 141, 1)
          * @type {[type]}
          */
        ctx.fillStyle = option.fillStyle
        /**
          * option.x,    圆心的x轴坐标值
          * option.y,    圆心的y轴坐标值
    	  * option.r     圆的半径
          */
        let sAngle = option.sAngle || 0
        let eAngle = option.eAngle || 2
        ctx.arc(option.x, option.y, option.r, sAngle * Math.PI, eAngle * Math.PI)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    },
    drawSector (ctx, option) {
    	ctx.save()
    	ctx.translate(option.x, option.y)
    	ctx.beginPath()
        let sAngle = option.sAngle || 0
        let eAngle = option.eAngle || 2
     	ctx.arc(0, 0, option.r, sAngle * Math.PI, eAngle * Math.PI)
     	ctx.save()
     	ctx.rotate(eAngle * Math.PI)
     	ctx.moveTo(option.r, 0)
     	ctx.lineTo(0, 0)
     	ctx.restore()
     	ctx.rotate(sAngle * Math.PI)
     	ctx.lineTo(option.r, 0)
     	ctx.closePath()
     	ctx.restore()
     	ctx.translate(0, 0)
     	ctx.fillStyle = option.fillStyle
        ctx.fill()
    },
    /**
     * 画扇形中心点延伸出去的文字说明
     * @param ctx {context} 画布的 getContext('2d')
     * @param option {Object} 一些参数
     * @param text {String} 要写的文字
     * @param isNewLine {Boolean} 是否换行书写文字
     * @param lineStrNum {number} 换行的文字长度 长于当前文字才换行
     * @param lineTextWidth {number} 文字第一行的宽度
     * @param num {number} 第几个文字
     * @param circular {Object} 画扇形相关的配置参数
     */
    drawSectorText (ctx, option, textOption, text, isNewLine, lineStrNum, lineTextWidth, num, circular) {
    	let angleArr = circular.angleArr
    	let minAngleLen = circular.minAngleLen
        ctx.save()
    	ctx.translate(option.x, option.y)
    	let sAngle = option.sAngle || 0
        let eAngle = option.eAngle || 2
        let angle = eAngle - sAngle
        let centerAngle = angle / 2
        let isLeft = true
        ctx.rotate((centerAngle + sAngle) * Math.PI)
    	// 判断中心点的位置 是在左边还是右边
    	if (centerAngle + sAngle > 0.5 && centerAngle + sAngle < 1.5) {
    		isLeft = false
    	}
    	ctx.lineWidth = 1.5
        ctx.beginPath()
    	ctx.moveTo(option.r + 5, 0)
    	let addR = (num + 1) * option.addR
     	ctx.lineTo(option.r + addR, 0)
     	ctx.closePath()
        ctx.strokeStyle = option.fillStyle
        ctx.stroke()
        ctx.translate(option.r + addR, 0)
        ctx.rotate(-(centerAngle + sAngle) * Math.PI)
        let lineToX = 0
        let angleArrLen = angleArr.length
        let drawLine = (x) => {
        	ctx.beginPath()
	    	ctx.moveTo(0, 0)
	        ctx.lineTo(lineToX, 0)
	     	ctx.closePath()
	        ctx.stroke()
        }
   		lineToX = 50
		if (!isLeft) {
			lineToX = -50
		}
    	switch (angleArrLen) {
    		case 1:
    			drawLine()
    			ctx.translate(lineToX, 0)
    			break
			case 2:
    			drawLine()
    			ctx.translate(lineToX, 0)
				break
			case 3:
				if (minAngleLen === 2 && option.current !== 'undefined') {
					let addAngle = option.current * 90
					ctx.rotate((315 + addAngle) * Math.PI / 180)
					drawLine()
					ctx.translate(lineToX, 0)
					ctx.rotate((45 - addAngle) * Math.PI / 180)
				} else {
					drawLine()
    				ctx.translate(lineToX, 0)
				}
    			break
			case 4:
				if (minAngleLen === 2 && option.current !== 'undefined') {
					let up = num === 0 ? angleArrLen - 1 : num - 1
					let next = num === angleArrLen - 1 ? 0 : num + 1
					if (angleArr[up] < 36 || angleArr[next] < 36) {
						let addAngle = option.current * 90
						ctx.rotate((315 + addAngle) * Math.PI / 180)
						drawLine()
						ctx.translate(lineToX, 0)
						ctx.rotate((45 - addAngle) * Math.PI / 180)
					} else {
						drawLine()
    					ctx.translate(lineToX, 0)
					}
				} else if (minAngleLen === 3 && option.current !== 'undefined') {
					let addAngle = option.current * 90
					ctx.rotate((270 + addAngle) * Math.PI / 180)
					drawLine()
					ctx.translate(lineToX, 0)
					ctx.rotate((90 - addAngle) * Math.PI / 180)
				} else {
					drawLine()
    				ctx.translate(lineToX, 0)
				}
    			break
			case 5:
				let up = num === 0 ? angleArrLen - 1 : num - 1
				let up1 = up === 0 ? angleArrLen - 1 : up - 1
				let next = num === angleArrLen - 1 ? 0 : num + 1
				let next1 = next === angleArrLen - 1 ? 0 : next + 1
				if (minAngleLen === 2 && option.current !== 'undefined') {
					if (angleArr[up] < 36 || angleArr[next] < 36) {
						let addAngle = option.current * 90
						ctx.rotate((315 + addAngle) * Math.PI / 180)
						drawLine()
						ctx.translate(lineToX, 0)
						ctx.rotate((45 - addAngle) * Math.PI / 180)
					} else {
						drawLine()
    					ctx.translate(lineToX, 0)
					}
				} else if (minAngleLen === 3 && option.current !== 'undefined') {
					if ((angleArr[up] < 36 && angleArr[up1] < 36) ||
					(angleArr[up] < 36 && angleArr[next] < 36) ||
					(angleArr[next] < 36 && angleArr[next1] < 36)) {
						let addAngle = option.current * 90
						ctx.rotate((270 + addAngle) * Math.PI / 180)
						drawLine()
						ctx.translate(lineToX, 0)
						ctx.rotate((90 - addAngle) * Math.PI / 180)
					} else if ((angleArr[up] > 36 && angleArr[next] < 36) ||
						(angleArr[up] < 36 && angleArr[next] > 36)) {
						let current = 0
						if (angleArr[up] < 36 && angleArr[next] > 36) {
							current = 1
						}
						let addAngle = current * 90
						ctx.rotate((315 + addAngle) * Math.PI / 180)
						drawLine()
						ctx.translate(lineToX, 0)
						ctx.rotate((45 - addAngle) * Math.PI / 180)
					} else if (angleArr[up] > 36 && angleArr[next] > 36) {
						drawLine()
    					ctx.translate(lineToX, 0)
					} else {
						drawLine()
    					ctx.translate(lineToX, 0)
					}
				} else if (minAngleLen === 4 && option.current !== 'undefined') {
					let addAngle
					if (option.current === 1 || option.current === 2) {
						addAngle = (option.current - 1) * 90
						ctx.rotate((315 + addAngle) * Math.PI / 180)
						lineToX = 40
						if (!isLeft) {
							lineToX = -40
						}
						drawLine()
						ctx.translate(lineToX, 0)
						ctx.rotate((45 - addAngle) * Math.PI / 180)
					} else {
						addAngle = option.current * 60
						ctx.rotate((270 + addAngle) * Math.PI / 180)
						lineToX = 80
						if (!isLeft) {
							lineToX = -80
						}
						drawLine()
						ctx.translate(lineToX, 0)
						ctx.rotate((90 - addAngle) * Math.PI / 180)
					}
				} else {
					drawLine()
    				ctx.translate(lineToX, 0)
				}
    			break
    	}
        textOption.textAlign = isLeft ? 'left' : 'right'
        if (isNewLine !== undefined && isNewLine) {
        	let len = stringUtil.subStrLength(text)
        	let h = parseFloat(textOption.font) + 2
        	if (len > lineStrNum) {
        		let num = Math.ceil(len / lineStrNum)
        		textOption.textAlign = 'left'
        		for (let i = 0; i < num; i++) {
        			if (i > 0) {
        				this.fillText(ctx, textOption, stringUtil.subStrLength(text, i * lineStrNum + 1, (i + 1) * lineStrNum), isLeft ? 5 : -5 - lineTextWidth, h * i)
        			} else {
        				this.fillText(ctx, textOption, stringUtil.subStrLength(text, i * lineStrNum, (i + 1) * lineStrNum), isLeft ? 5 : -5 - lineTextWidth, h * i)
        			}
        		}
        	} else {
        		this.fillText(ctx, textOption, text, isLeft ? 5 : -5, 0)
        	}
        } else {
        	this.fillText(ctx, textOption, text, isLeft ? 5 : -5, 0)
        }
        ctx.restore()
    },
    /**
     * 数据资产画扇形中心点延伸出去的文字说明三行
     */
    drawDataSectorText (ctx, option, textOption, text, height) {
        ctx.save()
    	ctx.translate(option.x, option.y)
    	let sAngle = option.sAngle || 0
        let eAngle = option.eAngle || 2
        let centerAngle = (eAngle - sAngle) / 2
        let isLeft = true
        ctx.rotate((centerAngle + sAngle) * Math.PI)
    	// 判断中心点的位置 是在左边还是右边
    	if (centerAngle + sAngle > 0.5 && centerAngle + sAngle < 1.5) {
    		isLeft = false
    	}
    	ctx.lineWidth = 1.5
        ctx.beginPath()
    	ctx.moveTo(option.r + 5, 0)
     	ctx.lineTo(option.r + 15, 0)
     	ctx.closePath()
        ctx.strokeStyle = option.fillStyle
        ctx.stroke()
        ctx.translate(option.r + 15, 0)
        ctx.rotate(-(centerAngle + sAngle) * Math.PI)
        ctx.beginPath()
    	ctx.moveTo(0, 0)
        let lineToX = 0
        if (isLeft) {
            lineToX = 40
        } else {
            lineToX = -40
        }
        ctx.lineTo(lineToX, 0)
     	ctx.closePath()
        ctx.stroke()
        textOption.textAlign = isLeft ? 'left' : 'right'
    	this.fillText(ctx, textOption, text[0], lineToX + (isLeft ? 5 : -5), -height * 3 / 4)
        this.fillText(ctx, textOption, text[1], lineToX + (isLeft ? 5 : -5), 0)
        this.fillText(ctx, textOption, text[2], lineToX + (isLeft ? 5 : -5), height * 3 / 4)
   		ctx.restore()
    },
    /**
     * 画圆角矩形
     * @type {[type]}
     */
     drawRoundedRect: (ctx, temp) => {
         let roundedRect = (ctx, x, y, w, h, radius) => {
             if (w > 0) {
                 ctx.moveTo(x + radius, y)
             } else {
                 ctx.moveTo(x - radius, y)
             }
             ctx.arcTo(x + w, y, x + w, y + h, radius)
             ctx.arcTo(x + w, y + h, x, y + h, radius)
             ctx.arcTo(x, y + h, x, y, radius)
             if (w > 0) {
                 ctx.arcTo(x, y, x + radius, y, radius)
             } else {
                 ctx.arcTo(x, y, x - radius, y, radius)
             }
         }
         ctx.beginPath()
         roundedRect(ctx, temp.x, temp.y, temp.w, temp.h, temp.radius)
         ctx.strokeStyle = temp.strokeStyle
         ctx.fillStyle = temp.fillStyle
         ctx.stroke()
         ctx.fill()
 	},
 	getFont (option, zoom) {
 		let font = ''
 		if (!isNaN(option.fontSize) && option.fontSize !== '') {
 			font += option.fontSize * zoom + 'px'
 		} else {
 			font += '12px'
 		}
 		if (option.fontWeight !== '') {
 			font += ' ' + option.fontWeight
 		}
 		if (option.fontFamily !== '') {
 			font += ' ' + option.fontFamily
 		} else {
 			font += ' Microsoft YaHei'
 		}
 		return font
 	},
    /**
     * canvas 写文字方法
     */
    fillText: (ctx, option, text, x, y) => {
        ctx.font = option.font
        ctx.fillStyle = option.fillStyle
        if (option.textAlign) {
            ctx.textAlign = option.textAlign
        } else {
            ctx.textAlign = 'start'
        }
        if (option.textBaseline) {
            ctx.textBaseline = option.textBaseline
        } else {
            ctx.textBaseline = 'top'
        }
        ctx.fillText(text, x, y)
    },
    /**
     * canvas 画线
     */
    drawLine: (ctx, option) => {
        /**
         * 设置填充颜色
         * @type {String}
         */
        ctx.strokeStyle = option.fillStyle
        ctx.lineWidth = option.lineWidth ? option.lineWidth : 1
        ctx.beginPath()
        /**
         * 将画笔移到x0,y0处
         */
        ctx.moveTo(option.x0, option.y0)
        /**
         * 从x0,y0到x1,y1画一条线
         */
        ctx.lineTo(option.x1, option.y1)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    },
    /**
     * canvas 画横向带箭头的线
     */
    drawArrowLine: (ctx, option) => {
        /**
         * 设置填充颜色
         * @type {String}
         */
        ctx.strokeStyle = option.fillStyle
        ctx.lineWidth = option.lineWidth
        ctx.fillStyle = option.fillStyle
        ctx.beginPath()
        /**
         * 将画笔移到x0,y0处
         */
        ctx.moveTo(option.x0, option.y0)
        /**
         * 从x0,y0到x1,y1画一条线
         */
        ctx.lineTo(option.x1 - 1, option.y1)
        ctx.closePath()
        ctx.stroke()
        ctx.beginPath()
        /**
         * 从x1,y1画两5像素的条线形成箭头
         */
        ctx.lineTo(option.x1 - option.r, option.y1 + option.r * 2 / 3)
        ctx.lineTo(option.x1 - 1, option.y1)
        ctx.lineTo(option.x1 - option.r, option.y1 - option.r * 2 / 3)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    },
    /**
     * canvas 画任意角度带箭头的线
     */
    drawArrowLine1: (ctx, option) => {
    		ctx.strokeStyle = option.fillStyle
	        ctx.lineWidth = option.lineWidth
        	var angle = Math.abs(Math.atan((option.x1 - option.x0) / (option.y1 - option.y0))) // 倾斜角余角
			var length = option.len // 箭头斜线长度
			var degree = Math.PI / 4 // 箭头倾斜角
			var theta = 0
			var altha = 0
			var a1 = 0
			var b1 = 0
			var a2 = 0
			var b2 = 0
			if (angle >= degree && angle <= Math.PI / 2 - degree) {
				theta = angle - degree
				altha = Math.PI / 2 - 2 * degree - theta
				if (option.x1 >= option.x0) {
					a1 = option.x1 - length * Math.sin(theta)
					a2 = option.x1 - length * Math.cos(altha)
				} else {
					a1 = option.x1 + length * Math.sin(theta)
					a2 = option.x1 + length * Math.cos(altha)
				}
				if (option.y1 >= option.y0) {
					b1 = option.y1 - length * Math.cos(theta)
					b2 = option.y1 - length * Math.sin(altha)
				} else {
					b1 = option.y1 + length * Math.cos(theta)
					b2 = option.y1 + length * Math.sin(altha)
				}
			} else {
				theta = angle - degree
				altha = theta + 2 * degree - Math.PI / 2
				if (option.x1 >= option.x0 && option.y1 >= option.y0) {
					a1 = option.x1 - length * Math.sin(theta)
					b1 = option.y1 - length * Math.cos(theta)
					a2 = option.x1 - length * Math.cos(altha)
					b2 = option.y1 + length * Math.sin(altha)
				} else if (option.x1 >= option.x0 && option.y1 < option.y0) {
					a1 = option.x1 - length * Math.sin(theta)
					b1 = option.y1 + length * Math.cos(theta)
					a2 = option.x1 - length * Math.cos(altha)
					b2 = option.y1 - length * Math.sin(altha)
				} else if (option.x1 < option.x0 && option.y1 < option.y0) {
					a1 = option.x1 + length * Math.sin(theta)
					b1 = option.y1 + length * Math.cos(theta)
					a2 = option.x1 + length * Math.cos(altha)
					b2 = option.y1 - length * Math.sin(altha)
				} else {
					a1 = option.x1 + length * Math.sin(theta)
					b1 = option.y1 - length * Math.cos(theta)
					a2 = option.x1 + length * Math.cos(altha)
					b2 = option.y1 + length * Math.sin(altha)
				}
			}

			ctx.beginPath()
			ctx.moveTo(option.x0, option.y0)
			ctx.lineTo(option.x1, option.y1)
			ctx.lineTo(a1, b1)
			ctx.stroke()
			ctx.moveTo(option.x1, option.y1)
			ctx.lineTo(a2, b2)
			ctx.stroke()
    },
    /**
     * 暂时无用 还没完善逻辑
     * @param option.xScale 水平缩放
     * @param option.xRotate 水平倾斜
     * @param option.yScale 垂直倾斜
     * @param option.yRotate 垂直缩放
     * @param option.translateX 水平移动
     * @param option.translateY 垂直移动
     */
    transform (ctx, option) {
    	ctx.transform(option.xScale, option.xRotate, option.yRotate, option.yScale, option.translateX, option.translateY)
    },
    createCanvas (option) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        if (!isNaN(option.w) && !isNaN(option.h)) {
            canvas.width = option.w
            canvas.height = option.h
            ctx.rect(0, 0, option.w, option.w)
        }
        if (option.isTransparent) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0)'
            ctx.fill()
        }
        return {
            canvas: canvas,
            ctx: ctx
        }
    }
}

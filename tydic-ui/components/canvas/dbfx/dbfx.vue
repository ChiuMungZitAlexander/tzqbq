<!--
    文件：components/canvas/dbfx/dbfx.vue
    作者：杨智
    时间：2016-10-28
    描述：对比分析 分析页面canvas组件
-->
<template>
    <section class="container tydic-dbfx">
        <section class="content">
            
            <section class="center">
            	<tydic-resizePanel>
        		 	
            	</tydic-resizePanel>
            </section>
        </section>
    </section>
</template>

<script>
/*
treeList: [{
    modelKey: '',
    children: [{
        modelKey: '',
        children: []
    }]
}] 通过modelKey和 canvasParam.children里面的modelKey比对 来画图或移动组件位置是移动单个还是一起
最终结果是单独的一个
 */
import Vue from 'vue'
import canvasParam from './json/data.json'
import methods from './js/canvas.js'
import {mapGetters} from 'vuex'

export default {
  name: 'tydic-dbfx',
  
}
</script>

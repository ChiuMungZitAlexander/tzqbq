<!--
	文件：components/Tab.vue
	作者：tangxianrong
	时间：2016-10-05
	描述：页签组件的套件
-->
<template>
  <div role="tabpanel" class="tab-pane active" v-show="show"
    :class="{hide:!show}"
    :transition="transition"
  >
    <slot></slot>
  </div>
  
</template>
<script>
export default {
  name: 'tydic-tab',
  props: {
    header: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  // 实时计算; Vue检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    active () {
      return this._tabset.show === this
    },
    index () {
      return this._tabset.tabs.indexOf(this)
    },
    show () {
      return this._tabset && this._tabset.show === this
    },
    transition () {
      return this._tabset ? this._tabset.effect : null
    }
  },
  created () {
    let tabset = this
    while (tabset && tabset._tabset !== true && tabset.$parent) {
      tabset = tabset.$parent
    }
    if (!tabset._tabset) {
      this._tabset = {}
      console.warn('Warning: "tab" depend on "tabs" to work properly.')
    } else {
      tabset.tabs.push(this)
      tabset.headers.push(this)
      this._tabset = tabset
    }
  },
  beforeDestroy () {
    if (this._tabset.active.index === this.index) { this._tabset.active.index = 0 }
    this._tabset.tabs.splice(this.index, 1)
  }
}
</script>

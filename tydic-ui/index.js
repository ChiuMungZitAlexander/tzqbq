import Vue from 'vue'
import Dialog from './components/Dialog'
import Tab from './components/Tab'
import Tabs from './components/Tabs'
import Modal from './components/Modal'
import panel from './components/panel'
import Accordion from './components/Accordion'
import Page from './components/Page'
import NewTree from './components/newTree'
import DbfxTree from './components/dbfx-tree'
import Tree from './components/Tree'
import PanelTable from './components/PanelTable'
import resizePanel from './components/resizePanel'
import UploadFile from './components/UploadFile'
import grid from './components/grid'
import Calendar from './components/Calendar'
import SpanTag from './components/span'
import ButtonTag from './components/button'
import CheckboxTag from './components/checkbox'
import LinkTag from './components/link'
import ScrollBar from './components/scrollBar'
import validate from './components/validate/validate'

require('./assets/css/tydicIndex.css')
/**
 * 对tydic-ui部分组件的封装(编程式调用)
 */
Object.defineProperty(Vue.prototype, '$tydic', {
	get () {
		return {
			dialog: Dialog
		}
	}
})

/**
 * 对Dialog单独封装
 */
Object.defineProperty(Vue.prototype, '$tDialog', {
	get () {
		return Dialog
	}
})

module.exports = {
  version: '0.0.1',
  install () {
		Vue.component(Tab.name, Tab)
		Vue.component(Tabs.name, Tabs)
		Vue.component(Modal.name, Modal)
		Vue.component(panel.name, panel)
		Vue.component(Accordion.name, Accordion)
		Vue.component(Page.name, Page)
		Vue.component(grid.name, grid)
		Vue.component(Tree.name, Tree)
		Vue.component(Calendar.name, Calendar)
		Vue.component(SpanTag.name, SpanTag)
		Vue.component(ButtonTag.name, ButtonTag)
		Vue.component(CheckboxTag.name, CheckboxTag)
		Vue.component(LinkTag.name, LinkTag)
		Vue.component(NewTree.name, NewTree)
		Vue.component(DbfxTree.name, DbfxTree)
		Vue.component(resizePanel.name, resizePanel)
		Vue.component(PanelTable.name, PanelTable)
		Vue.component(ScrollBar.name, ScrollBar)
		Vue.component(UploadFile.name, UploadFile)
  }
}

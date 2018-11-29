<template>
<li class="dropdown" @mouseenter="toggleIsOpen(true)">
	<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
		<slot name="name"></slot><span class="caret"></span>
	</a>
	<ul class="dropdown-menu"
		:style="{ display: isOpen ? 'block' : 'none' }"
		transition="collapse" 
		@mouseleave="toggleIsOpen(false)">
		<li><slot></slot></li>
	</ul>
 </li>
</template>

<script>
export default {
	props: {
		menu: {
			type: Object,
			default () {
				return { open: false }
			}
		}
	},
	computed: {
		isOpen: {
			get () {
				return this.menu.open || false
			},
			set (value) {
				this.menu.open = value
			}
		}
	},
	methods: {
		toggleIsOpen (flag) {
			this.isOpen = flag
			this.$emit('menuIsOpen', this)
		}
	},
	transitions: {
		collapse: {
			afterEnter: function (el) {
			el.style.maxHeight = ''
		},
		beforeLeave: function (el) {
			el.style.maxHeight = el.offsetHeight + 'px'
				return el.offsetHeight
			}
		}
	}
}
</script>
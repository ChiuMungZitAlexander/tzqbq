<template>
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#example-navbar-collapse">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/#/">天源迪科</a>
        </div>
        <div class="collapse navbar-collapse" id="example-navbar-collapse">
            <ul class="nav navbar-nav">
				<c-menu v-for="(menu, index) in menus"
					:index="index">
					<template slot="name">{{ menu.name }}</template>
					<router-link v-for="item in menu.items" 
						:to="item.path">{{ item.name }}</router-link>
				</c-menu>
            </ul>
        </div>
        </div>
    </nav>

</template>

<script>
import menu from './menu'
import menuConf from 'conf/menu.json'

export default {
	components: {
		cMenu: menu
	},
	data () {
		return {
			menus: menuConf
		}
	},
	mounted () {
		this.$on('menuIsOpen', (child) => {
			this.$children.forEach((item) => {
				if (child !== item) {
					item.menu.open = false
				}
			})
		})
	}
}
</script>
<template>
    <component :is="views.index"></component>
</template>

<script>
import { mapGetters } from 'vuex'
import login from './login'
export default {
    components: {
    },
    computed: {
        ...mapGetters({
            views: 'user.views'
        })
   }
}
</script>
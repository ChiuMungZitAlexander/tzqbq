<template>
    <div class="loginbox">
        <div class="gongan"><img src="../../assets/images/login/gongan.png"></div>
        <h1>
            泰州市公安局大数据情报指挥中心
        </h1>
        <form v-on:submit.prevent>
        <div class="wrap">
            <input type="text" placeholder="请输入您的帐号"  v-model="user.account">
            <input type="password" placeholder="请输入您的密码" v-model="user.password">
        </div>
        <button v-on:click="onLogin()">登    录</button>
        </form>
        <div class="footer">
            ©泰州市公安局    版权所有
        </div>
    </div>
</template>

<script>
import api from 'conf/api'
import backend from 'utils/backend'
import CryptoJS from 'crypto-js'
import session from 'utils/session'
import login from 'utils/login'
import router from '../../router'

export default {
    data () {
        return {
            user: {
                account: null,
                password: null
            }
        }
    },
    methods: {
        onLogin () {
            if (!this.user.account || !this.user.password) {
                    this.$tDialog.info('温馨提示', '账号密码不能为空')
                    return
                }
            login.doLogin(this.user, '/')
			// this.$store.commit('global.changeUser', {name: '1231'})
			// router.push({path: '/'})
        }
    }
}
</script>
<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <navbar :loggedIn="loggedIn" :user="user"></navbar>
    <transition name="fade">
      <router-view v-on:login="login" v-on:logOut="logOut" v-on:gotoLead="goToLead" :user="user" :loggedIn="loggedIn" :leadId="leadId"/>
    </transition>
    <foot></foot>
  </div>
</template>

<script>
import Navbar from './pages/elements/Navbar'
import Foot from './pages/elements/Foot'
export default {
  name: 'app',
  components: {
    'navbar': Navbar,
    'foot': Foot
  },
  created () {
    let vue = this
    vue.user.token = localStorage.getItem('token')
    vue.user.id = localStorage.getItem('userId')
    vue.user.admin = localStorage.getItem('admin')
    vue.user.employee = localStorage.getItem('employee')
    if (vue.user.token !== null) {
      vue.loggedIn = true
    }
  },
  data: function () {
    return {
      loggedIn: false,
      leadId: '',
      user: {
        id: '',
        token: '',
        admin: false,
        employee: false
      }
    }
  },
  methods: {
    login: function (user) {
      let vue = this
      vue.user.token = user.token
      vue.user.id = user.id
      vue.user.admin = user.admin
      vue.user.employee = user.employee
      vue.loggedIn = true
      if (vue.user.employee === true) {
        vue.$router.push('/crm')
      } else {
        vue.$router.push('/customeraccount')
      }
    },
    logOut: function () {
      let vue = this
      vue.user.token = ''
      vue.user.id = ''
      vue.loggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('admin')
      localStorage.removeItem('employee')
      vue.$router.push('/')
    },
    goToLead: function (leadId) {
      let vue = this
      vue.leadId = leadId
      vue.$router.push('/leads')
    }
  }
}
</script>

<style scoped lang="less">

.fade-enter-active, .fade-leave-active {
  transition: all .25s ease;
  transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateY(20px);
}
</style>

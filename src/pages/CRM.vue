<template>
  <div class="main">
    <transition name="fade">
      <div class="passModal" v-if="changePass">
        <input v-model="password" placeholder="Password">
        <button class="back" v-on:click="changePass = false">Back</button>
        <button class="confirmChange" v-on:click="confirmChange">Confirm Change</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="home" v-if="!changePass">
        <h1>CRM-DASHBOARD</h1>
        <button class="inbox" v-on:click="$router.push('/inbox')">INBOX</button><br/>
        <button class="leads" v-on:click="$router.push('/leads')">LEADS</button><br/>
        <button class="admin" v-on:click="$router.push('/admin')" v-if="user.admin">ADMIN</button>
        <button class="changePass" v-on:click="changePass = true">CHANGE PASSWORD</button>
        <button class="logOut" v-on:click="$emit('logOut')">LOG OUT</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'user',
  props: ['user', 'loggedIn'],
  created () {
    let vue = this
    if (vue.loggedIn === false || vue.user.employee === false) {
      vue.$router.push('/login')
    }
  },
  methods: {
    confirmChange () {
      let vue = this
      axios.put('https://api.screenartstudios.com/users/' + vue.user.id, {
        password: vue.password
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function () {
          vue.changePass = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  data () {
    return {
      changePass: false,
      password: ''
    }
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

  .main {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 145px;
    width: 96%;
    height: 68%;
    z-index: 10;
    position: fixed;
    background:rgba(0,0,0,0.6);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    display: grid;
    grid-template-columns: .4fr 1fr .4fr;
  }

  h1 {
    font-family: @base-font;
    font-weight: lighter;
    width: 100%;
    font-size: 1.4em;
    color: #fff;
    text-shadow: 2px 2px 3px black;
    text-align: center;
    line-height: 1.6em;
    margin-bottom: 0;
    margin-top: 6px;
  }

  .passModal {
    grid-column: 2;
    margin-top: 50px;
  }

  input {
    width: 100%;
    height: 35px;
    background: transparent;
    border-color: #fff;
    color: #fff;
    font-family: @base-font;
    font-size: 1.5em;
  }

  button {
    font-family: @base-font;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: transparent;
    color: #fff;
    box-shadow: 2px 2px 4px #000;
    margin-top: 12px;
    font-size: 1.5em;
  }

  input:hover {
    background: #fff;
    color: #5d5d5d;
  }

  button:hover {
    background: #fff;
    color: #5d5d5d;
  }

  .home {
    width: 100%;
    align-items: center;
    grid-column: 2;

  }

  .fade-enter-active, .fade-leave-active {
    transition: all .25s ease;
    transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(20px);
  }
</style>

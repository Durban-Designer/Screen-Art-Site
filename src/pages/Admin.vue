<template>
  <div class="main">
    <users v-if="viewUsers" v-on:back="viewUsers = false" :user="user"></users>
    <div class="settings" v-else-if="settings">
      <button class="back" v-on:click="settings = false">Back</button>
    </div>
    <div class="adminopt" v-else>
      <h1>ADMIN</h1>
      <button v-on:click="viewUsers = true">User Manifest</button>
      <button v-on:click="settings = true">Settings</button>
      <button v-on:click="$router.push('/crm')">Back</button>
    </div>
  </div>
</template>

<script>
import Users from './elements/Users'
export default {
  name: 'Admin',
  props: ['user', 'loggedIn'],
  created () {
    let vue = this
    if (vue.loggedIn === false || vue.user.admin === false) {
      vue.$router.push('/login')
    }
  },
  components: {
    'users': Users
  },
  data () {
    return {
      viewUsers: false,
      settings: false
    }
  }
}
</script>

<style scoped lang='less'>
@base-font:'Pathway Gothic One', sans-serif;

.main {
  margin: 0;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-left: 5px;
  margin-top: 145px;
  width: 99%;
  height: 68%;
  z-index: 10;
  position: fixed;
  background:rgba(0,0,0,0.6);
  border-radius: 12px;
  box-shadow: 2px 2px 4px #000;
  display: grid;
  grid-template-columns: .4fr 1fr .4fr;
  grid-template-rows: repeat(4, 1fr);
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
  margin-bottom: 20px;
  margin-top: 6px;
}

.adminopt {
  grid-column: 2;
  margin-top: 10px;
}

.settings {
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.back {
  width: 100%;
  text-align: center;
  grid-column: 2;
  margin-top: 200px;
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

button:hover {
  background: #fff;
  color: #5d5d5d;
}
</style>

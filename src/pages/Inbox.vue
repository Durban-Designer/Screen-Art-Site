<template>
  <div class="main">
    <div class="messageView" v-if="messageItem">
      <p class="name">Name:{{activeMessage.name}}</p>
      <p class="phone">Phone:{{activeMessage.phone}}</p>
      <p class="email">Email:{{activeMessage.email}}</p>
      <p class="message">Message:{{activeMessage.message}}</p>
      <p class="time">Time:{{activeMessage.time}}</p>
      <button v-on:click="gotoLead">GOTO Lead</button>
      <button v-on:click="deleteMessage">DELETE</button>
      <button v-on:click="messageItem=false">BACK</button>
    </div>
    <div v-else>
      <h4>INBOX</h4>
      <input type="text" class="search" placeholder="Search Messages" v-model="searchBox">
      <select class="filter">
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select>
      <button type="submit" class="searchButton" v-on:click="search">SEARCH</button>
      <button class="backButton" v-on:click="$router.push('/crm')">BACK</button>
      <div class="messageList" v-for="message in messages" v-bind:key="message.id">
        <h5 v-on:click="messageItemView(message)" class="message">{{message.name}}:{{message.time}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'inbox',
  props: ['user', 'loggedIn'],
  created () {
    let vue = this
    vue.clearMessages()
    vue.populateMessages()
  },
  data () {
    return {
      searchBox: '',
      messages: [],
      activeMessage: {
        name: '',
        phone: '',
        email: '',
        message: '',
        time: '',
        leadId: '',
        id: ''
      },
      messageItem: false
    }
  },
  methods: {
    populateMessages () {
      let vue = this
      axios.get('https://api.screenartstudios.com/messages', {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.messages = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clearMessages () {
      this.messages = [{}]
    },
    search () {
      let vue = this
      if (vue.searchBox === '') {
        vue.clearMessages()
        vue.populateMessages()
      } else {
        axios.get('https://api.screenartstudios.com/messages/name/' + vue.searchBox, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (response) {
            vue.clearMessages()
            vue.messages = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    messageItemView (message) {
      let vue = this
      vue.messageItem = true
      vue.activeMessage.name = message.name
      vue.activeMessage.phone = message.phone
      vue.activeMessage.email = message.email
      vue.activeMessage.message = message.message
      vue.activeMessage.time = message.time
      vue.activeMessage.leadId = message.leadId
      vue.activeMessage.id = message._id
      console.log(message)
    },
    deleteMessage () {
      let vue = this
      axios.delete('https://api.screenartstudios.com/messages/' + vue.activeMessage.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function () {
          vue.messageItem = false
          vue.clearMessages()
          vue.populateMessages()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    gotoLead () {
      let vue = this
      vue.$emit('gotoLead', vue.activeMessage.leadId)
    }
  }
}
</script>

<style scoped lang='less'>
@base-font:'Pathway Gothic One', sans-serif;
.main {
  margin-left: 5px;
  margin-top: 145px;
  width: 99%;
  height: 68%;
  z-index: 10;
  position: fixed;
  background:rgba(0,0,0,0.6);
  border-radius: 12px;
  box-shadow: 2px 2px 4px #000;
}

h4 {
  font-size: 2em;
  line-height: 0px;
  text-decoration: underline;
  color: #fff;
  font-family: @base-font;
}

.search {
  margin: 10px;
  width: 60%;
  height: 40px;
}

.searchButton {
  margin: 10px;
  height: 40px;
}

button {
  font-family: @base-font;
  height: 40px;
  background-color: transparent;
  color: #fff;
  box-shadow: 2px 2px 4px #000;
  margin-top: 25px;
  font-size: 2em;
}
</style>

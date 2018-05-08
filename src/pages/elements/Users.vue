<template>
  <div class="main">
    <div class="addUser" v-if="addUser">
      <input class="name" placeholder="name" v-model="activeUser.name"/>
      <input class="email" placeholder="email" v-model="activeUser.email"/>
      <input class="password" placeholder="password" v-model="activeUser.password"/>
      <input class="admin" type="checkbox" v-model="activeUser.admin"/><p>Admin</p>
      <input class="employee" type="checkbox" v-model="activeUser.employee"/><p>Employee</p>
      <button class="submit" v-on:click="userSubmit">Submit</button>
      <button class="back" v-on:click="addButton">Back</button>
    </div>
    <div class="userView" v-else-if="viewUser">
      <h5>Name:</h5><p>{{activeUser.name}}</p>
      <h5>Email:</h5><p>{{activeUser.email}}</p>
      <h5>Admin:</h5><p>{{activeUser.admin}}</p>
      <h5>Employee:</h5><p>{{activeUser.employee}}</p>
      <button v-on:click="editUser=true; viewUser=false">Edit</button>
      <button v-on:click="viewUser=false">Back</button>
    </div>
    <div class="editUser" v-else-if="editUser">
      <h5>Name:</h5><input class="name" placeholder="name" v-model="activeUser.name"/>
      <h5>Email:</h5><input class="email" placeholder="email" v-model="activeUser.email"/>
      <input class="admin" type="checkbox" v-model="activeUser.admin"/><p>Admin</p>
      <input class="employee" type="checkbox" v-model="activeUser.employee"/><p>Employee</p>
      <button class="submit" v-on:click="userEdit">Submit</button>
      <button class="delete" v-on:click="deleteUserModal=true">Delete</button>
      <button class="back" v-on:click="editUser = false; viewUser= true">Back</button>
      <div class="deleteModal" v-if="deleteUserModal">
        <h2>Are you sure?</h2>
        <button v-on:click="deleteUser">Yes</button>
        <button v-on:click="deleteUserModal = false">No</button>
      </div>
    </div>
    <div class="userList" v-else>
      <h1>USERS</h1>
      <div class="users" v-for="user in users" v-bind:key="user.id">
        <h5 v-on:click="editToggle(user)" class="user">{{user.name}}</h5>
      </div>
      <button class="add" v-on:click="addUser = true">Add</button>
      <button class="back" v-on:click="$emit('back')">Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'users',
  props: ['user'],
  created () {
    let vue = this
    vue.populateUsers()
  },
  data () {
    return {
      addUser: false,
      viewUser: false,
      editUser: false,
      deleteUserModal: false,
      users: [],
      activeUser: {
        id: '',
        email: '',
        password: '',
        name: '',
        admin: false,
        employee: false
      }
    }
  },
  methods: {
    populateUsers () {
      let vue = this
      axios.get('https://api.screenartstudios.com/users/all/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.users = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteUser () {
      let vue = this
      axios.delete('https://api.screenartstudios.com/users/' + vue.activeUser.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.deleteUserModal = false
          vue.viewUser = false
          vue.populateUsers()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    userSubmit () {
      let vue = this
      axios.post('https://api.screenartstudios.com/users', {
        email: vue.activeUser.email,
        password: vue.activeUser.password,
        name: vue.activeUser.name,
        admin: vue.activeUser.admin,
        employee: vue.activeUser.employee
      })
        .then(function () {
          vue.addUser = false
          vue.buttons = true
          vue.populateUsers()
        })
        .catch(function (error) {
          console.log(error)
        })
      vue.clearUsers()
      vue.populateUsers()
    },
    clearUsers () {
      let vue = this
      vue.activeUser = []
    },
    editToggle (user) {
      let vue = this
      vue.activeUser.id = user._id
      vue.activeUser.email = user.email
      vue.activeUser.name = user.name
      vue.activeUser.admin = user.admin
      vue.activeUser.employee = user.employee
      vue.viewUser = true
    },
    addButton () {
      let vue = this
      vue.addUser = false
      vue.populateUsers()
    },
    userEdit () {
      let vue = this
      axios.put('https://api.screenartstudios.com/users/' + vue.activeUser.id, {
        email: vue.activeUser.email,
        name: vue.activeUser.name,
        employee: vue.activeUser.employee.toString(),
        admin: vue.activeUser.admin.toString()
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (user) {
          vue.activeUser.email = user.data.email
          vue.activeUser.name = user.data.name
          vue.activeUser.employee = user.data.employee
          vue.activeUser.admin = user.data.admin
          vue.populateUsers()
          vue.editUser = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

  .main {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    box-shadow: none;
    margin-top: 0;
    color: #fff;
  }

  .userList {
    margin: 0;
    grid-column-start: 1;
    grid-column-end: 3;
    width: 100%;
    display: grid;
    grid-template-columns: .4fr 1fr .4fr;
    grid-template-rows: repeat(10, 50px);
  }

  h1 {
    grid-column: 2;
    font-family: @base-font;
    font-weight: lighter;
    width: 120%;
    font-size: 2em;
    color: #fff;
    text-shadow: 2px 2px 3px black;
    text-align: center;
    line-height: 2em;
    text-decoration: underline;
    margin:auto;
  }

  .users {
    grid-column: 2;
    text-align: center;
    margin: auto;
    padding-left: 20px;
  }

  h5 {
    font-family: @base-font;
    font-weight: lighter;
    font-size: 1.4em;
    color: #fff;
    text-shadow: 2px 2px 3px black;
    text-align: left;
    line-height: 1.2em;
    margin: 0;
  }

  button {
    grid-column: 2;
    font-family: @base-font;
    height: 40px;
    width: 120%;
    background-color: transparent;
    color: #fff;
    box-shadow: 2px 2px 4px #000;
    margin-top: 12px;
    font-size: 1.4em;
  }
</style>

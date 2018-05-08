<template>
  <div class="main">
    <transition name="fade">
      <div class="leadbox" v-if="leadbox">
        <input type="text" class="search" placeholder="Search Leads" v-model="searchBox">
        <button type="submit" class="searchButton" v-on:click="search">SEARCH</button>
        <h4>LEADS</h4>
        <div class="leadList" v-on:click="displayLead" v-for="lead in leads" v-bind:key="lead.id">
          <h5 v-on:click="leadItemDisplay(lead)" class="lead">{{lead.name}}:{{lead.status}}</h5>
        </div>
        <button class="newLead" v-on:click="newLeadButton">NEW LEAD</button>
        <button class="nextPage" v-on:click="changePage(false)" v-if="nextPage">Next Page</button>
        <button class="previousPage" v-on:click="changePage(true)" v-if="previousPage">Previous Page</button>
        <button class="back" v-on:click="$router.push('/crm')">BACK</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="leadItem" v-if="leaditem">
        <p class="name">{{activeLead.name}}</p>
        <p class="phone">{{activeLead.phone}}</p>
        <p class="email">{{activeLead.email}}</p>
        <p class="status">{{activeLead.status}}</p>
        <p class="address">{{activeLead.address}}</p>
        <p class="comment">{{activeLead.comment}}</p>
        <p class="url">{{activeLead.url}}</p>
        <button class="editButton" v-on:click="edit = true; lead = false; leaditem = false;">Edit</button>
        <button class="delete" v-on:click="deleteLead">Delete</button>
        <button class="back" v-on:click="leaditem = false; leadbox = true">Back</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="edit" v-if="edit">
        <input type="text" class="clientNameEdit" v-model="activeLead.name" placeholder="Name" required>
        <input type="tel" class="phoneEdit" v-model="activeLead.phone" placeholder="Phone Number" required><br/>
        <input type="text" class="emailEdit" v-model="activeLead.email" placeholder="Email Address" required>
        <input type="text" class="addressEdit" v-model="activeLead.address" placeholder="Address" required>
        <select class="statusEdit" v-model="activeLead.status">
          <option value="notContacted">NOT CONTACTED</option>
          <option value="contacted">CONTACTED</option>
          <option value="jobInProgress">IN PROGRESS</option>
          <option value="jobFinished">FINISHED</option>
          <option value="noreply">CONTACTED US/ Noreply</option>
        </select>
        <input type="text" class="notesEdit" v-model="activeLead.comment" placeholder="Notes">
        <button class="cancel" v-on:click="cancelEdit">CANCEL</button>
        <button class="submitEdit" v-on:click="submitEdit">SUBMIT</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="newLead" v-if="newLead">
        <input type="text" class="nameNew" v-model="activeLead.name" placeholder="Name" required>
        <input type="tel" class="phoneNew" v-model="activeLead.phone" placeholder="Phone Number" required><br/>
        <input type="text" class="emailNew" v-model="activeLead.email" placeholder="Email Address" required>
        <input type="text" class="addressNew" v-model="activeLead.address" placeholder="Address" required>
        <select class="statusNew" v-model="activeLead.status">
          <option value="notContacted">NOT CONTACTED</option>
          <option value="contacted">CONTACTED</option>
          <option value="jobInProgress">IN PROGRESS</option>
          <option value="jobFinished">FINISHED</option>
          <option value="noreply">CONTACTED US/ Noreply</option>
        </select>
        <input type="text" class="commentNew" v-model="activeLead.comment" placeholder="Notes">
        <button class="cancel" v-on:click="cancel">Cancel</button>
        <button class="submitLead" v-on:click="submitLead">Submit</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'leads',
  props: ['user', 'loggedIn', 'leadId'],
  created () {
    let vue = this
    if (vue.loggedIn === false || vue.user.employee === false) {
      vue.$router.push('/login')
    } else {
      vue.clearLeads()
      this.populateLeads()
    }
    if (vue.leadId !== '') {
      axios.get('https://api.screenartstudios.com/leads/id/' + vue.leadId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.activeLead.name = response.data[0].name
          vue.activeLead.phone = response.data[0].phone
          vue.activeLead.email = response.data[0].email
          vue.activeLead.url = response.data[0].url
          vue.activeLead.address = response.data[0].address
          vue.activeLead.status = response.data[0].status
          vue.activeLead.comment = response.data[0].comment
          vue.activeLead.id = response.data[0]._id
          vue.leadbox = false
          vue.leaditem = true
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  data: function () {
    return {
      activeLead: {
        name: '',
        phone: '',
        email: '',
        url: '',
        address: '',
        status: '',
        comment: '',
        id: ''
      },
      leads: [{}],
      page: 1,
      nextPage: false,
      previousPage: false,
      error: '',
      tabSelected: 0,
      leadbox: true,
      newLead: false,
      edit: false,
      searchBox: '',
      newleadButton: false,
      leaditem: false,
      postlead: false
    }
  },
  computed: {
  },
  methods: {
    populateLeads () {
      let vue = this
      axios.get('https://api.screenartstudios.com/leads/' + vue.page, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.leads = response.data
          if (vue.leads.length === 8) {
            vue.nextPage = true
          } else {
            vue.nextPage = false
          }
          if (vue.page > 1) {
            vue.previousPage = true
          } else {
            vue.previousPage = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clearLeads () {
      this.leads = [{}]
    },
    clearActiveLeads () {
      this.activeLead.name = ''
      this.activeLead.phone = ''
      this.activeLead.email = ''
      this.activeLead.address = ''
      this.activeLead.status = ''
      this.activeLead.comment = ''
      this.activeLead.url = ''
      this.activeLead.id = ''
    },
    changePage (direction) {
      let vue = this
      if (direction === true) {
        vue.page--
      } else {
        vue.page++
      }
      vue.search()
    },
    leadItemDisplay (lead) {
      let vue = this
      vue.leaditem = true
      vue.activeLead.id = lead._id
      vue.activeLead.name = lead.name
      vue.activeLead.phone = lead.phone
      vue.activeLead.email = lead.email
      vue.activeLead.address = lead.address
      vue.activeLead.status = lead.status
      vue.activeLead.comment = lead.comment
      vue.activeLead.url = lead.url
    },
    submitLead () {
      let vue = this
      axios.post('https://api.screenartstudios.com/leads', {
        name: vue.activeLead.name.toLowerCase(),
        phone: vue.activeLead.phone,
        email: vue.activeLead.email,
        address: vue.activeLead.address,
        status: vue.activeLead.status,
        comment: vue.activeLead.comment,
        url: vue.activeLead.url
      })
        .then(function () {
          vue.edit = false
          vue.leadbox = true
          vue.newLead = false
          vue.clearActiveLeads()
          vue.clearLeads()
          vue.populateLeads()
        })
        .catch(function (error) {
          console.log(error)
        })
      vue.clearLeads()
      this.populateLeads()
    },
    submitEdit () {
      let vue = this
      axios.put('https://api.screenartstudios.com/leads/' + vue.activeLead.id, {
        name: vue.activeLead.name.toLowerCase(),
        phone: vue.activeLead.phone,
        email: vue.activeLead.email,
        address: vue.activeLead.address,
        status: vue.activeLead.status,
        comment: vue.activeLead.comment,
        url: vue.activeLead.url
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function () {
          vue.edit = false
          vue.leadbox = true
          vue.clearLeads()
          vue.clearActiveLeads()
          vue.populateLeads()
        })
        .catch(function (error) {
          console.log(error)
        })
      vue.clearLeads()
      this.populateLeads()
    },
    deleteLead () {
      let vue = this
      axios.delete('https://api.screenartstudios.com/leads/' + vue.activeLead.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function () {
          vue.edit = false
          vue.leadbox = true
          vue.leaditem = false
          vue.clearLeads()
          vue.clearActiveLeads()
          vue.populateLeads()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    cancel () {
      let vue = this
      vue.newLead = false
      vue.leadbox = true
      vue.clearLeads()
      this.populateLeads()
    },
    cancelEdit () {
      let vue = this
      vue.edit = false
      vue.leaditem = true
    },
    newLeadButton () {
      let vue = this
      vue.clearLeads()
      vue.clearActiveLeads()
      vue.leadbox = false
      vue.newLead = true
    },
    displayLead () {
      let vue = this
      vue.leadItem = true
      vue.leadbox = false
    },
    search () {
      let vue = this
      if (vue.searchBox === '') {
        vue.clearLeads()
        vue.clearActiveLeads()
        vue.populateLeads()
      } else {
        axios.get('https://api.screenartstudios.com/leads/name/' + vue.searchBox + '/' + vue.page, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (response) {
            vue.clearLeads()
            vue.clearActiveLeads()
            vue.leads = response.data
            if (vue.leads.length === 8) {
              vue.nextPage = true
            } else {
              vue.nextPage = false
            }
            if (vue.page > 1) {
              vue.previousPage = true
            } else {
              vue.previousPage = false
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped lang='less'>
@base-font:'Pathway Gothic One', sans-serif;
.main {
  margin-top: 145px;
  width: 96%;
  margin-left: 5px;
  height: 68%;
  z-index: 10;
  position: fixed;
  background:rgba(0,0,0,0.6);
  border-radius: 12px;
  box-shadow: 2px 2px 4px #000;
}

.leadBox {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(12, 50px);
}

.back {
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

h4 {
  font-size: 2em;
  line-height: 0px;
  text-decoration: underline;
  color: #fff;
  font-family: @base-font;
}

.lead {
  color: #fff;
  font-family: @base-font;
}

.lead:hover {
  color: #c0a0dd;
}

.leadlist {
}

.leadItem {

}

.name {
  color: #fff;
}

.title {

}

.phone {
  color: #fff;
}

.email {
  color: #fff;
}

.address {
  color: #fff;
}

.status {
  color: #fff;
}

.comment {
  color: #fff;
}

.url {
  color: #fff;
}

.newLead {
}

.editButton {
}

.edit {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(12, 50px);
}

.leadEdit {
}

.clientNameEdit {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 2;
}

.primaryContactEdit {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 2;
}

.phoneEdit {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 2;
}

.emailEdit {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 3;
}

.addressEdit {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 4;
}

.leadStatusEdit {

}

.notesEdit {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 7;
}

.statusEdit {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 3;
}

.submitEdit {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 7;
}

.submitLeads {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 7;
}

.cancel {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 7;
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:focus::-webkit-input-placeholder, textarea:focus::-webkit-input-placeholder {
  color: #fff;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:focus::-moz-placeholder, textarea:focus::-moz-placeholder {
  color: #fff;
}

input::placeholder, textarea::placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:focus::placeholder, textarea::focus:placeholder {
  color: #fff;
}

input::-ms-placeholder, textarea::-ms-placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:focus::-ms-placeholder, textarea:focus::-ms-placeholder {
  color: #fff;
}

/* on hover placeholder */

input:hover::-webkit-input-placeholder, textarea:hover::-webkit-input-placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:hover:focus::-webkit-input-placeholder, textarea:hover:focus::-webkit-input-placeholder {
  color: #fff;
}

input:hover::-moz-placeholder, textarea:hover::-moz-placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:hover:focus::-moz-placeholder, textarea:hover:focus::-moz-placeholder {
  color: #cbc6c1;
}

input:hover::placeholder, textarea:hover::placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:hover:focus::placeholder, textarea:hover:focus::placeholder {
  color: #fff;
}

input:hover::placeholder, textarea:hover::placeholder {
  color: #fff;
  font-size: 0.875em;
}

input:hover:focus::-ms-placeholder, textarea:hover::focus:-ms-placeholder {
  color: #fff;
}

#form {
  position: relative;
  width: 500px;
  margin: 50px auto 100px auto;
}

input {
  font-size: 1.5em;
  font-family: @base-font;
  background: transparent;
  outline: none;
  color: #fff;
  border: solid 1px #fff;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
}

input:hover {
  background: #fff;
  color: #5d5d5d;
}

textarea {
  width: 470px;
  max-width: 470px;
  height: 110px;
  max-height: 110px;
  padding: 15px;
  background: transparent;
  outline: none;
  color: #726659;
  font-family: @base-font;
  font-size: 0.875em;
  border: solid 1px #999;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
}

textarea:hover {
  background: #999;
  color: #fff;
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

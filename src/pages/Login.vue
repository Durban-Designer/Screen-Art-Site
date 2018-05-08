<template>
  <div class="main">
    <h1>LOG IN</h1>
    <div class="loginBox">
      <input class="email" placeholder="EMAIL" v-model="email"/>
      <input class="password" placeholder="PASSWORD" v-model="password" type="password" v-on:keypress.enter="login"/>
      <h3 class="logged">Stay logged in?<input type="checkbox" v-model="stayLogged"/></h3>
      <button class="login" v-on:click="login">GO</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: '',
      stayLogged: false,
      user: {
        token: '',
        id: '',
        admin: false,
        employee: false
      }
    }
  },
  computed: {
    wrongInput: function () {
      return {
        hidden: this.wrong === false,
        wrongInput: this.wrong === true
      }
    }
  },
  methods: {
    login () {
      let vue = this
      axios.post('https://api.screenartstudios.com/users/login', {
        email: vue.email.toLowerCase(),
        password: vue.password
      })
        .then(response => {
          if (response.status !== 401) {
            vue.user.token = response.data.token
            vue.user.id = response.data.userId
            vue.user.admin = response.data.admin
            vue.user.employee = response.data.employee
            if (vue.stayLogged === true) {
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('userId', response.data.userId)
              localStorage.setItem('admin', response.data.admin)
              localStorage.setItem('employee', response.data.employee)
            } else {
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              localStorage.removeItem('admin')
              localStorage.removeItem('employee')
            }
            vue.$emit('login', vue.user)
          }
        })
        .catch(response => {
          console.log(response)
          this.wrong = true
        })
    },
    togglePass () {
    }
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

.main {
  margin-top: 145px;
  margin-left: 2%;
  width: 96%;
  height: 68%;
  z-index: 10;
  position: fixed;
  background:rgba(0,0,0,0.6);
  border-radius: 12px;
  box-shadow: 2px 2px 4px #000;
}

h1 {
  font-family: @base-font;
  font-weight: lighter;
  font-size: 3em;
  color: #fff;
  text-shadow: 2px 2px 3px black;
  text-align: center;
  line-height: 100px;
}

.loginBox {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
}

.email {
  margin-bottom: 10px;
  grid-column: 2;
  background: transparent;
  outline: none;
  color: #fff;
  font-family: @base-font;
  font-size: 1.5em;
  border: solid 1px #fff;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
}

.password {
  margin-bottom: 10px;
  grid-column: 2;
  background: transparent;
  outline: none;
  color: #fff;
  font-family: @base-font;
  font-size: 1.5em;
  border: solid 1.5px #fff;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
}

.logged {
  grid-column: 2;
  text-align: center;
  color: #fff;
  font-size: 1.5em;

}

.logged input {
  width: 30px;
  height: 20px;

}

.login {
  grid-column: 2;
  text-align: center;
  background-color: transparent;
  height: 30px;
  color: #fff;
  border: solid 1px #fff;
  font-family: @base-font;
  font-size: 1.5em;
  line-height: 30px;
}

.login:hover {
  color: #000;
  background-color: #fff;
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
  font-size: 1em;
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
  font-family: 'Lato', sans-serif;
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

@media only screen and (min-width:750px) {
  .main {
    margin-top: 13%;
  }
}
</style>

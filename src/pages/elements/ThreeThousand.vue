<template>
  <div class="main">
    <h1 class="title">Hammurabi 3000</h1>
    <transition name="fade">
      <div class="report" v-if="report">
        <strong>Overlord Hammurabi</strong>! I beg to report to you,
        <span v-if="plague">An enemy incursion has swept over your demense! <strong><span class="plagueNumber">{{this.plague}}</span> Citizens have perished!!</strong></span>
        In the <strong>Year <span class="year">{{this.year}}</span></strong>:<br/>
        <strong><span class="starved">{{this.starved}}</span></strong> civilians starved.<br/>
        <strong><span class="immigrants">{{this.immigrants}}</span></strong> civilians came to the city.<br/>
        You harvested {{this.harvest}} rations at a rate of {{this.bushelsPerAcre}} rations per quadrant.
        Space crabs ate <strong><span class="spaceCrabs">{{this.rats}}</span></strong> rations.<br/>
        <button class="nextButton" v-on:click="next">Next</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="resource" v-if="resource">
        <div class="population">Population: {{this.population}}</div>
        <div class="land">Land: {{this.activeLand}}</div>
        <div class="rations">Rations: {{this.activeStore}}</div>
        <div class="landTrade">Landtrade: {{this.landRate}}</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="input" v-if="input">
        <span class="question">How many quadrants do you wish to appropriate?</span><br/>
        <input v-model="inputs.landBuy" placeholder="enter negative to barter" class="landBuy" rows="1" cols="25" type="number"></input><br/>
        <span class="question">How many rations do you wish to feed your citizens?</span><br/>
        <input v-model="inputs.bushelFeed" placeholder="each citizen needs 20/year" class="food" rows="1" cols="25" type="number"></input><br/>
        <span class="question">How many quadrants do you wish to inseminate?</span><br/>
        <input v-model="inputs.planted" placeholder="quadrant = 1ration" class="plant" rows="1" cols="25" type="number"></input>
        <button class="new" v-on:click="$emit('newGame'); activeStore=2800; activeLand=1000; backReport()">New Game</button>
        <button class="quit" v-on:click="$router.push('/')">Quit Game</button>
      </div>
    </transition>
    <button class="makeIt" v-bind:class="makeItSoLogic" v-if="makeItSo" v-on:click="turnChange">Make It So!</button>
    <div  v-bind:class="makeItSoHide">Not Allowed</div>
    <button class="reportButton" v-if="input" v-on:click="backReport">Report</button>
  </div>
</template>

<script>
export default {
  name: 'threethousand',
  props: [ 'year', 'starved', 'immigrants', 'population', 'land', 'harvest', 'bushelsPerAcre', 'rats', 'store', 'landRate' ],
  created () {
    let vue = this
    this.totalCost = (this.store - parseInt(this.inputs.bushelFeed) - parseInt(this.inputs.planted) - (parseInt(this.inputs.landBuy) * this.landRate))
    this.plantRule = ((parseInt(this.inputs.planted) / 10) - this.population)
    this.totalLand = (this.land + parseInt(vue.inputs.landBuy))
    this.plantable = (this.activeLand - parseInt(this.inputs.planted))
    document.addEventListener('keyup', function () {
      vue.totalCost = (vue.store - parseInt(vue.inputs.bushelFeed) - parseInt(vue.inputs.planted) - (parseInt(vue.inputs.landBuy) * vue.landRate))
      vue.plantRule = ((parseInt(vue.inputs.planted) / 10) - vue.population)
      vue.totalLand = (vue.land + parseInt(vue.inputs.landBuy))
      vue.plantable = (vue.activeLand - parseInt(vue.inputs.planted))
      vue.activeStore = (vue.store - parseInt(vue.inputs.bushelFeed) - parseInt(vue.inputs.planted) - (parseInt(vue.inputs.landBuy) * vue.landRate))
      vue.activeLand = (vue.land + parseInt(vue.inputs.landBuy))
    })
  },
  data () {
    return {
      plague: 0,
      report: true,
      resource: false,
      input: false,
      makeItSo: false,
      saveMenu: false,
      saveQuestion: true,
      activeStore: 2800,
      activeLand: 1000,
      totalCost: 0,
      plantRule: 0,
      totalLand: 0,
      plantable: 0,
      name: '',
      inputs: {
        landBuy: 0,
        bushelFeed: 0,
        planted: 0
      }
    }
  },
  computed: {
    makeItSoLogic: function () {
      return {
        allowed: (this.totalCost >= 0) && (this.plantRule <= 0) && (this.totalLand >= 0) && (this.plantable >= 0),
        hidden: (this.totalCost < 0) || (this.plantRule > 0) || (this.totalLand <= 0) || (this.plantable < 0) || (this.inputs.landBuy === '-') || (this.inputs.planted === '-') || (this.inputs.bushelFeed === '-') || ((this.inputs.landBuy === '') || (this.inputs.planted === '') || (this.inputs.bushelFeed === ''))
      }
    },
    makeItSoHide: function () {
      return {
        notAllowed: (this.totalCost < 0) || (this.plantRule > 0) || (this.totalLand <= 0) || (this.plantable < 0) || (this.inputs.landBuy === '-') || (this.inputs.planted === '-') || (this.inputs.bushelFeed === '-') || ((this.inputs.landBuy === '') || (this.inputs.planted === '') || (this.inputs.bushelFeed === '')),
        hidden: ((this.totalCost >= 0) && (this.plantRule <= 0) && (this.totalLand >= 0) && (this.plantable >= 0))
      }
    }
  },
  methods: {
    next: function () {
      this.report = false
      this.resource = true
      this.input = true
      this.makeItSo = true
      this.seeReport = true
      this.activeStore = this.store
      this.activeLand = this.land
      this.inputs.landBuy = 0
      this.inputs.bushelFeed = 0
      this.inputs.planted = 0
    },
    turnChange: function () {
      this.$emit('turnChange', this.inputs)
      this.report = true
      this.resource = false
      this.input = false
      this.makeItSo = false
      this.seeReport = false
    },
    saveMenuToggle: function () {
      this.saveMenu = !this.saveMenu
      this.report = false
      this.resource = false
      this.input = false
      this.makeItSo = false
      this.quit = false
      this.seeReport = false
    },
    saveQuestionToggle: function () {
      this.saveQuestion = !this.saveQuestion
    },
    saveGame: function () {
      this.$emit('saveGame', this.name)
    },
    quitGame: function () {
      this.$router.push('/')
    },
    backReport: function () {
      this.report = true
      this.resource = false
      this.input = false
      this.makeItSo = false
    }
  }
}
</script>

<style scoped lang="less">
@primary-color: #78138A;
@accent-color:#29005d;
@background-color:#000024;
@bold-font:'Bungee';
@light-font:'Aldrich', sans-serif;

.main {
  z-index: 5;
  margin-top: 100px;
}

.title {
  text-align: center;
  color: #fff;
  font-size: 2.4em;
  font-family: @bold-font;
  text-shadow: 2px 2px 1px #78138A;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .16s;
}

.fade-enter-active {
  transition-delay: .16s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.switch-enter-active, .switch-leave-active {
  transition-property: opacity;
  transition-duration: .16s;
}

.switch-enter-active {
  transition-delay: .16s;
}

.switch-enter, .switch-leave-to {
  opacity: 0;
}
.reportButton {
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  margin-left: 35px;
  height: 30px;
  width: 40%;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}
.makeIt {
  margin-left: 12px;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  height: 30px;
  width: 40%;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}
.report {
  margin-left: 10px;
  width: 300px;
  height: 200px;
  color: #fff;
  font-size: 1em;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  position: relative;
  text-align: center;
  border-style: solid;
  border-radius: 8px;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  font-family: @light-font;
  text-shadow: 2px 2px 1px #78138A;

}
.nextButton {
  font-family: @bold-font;
  background-color: transparent;
  color: #fff;
  margin-top: 15px;
  border-style: solid;
  font-size: 1.2em;
  width: 40%;
  text-shadow: 2px 2px 1px #78138A;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
}
.resource {
  display: grid;
  grid-template-columns: 30px 1fr 1fr 1fr 30px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  border: 2px solid;
  margin-left: 10px;
  margin-right: 10px;
  color: #fff;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}

.population {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;

}

.land {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 2;
}
.landBuy {
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
}
.rations {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
}
.food {
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
}
.plant {
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
border: 2px solid #fff;
background-color: transparent;
color: #fff;
}
.landTrade {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
}

.input {
 border: 2px solid #fff;
 margin-bottom: 10px;
 margin-left: 10px;
 margin-right: 10px;
 padding-bottom: 5px;
 -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
 text-shadow: 2px 2px 1px #78138A;
}

.quit {
  margin-top: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 200px;
  width: 80%;
  height: 30px;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  margin-left: 35px;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}

.new {
  margin-top: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 240px;
  width: 80%;
  height: 30px;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  margin-left: 35px;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}

.question {
  margin-left: 10px;
  background-color: transparent;
  color: #fff;
  padding-left: 10px;
}
.saveQuestion {
  font-size: .7em;
}
.yesSave {
  width: 40%;
  position: absolute;
  left: 5%;
  top: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 1.6em;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;

}

.noSave {
  width: 40%;
  position: absolute;
  right: 5%;
  top: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 1.6em;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}

.saveName {
  margin-bottom: 30px;
  text-align: center;
  width: 80%;
  height: 1.8em;
  font-size: 1.4em;
  margin-left: 10%;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}

.saveGame {
  text-align: center;
  width: 80%;
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
  font-size: 1.4em;
  margin-left: 10%;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
  text-shadow: 2px 2px 1px #78138A;
}
</style>

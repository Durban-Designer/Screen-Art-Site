<template>
  <div class="main">
    <threethousand v-if="!victory" v-on:turnChange="turnChange" v-on:newGame="newGame" :year="gameData.year" :starved="gameData.starved" :immigrants="gameData.immigrants" :population="gameData.population" :land="gameData.land" :harvest="gameData.harvest" :bushelsPerAcre="gameData.bushelsPerAcre" :rats="gameData.rats" :store="gameData.store" :landRate="gameData.landRate"></threethousand>
    <div v-if="victory">
      You win!!
    </div>
  </div>
</template>

<script>
import ThreeThousand from './elements/ThreeThousand'
export default {
  name: 'hammurabi',
  components: {
    'threethousand': ThreeThousand
  },
  data () {
    return {
      difficulty: 'easy',
      victory: false,
      defeat: false,
      maxStarved: 50,
      plagueProbDenom: 20,
      plagueProbNum: 17,
      plagueLoss: 0.33,
      maxImmigrants: 10,
      landRateMin: 17,
      landRateRange: 9,
      maxBushelsPerAcre: 8,
      minBushelsPerAcre: 2,
      popFeed: 20,
      ratsMaxTake: 0.2,
      winYear: 10,
      gameData: {
        year: 1,
        starved: 0,
        starvedTotal: 0,
        immigrants: 5,
        population: 100,
        land: 1000,
        bushelsPerAcre: 3,
        rats: 200,
        harvest: 2000,
        store: 2800,
        landRate: 26,
        plague: false,
        classicMode: false,
        gameDifficulty: 'easy',
        name: '',
        time: ''
      }
    }
  },
  methods: {
    turnChange: function (inputs) {
      this.gameData.year++
      if (Math.floor(Math.random() * this.plagueProbDenom) >= this.plagueProbNum) {
        this.gameData.plague = true
        this.gameData.population = this.gameData.population - (this.gameData.population * Math.floor(Math.random() * this.plagueLoss))
      }
      else {
        this.gameData.plague = false
      }
      if (inputs.bushelFeed / this.popFeed >= this.gameData.population) {
        this.gameData.starved = 0
        this.gameData.store = this.gameData.store - inputs.bushelFeed
      }
      else {
        this.gameData.starved = this.gameData.population - (inputs.bushelFeed / this.popFeed)
        this.gameData.starvedTotal = this.gameData.starvedTotal + this.gameData.starved
        if (this.gameData.starvedTotal >= this.maxStarved) {
          this.defeat = true
        }
        this.gameData.population = this.gameData.population - this.gameData.starved
        this.gameData.store = this.gameData.store - inputs.bushelFeed
      }
      this.gameData.immigrants = Math.floor(Math.random() * this.maxImmigrants)
      this.gameData.population = this.gameData.population + this.gameData.immigrants
      if (inputs.landBuy !== 0) {
        this.gameData.land = parseInt(this.gameData.land) + parseInt(inputs.landBuy)
      }
      this.gameData.landRate = Math.floor(Math.random() * this.landRateRange) + this.landRateMin
      this.gameData.bushelsPerAcre = (Math.floor(Math.random() * this.maxBushelsPerAcre) + this.minBushelsPerAcre)
      this.gameData.harvest = inputs.planted * this.gameData.bushelsPerAcre
      this.gameData.store = this.gameData.store + this.gameData.harvest - inputs.planted
      this.gameData.rats = Math.floor((Math.random() * this.ratsMaxTake) * this.gameData.store)
      this.gameData.store = this.gameData.store - this.gameData.rats
      if (this.gameData.year >= this.winYear) {
        this.victory = true
      }
    },
    newGame () {
      let vue = this
      vue.gameData.year = 1
      vue.gameData.starved = 0
      vue.gameData.starvedTotal = 0
      vue.gameData.immigrants = 5
      vue.gameData.population = 100
      vue.gameData.land = 1000
      vue.gameData.bushelsPerAcre = 3
      vue.gameData.rats = 200
      vue.gameData.harvest = 2000
      vue.gameData.store = 2800
      vue.gameData.landRate = 26
      vue.gameData.plague = false
    }
  }
}
</script>

<style scoped lang="less">
.main {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 20px;
  width: 96%;
  height: 68%;
  z-index: 10;
  position: fixed;
  background:rgba(0,0,0,0.6);
  border-radius: 12px;
  box-shadow: 2px 2px 4px #000;
}
</style>

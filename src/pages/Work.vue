<template>
  <div class="main">
    <div class="totalResponseModal modal" v-if="modal==='tr'">
      <h1>Total Response</h1>
      <p>
        Total Response aims to revolutionize Emergency Response by providing
        relevant authorities with the users location, Medical Information,
        and Emergency Type. Whereas currently 911 only gets the nearest cell
        phone tower Total Response will provide an accuracy of within meters,
        this greatly improves the users survivability in an emergency situation. Available
        on iOS and Android marketplaces Summer 2018.
      </p>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="quickVenomModal modal" v-else-if="modal==='qc'">
      <h1>Quick Venom</h1>
      <p>
        Quick Venom is a Blog run by the founders of Screen Art Studios and the name of our Web Stack.
        Quick Venom enable us to develop Hybrid Web applications, websites,
        and Desktop Apps all from the same code base.
        We built this blog in order to educate other
        developers on the stack and to give back to the community by
        assisting in the development of its core technologies.
      </p>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="timeCrunchModal modal" v-else-if="modal==='tc'">
      <h1>Time Crunch</h1>
      <p>
        TimeCrunch is a mobile app service for companies that want a simple and economic system for Clocking employee time and mileage tracking. Functional and helpful for administators and
        easy to use for employees, TimeCrunch is an asset for any companies toolkit.
      </p>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="hammurabiGameModal modal" v-else-if="modal==='hm'">
      <h1>Hammurabi 3000</h1>
      <p>
        Hammurabi 3000 is our remake of the classic Hammurabi Game, reimagined in a dystopian future you Overlord Hammurabi have been
        ressurected to manage the Galactic Dominion! With more strategy, more rations, and a whole load of space crabs Hammurabi 3000 is
        an addictive turn based strategy game coming to mobile app stores early 2018.
      </p>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="tiles" v-else>
      <div class="work"><h1>Work</h1></div>
      <div class="totalResponse clickMe" v-on:click="modal='tr'"></div>
      <div class="quickVenom clickMe" v-on:click="modal='qc'"></div>
      <div class="timeCrunch clickMe" v-on:click="modal='tc'"></div>
      <div class="hammurabiGame clickMe" v-on:click="modal='hm'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Work',
  data () {
    return {
      modal: ''
    }
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

  .main {
    margin-left: 3%;
    margin-top: 145px;
    width: 95%;
    height: 68%;
    z-index: 4;
    color: #fff;
    position: fixed;
    background:rgba(0,0,0,0.6);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
  }

  .work {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  h1 {
    font-family: @base-font;
    font-weight: lighter;
    font-size: 2.5em;
    color: #fff;
    text-shadow: 2px 4px 3px black;
    text-align: center;
    line-height: 100px;
    margin: 0;
  }

  button {
    background: transparent;
    color: #fff;
    border-color: #fff;
    font-size: 1.5em;
    margin-left: 5%;
    width: 90%;
  }

  .modal {
    display: grid;
    grid-template-rows: 90px repeat(4, 80px);
  }

  .modal h1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
  }

  p {
    grid-row-start: 2;
    grid-column: 2;
    font-family: @base-font;
    color: white;
    line-height: 1.1em;
    font-size: 1.1em;
    width: 100%;
    text-align: left;
    margin-right: 10px;
  }

  .back {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 5;
    height: 40px;
  }

  .tiles {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 100px);
    text-align: center;
    margin-top: 20px;
  }

  span {
    color: #c22227;
    font-weight: bold;
  }

  .totalResponse {
    background-position: center;
    background-image: url('../assets/totalResponse.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: auto;
    z-index: 10;
    grid-column: 1;
    grid-row: 2;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
  }

  .quickVenom {
    background-position: center;
    background-image: url('../assets/qwc-venumm.svg');
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    z-index: 10;
    background-size: contain;
    grid-row: 2;
    grid-column: 2;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
  }

  .timeCrunch {
    background-position: center;
    background-image: url('../assets/TClogoWhite.svg');
    background-repeat:no-repeat;
    background-size: contain;
    width: 100%;
    height: auto;
    grid-row: 3;
    grid-column: 1;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
  }

  .hammurabiGame {
    background-position: center;
    background-image: url('../assets/Hammurabi3000.svg');
    background-repeat:no-repeat;
    background-size:contain;
    width: 100%;
    height: 100%;
    grid-row: 3;
    grid-column: 2;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
  }

  @media only screen and (min-width:700px) {

    .tiles {
      text-align: center;
      width: 100%;
      display: grid;
      grid-template-rows: repeat(5, 80px);
    }

    .work {
      grid-row: 1;
      margin-top: -30px;
    }

    .totalResponse {
      grid-row: 2;
    }

    .quickVenom {
      grid-row: 3;
    }

    .timeCrunch {
      grid-row: 4;
    }

    .hammurabiGame {
      grid-row: 5;
    }

    .clickMe {
      background-color:rgba(0,0,0,0.4);
      border-radius: 6px;
      box-shadow: 2px 2px 4px #000;
      color: #fff;
    }
    .clickMe:hover {
      background-color: #999;
    }
  }
</style>

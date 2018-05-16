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
      <div class="TRpic"></div>
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
        easy to use for employees, TimeCrunch is an asset for any companies toolkit. For more info go to <a href="https://timecrunchapp.com/">Time Crunch Site</a>
      </p>
      <div class="TCpic"></div>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="mysticModal modal" v-else-if="modal==='ms'">
      <h1>Mystic CRM</h1>
      <p>
        Mystic is the perfect tool for running every aspect of your small business. From scheduling and customer relations management to marketing campaigns, Mystic empowers the small business owner.
      </p>
      <div class="MSpic"></div>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="blakeLSModal modal" v-else-if="modal==='bl'">
      <h1>Blake Late Show</h1>
      <p>
        Activist Ron Blake has been inspiring thousands of people around the country. Giving support and hope to victims of PTSD and sexual assault through his incredible story of survival and perseverance. Learn more here <a href="https://blakelateshow.com/">Blakelateshow.com</a>
      </p>
      <div class="BLpic"></div>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="tiles" v-else>
      <h1>Work</h1>
      <div class="totalResponse clickMe" v-on:click="modal='tr'"></div>
      <div class="quickVenom clickMe" v-on:click="modal='qc'"></div>
      <div class="timeCrunch clickMe" v-on:click="modal='tc'"></div>
      <div class="mystic clickMe" v-on:click="modal='ms'"></div>
      <div class="blakeLS clickMe" v-on:click="modal='bl'">Blake Late Show</div>
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
    padding-top: 140px;
    width: 100%;
    height: 100%;
    z-index: 1;
    color: #fff;
    position: fixed;
    background:rgba(0,0,0,0.6);
    box-shadow: 2px 2px 4px #000;
    overflow-y: scroll;
  }

  h1 {
    font-family: @base-font;
    font-weight: lighter;
    font-size: 3em;
    color: #fff;
    text-shadow: 2px 4px 3px black;
    text-align: center;
    line-height: 100px;
    margin: 0;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 9;
  }

  button {
    background: transparent;
    color: #fff;
    border-color: #fff;
    font-size: 1.5em;
    width: 100%;
  }

  .modal {
    display: grid;
    grid-template-rows: repeat(20, 4em);
  }

  .modal h1 {
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row: 1;
  }

  p {
    grid-row-start: 3;
    grid-row-end: 6;
    grid-column-start: 1;
    grid-column-end: 9;
    font-family: @base-font;
    color: white;
    line-height: 1.1em;
    font-size: 1.5em;
    width: 90%;
    margin-left: 5%;
    text-align: left;
    margin-right: 5%;
  }

  .back {
    margin-left: 5%;
    margin-top: 1.5em;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
    height: 40px;
    align-self: center;
  }

  .tiles {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(18, 3.5em);
    grid-row-gap: 5px;
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
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 3;
    grid-row-end: 5;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
  }
  .TRpic {
    background-position: center;
    background-image: url('../assets/trapp.png');
    background-repeat: no-repeat;
    background-size: contain;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 8;
    grid-row-end: 17;
  }

  .quickVenom {
    background-position: center;
    background-image: url('../assets/qwc-venumm.svg');
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    z-index: 10;
    background-size: contain;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 9;
    grid-row-end: 11;
  }

  .timeCrunch {
    background-position: center;
    background-image: url('../assets/TClogoWhite.svg');
    background-repeat:no-repeat;
    background-size: contain;
    width: 100%;
    height: auto;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 5;
    grid-row-end: 7;
  }
  .TCpic {
    background-position: center;
    background-image: url('../assets/tcapp.png');
    background-repeat: no-repeat;
    background-size: contain;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 8;
    grid-row-end: 17;
  }
  .blakeLS {
    font-family: 'Mr Dafoe', cursive;
    font-size: 3em;
    line-height: 100px;
    width: 100%;
    height: auto;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 11;
    grid-row-end: 13;
  }
  .BLpic {
    background-position: center;
    background-image: url('../assets/blake.png');
    background-repeat: no-repeat;
    background-size: contain;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 7;
    grid-row-end: 17;
  }
  .mystic {
    background-position: center;
    background-image: url('../assets/Mystic.svg');
    background-repeat:no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.4);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 7;
    grid-row-end: 9;
  }
  .MSpic {
    background-position: center;
    background-image: url('../assets/mystic.png');
    background-repeat: no-repeat;
    background-size: contain;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 7;
    grid-row-end: 20;
  }

  @media only screen and (min-width:700px) {
    .main {
      z-index: 3;
    }
  }
</style>

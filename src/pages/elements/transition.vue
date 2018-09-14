 <template>
  <div class="main">
    <div class="slidebox">
      <transition name="slide"><div class="slide1" v-if="show === 0"></div></transition>
      <transition name="slide"><div class="slide2" v-if="show === 1"></div></transition>
      <transition name="slide"><div class="slide3" v-if="show === 2"></div></transition>
      <transition name="slide"><div class="slide4" v-if="show === 3"></div></transition>
      <transition name="slide"><div class="slide5" v-if="show === 4"></div></transition>
      <transition name="slide"><div class="slide6" v-if="show === 5"></div></transition>
    </div>
  </div>
</template>

<script>
let x = false
export default {
  name: 'navbar',
  created () {
    let vue = this
    function toggleShow () {
      if (vue.show === 0) {
        vue.show = 1
      } else if (vue.show === 1) {
        vue.show = 2
      } else if (vue.show === 2) {
        vue.show = 3
      } else if (vue.show === 3) {
        vue.show = 4
      } else if (vue.show === 4) {
        vue.show = 5
      } else if (vue.show === 5) {
        vue.show = 0
      }
    }
    setInterval(toggleShow, 4000)
  },
  data () {
    return {
      show: 0
    }
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

  .slidebox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 2;
    height: 135px;
  }

  .slide1 {
    background-image: url("../../assets/SeasonsMobile.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    width: 100%;
    height: 140px;
    margin: 0;
    padding: 0;
    top: 0;
    z-index: -6;
  }

  .slide2 {
    background-image: url("../../assets/birdsMobile.jpg");
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 140px;
    margin: 0;
    padding: 0;
    top: 0;
    z-index: -5;
  }

  .slide3 {
    background-image: url("../../assets/mountainsMobile.jpg");
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 140px;
    margin: 0;
    padding: 0;
    top: 0;
    z-index: -4;
  }
  .slide4 {
    background-image: url("../../assets/grateMobile.jpg");
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 140px;
    margin: 0;
    padding: 0;
    top: 0;
    z-index: -3;
  }

  .slide5 {
    background-image: url("../../assets/humansMobile.jpg");
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 140px;
    margin: 0;
    padding: 0;
    top: 0;
    z-index: -2;
  }
  .slide6 {
    background-image: url("../../assets/windowMobile.jpg");
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 140px;
    margin: 0;
    padding: 0;
    top: 0;
    z-index: -1;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .50s ease;
  }

  .slide-enter {
    transform: translateX(2000px);
    opacity: 0;
  }

  .slide-leave-to {
    transform: translateX(-2000px);
    opacity: 0;
  }
</style>

<template>
  <div class="Footer">
    <h1>ScreenArt Studios Copyright&#169;</h1>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

  .Footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5%;
    color: white;
    text-align: center;
    background:rgba(0,0,0,0.6);
    box-shadow: 2px 2px 4px #000;
  }

  h1 {
    bottom: 0;
    z-index: 13;
    position: absolute;
    font-family: @base-font;
    font-weight: lighter;
    font-size: 1.2em;
    color: #999;
    text-align: center;
    line-height: 0;
    right: 0;
    margin-bottom: 10px;
    margin-right: 12px;
    letter-spacing: 1px;
  }

  @media only screen and (max-width:750px) {
  }
</style>

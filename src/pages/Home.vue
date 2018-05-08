<template>
  <div class="main">
    <h1>SCREEN ART STUDIOS</h1>
    <h3 class="brand">Your <br/>Brand.</h3>
    <h3 class="passion"> Our <br/>Passion.</h3>
    <div class="boxr"></div>
    <div class="boxg"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
    }
  }
}
</script>

<style scoped lang='less'>
@base-font:'Pathway Gothic One', sans-serif;

.main {
  margin-top: 135px;
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 6em);
  position: fixed;
}

h1 {
  font-size: 4.5em;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1;
  text-align: left;
  font-family: @base-font;
  line-height: 100px;
  color: #fff;
}

h3 {
  font-size: 3.5em;
  grid-column-start: 3;
  grid-column-end: 5;
  text-align: right;
  font-family: @base-font;
  color: #c22227;
}

.brand {
  grid-row: 1;
  grid-column-start: 3;
  grid-column-end: 5;
  line-height: 50px;
}

.passion {
  grid-row: 3;
}

.boxr {
  margin-bottom: 20px;
  grid-row-start: 1;
  grid-row-end: 7;
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: #c22227;
  z-index: -1;
}

@media (min-width: 700px) {
  .main {
    margin-top: 2%;
    width: 100%;
    height: 600px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 6em);
    position: fixed;
  }

  h1 {
    margin-right: 20px;
    font-family: @base-font;
    font-size: 6em;
    color: #fff;
    text-shadow: 2px 5px 3px black;
    text-align: right;
    z-index: 12;
    grid-column-start: 2;
    grid-column-end: 7;
    grid-row: 2;
    letter-spacing: 2px;
  }

  h3 {
    line-height: 80px;
    margin-right: 20px;
    font-family: @base-font;
    font-weight: lighter;
    font-size: 4em;
    color: #fff;
    text-shadow: 2px 4px 3px black;
    text-align: right;

  }

  .brand {
    grid-column-start: 3;
    grid-column-end: 7;
    grid-row-start: 3;
    grid-row-end: 5;
    z-index: 12;
    line-height: 80px;
  }

  .passion {
    grid-column-start: 3;
    grid-column-end: 7;
    grid-row: 4;
    z-index: 12;
    margin-top: 90px;
  }

  .boxr {
    height: 67px;
    grid-column-start: 3;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: 3;
    background-color: #c22227;
    z-index: 10;
    margin-top: 41px;
    box-shadow: 2px 4px 3px black;
  }

  .boxg {
    grid-column-start: 6;
    grid-column-end: 7;
    grid-row-start: 3;
    grid-row-end: 8;
    width: 280px;
    height: 750px;
    background:rgba(0,0,0,0.6);
    z-index: 9;
  }
}
</style>

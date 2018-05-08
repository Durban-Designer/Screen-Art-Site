<template>
  <div class="main">
    <button class="logOut" v-on:click="$emit('logOut')">LOG OUT</button>
  </div>
</template>

<script>
export default {
  name: 'customeraccount',
  data () {
    return {}
  }
}
</script>

<style scoped lang='less'>
.main {
  margin-left: 5px;
  margin-top: 145px;
  width: 99%;
  height: 70%;
  z-index: 4;
  position: fixed;
  background:rgba(0,0,0,0.6);
  border-radius: 12px;
  box-shadow: 2px 2px 4px #000;
}
</style>

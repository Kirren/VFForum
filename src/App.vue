<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <router-view class="col-12"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  #app {
    background-color: #fff;
  }
</style>

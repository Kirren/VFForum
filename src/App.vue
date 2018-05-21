<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <!--<div class="col-12">
          <div class="text-center">
            <img src="./assets/logo.png">
          </div>
        </div>-->
        <router-view/>
      </div>
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
    background-color: beige;
  }
</style>

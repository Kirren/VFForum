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

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  #app {
    background-color: #028090;
    h1, h2 {
      color: #FFF;
      margin: 1.5rem 0 3rem;
    }
    .user-name {
      color: #57AD8D;
    }
  }
</style>

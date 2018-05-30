<template>
  <div id="app">
    <b-container fluid>
      <b-row class="bg-header" align-v="center">
        <b-col>
          <h1>
            <router-link :to="{name: 'HomePage'}" class="text-white">
              Vue.js Forum
            </router-link>
          </h1>
        </b-col>
      </b-row>
      <b-row class="navbar-border mb-3">
        <TheNavbar/>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <router-view class="col-12 col-lg-10 col-xl-8 mx-auto"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import TheNavbar from '@/components/TheNavbar'

  export default {
    name: 'App',
    components: {TheNavbar}
  }
</script>

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  #app {
    .bg-header {
      background: url("https://i.ytimg.com/vi/LJyiTDAWzDA/maxresdefault.jpg") no-repeat 0 0;
      background-size: cover;
      height: 15rem;
      text-align: center;
      h1 {
        display: inline-block;
        color: #fff;
        border: 2px solid #fff;
        padding: 3rem;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .navbar-border {
      border-bottom: 2px solid lightgrey;
    }
    a.black-link {
      color: #000;
      font-weight: 700;
    }
    p {
      margin-bottom: 0;

    }
  }
</style>

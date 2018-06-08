<template>
  <div class="text-center">
    <h1>Page not found</h1>
    <router-link :to="{name: 'HomePage'}">
      Home
    </router-link>
  </div>

</template>

<script>
  export default {
    created () {
      this.$emit('ready')
    }
  }
</script>

<style scoped></style>

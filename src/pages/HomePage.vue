<template>
  <div>
    <h1>Welcome to the Forum</h1>
    <ThreadList :threads="threads"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ThreadList from '@/components/ThreadList'

  export default {
    components: {
      ThreadList
    },
    data () {
      return {
        threads: Object.values(sourceData.threads),
        users: sourceData.users,
        posts: sourceData.posts
      }
    }
  }
</script>

<style scoped lang="scss"></style>

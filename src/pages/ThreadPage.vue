<template>
  <div class="col-12">
    <h1>{{thread.title}}</h1>
    <hr>
    <PostList :posts="posts"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import PostList from '@/components/PostList'

  export default {
    components: {PostList},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        thread: sourceData.threads[this.id]
      }
    },
    computed: {
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(sourceData.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    background-color: #fff;
  }
</style>

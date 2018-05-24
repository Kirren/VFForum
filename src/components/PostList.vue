<template>
  <div class="post-list">
    <div class="container-fluid">
      <PostListItem
        v-for="post in posts"
        :post="post"
        :key="post['.key']"
      />
    </div>
  </div>
</template>

<script>
  import PostListItem from './PostListItem'

  export default {
    components: {PostListItem},
    props: {
      posts: {
        required: true,
        type: Array
      }
    }
  }
</script>

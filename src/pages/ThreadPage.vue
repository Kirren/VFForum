<template>
  <div class="col-12">
    <h1>{{thread.title}}</h1>
    <div class="text-white">
      <p>
        <small class="float-left">By <a href="#" class="text-white">{{users[thread.userId].name}}</a>,
          <BaseDate :timestamp="thread.publishedAt"/>
          .
        </small>
        <small class="float-right">3 replies by 3 contributors</small>
      </p>
    </div>
    <div class="mb-4 clearfix"></div>
    <PostList :posts="posts"/>
    <PostEditor
      @save="addPost"
      :threadId="id"
    />
  </div>
</template>

<script>
  import sourceData from '@/data'
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'

  console.log(sourceData)

  export default {
    components: { PostList, PostEditor },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        thread: sourceData.threads[this.id],
        users: sourceData.users
      }
    },
    computed: {
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(sourceData.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    },
    methods: {
      addPost (eventData) {
        const post = eventData.post
        const postId = eventData.post['.key']

        this.$set(sourceData.posts, postId, post)
        this.$set(this.thread.posts, postId, postId)
        this.$set(sourceData.users[post.userId].posts, postId, postId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    background-color: #fff;
  }
</style>

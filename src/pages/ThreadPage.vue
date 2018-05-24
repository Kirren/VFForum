<template>
  <div class="col-12">
    <h1>{{thread.title}}</h1>
    <hr>
    <PostList :posts="posts"/>
    <form @submit.prevent="addPost">
      <div class="form-group">
        <textarea name="postMessage"
                  id="" class="form-control"
                  cols="30" rows="3"
                  v-model="newPost">
        </textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-success">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import PostList from '@/components/PostList'

  console.log(sourceData)

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
        thread: sourceData.threads[this.id],
        newPost: ''
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
      addPost () {
        const postId = 'someFictionalId' + Math.random()
        const post = {
          text: this.newPost,
          publishedAt: Math.floor(Date.now() / 1000),
          threadId: this.id,
          userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
          '.key': postId
        }
        this.$set(sourceData.posts, postId, post)
        this.$set(this.thread.posts, postId, postId)
        this.$set(sourceData.users[post.userId].posts, postId, postId)
        this.newPost = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    background-color: #fff;
  }
</style>

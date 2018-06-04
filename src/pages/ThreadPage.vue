<template>
  <div>
    <h1>
      {{thread.title}}
      <b-button :to="{name: 'EditThreadPage', id: this.id}"
                variant="success" class="float-right">
        Edit Thread
      </b-button>
    </h1>
    <b-row class="mb-5">
      <b-col class="text-left">
        <p>
          <small>By <a href="#" class="black-link">{{user.name}}</a>,
            <BaseDate :timestamp="thread.publishedAt"/>.
          </small>
        </p>
      </b-col>
      <b-col class="text-right">
        <p>
          <small>
            {{repliesAmount}}
            <span v-if="repliesAmount === 1"> reply </span>
            <span v-else> replies </span>
            by {{contributorsAmount}}
            <span v-if="contributorsAmount === 1"> contributor</span>
            <span v-else> contributors</span>.
          </small>
        </p>
      </b-col>
    </b-row>
    <PostList :posts="posts"/>
    <PostEditor :threadId="id"/>
  </div>
</template>

<script>
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'

  export default {
    components: { PostList, PostEditor },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      thread () {
        return this.$store.state.threads[this.id]
      },
      user () {
        return this.$store.state.users[this.thread.userId]
      },
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(this.$store.state.posts)
          .filter(post => postIds.includes(post['.key']))
      },
      contributorsAmount () {
        const replies = Object.keys(this.thread.posts)
          .filter(postId => postId !== this.thread.firstPostId)
          .map(postId => this.$store.state.posts[postId])
        const userIds = replies.map(post => post.userId)

        return userIds.filter((id, index) => userIds.indexOf(id) === index).length
      },
      repliesAmount () {
        return this.$store.getters.threadRepliesCount(this.thread['.key'])
      }
    }
  }
</script>

<style lang="scss" scoped></style>

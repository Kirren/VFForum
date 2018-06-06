<template>
  <div v-if="thread && user">
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
  import {countObjectLength} from '@/helpers'

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
        return countObjectLength(this.thread.contributors)
      },
      repliesAmount () {
        return this.$store.getters.threadRepliesCount(this.thread['.key'])
      }
    },
    created () {
      this.$store.dispatch('fetchThread', {id: this.id})
        .then(thread => {
          this.$store.dispatch('fetchUser', {id: thread.userId})
          this.$store.dispatch('fetchPosts', {ids: Object.keys(thread.posts)})
            .then(posts => {
              posts.forEach(post => {
                this.$store.dispatch('fetchUser', {id: post.userId})
              })
            })
        })
    }
  }
</script>

<style lang="scss" scoped></style>

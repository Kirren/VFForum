<template>
  <div v-if="dataReady">
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
    <PostEditor v-if="authUser" :threadId="id"/>
    <div v-else class="text-center mb-4">
      <router-link :to="{name: 'SignInPage', query: {redirectTo: $route.path}}">Sign In</router-link> or
      <router-link :to="{name: 'RegisterPage', query: {redirectTo: $route.path}}">Register</router-link> to post a reply
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'
  import {countObjectLength} from '@/helpers'
  import dataLoader from '@/mixins/dataLoader'

  export default {
    components: { PostList, PostEditor },
    mixins: [dataLoader],
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      ...mapGetters({
        authUser: 'authUser'
      }),
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
    methods: {
      ...mapActions(['fetchThread', 'fetchUser', 'fetchPosts', 'fetchUser'])
    },
    created () {
      this.fetchThread({id: this.id})
        .then(thread => {
          this.fetchUser({id: thread.userId})
          return this.fetchPosts({ids: Object.keys(thread.posts)})
        })
        .then(posts => {
          return Promise.all(posts.map(post => {
            this.fetchUser({id: post.userId})
          }))
        })
        .then(() => { this.dataFetched() })
    }
  }
</script>

<style lang="scss" scoped></style>

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
  import firebase from 'firebase'
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
      firebase.database().ref('threads').child(this.id).once('value', snapshot => {
        const thread = snapshot.val()
        this.$store.commit('setThread', {threadId: snapshot.key, thread: {...thread, '.key': snapshot.key}})

        firebase.database().ref('users').child(thread.userId).once('value', snapshot => {
          const user = snapshot.val()
          this.$store.commit('setUser', {userId: snapshot.key, user: {...user, '.key': snapshot.key}})
        })

        Object.keys(thread.posts).forEach(postId => {
          firebase.database().ref('posts').child(postId).once('value', snapshot => {
            const post = snapshot.val()
            this.$store.commit('setPost', {postId: snapshot.key, post: {...post, '.key': snapshot.key}})

            firebase.database().ref('users').child(post.userId).once('value', snapshot => {
              const user = snapshot.val()
              this.$store.commit('setUser', {userId: snapshot.key, user: {...user, '.key': snapshot.key}})
            })
          })
        })
      })
    }
  }
</script>

<style lang="scss" scoped></style>

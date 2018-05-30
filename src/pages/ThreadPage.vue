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
          <small>By <a href="#" class="black-link">{{users[thread.userId].name}}</a>,
            <BaseDate :timestamp="thread.publishedAt"/>.
          </small>
        </p>
      </b-col>
      <b-col class="text-right">
        <p>
          <small>3 replies by 3 contributors</small>
        </p>
      </b-col>
    </b-row>
    <PostList :posts="posts"/>
    <PostEditor
      :threadId="id"
    />
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
      users () {
        return this.$store.state.users
      },
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(this.$store.state.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    }
  }
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <h1>
      Edit thread called <i>{{thread.title}}</i>
    </h1>
    <ThreadEditor @save="save"
                  @cancel="cancel"
                  :title="thread.title"
                  :text="text"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ThreadEditor from '@/components/ThreadEditor'

  export default {
    name: 'EditThreadPage',
    components: {ThreadEditor},
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
      text () {
        const post = this.$store.state.posts[this.thread.firstPostId]
        return post ? post.text : null
      }
    },
    methods: {
      ...mapActions(['updateThread', 'fetchThread', 'fetchPost']),

      save ({title, text}) {
        this.updateThread({
          id: this.id,
          title,
          text
        }).then(thread => {
          this.$router.push({name: 'ThreadPage', params: {id: this.id}})
        })
      },
      cancel () {
        this.$router.push({name: 'ThreadPage', params: {id: this.id}})
      }
    },
    created () {
      this.fetchThread({id: this.id})
        .then(thread => this.fetchPost({id: thread.firstPostId}))
    }
  }
</script>

<style scoped>

</style>

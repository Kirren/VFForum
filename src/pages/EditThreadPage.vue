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
        return this.$store.state.posts[this.thread.firstPostId].text
      }
    },
    methods: {
      save ({title, text}) {
        this.$store.dispatch('updateThread', {
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
    }
  }
</script>

<style scoped>

</style>

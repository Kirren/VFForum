<template>
  <div v-if="forum">
    <h1>
      Create new thread in <i>{{forum.name}}</i>
    </h1>
    <ThreadEditor @save="save"
                  @cancel="cancel"/>
  </div>
</template>

<script>
  import ThreadEditor from '../components/ThreadEditor'

  export default {
    name: 'CreateThreadPage',
    components: {ThreadEditor},
    props: {
      forumId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        title: '',
        text: ''
      }
    },
    computed: {
      forum () {
        return this.$store.state.forums[this.forumId]
      }
    },
    methods: {
      save ({title, text}) {
        this.$store.dispatch('createThread', {
          forumId: this.forum['.key'],
          title,
          text
        }).then(thread => {
          this.$router.push({name: 'ThreadPage', params: {id: thread['.key']}})
        })
      },
      cancel () {
        this.$router.push({name: 'ForumPage', params: {id: this.forum['.key']}})
      }
    },
    created () {
      this.$store.dispatch('fetchForum', {id: this.forumId})
    }
  }
</script>

<style scoped>

</style>

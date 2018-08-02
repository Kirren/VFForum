<template>
  <div v-if="dataReady">
    <h1>
      Create new thread in <i>{{forum.name}}</i>
    </h1>
    <ThreadEditor ref="editor"
                  @save="save"
                  @cancel="cancel"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ThreadEditor from '@/components/ThreadEditor'
  import dataLoader from '@/mixins/dataLoader'

  export default {
    name: 'CreateThreadPage',
    components: {ThreadEditor},
    mixins: [dataLoader],
    props: {
      forumId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        saved: false
      }
    },
    computed: {
      forum () {
        return this.$store.state.forums.all[this.forumId]
      },
      hasUnsavedChanges () {
        return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.saved
      }
    },
    methods: {
      ...mapActions('threads', ['createThread']),
      ...mapActions('forums', ['fetchForum']),
      ...mapActions('users', ['fetchUser']),
      save ({title, text}) {
        this.createThread({
          forumId: this.forum['.key'],
          title,
          text
        }).then(thread => {
          this.saved = true
          this.$router.push({name: 'ThreadPage', params: {id: thread['.key']}})
        })
      },
      cancel () {
        this.$router.push({name: 'ForumPage', params: {id: this.forum['.key']}})
      }
    },
    created () {
      this.fetchForum({id: this.forumId})
        .then(() => { this.dataFetched() })
    },
    beforeRouteLeave (to, from, next) {
      if (this.hasUnsavedChanges) {
        const confirmed = window.confirm('Are you sure you want to leave?')
        if (confirmed) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    }
  }
</script>

<style scoped>

</style>

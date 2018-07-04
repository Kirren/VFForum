<template>
  <div v-if="dataReady">
    <h1>
      Edit thread called <i>{{thread.title}}</i>
    </h1>
    <ThreadEditor ref="editor"
                  @save="save"
                  @cancel="cancel"
                  :title="thread.title"
                  :text="text"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ThreadEditor from '@/components/ThreadEditor'
  import dataLoader from '@/mixins/dataLoader'

  export default {
    name: 'EditThreadPage',
    components: {ThreadEditor},
    mixins: [dataLoader],
    props: {
      id: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        initialTitle: '',
        initialText: '',
        saved: false
      }
    },
    computed: {
      thread () {
        return this.$store.state.threads[this.id]
      },
      text () {
        const post = this.$store.state.posts[this.thread.firstPostId]
        return post ? post.text : null
      },
      hasUpdatedTitle () {
        return this.initialTitle !== this.$refs.editor.form.title
      },
      hasUpdatedText () {
        return this.initialText !== this.$refs.editor.form.text
      },
      hasUnsavedChanges () {
        return (this.hasUpdatedTitle || this.hasUpdatedText) && !this.saved
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
          this.saved = true
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
        .then(() => { this.dataFetched() })
    },
    mounted () {
      this.initialTitle = this.thread.title
      this.initialText = this.text

      console.log(this.initialTitle)
      console.log(this.initialText)
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

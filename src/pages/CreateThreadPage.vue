<template>
  <div v-if="dataReady">
    <h1>
      Create new thread in <i>{{forum.name}}</i>
    </h1>
    <ThreadEditor @save="save"
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
      ...mapActions(['createThread', 'fetchForum']),
      save ({title, text}) {
        this.createThread({
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
      this.fetchForum({id: this.forumId})
        .then(() => { this.dataFetched() })
    }
  }
</script>

<style scoped>

</style>

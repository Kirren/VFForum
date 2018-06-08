<template>
  <div v-if="dataReady">
    <!--<ul class="breadcrumbs">
      <li><a href="/index.html"><i class="fa fa-home fa-btn"></i>Home</a></li>
      <li><a href="/category.html">Discussions</a></li>
      <li class="active"><a href="#">Cooking</a></li>
    </ul>-->

    <b-row class="mb-5" align-v="center">
      <b-col>
        <h1>{{forum.name}}</h1>
        <p class="text-lead">
          {{forum.description}}
        </p>
      </b-col>
      <b-col class="text-right">
        <b-button :to="{ name: 'CreateThreadPage', params: {forumId: this.forum['.key']} }"
                  variant="success" size="sm">
          Start a thread
        </b-button>
      </b-col>
    </b-row>

    <ThreadList :threads="threads"/>

    <!--<div class="pagination">
			<button class="btn-circle" disabled=""><i class="fa fa-angle-left"></i></button>
			1 of 3
			<button class="btn-circle"><i class="fa fa-angle-right"></i></button>
		</div>-->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ThreadList from '@/components/ThreadList'
  import dataLoader from '@/mixins/dataLoader'

  export default {
    name: 'ForumPage',
    components: { ThreadList },
    mixins: [dataLoader],
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      forum () {
        return this.$store.state.forums[this.id]
      },
      threads () {
        return Object.values(this.$store.state.threads)
          .filter(thread => thread.forumId === this.id)
      }
    },
    methods: {
      ...mapActions(['fetchForum', 'fetchThreads', 'fetchUser'])
    },
    created () {
      this.fetchForum({id: this.id})
        .then(forum => this.fetchThreads({ids: forum.threads}))
        .then(threads => Promise.all(threads.map(thread => this.fetchUser({id: thread.userId}))))
        .then(() => { this.dataFetched() })
    }
  }
</script>

<style scoped>

</style>

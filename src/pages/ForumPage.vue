<template>
  <div v-if="forum">
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
  import ThreadList from '@/components/ThreadList'

  export default {
    name: 'ForumPage',
    components: { ThreadList },
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
    created () {
      this.$store.dispatch('fetchForum', {id: this.id})
        .then(forum => {
          this.$store.dispatch('fetchThreads', {ids: forum.threads})
            .then(threads => {
              threads.forEach(thread => this.$store.dispatch('fetchUser', {id: thread.userId}))
            })
        })
    }
  }
</script>

<style scoped>

</style>

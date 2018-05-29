<template>
  <b-list-group-item>
    <b-row>
      <b-col>
        <router-link :to="{ name: 'ForumPage', params: {id: forum['.key']} }"
                     class="black-link">
          {{forum.name}}
        </router-link>
        <p class="text-muted">
          <small v-if="forum.description">{{forum.description}}</small>
          <small v-else><em>No description</em></small>
        </p>
      </b-col>

      <b-col>
        <p>
          <small class="count">{{threadsCount}}</small>
          <small>
            {{threadsCount === 1 ? 'thread' : 'threads'}}
          </small>
        </p>
      </b-col>

      <div class="last-thread">
        <!--<img class="avatar" src="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&amp;token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679" alt="">
				<div class="last-thread-details">
					<a href="thread.html">Post Reactions</a>
					<p class="text-xsmall">By <a href="profile.html">Rolf Haug</a>, a month ago</p>
				</div>-->
      </div>
    </b-row>
  </b-list-group-item>
</template>

<script>
  export default {
    name: 'ForumListItem',
    props: {
      forum: {
        required: true,
        type: Object
      }
    },
    computed: {
      threadsCount () {
        return this.forum.threads ? Object.values(this.forum.threads).length : 0
      }
    }
  }
</script>

<style scoped>

</style>

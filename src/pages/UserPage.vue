<template>
  <div>
    <b-row>
      <b-col cols="3">

        <b-card>

          <p class="text-center">
            <b-img fluid
                   :src="user.avatar"
                   alt=""/>
          </p>

          <h1>{{user.username}}</h1>

          <p>{{user.name}}</p>

          <p class="text-justify">
            <span v-if="user.bio">{{user.bio}}</span>
            <span v-else>No bio specified.</span>
          </p>

          <span class="online">{{user.username}} is online</span>


          <div class="stats">
            <span>{{userPostsCount}} posts</span>
            <span>{{userThreadsCount}} threads</span>
          </div>

          <hr>

          <p class="text-center">
            <icon icon="globe"></icon>
            <a v-if="user.website" :href="user.website">{{user.website}}</a>
          </p>

        </b-card>

        <p class="text-muted text-center">
          Member since june 2003, last visited 4 hours ago
        </p>

        <div class="text-center">
          <hr>
          <a href="edit-profile.html" class="btn-green btn-small">Edit Profile</a>
        </div>

      </b-col>

      <b-col cols="7">

        <div class="profile-header">
                  <span class="text-lead">
                      {{user.username}}'s recent activity
                  </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr>

        <PostList :posts="userPosts"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PostList from '@/components/PostList'

  export default {
    name: 'UserPage',
    components: {PostList},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      ...mapGetters({
        user: 'authUser'
      }),
      userPosts () {
        if (this.user.posts) {
          return Object.values(this.$store.state.posts)
            .filter(post => post.userId === this.user['.key'])
        }
        return []
      },
      userThreadsCount () {
        return this.user.threads ? Object.keys(this.user.threads).length : 0
      }
    }
  }
</script>

<style scoped>

</style>

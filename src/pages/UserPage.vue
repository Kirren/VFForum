<template>
  <div>
    <b-row>
      <b-col cols="3" sm="6">
        <b-card class="text-center">
          <p>
            <b-img fluid
                   :src="user.avatar"
                   alt=""/>
          </p>
          <h1>{{user.username}}</h1>
          <p>{{user.name}}</p>
          <p>
            <span v-if="user.bio">{{user.bio}}</span>
            <span v-else>No bio specified.</span>
          </p>
          <span class="online">{{user.username}} is online</span>
          <div class="stats">
            <small>{{userPostsCount}} posts</small>
            <small>{{userThreadsCount}} threads</small>
          </div>
          <hr>
          <p class="text-center">
            <icon name="globe"/>
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
      <b-col cols="7" sm="6">
        <div class="profile-header">
          <span class="text-lead">
            {{user.name}}'s recent activity
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
  import { countObjectLength } from '@/helpers'
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
      userPostsCount () {
        return countObjectLength(this.user.posts)
      },
      userThreadsCount () {
        return countObjectLength(this.user.threads)
      }
    }
  }
</script>

<style scoped>

</style>

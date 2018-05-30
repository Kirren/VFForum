<template>
  <div>
    <b-row>
      <ProfileCard :user="user"
                   :userPostsCount="userPostsCount"
                   :userThreadsCount="userThreadsCount"
      />
      <b-col cols="12" lg="6">
        <hr class="d-lg-none">
        <div class="text-center mb-3">
          <span class="text-lead">
            {{user.name}}'s recent activity
          </span>
          <br>
          <a href="#">See only started threads?</a>
        </div>
        <hr class="d-none d-lg-block">
        <PostList :posts="userPosts"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { countObjectLength } from '@/helpers'

  import PostList from '@/components/PostList'
  import ProfileCard from '@/components/ProfileCard'

  export default {
    name: 'ProfilePage',
    components: {ProfileCard, PostList},
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

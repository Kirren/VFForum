<template>
  <div>
    <b-row>
      <ProfileEditor v-if="edit" :user="user"
                     :userPostsCount="userPostsCount"
                     :userThreadsCount="userThreadsCount"/>
      <ProfileCard v-else :user="user"
                   :userPostsCount="userPostsCount"
                   :userThreadsCount="userThreadsCount"/>
      <b-col cols="12" lg="6">
        <hr class="d-lg-none">
        <div class="text-center mb-3">
          <span class="text-lead">
            {{user.username}}'s recent activity
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
  import ProfileEditor from '@/components/ProfileEditor'

  export default {
    name: 'ProfilePage',
    components: {ProfileEditor, ProfileCard, PostList},
    props: {
      id: {
        required: true,
        type: String
      },
      edit: {
        type: Boolean,
        default: false
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

<template>
  <div>
    <b-row>
      <ProfileEditor v-if="edit" :user="user"/>
      <ProfileCard v-else :user="user"/>

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

  import PostList from '@/components/PostList'
  import ProfileCard from '@/components/ProfileCard'
  import ProfileEditor from '@/components/ProfileEditor'

  import dataLoader from '@/mixins/dataLoader'

  export default {
    name: 'ProfilePage',
    components: {ProfileEditor, ProfileCard, PostList},
    mixins: [dataLoader],
    props: {
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
        return this.$store.getters.userPosts(this.user['.key'])
      }
    },
    created () {
      this.$store.dispatch('fetchPosts', {ids: this.user.posts})
        .then(() => {
          this.dataFetched()
        })
    }
  }
</script>

<style scoped>

</style>

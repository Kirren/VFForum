<template>
  <b-col cols="12" lg="6">
    <b-row class="text-center d-lg-none">
      <b-col>
        <p>
          <b-img fluid
                 :src="user.avatar"
                 alt=""/>
        </p>
      </b-col>
      <b-col>
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
        <p v-if="user.website" class="text-center">
          <icon name="globe"/>
          <a :href="user.website">{{user.website}}</a>
        </p>
        <p class="text-muted text-center">
          <small>Member since june 2003, last visited 4 hours ago</small>
        </p>

        <div class="text-center">
          <hr>
          <b-button :to="{name: 'ProfileEditPage'}"
                    variant="success" size="sm">
            Edit Profile
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-card class="text-center d-none d-lg-block">
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
      <p v-if="user.website" class="text-center">
        <icon name="globe"/>
        <a :href="user.website">{{user.website}}</a>
      </p>
      <p class="text-muted text-center">
        Member since june 2003, last visited 4 hours ago
      </p>

      <div class="text-center">
        <hr>
        <b-button :to="{name: 'ProfileEditPage'}"
                  variant="success" size="sm">
          Edit Profile
        </b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script>
  export default {
    name: 'ProfileCard',
    props: {
      user: {
        required: true,
        type: Object
      }
    },
    computed: {
      userPostsCount () {
        return this.$store.getters.userPostsCount(this.user['.key'])
      },
      userThreadsCount () {
        return this.$store.getters.userThreadsCount(this.user['.key'])
      }
    }
  }
</script>

<style scoped>

</style>

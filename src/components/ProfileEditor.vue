<template>
  <b-col cols="12" lg="6">
    <b-img :src="activeUser.avatar"
           fluid alt=""
           class="mb-3"/>

    <b-form-group>
      <b-form-input id="userNicknameInput"
                    description="Let us know your name."
                    type="text"
                    v-model="activeUser.username"
                    placeholder="Your username..."/>
    </b-form-group>

    <b-form-group>
      <b-form-input id="userNameInput"
                    type="text"
                    v-model="activeUser.name"
                    placeholder="Your full name..."/>
    </b-form-group>

    <b-form-group label="Bio"
                  label-for="userBioInput">
      <b-form-textarea id="userBioInput"
                       v-model="activeUser.bio"
                       placeholder="Write a few words about yourself">
      </b-form-textarea>
    </b-form-group>

    <div class="text-center">
      {{userPostsCount}}
      <span v-if="userPostsCount === 1"> post</span>
      <span v-else> posts</span>
      {{userThreadsCount}}
      <span v-if="userThreadsCount === 1"> thread</span>
      <span v-else> threads</span>
    </div>

    <hr>

    <b-form-group label="Website"
                  label-for="userWebsiteInput">
      <b-form-input autocomplete="off"
                    id="userWebsiteInput"
                    v-model="activeUser.website"
                    placeholder="Your website link..."/>
    </b-form-group>

    <b-form-group label="Email"
                  label-for="userEmailInput">
      <b-form-input autocomplete="off"
                    id="userEmailInput"
                    v-model="activeUser.email"
                    placeholder="Your email..."/>
    </b-form-group>

    <b-form-group label="Location"
                  label-for="userLocationInput">
      <b-form-input autocomplete="off"
                    id="userLocationInput"
                    v-model="activeUser.location"
                    placeholder="Your location..."/>
    </b-form-group>

    <div class="text-center">
      <b-button-group>
        <b-button variant="warning"
                  @click.prevent="cancel">
          Cancel
        </b-button>
        <b-button variant="info"
                  type="submit"
                  @click.prevent="save">
          Save
        </b-button>
      </b-button-group>
    </div>
  </b-col>
</template>

<script>
  export default {
    name: 'ProfileEditor',
    props: {
      user: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        activeUser: {...this.user}
      }
    },
    computed: {
      userPostsCount () {
        return this.$store.getters.userPostsCount(this.user['.key'])
      },
      userThreadsCount () {
        return this.$store.getters.userThreadsCount(this.user['.key'])
      }
    },
    methods: {
      save () {
        this.$router.push({name: 'ProfilePage'})
        this.$store.dispatch('updateUser', {...this.activeUser})
      },
      cancel () {
        this.$router.push({name: 'ProfilePage'})
      }
    }
  }
</script>

<style scoped>

</style>

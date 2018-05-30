<template>
  <div>
    <h1>
      Create new thread in <i>{{forum.name}}</i>
    </h1>
    <b-form @submit.prevent="save">
      <b-form-group label="Title:"
                    label-for="threadTitleInput">
        <b-form-input id="threadTitleInput"
                      name="title"
                      type="text"
                      v-model="title"/>
      </b-form-group>

      <b-form-group label="Content:"
                    for="threadContentInput">
        <b-form-textarea id="threadContentInput"
                         name="content"
                         rows="8"
                         v-model="text">
        </b-form-textarea>
      </b-form-group>

      <b-button-group>
        <b-button variant="warning" @click.prevent="cancel">
          Cancel
        </b-button>
        <b-button variant="info"
                  type="submit"
                  name="Publish">
          Publish
        </b-button>
      </b-button-group>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'CreateThreadPage',
    props: {
      forum: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        title: '',
        text: ''
      }
    },
    methods: {
      save () {
        this.$store.dispatch('createThread', {
          forumId: this.forum['.key'],
          title: this.title,
          text: this.text
        }).then(thread => {
          this.$router.push({name: 'ThreadPage', params: {id: thread['.key']}})
        })
      },
      cancel () {
        this.$router.push({name: 'ForumPage', params: {id: this.forum['.key']}})
      }
    }
  }
</script>

<style scoped>

</style>

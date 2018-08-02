<template>
  <b-form @submit.prevent="save">
    <b-form-group label="Title:"
                  label-for="threadTitleInput">
      <b-form-input id="threadTitleInput"
                    name="title"
                    type="text"
                    v-model="form.title"/>
    </b-form-group>

    <b-form-group label="Content:"
                  for="threadContentInput">
      <b-form-textarea id="threadContentInput"
                       name="content"
                       rows="8"
                       v-model="form.text">
      </b-form-textarea>
    </b-form-group>

    <b-button-group>
      <b-button variant="light"
                @click.prevent="cancel">
        Cancel
      </b-button>
      <b-button variant="info"
                type="submit"
                name="Publish">
        {{isUpdate ? 'Update' : 'Publish'}}
      </b-button>
    </b-button-group>
  </b-form>
</template>

<script>
  export default {
    name: 'ThreadEditor',
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        form: {
          title: this.title,
          text: this.text
        }
      }
    },
    computed: {
      thread () {
        return this.$store.state.threads.all['.key']
      },
      isUpdate () {
        return !!this.title
      }
    },
    methods: {
      save () {
        this.$emit('save', {title: this.form.title, text: this.form.text})
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>

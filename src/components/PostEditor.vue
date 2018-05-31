<template>
  <b-col>
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea name="postMessage"
                  id="" class="form-control"
                  cols="30" rows="3"
                  v-model="text">
        </textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-success">Submit</button>
      </div>
    </form>
  </b-col>
</template>

<script>
  export default {
    props: {
      threadId: {
        required: false,
        type: String
      },
      post: {
        type: Object
      }
    },
    data () {
      return {
        text: this.post ? this.post.text : ''
      }
    },
    computed: {
      isUpdate () {
        return !!this.post
      }
    },
    methods: {
      save () {
        this.persist()
          .then(post => {
            this.$emit('save', {post})
          })
      },
      create () {
        const post = {
          text: this.text,
          threadId: this.threadId
        }
        this.text = ''

        this.$emit('save', {post})
        return this.$store.dispatch('createPost', post)
      },
      update () {
        const payload = {
          id: this.post['.key'],
          text: this.text
        }
        return this.$store.dispatch('updatePost', payload)
      },
      persist () {
        return this.isUpdate ? this.update() : this.create()
      }
    }
  }
</script>

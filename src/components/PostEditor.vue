<template>
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
</template>

<script>
  export default {
    props: {
      threadId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        text: ''
      }
    },
    methods: {
      save () {
        const post = {
          text: this.text,
          publishedAt: Math.floor(Date.now() / 1000),
          threadId: this.threadId,
          userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
        }
        this.text = ''

        this.$emit('save', {post})
        this.$store.dispatch('createPost', post)
      }
    }
  }
</script>

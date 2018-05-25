<template>
  <div class="thread row mb-4 py-3">
    <div class="col-10">
      <p>
        <router-link :to="{name: 'ThreadPage', params: {id: thread['.key']}}">
          {{thread.title}}
        </router-link>
      </p>
      <p class="text-muted">
        <small>
          By <a href="#">{{user.name}}</a>, <BaseDate :timestamp="thread.publishedAt"/>.
        </small>
      </p>
    </div>

    <div class="activity col-2">
      <p class="replies-count">
        {{repliesAmount}}
        <span v-if="repliesAmount === 1"> reply</span>
        <span v-else> replies</span>
      </p>

      <img class="img-fluid"
           src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png" alt="">

      <!--<div>
        <p class="text-xsmall">
          <a href="#">Bruce Wayne</a>
        </p>
        <p class="text-xsmall text-faded">2 hours ago</p>
      </div>-->
    </div>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import BaseDate from './BaseDate'

  export default {
    components: {
      BaseDate
    },
    props: {
      thread: {
        required: true,
        type: Object
      }
    },
    computed: {
      repliesAmount () {
        return Object.keys(this.thread.posts).length - 1
      },
      user () {
        return sourceData.users[this.thread.userId]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .thread {
    background-color: honeydew;
    border-right: 3px solid #f0f0f0;
    border-bottom: 3px solid #f0f0f0;
  }
</style>

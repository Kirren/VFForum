<template>
  <div class="thread row">
    <div class="col-10">
      <p>
        <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">
          {{thread.title}}
        </router-link>
      </p>
      <p class="text-mute">
        <small>
          By <a href="#">{{user.name}}</a>, {{thread.publishedAt}}.
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

  export default {
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

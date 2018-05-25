<template>
  <div class="thread row py-3">
    <div class="col-8">
      <p class="mb-0">
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

    <div class="col-2">
      <p class="replies-count">
        <small>
          {{repliesAmount}}
          <span v-if="repliesAmount === 1"> reply</span>
          <span v-else> replies</span>
        </small>
      </p>
    </div>
    <div class="col-2">
      <b-img class="m-1"
             fluid center
             thumbnail
             rounded="circle"
             width="50" height="50"
             :alt="user.name"
             src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"/>

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

<style lang="scss" scoped>
  .thread {
    color: #05668D;
  }
  .thread:nth-child(odd) {
    background-color: #02C39A;
    a {
      color: #F0F3BD;
    }
  }
  .thread:nth-child(even) {
    background-color: #F0F3BD;
    a {
      color: #00A896;
    }
  }
</style>

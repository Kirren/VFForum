<template>
  <b-row class="post mb-4 py-3">
    <b-col cols="3" md="2" class="text-center">
      <p class="mb-0">
        <a href="#" class="black-link">
          {{user.name}}
        </a>
      </p>
      <p>
        <small class="online desktop-only">online</small>
      </p>
      <a href="#" class="black-link">
        <b-img rounded="circle"
               height="75"
               width="75"
               :src="user.avatar"
               alt="user.name"
               class="mb-2"/>
      </a>
      <p>
        <small>{{userPostsCount}}
          <span v-if="userPostsCount === 1">thread</span>
          <span v-else>threads</span>
        </small>
      </p>
      <!--<p class="post-date text-muted">
        <small>{{post.publishedAt | date}}</small>
      </p>-->
      <p class="text-muted">
        <small>
          <BaseDate :timestamp="post.publishedAt"/>
        </small>
      </p>
    </b-col>
    <b-col cols="9" md="10" class="post-content">
      <div>
        <p>
          <small>{{post.text}}</small>
        </p>
      </div>
      <a href="#"
         class="ml-auto"
         title="Make a change">
        <icon name="pencil-alt"
              scale="2" class="text-warning"/>
      </a>
      <div class="reactions float-right text-right">
        <ul class="list-inline">
          <li class="list-inline-item">💡</li>
          <li class="list-inline-item">❤</li>
          <li class="list-inline-item">👎</li>
          <li class="list-inline-item">👍</li>
          <li class="list-inline-item">👌</li>
        </ul>
        <b-button size="sm" variant="outline-success">
          <span class="emoji">❤</span>️ 3
        </b-button>
        <b-button size="sm" variant="outline-success" class="active-reaction">
          <span class="emoji">👌️</span>️ 1
        </b-button>
        <b-button size="sm" variant="outline-success">
          + <i class="fa fa-smile-o emoji"></i>
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import sourceData from '@/data'

  export default {
    props: {
      post: {
        required: true,
        type: Object
      }
    },
    computed: {
      user () {
        return sourceData.users[this.post.userId]
      },
      userPostsCount () {
        return Object.keys(this.user.posts).length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    border: 1px solid lightgrey;
    border-radius: 5px;
  }
</style>

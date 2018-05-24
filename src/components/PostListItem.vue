<template>
  <div class="post row mb-4 py-3">
    <div class="user-info text-center col-3 col-xl-1">
      <p class="mb-0">
        <a href="#" class="user-name">
          <strong>{{user.name}}</strong>
        </a>
      </p>
      <p>
        <small class="online desktop-only">online</small>
      </p>
      <a href="#">
        <b-img fluid
               rounded="circle"
               height="75"
               width="75"
               :src="user.avatar"
               alt=""
               class="mb-2"/>
      </a>
      <p class="desktop-only mb-0">
        <small></small>
        <br>
        <small>{{userPostsCount}}
          <span v-if="userPostsCount > 1">threads</span>
          <span v-else>thread</span>
        </small>
      </p>
      <!--<p class="post-date text-muted">
        <small>{{post.publishedAt | date}}</small>
      </p>-->
      <p class="post-date text-muted"
        :title="post.publishedAt | date">
        <small>{{post.publishedAt | timeSince}}</small>
      </p>
    </div>
    <div class="post-content col-9 col-xl-11">
      <div>
        <p>
          <small>{{post.text}}</small>
        </p>
      </div>
      <a href="#"
         class="ml-auto"
         title="Make a change">
        <i class="fa fa-pencil"></i>
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
    </div>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import moment from 'moment'

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
    },
    filters: {
      date (d) {
        return moment.unix(d).format('MMMM Do YYYY, h:mm:ss a')
      },
      timeSince (d) {
        return moment.unix(d).fromNow()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    background-color: honeydew;
    border-right: 3px solid #f0f0f0;
    border-bottom: 3px solid #f0f0f0;
    .user-name {
      color: #57AD8D;
    }
  }
</style>

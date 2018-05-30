<template>
  <b-row class="post mb-4 py-3">
    <b-col cols="3" md="2" class="text-center">
      <p class="userNameText">
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
    <b-col cols="9" md="10">
      <b-container class="h-100">
        <b-row style="height: inherit;">
          <b-col align-self="start" cols="12" class="mb-3">
            <p class="postText">
              <small>{{post.text}}</small>
            </p>
          </b-col>
          <b-col align-self="end" cols="6" class="text-left">
            <b-button :id="'edit' + post['.key'].slice(-5) +'Button'" href="#" size="sm"
                      variant="outline-danger"
                      class="editPostButton">
              <icon name="pencil-alt"/>
            </b-button>
            <b-tooltip :target="'edit' + post['.key'].slice(-5) +'Button'" title="Make a change"/>
          </b-col>
          <b-col align-self="end" cols="6" class="text-right">
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
          </b-col>
        </b-row>
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
  import { countObjectLength } from '@/helpers'

  export default {
    props: {
      post: {
        required: true,
        type: Object
      }
    },
    computed: {
      user () {
        return this.$store.state.users[this.post.userId]
      },
      userPostsCount () {
        return countObjectLength(this.user.posts)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    border: 1px solid lightgrey;
    border-radius: 5px;
    .editPostButton {
      line-height: 1;
    }
    p.postText {
      word-break: break-word;
    }
    p.userNameText {
      line-height: 1;
    }
  }
</style>

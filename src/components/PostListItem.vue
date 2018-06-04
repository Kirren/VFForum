<template>
  <b-row v-if="post && user" class="post mb-4 py-3">
    <b-col cols="3" md="2" class="text-center">
      <p class="userNameText">
        <a href="#" class="black-link">
          {{user.name}}
        </a>
      </p>
      <p>
        <small class="online desktop-only">online</small>
      </p>
      <router-link :to="{name: 'ProfilePage'}">
        <b-img rounded="circle"
               height="75"
               width="75"
               :src="user.avatar"
               alt="user.name"
               class="mb-2"/>
      </router-link>
      <p>
        <small>{{userPostsCount}}
          <span v-if="userPostsCount === 1">post</span>
          <span v-else>posts</span>
        </small>
      </p>
      <p>
        <small>{{userThreadsCount}}
          <span v-if="userThreadsCount === 1">thread</span>
          <span v-else>threads</span>
        </small>
      </p>
      <p class="text-muted">
        <small>
          <BaseDate :timestamp="post.publishedAt"/>
        </small>
      </p>
    </b-col>
    <b-col cols="9" md="10">
      <b-container class="h-100">
        <template v-if="!editing">
          <b-row style="height: inherit;">
            <b-col align-self="start" cols="12" class="mb-3">
              <p class="postText">
                <small>{{post.text}}</small>
              </p>
            </b-col>
            <b-col align-self="end" cols="6" class="text-left">
              <p>
                <b-button size="sm"
                          variant="outline-danger"
                          class="editPostButton"
                          @click.prevent="editing = true">
                  <icon name="pencil-alt"/>
                </b-button>

                <small class="text-muted"
                       v-if="post.edited">
                  edited
                </small>
              </p>
              <!--<b-tooltip :target="'edit' + post['.key'].slice(-5) +'Button'" title="Make a change"/>-->
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
        </template>
        <div v-else>
          <b-row>
            <PostEditor :post="post"
                        @save="editing = false"
                        @cancel="editing = false"/>
          </b-row>
        </div>
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
  import PostEditor from './PostEditor'

  export default {
    components: {PostEditor},
    props: {
      post: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        editing: false
      }
    },
    computed: {
      user () {
        return this.$store.state.users[this.post.userId]
      },
      userPostsCount () {
        return this.$store.getters.userPostsCount(this.post.userId)
      },
      userThreadsCount () {
        return this.$store.getters.userThreadsCount(this.post.userId)
      },
      isUpdate () {
        return !!this.title
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

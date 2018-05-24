<template>
  <div class="col-12">
    <b-jumbotron :header="thread.title"></b-jumbotron>
    <div class="container-fluid">
      <div v-for="postId in thread.posts" class="post row mb-4 py-3">
        <div class="user-info text-center col-3 col-xl-1">
          <p>
            <a href="#" class="user-name">
              {{users[posts[postId].userId].name}}
            </a>
            <span class="online desktop-only">online</span>
          </p>
          <a href="#">
            <b-img fluid
                   rounded="circle"
                   height="75"
                   width="75"
                   :src="users[posts[postId].userId].avatar"
                   alt=""
                   class="mb-2"/>
          </a>
          <p class="desktop-only mb-0">
            <small>{{users[posts[postId].userId].length}}</small>
            <br>
            <small>23 threads</small>
          </p>

        </div>

        <div class="post-content col-9 col-xl-11">
          <div>
            {{posts[postId].text}}
          </div>
          <a href="#"
             style="margin-left: auto;"
             class="link-unstyled"
             title="Make a change">
            <i class="fa fa-pencil"></i>
          </a>
          <div class="post-date text-faded">
            {{posts[postId].publishedAt}}
          </div>

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
    </div>
  </div>
</template>

<script>
  import sourceData from '@/data'

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        thread: sourceData.threads[this.id],
        posts: sourceData.posts,
        users: sourceData.users
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    background-color: #fff;
  }
  .jumbotron {
    background-color: #fffee2;
  }
</style>

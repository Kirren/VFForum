<template>
  <b-list-group-item>
    <b-row>
      <b-col cols="8">
        <p class="mb-0">
          <router-link :to="{name: 'ThreadPage', params: {id: thread['.key']}}"
                       class="black-link">
            {{thread.title}}
          </router-link>
        </p>
        <p class="text-muted">
          <small>
            By <a href="#" class="black-link">{{user.name}}</a>,
            <BaseDate :timestamp="thread.publishedAt"/>.
          </small>
        </p>
      </b-col>
      <b-col cols="2">
        <p class="replies-count">
          <small>
            {{repliesAmount}}
            <span v-if="repliesAmount === 1"> reply</span>
            <span v-else> replies</span>
          </small>
        </p>
      </b-col>
      <b-col cols="2">
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
      </b-col>
    </b-row>
  </b-list-group-item>
</template>

<script>
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
        return this.$store.state.users[this.thread.userId]
      }
    }
  }
</script>

<style lang="scss" scoped></style>

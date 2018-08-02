import Vue from 'vue'
import { makeAppendChildToParentMutation } from './storeHelpers'

export default {
  setAuthId (state, id) {
    state.authId = id
  },
  setUser (state, {user, userId}) {
    Vue.set(state.users, userId, user)
  },
  setPost (state, {post, postId}) {
    Vue.set(state.posts, postId, post)
  },
  setData (state, {resource, item, id}) {
    item['.key'] = id
    Vue.set(state[resource], id, item)
  },
  setUnsubscribeAuthObserver (state, unsubscribe) {
    state.unsubscribeAuthObserver = unsubscribe
  },

  appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
  appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
}

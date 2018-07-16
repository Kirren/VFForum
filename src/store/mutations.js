import Vue from 'vue'

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {parentId, childId}) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

export default {
  setAuthId (state, id) {
    state.authId = id
  },
  setUser (state, {user, userId}) {
    Vue.set(state.users, userId, user)
  },
  setThread (state, {thread, threadId}) {
    Vue.set(state.threads, threadId, thread)
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

  appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
  appendContributorToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'}),
  appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
  appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),
  appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
}

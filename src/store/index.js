import Vue from 'vue'
import Vuex from 'vuex'

import sourceData from '@/data'
import {countObjectLength} from '../helpers'

Vue.use(Vuex)

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {parentId, childId}) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }
export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser (state) {
      return state.users[state.authId]
    },
    userThreadsCount: state => id => countObjectLength(state.users[id].threads),
    userPostsCount: state => id => countObjectLength(state.users[id].posts)
  },
  actions: {
    createThread ({commit, state, dispatch}, {title, text, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'someFictionalId' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const thread = {
          '.key': threadId,
          title,
          forumId,
          publishedAt,
          userId
        }

        commit('setThread', {thread, threadId})
        commit('appendThreadToForum', {parentId: forumId, childId:threadId})
        commit('appendThreadToUser', {parentId: userId, childId:threadId})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.threads[threadId])
      })
    },
    updateThread ({commit, state, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const newThread = {...thread, title}
        commit('setThread', {thread: newThread, threadId: id})

        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
    },
    createPost ({commit, state}, post) {
      const postId = 'someFictionalId' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', {post, postId})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})

      return Promise.resolve(state.posts[postId])
    },
    updatePost ({commit, state}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]

        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })

        resolve(post)
      })
    },
    updateUser ({commit}, user) {
      commit('setUser', {user, userId: user['.key']})
    }
  },
  mutations: {
    setUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },
    setThread (state, {thread, threadId}) {
      Vue.set(state.threads, threadId, thread)
    },
    setPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },
    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),
    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  }
})

import Vue from 'vue'
import firebase from 'firebase'

import { makeAppendChildToParentMutation } from '../storeHelpers'
import { countObjectLength } from '../../helpers'

export default {
  state: {
    all: {}
  },
  getters: {
    threadRepliesCount: state => id => countObjectLength(state.all[id].posts) - 1
  },
  actions: {
    createThread ({commit, state, dispatch}, {title, text, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = firebase.database().ref('threads').push().key
        const postId = firebase.database().ref('posts').push().key
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const thread = { title, forumId, publishedAt, userId, firstPostId: postId, posts: {} }
        thread.posts[postId] = postId
        const post = { text, publishedAt, threadId, userId }

        const updates = {}

        updates[`threads/${threadId}`] = thread
        updates[`forums/${forumId}/threads/${threadId}`] = threadId
        updates[`users/${userId}/threads/${threadId}`] = threadId

        updates[`posts/${postId}`] = post
        updates[`users/${userId}/posts/${postId}`] = postId

        firebase.database().ref().update(updates)
          .then(() => {
            commit('setData', {resource: 'threads', item: thread, id: threadId})
            commit('appendThreadToForum', {parentId: forumId, childId: threadId})
            commit('appendThreadToUser', {parentId: userId, childId: threadId})

            commit('setData', {resource: 'posts', item: post, id: postId})
            commit('appendPostToThread', {parentId: post.threadId, childId: postId})
            commit('appendPostToUser', {parentId: post.userId, childId: postId})

            resolve(state.all[threadId])
          })
      })
    },
    updateThread ({commit, state, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.all[id]
        const post = state.posts[thread.firstPostId]

        const edit = {
          at: Math.floor(Date.now() / 1000),
          by: state.authId
        }

        const updates = {}

        updates[`posts/${thread.firstPostId}/text`] = text
        updates[`posts/${thread.firstPostId}/edited`] = edit
        updates[`threads/${id}/title`] = title

        firebase.database().ref().update(updates)
          .then(() => {
            commit('setThread', {thread: {...thread, title}, threadId: id})
            commit('setPost', { postId: thread.firstPostId, post: { ...post, text, edited: edit } })

            resolve(post)
          })
      })
    },
    fetchThread: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'threads'}),
    fetchThreads: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'threads'})
  },
  mutations: {
    setThread (state, {thread, threadId}) {
      Vue.set(state.all, threadId, thread)
    },
    appendContributorToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'}),
    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'})
  }
}

import Vue from 'vue'
import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    all: {}
  },
  getters: {},
  actions: {
    createPost ({commit, state, rootState}, post) {
      const postId = firebase.database().ref('posts').push().key
      post.userId = rootState.auth.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      const updates = {}

      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`users/${post.userId}/posts/${postId}`] = postId

      firebase.database().ref().update(updates)
        .then(() => {
          commit('setData', {resource: 'posts', item: post, id: postId}, {root: true})
          commit('threads/appendPostToThread', {parentId: post.threadId, childId: postId}, {root: true})
          commit('threads/appendContributorToThread', {parentId: post.threadId, childId: post.userId}, {root: true})
          commit('users/appendPostToUser', {parentId: post.userId, childId: postId}, {root: true})

          return Promise.resolve(state.all[postId])
        })
    },
    updatePost ({commit, state, rootState}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.all[id]
        const edit = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }

        const updates = {text, edited: edit}

        firebase.database().ref('posts').child(id).update(updates)
          .then(() => {
            commit('setPost', { postId: id, post: { ...post, text, edited: edit } })

            resolve(post)
          })
      })
    },

    fetchPost: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'posts'}, {root: true}),
    fetchPosts: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'posts'}, {root: true})
  },
  mutations: {
    setPost (state, {post, postId}) {
      Vue.set(state.all, postId, post)
    }
  }
}

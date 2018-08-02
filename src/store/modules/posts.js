import Vue from 'vue'
import firebase from '../../../firebase'

export default {
  namespaced: true,
  state: {
    all: {}
  },
  getters: {},
  actions: {
    createPost ({commit, state}, post) {
      const postId = firebase.database().ref('posts').push().key
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      const updates = {}

      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`users/${post.userId}/posts/${postId}`] = postId

      firebase.database().ref().update(updates)
        .then(() => {
          commit('setData', {resource: 'posts', item: post, id: postId})
          commit('appendPostToThread', {parentId: post.threadId, childId: postId})
          commit('appendContributorToThread', {parentId: post.threadId, childId: post.userId})
          commit('appendPostToUser', {parentId: post.userId, childId: postId})

          return Promise.resolve(state.all[postId])
        })
    },
    updatePost ({commit, state}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.all[id]
        const edit = {
          at: Math.floor(Date.now() / 1000),
          by: state.authId
        }

        const updates = {text, edited: edit}

        firebase.database().ref('posts').child(id).update(updates)
          .then(() => {
            commit('setPost', { postId: id, post: { ...post, text, edited: edit } })

            resolve(post)
          })
      })
    },

    fetchPost: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'posts'}),
    fetchPosts: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'posts'})
  },
  mutations: {
    setPost (state, {post, postId}) {
      Vue.set(state.all, postId, post)
    }
  }
}

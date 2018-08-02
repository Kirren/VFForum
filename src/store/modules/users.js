import Vue from 'vue'
import firebase from 'firebase'

import { makeAppendChildToParentMutation } from '../storeHelpers'
import { countObjectLength, removeEmptyProps } from '../../helpers'

export default {
  namespaced: true,
  state: {
    all: {}
  },
  getters: {
    userThreadsCount: state => id => countObjectLength(state.all[id].threads),
    userPosts: state => id => {
      const user = state.all[id]
      if (user.posts) {
        return Object.values(state.posts)
          .filter(post => post.userId === id)
      }
      return []
    },
    userPostsCount: state => id => countObjectLength(state.all[id].posts)
  },
  actions: {
    createUser ({state, commit}, {id, email, name, username, avatar = null}) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000)
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()

        const user = {avatar, email, name, username, usernameLower, registeredAt}

        firebase.database().ref('users').child(id).set(user)
          .then(() => {
            commit('setData', {resource: 'users', id: id, item: user})
            resolve(state.all[id])
          })
      })
    },
    updateUser ({commit}, user) {
      const updates = {
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        bio: user.bio,
        website: user.website,
        email: user.email,
        location: user.location
      }
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(user['.key']).update(removeEmptyProps(updates))
          .then(() => {
            commit('setUser', {user, userId: user['.key']})
            resolve(user)
          })
      })
    },

    fetchUser: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'users'}),
    fetchUsers: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'users'})
  },
  mutations: {
    setUser (state, {user, userId}) {
      Vue.set(state.all, userId, user)
    },
    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  }
}

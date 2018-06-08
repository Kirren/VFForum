import firebase from 'firebase'

export default {
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

          resolve(state.threads[threadId])
        })
    })
  },
  updateThread ({commit, state, dispatch}, {title, text, id}) {
    return new Promise((resolve, reject) => {
      const thread = state.threads[id]
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

        return Promise.resolve(state.posts[postId])
      })
  },
  updatePost ({commit, state}, {id, text}) {
    return new Promise((resolve, reject) => {
      const post = state.posts[id]
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
  updateUser ({commit}, user) {
    commit('setUser', {user, userId: user['.key']})
  },
  fetchData: ({state, commit}, {id, resource}) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setData', {resource, id: snapshot.key, item: snapshot.val()})
        resolve(state[resource][id])
      })
    })
  },
  fetchDataArray: ({dispatch}, {ids, resource}) => {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchData', {id, resource})))
  },
  fetchCategory: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'categories'}),
  fetchAllCategories: ({state, commit}) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').once('value', snapshot => {
        const catObject = snapshot.val()
        Object.keys(catObject).forEach(catId => {
          const category = catObject[catId]
          commit('setData', {resource: 'categories', id: catId, item: category})
        })
        resolve(Object.values(state.categories))
      })
    })
  },
  fetchForum: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'forums'}),
  fetchForums: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'forums'}),
  fetchThread: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'threads'}),
  fetchThreads: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'threads'}),
  fetchUser: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'users'}),
  fetchUsers: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'users'}),
  fetchPost: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'posts'}),
  fetchPosts: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'posts'})
}

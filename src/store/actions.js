import firebase from 'firebase'

export default {
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
      commit('appendThreadToForum', {parentId: forumId, childId: threadId})
      commit('appendThreadToUser', {parentId: userId, childId: threadId})

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
  },
  fetchData ({state, commit}, {id, resource}) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setData', {resource, id: snapshot.key, item: snapshot.val()})
        resolve(state[resource][id])
      })
    })
  },
  fetchDataArray ({dispatch}, {ids, resource}) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchData', {id, resource})))
  },
  fetchCategory ({dispatch}, {id}) {
    return dispatch('fetchData', {id, resource: 'categories'})
  },
  fetchAllCategories ({state, commit}) {
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
  fetchForums ({dispatch}, {ids}) {
    return dispatch('fetchDataArray', {ids, resource: 'forums'})
  },
  fetchThread: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'threads'}),
  fetchThreads ({dispatch}, {ids}) {
    return dispatch('fetchDataArray', {ids, resource: 'threads'})
  },
  fetchUser: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'users'}),
  fetchUsers ({dispatch}, {ids}) {
    return dispatch('fetchDataArray', {ids, resource: 'users'})
  },
  fetchPost: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'posts'}),
  fetchPosts ({dispatch}, {ids}) {
    return dispatch('fetchDataArray', {ids, resource: 'posts'})
  }
}

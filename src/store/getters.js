import { countObjectLength } from '../helpers'

export default {
  authUser (state) {
    return state.authId ? state.users[state.authId] : null
  },
  userThreadsCount: state => id => countObjectLength(state.users[id].threads),
  userPosts: state => id => {
    const user = state.users[id]
    if (user.posts) {
      return Object.values(state.posts)
        .filter(post => post.userId === id)
    }
    return []
  },
  userPostsCount: state => id => countObjectLength(state.users[id].posts),
  threadContributorsCount: state => id => countObjectLength(state.threads[id].contributors) - 1
}

import {countObjectLength} from '../helpers'

export default {
  authUser (state) {
    return state.authId ? state.users[state.authId] : null
  },
  userThreadsCount: state => id => countObjectLength(state.users[id].threads),
  userPostsCount: state => id => countObjectLength(state.users[id].posts),
  threadContributorsCount: state => id => countObjectLength(state.threads[id].contributors) - 1,
  threadRepliesCount: state => id => countObjectLength(state.threads[id].posts) - 1
}

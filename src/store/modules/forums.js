import { makeAppendChildToParentMutation } from '../storeHelpers'

export default {
  state: {
    all: {}
  },
  getters: {},
  actions: {
    fetchForum: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'forums'}),
    fetchForums: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'forums'})
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'})
  }
}

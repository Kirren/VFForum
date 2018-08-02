import { makeAppendChildToParentMutation } from '../storeHelpers'

export default {
  namespaced: true,
  state: {
    all: {}
  },
  getters: {},
  actions: {
    fetchForum: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'forums'}, {root: true}),
    fetchForums: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'forums'}, {root: true})
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'})
  }
}

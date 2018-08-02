import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    all: {}
  },
  getters: {},
  actions: {
    fetchCategory: ({dispatch}, {id}) => dispatch('fetchData', {id, resource: 'categories'}, {root: true}),
    fetchCategories: ({dispatch}, {ids}) => dispatch('fetchDataArray', {ids, resource: 'categories'}, {root: true}),
    fetchAllCategories: ({state, commit}) => {
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const catObject = snapshot.val()
          Object.keys(catObject).forEach(catId => {
            const category = catObject[catId]
            commit('setData', {resource: 'categories', id: catId, item: category}, {root: true})
          })
          resolve(Object.values(state.all))
        })
      })
    }
  },
  mutations: {}
}

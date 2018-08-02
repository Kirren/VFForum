import firebase from 'firebase'

export default {
  fetchData: ({state, commit}, {id, resource}) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setData', {resource, id: snapshot.key, item: snapshot.val()})
        resolve(state[resource].all[id])
      })
    })
  },
  fetchDataArray: ({dispatch}, {ids, resource}) => {
    if (ids) {
      ids = Array.isArray(ids) ? ids : Object.keys(ids)
      return Promise.all(ids.map(id => dispatch('fetchData', {id, resource})))
    }
    return null
  }
}

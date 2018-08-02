import Vue from 'vue'

export default {
  setData (state, {resource, item, id}) {
    item['.key'] = id
    Vue.set(state[resource].all, id, item)
  }
}

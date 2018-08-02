import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    authId: null,
    unsubscribeAuthObserver: null
  },
  getters: {
    authUser (state, getters, rootState) {
      return state.authId ? rootState.users.all[state.authId] : null
    }
  },
  actions: {
    fetchAuthUser ({dispatch, commit}) {
      const userId = firebase.auth().currentUser.uid

      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(userId).once('value', snapshot => {
          if (snapshot.exists()) {
            return dispatch('fetchUser', {id: userId}, {root: true})
              .then(user => {
                commit('setAuthId', userId)
                resolve(user)
              })
          } else {
            resolve(null)
          }
        })
      })
    },
    initAuthentication ({dispatch, commit, state}) {
      return new Promise((resolve, reject) => {
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver()
        }
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('fetchAuthUser')
              .then(dbUser => resolve(dbUser))
          } else {
            resolve(null)
          }
        })
        commit('setUnsubscribeAuthObserver', unsubscribe)
      })
    },
    registerUserWithEmailAndPassword ({dispatch}, {email, name, username, password, avatar = null}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
          console.log(data)
          return dispatch('users/createUser', {
            id: data.user.uid,
            email,
            name,
            username,
            password,
            avatar
          }, {root: true})
        })
        .then(() => dispatch('fetchAuthUser'))
        .catch(error => alert(error.message))
    },
    signInWithEmailAndPassword (context, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message))
    },
    signInWithGoogle ({dispatch}) {
      const provider = new firebase.auth.GoogleAuthProvider()

      return firebase.auth().signInWithPopup(provider)
        .then(data => {
          const user = data.user
          console.log(user)

          firebase.database().ref('users').child(user.uid).once('value', snapshot => {
            if (!snapshot.exists()) {
              return dispatch('users/createUser', {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                username: user.email,
                avatar: user.photoURL
              }, {root: true})
                .then(() => dispatch('fetchAuthUser'))
                .catch(error => alert(error.message))
            }
          })
        })
    },
    signOut ({commit}) {
      return firebase.auth().signOut()
        .then(() => commit('setAuthId', null))
    }
  },
  mutations: {
    setAuthId (state, id) {
      state.authId = id
    },
    setUnsubscribeAuthObserver (state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe
    }
  }
}

import { persist } from './tools/db'

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  licenseNumber: '',
  phoneNumber: '',
  companyName: '',
  websiteUrl: '',
  title: ''
}
const state = {
  currentUser: emptyUser,
  currentId: ''
}
const mutations = {
  SET_LOCAL_USER (state, { user }) {
    state.currentUser = user
  },
  SET_USER (state, { user }) {
    let data = user.data()
    state.currentId = user.id
    state.currentUser = data
  },
  CLEAR (state) {
    state.currentId = ''
    state.currentUser = emptyUser
  }
}
const actions = {
  set ({ commit, rootState }, payload) {
    let user = payload || emptyUser
    // store locally
    commit('SET_LOCAL_USER', { user })
    // save in DB
    persist(rootState, 'users', state.currentId, user)
      .then((docId) => {
        if (docId) state.currentId = docId
      })
  },
  loggedIn ({ commit, rootState }, data) {
    let usersRef = rootState.db.collection('users')
    usersRef.where('email', '==', data.email).onSnapshot(function (userSnapshot) {
      userSnapshot.forEach(user => {
        if (user.exists) {
          commit('SET_USER', { user })
        } else {
          // need to save user in DB
          let user = state.currentUser
          // data that comes from firebase auth after login
          if (data.email) user.email = data.email

          commit('SET_LOCAL_USER', { user })
          persist(rootState, 'users', state.currentId, user)
            .then((newDocId) => {
              if (newDocId) state.currentId = newDocId
            })
        }
      })
    })
  },
  clear ({ commit }) {
    commit('CLEAR')
  }
}
export default {
  namespaced: true, state, mutations, actions
}

import { persist } from './db'

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
  all: {},
  currentUser: emptyUser,
  currentId: ''
}
const mutations = {
  SET_LOCAL_USER (state, { user }) {
    state.currentUser = user
  },
  SET_USER (state, { user }) {
    console.log('user: ', user)
    let data = user.data()
    console.log('user data: ', data)
    state.currentId = user.id
    state.currentUser = data
  }
}
const actions = {
  async get ({ commit, rootState }) {
    let userRef = rootState.db.collection('users')
    let users = await userRef.get()
    users.forEach(user => commit('SET_USER', { user }))
  },
  set ({ commit, rootState }, payload) {
    let user = payload || emptyUser
    // store locally
    commit('SET_LOCAL_USER', { user })
    // save in DB
    let userRef = rootState.db.collection('users')
    persist(userRef, state.currentId, user)
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
          if (data.firstName) user.firstName = data.firstName
          if (data.lastName) user.lastName = data.lastName
          if (data.email) user.email = data.email

          commit('SET_LOCAL_USER', { user })
          persist(usersRef, state.currentId, user)
            .then((newDocId) => {
              if (newDocId) state.currentId = newDocId
            })
        }
      })
    })
  }
}
export default {
  namespaced: true, state, mutations, actions
}

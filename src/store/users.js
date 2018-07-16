import { persist } from './tools/db'
import { eb } from '../main'

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
  async set ({ commit, rootState }, payload) {
    let user = payload || emptyUser
    // store locally
    commit('SET_LOCAL_USER', { user })
    // save in DB
    persist(rootState, 'users', state.currentId, user)
      .then((docId) => {
        if (docId) state.currentId = docId
      })
  },
  async loggedIn ({ commit, rootState }, data) {
    let usersRef = rootState.db.collection('users')
    console.log('userloggedin', data.email)
    usersRef.where('email', '==', data.email).onSnapshot(function (userSnapshot) {
      if (userSnapshot.empty) {
        console.log('saving user in db')
        // need to save user in DB
        let user = state.currentUser
        // data that comes from firebase auth after login
        if (data.email) user.email = data.email
        commit('SET_LOCAL_USER', { user })
        persist(rootState, 'users', state.currentId, user)
          .then((newDocId) => {
            if (newDocId) state.currentId = newDocId
            eb.$emit('loadUserData', state.currentId)
          })
      } else {
        userSnapshot.forEach(user => {
          if (user.exists) {
            commit('SET_USER', { user })
            eb.$emit('loadUserData', state.currentId)
          }
        })
      }
    })
  },
  clear ({ commit }) {
    commit('CLEAR')
  }
}
export default {
  namespaced: true, state, mutations, actions
}

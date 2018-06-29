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
  currentUser: emptyUser
}
const mutations = {
  SET_USER (state, { user }) {
    state.currentUser = user
  }
}
const actions = {
  seed ({ rootState }) {
    let userRef = rootState.db.collection('users')
    userRef.doc('m_ke').set({
      firstName: 'Monika',
      lastName: 'Kedrova'
    })
  },
  async get ({ commit, rootState }) {
    let userRef = rootState.db.collection('users')
    let users = await userRef.get()
    users.forEach(user => commit('SET_USER', { user }))
  },
  set ({ commit }, payload) {
    let user = payload || emptyUser
    commit('SET_USER', { user })
  }
}
export default {
  namespaced: true, state, mutations, actions
}

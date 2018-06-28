const state = {
  all: {},
  currentUser: 'm_ke'
}
const mutations = {
  SET_USER (state, { user }) {
    state.all = {
      ...state.all,
      [user.id]: user.data()
    }
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
  }
}
export default {
  namespaced: true, state, mutations, actions
}
const state = {
  all: {},
  allIds: [],
  currentId: null,
  wip: false
}
const mutations = {
  SET_VALUATION (state, { valuation }) {
    let data = valuation.data()
    state.all = {
      ...state.all,
      [valuation.id]: data
    }
    state.allIds.push(valuation.id)
  },
  SET_CURRENT (state, valuationId) {
    console.log('SET CURRENT:', valuationId)
    state.currentId = valuationId
  },
  TOGGLE_WIP (state) {
    state.wip = !state.wip
  }
}
const actions = {
  async get ({ commit, rootState }) {
    let valuationRef = rootState.db.collection('valuations')
    let valuations = await valuationRef.get()
    valuations.forEach(valuation => commit('SET_VALUATION', { valuation }))
  },
  setCurrent ({ commit }, valuationId) {
    console.log('set current action. id: ', valuationId)
    commit('SET_CURRENT', valuationId)
  },
  toggleWip ({ commit }) {
    commit('TOGGLE_WIP')
  }
}

export default {
  namespaced: true, state, mutations, actions
}

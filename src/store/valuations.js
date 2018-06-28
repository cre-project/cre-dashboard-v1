const empty = {
  property: {
    name: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    yearBuilt: null,
    numberOfStories: null,
    lotSize: null,
    price: null
  }
}
const state = {
  all: {},
  allIds: [],
  isEditing: false,
  currentId: null,
  wip: empty
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
  SET_WIP (state, {val, id}) {
    console.log('SET WIP:', val)
    state.currentId = id
    state.wip = val
  },
  TOGGLE_EDITING (state) {
    state.isEditing = !state.isEditing
  }
}
const actions = {
  async get ({ commit, rootState }) {
    let valuationRef = rootState.db.collection('valuations')
    let valuations = await valuationRef.get()
    valuations.forEach(valuation => commit('SET_VALUATION', { valuation }))
  },
  setWip ({ commit }, {valuation, id}) {
    console.log('set wip action. valuation: ', valuation)
    let val = valuation || empty
    console.log('val', val)
    commit('SET_WIP', {val, id})
  },
  toggleEditing ({ commit }) {
    commit('TOGGLE_EDITING')
  }
}

export default {
  namespaced: true, state, mutations, actions
}

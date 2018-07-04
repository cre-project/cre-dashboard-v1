import { emptyValuation, emptyProperty } from './tools/templates'
import { fetchAll, persist } from './tools/db'

const state = {
  all: {},
  allIds: [],
  isEditing: false,
  selectedValuationId: '',
  selectedValuation: emptyValuation
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
    state.selectedValuationId = id
    state.selectedValuation = val
  },
  SET_WIP_PROPERTY (state, property) {
    state.selectedValuation.property = property
  },
  SET_WIP_OS (state, {current, potential}) {
    state.selectedValuation.operatingStatementCurrent = current
    state.selectedValuation.operatingStatementPotential = potential
  },
  ADD_RENT_COMPARABLE (state, comparable) {
    state.selectedValuation.rentComps.push(comparable)
  },
  TOGGLE_EDITING (state) {
    state.isEditing = !state.isEditing
  }
}
const actions = {
  // DB ACTIONS
  async fetchAll ({ commit, rootState }) {
    fetchAll(rootState, 'valuations').then(valuations => {
      valuations.forEach(valuation => commit('SET_VALUATION', { valuation }))
    })
  },
  async persist ({ commit, rootState }) {
    persist(rootState, 'valuations', state.selectedValuationId, state.selectedValuation).then((docId) => {
      if (docId) state.selectedValuationId = docId
    })
  },
  // LOCAL STORE ACTIONS
  setWip ({ commit }, {valuation, id}) {
    let val = valuation || emptyProperty
    commit('SET_WIP', {val, id})
  },
  setProperty ({ commit }, property) {
    property = property || emptyProperty
    commit('SET_WIP_PROPERTY', property)
  },
  setWipOS ({ commit }, {current, potential}) {
    commit('SET_WIP_OS', {current, potential})
  },
  addRentComparable ({ commit }, comparable) {
    commit('ADD_RENT_COMPARABLE', comparable)
  },
  toggleEditing ({ commit }) {
    commit('TOGGLE_EDITING')
  }
}

export default {
  namespaced: true, state, mutations, actions
}

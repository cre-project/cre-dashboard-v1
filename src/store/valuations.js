import { emptyValuation, emptyProperty } from './tools/templates'
import { fetchAll, persist } from './tools/db'

const state = {
  all: {},
  isEditing: false,
  selectedValuationId: '',
  selectedValuation: emptyValuation
}
const getters = {
  // rent per year for all units combined
  grossRentCurrent () {
    return state.selectedValuation.units.reduce((acc, unit) => acc + (Number(unit.currentRent) || 0), 0) * 12
  },
  grossRentPotential () {
    return state.selectedValuation.units.reduce((acc, unit) => acc + (Number(unit.potentialRent) || 0), 0) * 12
  },
  pricePerUnit () {
    return (Number(state.selectedValuation.price) / (state.selectedValuation.units.length || 1)).toFixed(2)
  },
  pricePerSf () {
    let sf = state.selectedValuation.units.reduce((acc, unit) => acc + (Number(unit.squareFeet) || 0), 0)
    return (Number(state.selectedValuation.price) / (sf || 1)).toFixed(2)
  }
}
const mutations = {
  SET_VALUATION (state, { valuation, id }) {
    if (Object.keys(state.all).indexOf(id) === -1) {
      state.all = {
        ...state.all,
        [id]: valuation
      }
    } else {
      state.all[id] = valuation
    }
  },
  SET_SELECTED_ID (state, id) {
    state.selectedValuationId = id
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
  SET_UNITS (state, units) {
    state.selectedValuation.units = units
  },
  SET_PRICE (state, price) {
    state.selectedValuation.price = price
  },
  ADD_RENT_COMPARABLE (state, comparable) {
    state.selectedValuation.rentComps.push(comparable)
  },
  ADD_SALES_COMPARABLE (state, comparable) {
    console.log('adding comp', comparable)
    state.selectedValuation.salesComps.push(comparable)
  },
  TOGGLE_EDITING (state) {
    state.isEditing = !state.isEditing
  }
}
const actions = {
  // DB ACTIONS
  async fetchAll ({ commit, rootState }, userId) {
    fetchAll(rootState, 'valuations', userId).then(valuations => {
      valuations.forEach(valuation => commit('SET_VALUATION', { valuation: valuation.data(), id: valuation.id }))
    })
  },
  async persist ({ commit, rootState }) {
    // tie the valuation to user
    if (!state.selectedValuation.userId || state.selectedValuation.userId === '') {
      state.selectedValuation.userId = rootState.users.currentId
    }
    if (!state.selectedValuation.createdOn) {
      state.selectedValuation.createdOn = new Date()
    }
    persist(rootState, 'valuations', state.selectedValuationId, state.selectedValuation).then((docId) => {
      if (docId && docId !== state.selectedValuationId) {
        console.log('New valuation was inserted')
        // new valuation was inserted
        commit('SET_VALUATION', { valuation: state.selectedValuation, id: docId })
        commit('SET_SELECTED_ID', docId)
      } else {
        console.log('Existing valuation was updated')
      }
    })
  },
  // LOCAL STORE ACTIONS
  setWip ({ commit }, {valuation, id}) {
    let val = valuation || Object.assign({}, emptyValuation)
    commit('SET_WIP', {val, id})
  },
  resetWip ({ commit }) {
    let val = Object.assign({}, emptyValuation)
    let id = ''
    commit('SET_WIP', {val, id})
  },
  setProperty ({ commit }, property) {
    property = property || Object.assign({}, emptyProperty)
    commit('SET_WIP_PROPERTY', property)
  },
  setWipOS ({ commit }, {current, potential}) {
    commit('SET_WIP_OS', {current, potential})
  },
  setPrice ({ commit }, price) {
    commit('SET_PRICE', price || 0)
  },
  addComparable ({ commit }, {comparable, compType}) {
    console.log('adding comp, type', compType)
    if (compType === 'rent') {
      commit('ADD_RENT_COMPARABLE', comparable)
    } else if (compType === 'sales') {
      commit('ADD_SALES_COMPARABLE', comparable)
    }
  },
  addUnits ({ commit }, units) {
    commit('SET_UNITS', units)
  },
  toggleEditing ({ commit }) {
    commit('TOGGLE_EDITING')
  }
}

export default {
  namespaced: true, state, mutations, actions, getters
}

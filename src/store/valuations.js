import { emptyValuation, emptyProperty } from './tools/templates'
import { fetchAll, persist } from './tools/db'

const state = {
  all: {},
  isEditing: false,
  selectedValuationId: '',
  selectedValuation: emptyValuation
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
    persist(rootState, 'valuations', state.selectedValuationId, state.selectedValuation).then((docId) => {
      if (docId) {
        // new valuation was inserted
        commit('SET_VALUATION', { valuation: state.selectedValuation, id: docId })
      } else {
        console.log('Existing  valuation was updated')
      }
    })
  },
  // LOCAL STORE ACTIONS
  setWip ({ commit }, {valuation, id}) {
    let val = valuation || Object.assign({}, emptyValuation)
    commit('SET_WIP', {val, id})
  },
  newWip ({ commit }) {
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
  addComparable ({ commit }, {comparable, compType}) {
    console.log('adding comp, type', compType)
    if (compType === 'rent') {
      commit('ADD_RENT_COMPARABLE', comparable)
    } else if (compType === 'sales') {
      commit('ADD_SALES_COMPARABLE', comparable)
    }
  },
  toggleEditing ({ commit }) {
    commit('TOGGLE_EDITING')
  }
}

export default {
  namespaced: true, state, mutations, actions
}

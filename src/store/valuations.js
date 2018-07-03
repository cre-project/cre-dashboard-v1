import { emptyCurrentOperatingStatement, emptyPotentialOperatingStatement, emptyProperty } from './tools/templates'

const state = {
  all: {},
  allIds: [],
  isEditing: false,
  currentId: null,
  wip: emptyProperty,
  units: [],
  salesComps: [],
  rentComps: [{
    state: 'CA',
    name: 'test',
    address: 'xxx',
    type: '123',
    rent: 1500
  }],
  price: 0,
  pricePerUnit: 0,
  pricePerSf: 0,
  statementCurrent: emptyCurrentOperatingStatement,
  statementPotential: emptyPotentialOperatingStatement
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
    state.currentId = id
    state.wip = val
  },
  SET_WIP_PROPERTY (state, property) {
    state.wip.property = property
  },
  SET_WIP_OS (state, {current, potential}) {
    state.wip.operatingStatementCurrent = current
    state.wip.operatingStatementPotential = potential
  },
  ADD_RENT_COMPARABLE (state, comparable) {
    state.rentComps.push(comparable)
  },
  TOGGLE_EDITING (state) {
    state.isEditing = !state.isEditing
  }
}
const actions = {
  // DB ACTIONS
  async get ({ commit, rootState }) {
    let valuationRef = rootState.db.collection('valuations')
    let valuations = await valuationRef.get()
    valuations.forEach(valuation => commit('SET_VALUATION', { valuation }))
  },
  async persist ({ commit, rootState }) {
    let valuationRef = rootState.db.collection('valuations')
    // add new document
    if (!state.currentId) {
      state.wip.createdOn = new Date()
      valuationRef.add(state.wip)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id)
          return docRef.get()
        })
        .then(valuation => commit('SET_VALUATION', { valuation }))
        .catch(error => console.error('Error adding document: ', error))
    } else {
      // update existing document
      valuationRef.doc(state.currentId).update(state.wip)
        .then(res => console.log('Data saved'))
        .catch(err => console.error('something went wrong', err))
    }
  },
  // LOCAL STORE ACTIONS
  setWip ({ commit }, {valuation, id}) {
    let val = valuation || emptyProperty
    commit('SET_WIP', {val, id})
  },
  setWipProperty ({ commit }, property) {
    property = property || emptyProperty
    commit('SET_WIP_PROPERTY', property)
  },
  setWipOS ({ commit }, {current, potential}) {
    commit('SET_WIP_OS', {current, potential})
  },
  addRentComparable ({ commit }, comparable) {
    console.log('adding comparable', comparable)
    commit('ADD_RENT_COMPARABLE', comparable)
  },
  toggleEditing ({ commit }) {
    commit('TOGGLE_EDITING')
  }
}

export default {
  namespaced: true, state, mutations, actions
}

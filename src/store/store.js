import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    valuations: [],
    wipData: {},
    user: {},
    isLoggedIn: false
  },
  getters: {
    valuations: state => {
      return state.valuations
    },
    user: state => {
      return state.user
    },
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  },
  mutations: {
    storeUser: (state, payload) => {
      state.isLoggedIn = true
      state.user = payload.user
    },
    clearUser: state => {
      state.isLoggedIn = false
      state.user = {}
    },
    addValuation: state => {
      state.valuations.push(state.wipData)
      state.wipData = {}
    },
    addValuationAlt: (state, payload) => {
      console.log(payload)
      state.valuations.push(state.wipData)
      state.wipData = {}
    }
  },
  actions: {
    // Session
    storeUser: ({ commit }, payload) => {
      commit('storeUser', payload)
    },
    clearUser: ({ commit }) => {
      commit('clearUser')
    },
    // Valuations
    saveValuation: context => {
      context.commit('addValuation')
    },
    saveValuationAsync: ({ commit }, payload) => {
      setTimeout(() => {
        commit('addValuation')
        console.log(payload)
      }, 1000)
    }
  }
})

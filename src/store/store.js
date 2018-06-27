import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main'

// Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    isLoggedIn: false
  },
  getters: {
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
    setValuations: (state, payload) => {
      if (payload) {
        state.valuations = payload
      } else {
        state.valuations = []
      }
    }
  },
  actions: {
    // Session
    storeUser: ({ commit }, payload) => {
      commit('storeUser', payload)
    },
    clearUser: ({ commit }) => {
      commit('clearUser')
    }
  }
})

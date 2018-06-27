import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import 'firebase/firestore'
import firebase from 'firebase/app'
import users from './users'
import valuations from './valuations'

Vue.use(Vuex)

// Initialize Firebase
firebase.initializeApp(process.env.FIREBASE)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const state = {
  db: db
}

export default new Vuex.Store({
  state,
  modules: {
    users,
    valuations
  }
})

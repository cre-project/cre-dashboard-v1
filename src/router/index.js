import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import VueNumeric from 'vue-numeric'

import Login from '@/routes/Login'
import SignUp from '@/routes/SignUp'
import Preview from '@/routes/Preview'
import Valuations from '@/routes/Valuations'
import PropertyInfo from '@/routes/PropertyInfo'
import UnitMix from '@/routes/UnitMix'
import RentComparables from '@/routes/RentComparables'
import SalesComparables from '@/routes/SalesComparables'
import OperatingStatement from '@/routes/OperatingStatement'
import UserSettings from '@/routes/UserSettings'
import AgentInfo from '@/routes/AgentInfo'
import CompanySettings from '@/routes/CompanySettings'

// Sub-components
import MainHeader from '@/components/MainHeader'
import NavigationHeader from '@/components/NavigationHeader'

Vue.component('main-header', MainHeader)
Vue.component('navigation-header', NavigationHeader)

Vue.use(Router)
Vue.use(VueNumeric)

export const routes = [
  { path: '*', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Sign Up', component: SignUp },
  { path: '/valuations', name: 'Valuations', component: Valuations, meta: { requiresAuth: true } },
  { path: '/property-info', name: 'PROPERTY INFO', component: PropertyInfo, meta: { requiresAuth: true, isNav: true } },
  { path: '/unit-mix', name: 'UNIT MIX', component: UnitMix, meta: { requiresAuth: true, isNav: true } },
  { path: '/operating-statement', name: 'OPERATING STATEMENT', component: OperatingStatement, meta: { requiresAuth: true, isNav: true } },
  { path: '/sales-comparables', name: 'SALES COMPARABLES', component: SalesComparables, meta: { requiresAuth: true, isNav: true } },
  { path: '/rent-comparables', name: 'RENT COMPARABLES', component: RentComparables, meta: { requiresAuth: true, isNav: true } },
  { path: '/preview', name: 'PREVIEW', component: Preview, meta: { requiresAuth: true, isNav: true } },
  { path: '/user-settings', name: 'User Settings', component: UserSettings, meta: { requiresAuth: true } },
  { path: '/company-settings', name: 'Company Settings', component: CompanySettings, meta: { requiresAuth: true } },
  { path: '/agent-info', name: 'Agent Information', component: AgentInfo, meta: { requiresAuth: true } }
]

let router = new Router({
  routes: routes
})

// keep track of first auth state change
let authStateChanged = false

// check whether a user is logged in a redirect depending on whether auth is required for the given route
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // need to add callback on authState observer because on page load currentUser is still null (firebase not yet initialized)
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // onAuthStateChanged gets called too many times but users/loggedIn should only be called once
      if (!authStateChanged) {
        store.dispatch('users/loggedIn', user)
        authStateChanged = true
      }
      if (!requiresAuth) next('valuations')
      else next()
    } else {
      if (requiresAuth) next('login')
      else next()
    }
  })
})

export default router

// event bus
export const eb = new Vue()

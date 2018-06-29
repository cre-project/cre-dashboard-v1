import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
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

// Sub-components
import MainHeader from '@/components/MainHeader'
import NavigationHeader from '@/components/NavigationHeader'

Vue.component('main-header', MainHeader)
Vue.component('navigation-header', NavigationHeader)

Vue.use(Router)

export const routes = [
  { path: '*', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Sign Up', component: SignUp },
  { path: '/preview', name: 'Preview', component: Preview, meta: { requiresAuth: true } },
  { path: '/valuations', name: 'Valuations', component: Valuations, meta: { requiresAuth: true } },
  { path: '/property-info', name: 'Property Info', component: PropertyInfo, meta: { requiresAuth: true } },
  { path: '/unit-mix', name: 'Unit Mix', component: UnitMix, meta: { requiresAuth: true } },
  { path: '/rent-comparables', name: 'Rent Comparables', component: RentComparables, meta: { requiresAuth: true } },
  { path: '/sales-comparables', name: 'Sales Comparables', component: SalesComparables, meta: { requiresAuth: true } },
  { path: '/operating-statement', name: 'Operating Statement', component: OperatingStatement, meta: { requiresAuth: true } },
  { path: '/user-settings', name: 'User Settings', component: UserSettings, meta: { requiresAuth: true } }
]

let router = new Router({
  routes: routes
})

// check whether a user is logged in a redirect depending on whether auth is required for the given route
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // need to add callback on authState observer because on page load currentUser is still null (firebase not yet initialized)
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // if user is logged in, save user data in the store
      // this.$store.dispatch('setUser', user)
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

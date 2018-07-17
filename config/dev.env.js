'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE: {
    apiKey: '"AIzaSyCggcOompCU9QYwYXxbdOSHbge6QDoNspI"',
    authDomain: '"cre-dashboard.firebaseapp.com"',
    databaseURL: '"https://cre-dashboard.firebaseio.com"',
    projectId: '"cre-dashboard"',
    storageBucket: '"cre-dashboard.appspot.com"',
    messagingSenderId: '"62129201514"'
  }
})

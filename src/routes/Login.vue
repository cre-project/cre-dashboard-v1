<template>
    <div id="login-wrapper">
        <img src="~@/assets/logo.png" alt="Your logo here" width="200" />
        <form>
            <label>
                <div>Email</div>
                <input v-model="email">
            </label>
            <label>
                <div>Password</div>
                <input v-model="password" type="password">
            </label>
            <button @click="logIn">Log in</button>
            <label>
                <input style="width: unset;" type="checkbox"> Keep me logged in
            </label>
        </form>
        <div><a href="#">Forgot username or password?</a></div>
        <div class="m-t-3">Need an account? <router-link to="/signup">Create an account</router-link></div>
    </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logIn () {
      let vm = this
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          vm.$router.replace('valuations')
        },
        function (err) {
          alert('something went wrong ' + err.message)
        }
      )
    }
  }
}
</script>
<style scoped>
#login-wrapper {
    width: 45%;
    background-color: white;
    padding: 5em 10em;
    width: 45%;
    margin: auto;
    margin-top: 5em;
}
</style>

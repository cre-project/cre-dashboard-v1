<template>
    <div id="signup-wrapper">
        <img src="~@/assets/logo.png" alt="Your logo here" width="200" />
        <form>
            <label>
                <div>Email</div>
                <input v-model="email">
            </label>
            <label>
                <div>Password</div>
                <input  v-model="password" type="password">
            </label>
            <button @click="signUp">Sign Up</button>
        </form>
        <div class="m-t-3">Already a user? <router-link to="/login">Log in</router-link></div>
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
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .catch((err) => alert('Something went wrong: ' + err.message))
    }
  }
}
</script>
<style scoped>
#signup-wrapper {
    width: 45%;
    background-color: white;
    padding: 5em 10em;
    width: 45%;
    margin: auto;
    margin-top: 5em;
}
</style>

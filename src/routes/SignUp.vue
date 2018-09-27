<template>
    <div id="wrapper" class="signup">
        <img id="logo" src="~@/assets/logo.png" alt="Your logo here" width="200" />
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
        <div id="bottom">Already a user? <router-link to="/login">Log in</router-link></div>
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
@import "../assets/css/main.css";

    #wrapper {
        display: grid;
        grid-template-rows: 0.5fr 2fr 4fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 2em;
        grid-template-areas:
        'x y z'
        'a b c'
        'd e f'
        'j k l';
    }
    form {
        grid-area: e;
    }
    #logo {
        grid-area: b;
        margin: auto;
    }
    #bottom {
        grid-area: k;
        width: 50%;
        margin: auto;
    }
    input[type='checkbox'] {
        width: auto;
    }
</style>

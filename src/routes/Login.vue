<template>
    <div id="wrapper" class="login">
        <img id="logo" src="~@/assets/logo.png" alt="Your logo here" width="200" />
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
                <input type="checkbox"> Keep me logged in
            </label>
        </form>
        <div id="helper"><a href="#">Forgot username or password?</a></div>
        <div id="bottom">Need an account? <router-link to="/signup">Create an account</router-link></div>
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
    #wrapper {
        background-image: url(http://www.steamatic.com/images/footer-pattern-grey.jpg);
        background-repeat: repeat;
        background-position: center center;
        background-size: cover;
        overflow: hidden;
        display: grid;
        grid-template-rows: 0.5fr 2fr 4fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
        'x y z'
        'a b c'
        'd e f'
        'g h i'
        'j k l';
    }

    form {
        grid-area: e;
    }
    #logo {
        grid-area: b;
        margin: auto;
    }
    #helper {
        grid-area: h;
        width: 50%;
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

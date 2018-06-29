<template>
    <header>
        <router-link class="header-image" to="/valuations">
          <i class="material-icons">home</i>
        </router-link>
        <div id="menu">
            <div id="beta-tag">BETA</div>
            <button id="logout" v-if="isLoggedIn" @click="logOut">Log Out</button>
            <!-- <div id="symbol">&#8964;</div> -->
            <div class="header-image" id="search">
                <img class="header-image" src="~@/assets/search-icon.png" alt="Search" />
            </div>
        </div>
    </header>
</template>
<script>
import firebase from 'firebase'

export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('clearUser')
        this.$router.replace('login')
      })
    }
  }
}
</script>
<style scoped>
    #logout {
        padding: 0.25em 0.5em;
        margin-top: 17px;
        margin-right: 2em;
    }
    .material-icons {
      font-size: 3rem;
      padding: 0.5rem;
      color:#F2F2F2;
    }
</style>

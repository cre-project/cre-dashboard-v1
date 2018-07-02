<template>
    <header>
        <router-link class="header-image" to="/valuations">
          <i class="material-icons">home</i>
        </router-link>
        <div id="menu">
            <!-- <div id="beta-tag">BETA</div> -->
          <router-link class="header-image" to="/user-settings" v-if="isAuthenticated">
              <i class="material-icons">person</i>
          </router-link>
          <i class="material-icons" v-if="isAuthenticated" @click="logOut" title="log out">lock_open</i>
          <div class="header-image" id="search">
            <!-- <div id="symbol">&#8964;</div> -->
                <!-- <img class="header-image" src="~@/assets/search-icon.png" alt="Search" /> -->
            </div>
        </div>
    </header>
</template>
<script>
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentId: state => state.users.currentId
    }),
    isAuthenticated () {
      return this.currentId.length !== 0
    }
  },
  methods: {
    ...mapActions('users', ['clear']),
    logOut () {
      firebase.auth().signOut().then(() => {
        this.clear()
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
      font-size: 2.7rem;
      padding: 0.5rem;
      color:#F2F2F2;
      cursor: pointer;
    }
</style>

<template>
  <nav id="top" class="navbar cre-nav" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/valuations">
        <i class="material-icons">home</i>
      </router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <router-link class="header-image" to="/user-settings" v-if="isAuthenticated">
            <i class="material-icons">person</i>
        </router-link>
        <i class="material-icons" v-if="isAuthenticated" @click="logOut" title="log out">exit_to_app</i>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
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
  color:#F2F2F2;
}

#top {
  background-color: var(--header-blue);
}

</style>

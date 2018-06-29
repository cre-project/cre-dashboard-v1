<template>
    <div class="wrapper">
        <h1 class="auto-margin">User Settings</h1>
        <!-- part 1 of the form -->
        <form id="form-left">
            <div class="box">
                <label class="half-size">
                    <div class="half-size">First Name</div>
                    <input class="half-size" v-model="user.firstName">
                </label>
                <label class="half-size">
                    <div class="half-size">Last Name</div>
                    <input class="half-size" v-model="user.lastName">
                </label>
            </div>
            <label>
                <div>Position/ Title</div>
                <input v-model="user.title">
            </label>
            <label>
                <div>Email</div>
                <input v-model="user.email">
            </label>
            <label>
                <div>Phone Number</div>
                <input v-model="user.phoneNumber">
            </label>
            <label>
                <div>TODO: User picture</div>
            </label>
        </form>
        <!-- part 2 of the form -->
        <form id="form-right">
            <label>
                <div>License Number</div>
                <input v-model="user.licenseNumber">
            </label>
            <label>
                <div>Company Name</div>
                <input v-model="user.companyName">
            </label>
            <label>
                <div>Website URL</div>
                <input v-model="user.email">
            </label>
            <label>
                <div>TODO: Add Company logo</div>
            </label>
        </form>
        <button class="save" type="submit" @click="save">Save</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import router from '../router/index'

export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions('users', ['set']),
    save () {
      this.set(this.user)
      router.push('./valuations')
    }
  },
  created () {
    // fill up the local user object
    this.user = this.$store.state.users.currentUser
  }
}
</script>
<style scoped>
  #form-right {
    margin-top: 0;
    margin-left: 2rem;
  }
  .half-size {
    margin-right: 2em;
  }
</style>

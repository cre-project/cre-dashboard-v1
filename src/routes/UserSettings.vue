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
                <div>Add Profile Picture</div>
                <img class="hidden" id="profile-preview">
                <input type="file" class="save hidden" @input="loadProfilePic">
                <i class="large material-icons clickable" id="profile-icon">add_a_photo</i>
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
                <div>Add Company Logo</div>
                <img class="hidden" id="logo-preview" title="click to change picture">
                <input type="file" class="save hidden" @input="loadLogo">
                <i class="large material-icons clickable" id="logo-icon">add_a_photo</i>
            </label>
        </form>
        <button class="save" type="submit" @click="save">Save</button>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import router from '../router/index'
// import { upload } from '../store/tools/images'

export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions('users', ['set']),
    ...mapState({
      userId: state => state.users.currentId
    }),
    save () {
      this.set(this.user)
      router.push('./valuations')
    },
    loadNewImage (previewEl, button, imgName, evt) {
      let file = evt.target.files[0]
      let fileName = `${this.userId}/${name}`
      let reader = new FileReader()

      reader.addEventListener('load', function (evt) {
        previewEl.src = evt.target.result
        previewEl.classList.remove('hidden')
        previewEl.classList.add('clickable')
        button.classList.remove('clickable')
        button.classList.add('hidden')
        // upload(fileName, evt.target.result)
      })
      reader.readAsDataURL(file)
    },
    loadProfilePic (evt) {
      const preview = document.querySelector('#profile-preview')
      const icon = document.querySelector('#profile-icon')

      this.loadNewImage(preview, icon, 'profile.jpg', evt)
    },
    loadLogo (evt) {
      const preview = document.querySelector('#logo-preview')
      const icon = document.querySelector('#logo-icon')

      this.loadNewImage(preview, icon, 'logo.jpg', evt)
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
  .clickable {
    cursor: pointer;
  }
</style>

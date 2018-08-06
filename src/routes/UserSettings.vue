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
                <div>Profile Picture</div>
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
                <input v-model="user.website">
            </label>
            <label>
                <div>Company Logo</div>
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
import { upload, getUrl } from '../store/tools/images'

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
    },
    loadNewImage (previewEl, button, imgName, evt) {
      let file = evt.target.files[0]
      let reader = new FileReader()
      let fileName = `images/${imgName}`

      reader.addEventListener('load', function (evt) {
        previewEl.src = evt.target.result
        previewEl.classList.remove('hidden')
        previewEl.classList.add('clickable')
        button.classList.remove('clickable')
        button.classList.add('hidden')
        upload(fileName, evt.target.result)
      })
      reader.readAsDataURL(file)
    },
    loadExistingImage (previewEl, button, url) {
      previewEl.src = url
      previewEl.classList.remove('hidden')
      previewEl.classList.add('clickable')
      button.classList.remove('clickable')
      button.classList.add('hidden')
    },
    loadProfilePic (evt) {
      const profilePreview = document.querySelector('#profile-preview')
      const profileIcon = document.querySelector('#profile-icon')
      let fileName = `${this.userId}/profile.png`
      this.loadNewImage(profilePreview, profileIcon, fileName, evt)
    },
    loadLogo (evt) {
      const logoPreview = document.querySelector('#logo-preview')
      const logoIcon = document.querySelector('#logo-icon')
      let fileName = `${this.userId}/logo.png`
      this.loadNewImage(logoPreview, logoIcon, fileName, evt)
    }
  },
  computed: {
    ...mapState({
      userId: state => state.users.currentId
    })
  },
  created () {
    // fill up the local user object
    this.user = this.$store.state.users.currentUser
    let vm = this
    // load logo and preview if they exist
    getUrl(`images/${this.$store.state.users.currentId}/profile.png`).then(downloadUrl => {
      if (downloadUrl) {
        vm.loadExistingImage(document.querySelector('#profile-preview'), document.querySelector('#profile-icon'), downloadUrl)
      }
    })
    getUrl(`images/${this.$store.state.users.currentId}/logo.png`).then(downloadUrl => {
      if (downloadUrl) {
        vm.loadExistingImage(document.querySelector('#logo-preview'), document.querySelector('#logo-icon'), downloadUrl)
      }
    })
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

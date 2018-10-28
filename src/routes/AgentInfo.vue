<template>
  <div>
    <user-nav/>
    <div class="cre-content">
      <h1 class="subtitle is-size-4 has-text-weight-semibold">Agent Bio</h1>
      <div style="margin: 5em;">
        <label>
          <h2 class="has-text-weight-semibold">Position/ Title</h2>
          <input v-model="user.title">
        </label>

        <label>
          <h2 class="has-text-weight-semibold">License Number</h2>
          <input v-model="user.licenseNumber">
        </label>

        <label>
          <h2 class="has-text-weight-semibold">Description</h2>
          <b-input class="m-t-2" type="textarea" v-model="user.description"/>
        </label>
        
        <label>
          <h2 class="m-t-3 has-text-weight-semibold">List of Recent Closings</h2>
        </label>
        <comparables compType="sale" :comparables="closings"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import router from '../router/index'
import { upload, getUrl } from '../store/tools/images'
import UserNav from '@/components/UserNav'
import Comparables from '@/components/Comparables'

export default {
  components: {
    Comparables,
    UserNav
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions('users', ['set']),
    ...mapState({
      closings: state => state.users.closings
    }),
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

<template>
    <div>
        <navigation-header selected="preview"></navigation-header>
        <iframe
            id="pdf"
            width="100%"
            height="900"
            frameborder="0"
            src="">
        </iframe>
    </div>
</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex';
import { upload } from '../store/tools/images'
import { emptyComparable } from '../store/tools/templates';

export default {
  methods: {
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
    loadImg (evt) {
      let id = evt.srcElement.id
      const preview = document.querySelector(`#${id}-preview`)
      const icon = document.querySelector(`#${id}-icon`)
      let fileName = `${this.userId}/${id}.png`
      this.loadNewImage(preview, icon, fileName, evt)
    },
    formatPrice (value) {
      let val = (value / 1).toFixed().replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    ...mapState({
      selectedValuation: state => state.valuations.selectedValuation,
      company: state => state.users.currentUser.companyName,
      firstname: state => state.users.currentUser.firstName,
      lastname: state => state.users.currentUser.lastName,
      email: state => state.users.currentUser.email
    }),
    address () {
      let property = this.selectedValuation.property
      return `${property.address || ''}, ${property.city || ''}`
    },
    street () {
      let property = this.selectedValuation.property
      return `${property.address || ''}`
    },
    city () {
      let property = this.selectedValuation.property
      return `${property.city || ''}`
    },
    state () {
      let property = this.selectedValuation.property
      return `${property.state || ''}`
    },
    zip () {
      let property = this.selectedValuation.property
      return `${property.zip || ''}`
    },
    year () {
      let property = this.selectedValuation.property
      return `${property.yearBuilt || ''}`
    },
    stories () {
      let property = this.selectedValuation.property
      return `${property.numberOfStories || ''}`
    },
    lot () {
      let property = this.selectedValuation.property
      return `${property.lotSize || ''}`
    },
    apn () {
      let property = this.selectedValuation.property
      return `${property.apn || ''}`
    }
    // company () {
      // let emptyUser = this.currentUser.emptyUser
      // return `${emptyUser.ompanyName || ''}`
  },
  mounted () {
    console.log(JSON.stringify(process.env))
    document.getElementById('pdf').src = process.env.PDF_APP
  }
}
</script>
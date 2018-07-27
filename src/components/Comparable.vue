<template>
    <div id="add-more" v-bind:class="{expanded: expanded}">
        <span class="add-more-content" v-show="!expanded">Add Another Unit</span>
        <div class="add-more-content" id="plus" v-show="!expanded" @click="expand">+</div>
        <span class="add-more-content text ita bold" v-show="expanded">Property Information</span>
        <span class="add-more-content text ita bold right" v-show="expanded">{{ subTitle }}</span>
        <div class="popup-form" v-show="expanded">
            <!-- part 1 of the form -->
            <form id="form-1">
                <label>
                    <div>Property Address</div>
                    <input v-model="comp.address">
                </label>
                <label>
                    <div>City</div>
                    <input v-model="comp.city">
                </label>
                <div class="box">
                  <label class="side-by-side">
                      <div>State</div>
                      <input class="side-by-side" v-model="comp.state">
                  </label>
                  <label class="side-by-side">
                      <div >ZIP</div>
                      <input class="side-by-side" v-model="comp.zip">
                  </label>
                </div>
                <label>
                    <div>Property Picture</div>
                    <img class="hidden" id="comparable-preview">
                    <input type="file" class="save hidden" @input="loadComparablePic">
                    <i class="large material-icons clickable" id="comparable-icon">add_a_photo</i>
                </label>
            </form>
            <!-- part 2 of the form -->
            <form id="form-2">
                <label class="narrow">
                    <div class="narrow">Year built</div>
                    <input class="narrow" v-model="comp.yearBuilt">
                </label>
                <label class="narrow" v-if="this.compType !== 'rent'">
                    <div class="narrow">Square Feet</div>
                    <vue-numeric input class="narrow" separator="," v-model="comp.sf"></vue-numeric>
                </label>
                <label class="narrow" v-if="this.compType !== 'rent'">
                    <div class="narrow">Total Number of Units</div>
                    <input class="narrow" v-model="comp.numUnits">
                </label>
            </form>
            <!-- part 3 of the form for rentals -->
            <form id="form-5" v-if="this.compType === 'rent'">
                <h3 v-show="expanded">Unit Type:</h3>
                <label class="half-size">
                    <div class="half-size"># Bedrooms</div>
                    <select class="buttonize down-arrow" v-model="comp.bedrooms">
                        <option disabled value="">Please select one</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </label>
                <label class="half-size">
                    <div class="half-size"># Bathrooms</div>
                    <select class="buttonize down-arrow" v-model="comp.bathrooms">
                        <option disabled value="">Please select one</option>
                        <option>1</option>
                        <option>1.5</option>
                        <option>2</option>
                        <option>2.5</option>
                        <option>3</option>
                    </select>
                </label>
            </form>
            <form id="form-6" v-if="this.compType === 'rent'">
                <label class="half-size">
                    <div class="half-size more-padding">Current Rent/Mo.</div>
                    <vue-numeric input class="half-size" currency="$" separator="," v-model="comp.rent"></vue-numeric>
                </label>
              <button class="add" v-show="expanded" @click="add">Add</button>
            </form>
            <!-- part 3 of the form for sales comps -->
            <form id="form-5" v-if="this.compType !== 'rent'">
                <label class="narrow">
                    <div class="narrow">Sales Price</div>
                    <vue-numeric input class="narrow" currency="$" separator="," v-model="comp.salesPrice"></vue-numeric>
                </label>
                <label class="narrow">
                    <div class="narrow">Close of Escrow</div>
                    <input class="narrow" v-model="comp.closeOfEscrow">
                </label>
            </form>
            <form id="form-6" v-if="this.compType !== 'rent'">
                <label class="narrow">
                    <div class="narrow">Cap Rate</div>
                    <input  class="narrow" v-model="comp.capRate">
                </label>
                <label class="narrow">
                    <div class="narrow">GRM</div>
                    <input class="narrow" v-model="comp.grm">
                </label>
                <button class="add" id="add-sales" v-show="expanded" @click="add">Add</button>
            </form>
            <form id="form-7" v-if="this.compType !== 'rent'">
                <label class="half-size">
                    <div class="narrow">Price / SF</div>
                    <input class="narrow" v-model="pricePerSf" readonly>
                </label>
                <label class="half-size">
                    <div class="narrow">Price / Unit</div>
                    <input class="narrow" v-model="pricePerUnit" readonly>
                </label>
            </form>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import accounting from 'accounting'
import { uuidv4 } from '../utils'
import { emptyComparable } from '@/store/tools/templates'
import { upload, getUrl } from '../store/tools/images'

export default {
  data () {
    return {
      expanded: false,
      comp: {}
    }
  },
  props: {
    compType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      comparables: state => state.valuations.comparables
    }),
    subTitle () {
      return this.compType === 'rent' ? 'Rent Information' : 'Financial Information'
    },
    pricePerUnit () {
      let avg = (this.comp.salesPrice || 0) / (this.comp.numUnits || 1)
      return this.format(avg.toFixed(2))
    },
    pricePerSf () {
      let avg = (this.comp.salesPrice || 0) / (this.comp.sf || 1)
      return this.format(avg.toFixed(2))
    }
  },
  methods: {
    ...mapActions('valuations', ['addComparable']),
    add () {
      this.comp.pricePerUnit = this.pricePerUnit
      this.comp.pricePerSf = this.pricePerSf
      this.addComparable({comparable: this.comp, compType: this.compType})
      this.reset()
      this.$emit('toggleSaveButton')
    },
    expand () {
      this.expanded = true
      this.$emit('toggleSaveButton')
    },
    reset () {
      this.comp = JSON.parse(JSON.stringify(emptyComparable))
      this.comp.id = uuidv4()
      this.expanded = false
    },
    format (number) {
      return accounting.formatMoney(number)
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
    loadComparablePic (evt) {
      const comparablePreview = document.querySelector('#comparable-preview')
      const comparableIcon = document.querySelector('#comparable-icon')
      let fileName = `${this.userId}/comparable.png`
      this.loadNewImage(comparablePreview, comparableIcon, fileName, evt)
    }
  },
  created () {
    this.reset()

    let vm = this
    // load logo and preview if they exist
    getUrl(`images/${this.$store.state.users.currentId}/comparable.png`).then(downloadUrl => {
      if (downloadUrl) {
        vm.loadExistingImage(document.querySelector('#comparable-preview'), document.querySelector('#comparable-icon'), downloadUrl)
      }
    })
  }
}
</script>
<style scoped>
input {
  width: 15em;
}
.down-arrow {
 margin-bottom: 2em;
}
#form-1 {
  margin-left: 3em;
  height: 150em;
}
#form-6{
  width: 10%;
  float: left;
  display: block;
}
#form-7{
  width: 10%;
  float: left;
  display: block;
}
.right {
  margin-left: 30em;
}
.add {
  margin-left: 7em;
  margin-top: 6em;
}
.narrow {
  width: 80%;
}
.side-by-side {
  width: 50%;
  float: left;
  margin-top: 0;
}
#label div {
  grid-row-end: 5;
}
#add-sales {
  margin-top: 3em;
}
.expanded {
  min-height: 30em;
}
</style>

<template>
    <div>
        <navigation-header selected="property-info"></navigation-header>
        <div class="wrapper">
            <h1 class="auto-margin">Property Information</h1>
            <!-- part 1 of the form -->
            <form id="form-left">
                <label>
                    <div>Property Address</div>
                    <input v-model="property.address">
                </label>
                <label>
                    <div>State</div>
                    <input v-model="property.state">
                </label>
                <div class="box">
                  <label class="half-size">
                      <div class="half-size">City</div>
                      <input class="half-size" v-model="property.city">
                  </label>
                  <label class="half-size">
                      <div class="half-size">ZIP</div>
                      <input class="half-size" v-model="property.zip">
                  </label>
                </div>
            </form>
            <!-- part 2 of the form -->
            <form id="form-right">
              <div class="box">
                  <label class="half-size">
                      <div class="half-size">Number of Stories</div>
                      <input class="half-size" v-model="property.numberOfStories">
                  </label>
                  <label class="half-size">
                      <div class="half-size">Year built</div>
                      <input class="half-size" v-model="property.yearBuilt">
                  </label>
              </div>
              <div class="box">
                  <label class="half-size">
                      <div class="half-size">Lot Size Acres</div>
                      <vue-numeric input class="half-size" separator="," v-model="property.lotSize"></vue-numeric>
                  </label>
                  <label class="half-size">
                      <div class="half-size">APN</div>
                      <input class="half-size" v-model="property.apn">
                  </label>
              </div>
            </form>
            <button class="save" id="property-info" type="submit" @click="save">Save & Next</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { eb } from '../main'
import router from '../router/index'
import { emptyProperty } from '../store/tools/templates'

export default {
  data () {
    return {
      property: {}
    }
  },
  methods: {
    ...mapActions('valuations', ['setProperty', 'persist']),
    save () {
      this.setProperty(this.property)
      this.persist()
      router.push('./unit-mix')
    }
  },
  created () {
    // fill up the local property object
    this.property = this.$store.state.valuations.selectedValuation.property
    eb.$on('newValuation', () => {
      this.property = Object.assign({}, emptyProperty)
    })
  }
}
</script>
<style scoped>
@import "../assets/css/main.css";

h1 {
  width: unset;
}
</style>

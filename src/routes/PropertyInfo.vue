<template>
    <div>
        <navigation-header selected="property-info"></navigation-header>
        <div class="wrapper">
            <h1 class="auto-margin">Property Information</h1>
            <!-- part 1 of the form -->
            <form id="form-left">
                <label>
                    <div>Property Name</div>
                    <input v-model="property.name">
                </label>
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
                        <div class="half-size">Number of Stories</div>
                        <input class="half-size" v-model="property.numberOfStories">
                    </label>
                    <label class="half-size">
                        <div class="half-size">Year built</div>
                        <input class="half-size" v-model="property.yearBuilt">
                    </label>
                </div>
                <label class="half-size">
                    <div class="half-size">Lot Size</div>
                    <input class="half-size" v-model="property.lotSize">
                </label>
            </form>
            <!-- part 2 of the form -->
            <form id="form-right">
                <label>
                    <div>City</div>
                    <input v-model="property.city">
                </label>
                <label>
                    <div>ZIP</div>
                    <input v-model="property.zip">
                </label>
            </form>
            <button class="save" id="property-info" type="submit" @click="save">Save & Next</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import router from '../router/index'

export default {
  data () {
    return {
      property: {}
    }
  },
  methods: {
    ...mapActions('valuations', ['setWipProperty', 'persist']),
    save () {
      this.setWipProperty(this.property)
      this.persist()
      router.push('./unit-mix')
    }
  },
  created () {
    // fill up the local property object
    this.property = this.$store.state.valuations.wip.property
  }
}
</script>
<style>
h1 {
  width: unset;
}
</style>

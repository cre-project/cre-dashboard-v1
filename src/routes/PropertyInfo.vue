<template>
    <div>
        <navigation-header selected="wip.property-info"></navigation-header>
        <div class="wrapper">
            <h1 class="auto-margin">Property Information</h1>
            <!-- part 1 of the form -->
            <form id="form-left">
                <label>
                    <div>Property Name</div>
                    <input :value="wip.property.name">
                </label>
                <label>
                    <div>Property Address</div>
                    <input :value="wip.property.address">
                </label>
                <label>
                    <div>State</div>
                    <input :value="wip.property.state">
                </label>
                <div class="box">
                    <label class="half-size">
                        <div class="half-size">Number of Stories</div>
                        <input class="half-size" :value="wip.property.numberOfStories">
                    </label>
                    <label class="half-size">
                        <div class="half-size">Year built</div>
                        <input class="half-size" :value="wip.property.yearBuilt">
                    </label>
                </div>
                <label class="half-size">
                    <div class="half-size">Lot Size</div>
                    <input class="half-size" :value="wip.property.lotSize">
                </label>
            </form>
            <!-- part 2 of the form -->
            <form id="form-right">
                <label>
                    <div>City</div>
                    <input :value="wip.property.city">
                </label>
                <label>
                    <div>ZIP</div>
                    <input :value="wip.property.zip">
                </label>
            </form>
            <button class="save" id="wip.property-info" type="submit" @click="save">Save & Next</button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import router from '../router/index'
// import store from '../store/index'

export default {
//   data () {
//     return {
//       city: 'city'
//     }
//   },
  computed: {
    ...mapState({
      wip: state => state.valuations.wip,
      currentId: state => state.valuations.currentId
    })
  },
  methods: {
    ...mapActions('valuations', ['setWip']),
    save () {
    //   let temp = this.wip
    //   temp.property = this.property
      console.log('saving')
      //   this.setWip({valuation: temp, id: this.id})
      router.push('./unit-mix')
    }
  }
}
</script>

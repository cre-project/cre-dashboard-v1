<template>
    <div>
        <navigation-header selected="rent-comparables"></navigation-header>
        <div class="wrapper">
            <h1>Rent Comparables</h1>
            <table>
                <tr>
                    <th>Address</th>
                    <th>Year Built</th>
                    <th>Bedrooms</th>
                    <th>Bathrooms</th>
                    <th>Rent</th>
                </tr>
                <tr v-for="(comp, i) in comparables" :key="comp.name + i">
                    <th><input class="disabled" :value="comp.address"></th>
                    <th><input class="disabled" :value="comp.yearBuilt"></th>
                    <th><input class="disabled" :value="comp.bedrooms"></th>
                    <th><input class="disabled" :value="comp.bathrooms"></th>
                    <th><vue-numeric input class="disabled" currency="$" separator="," :value="comp.rent"></vue-numeric></th>
                </tr>
            </table>
            <new-comparable :compType="'rent'" v-on:toggleSaveButton="toggle"></new-comparable>
            <button v-show="showButton" class="save" type="submit" @click="save">Save & Next</button>
        </div>
    </div>
</template>
<script>
import Comparable from '@/components/Comparable'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      showButton: true
    }
  },
  components: {
    newComparable: Comparable
  },
  computed: {
    ...mapState({
      comparables: state => state.valuations.selectedValuation.rentComps
    })
  },
  methods: {
    ...mapActions('valuations', ['persist']),
    save () {
      this.persist()
      router.push('./preview')
    },
    toggle () {
      this.showButton = !this.showButton
    }
  }
}
</script>
<style scoped>
input {
  width: 100%;
  text-align: center;
}
</style>

<template>
    <div>
        <navigation-header selected="sales-comparables"></navigation-header>
        <div class="wrapper">
            <h1>Sales Comparables</h1>
            <table>
                <tr>
                    <th>Address</th>
                    <th>Price</th>
                    <th>Cap Rate</th>
                    <th>Price / Unit</th>
                </tr>
                <tr v-for="(comp, i) in comparables" :key="comp.name + i">
                    <th><input class="disabled" :value="comp.address"></th>
                    <th><vue-numeric input class="disabled" currency="$" separator="," :value="comp.salesPrice"></vue-numeric></th>
                    <th><input class="disabled" :value="comp.capRate"></th>
                    <th><vue-numeric input class="disabled" currency="$" separator="," :value="comp.pricePerUnit"></vue-numeric></th>
                </tr>
            </table>
            <new-comparable :compType="'sales'" v-on:toggleSaveButton="toggle"></new-comparable>
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
      comparables: state => state.valuations.selectedValuation.salesComps
    })
  },
  methods: {
    ...mapActions('valuations', ['persist']),
    save () {
      this.persist()
      router.push('./rent-comparables')
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

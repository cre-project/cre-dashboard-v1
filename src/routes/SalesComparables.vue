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
                    <th>{{ comp.address }}</th>
                    <th>{{ format(comp.salesPrice) }}</th>
                    <th>{{ comp.capRate }}</th>
                    <th>{{ format(comp.pricePerUnit) }}</th>
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
import accounting from 'accounting'
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
    },
    format (number) {
      return accounting.formatMoney(number)
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

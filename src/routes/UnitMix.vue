<template>
    <div>
        <navigation-header selected="unit-mix"></navigation-header>
        <div class="cre-content">
            <h1>Unit Mix</h1>
            <table>
                <thead>
                    <tr>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Square Feet</th>
                        <th>Current Rent/Mo.</th>
                        <th>Potential Rent/Mo.</th>
                    </tr>
                </thead>
                <tbody>
                    <unit v-for="unit in units" :key="unit.id" :unit="unit"></unit>
                    <tr>
                        <td class="half-size">Total</td>
                        <td>{{ numUnits }} units</td>
                        <td>{{ formatPrice (totalSqFt) }} SF</td>
                        <td>$ {{ formatPrice (totalRentCurrent) }}</td>
                        <td>$ {{ formatPrice (totalRentPotential) }}</td>
                    </tr>
                </tbody>
            </table>
            <div id="add-more">
                <div class="add-more-content" id="plus" @click="addUnit">+</div>
                <span class="add-more-content">Add Another Unit</span>
            </div>
            <button class="save" type="submit" @click="save">Save & Next</button>
        </div>
    </div>
</template>
<script>
import router from '../router/index'
import Unit from '@/components/Unit'
import { mapActions } from 'vuex'
import { uuidv4 } from '../utils'

export default {
  data () {
    return {
      units: [],
      currentUnit: ''
    }
  },
  computed: {
    numUnits () {
      return this.units.length || '# '
    },
    totalSqFt () {
      return this.units.reduce((acc, unit) => acc + (Number(unit.squareFeet) || 0), 0)
    },
    totalRentCurrent () {
      return this.units.reduce((acc, unit) => acc + (Number(unit.currentRent) || 0), 0)
    },
    totalRentPotential () {
      return this.units.reduce((acc, unit) => acc + (Number(unit.potentialRent) || 0), 0)
    }
  },
  methods: {
    ...mapActions('valuations', ['addUnits', 'persist']),
    save () {
      this.addUnits(this.units)
      this.persist()
      router.push('/operating-statement')
    },
    addUnit () {
      let id = uuidv4()
      this.units.push({id: id})
      this.currentUnit = id
    },
    formatPrice (value) {
      let val = (value / 1).toFixed().replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  created () {
    this.units = this.$store.state.valuations.selectedValuation.units
  },
  components: {
    Unit: Unit
  }
}
</script>

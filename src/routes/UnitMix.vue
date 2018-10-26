<template>
    <div>
        <navigation-header selected="unit-mix"></navigation-header>
        <div class="cre-content">
            <h1 class="subtitle is-size-4 has-text-weight-semibold auto-margin">Unit Mix</h1>
            <table style="margin-left:5em;margin-top:5em;width:90%;margin-bottom:2em;">
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
                    <tr class="is-grey">
                        <td class="half-size">Total</td>
                        <td>{{ numUnits }} units</td>
                        <td>{{ formatPrice (totalSqFt) }} SF</td>
                        <td>$ {{ formatPrice (totalRentCurrent) }}</td>
                        <td>$ {{ formatPrice (totalRentPotential) }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="spaced">
              <button class="save is-outlined transparent" @click.prevent="addUnit">Add Another Unit</button>
              <button class="save" type="submit" @click="save">Save & Next</button>
            </div>
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
<style scoped>
.spaced {
  width: 90%;
  margin-left: 5em;
  margin-top: 4em;
  display: flex;
  justify-content: space-between;
}

.transparent {
  background-color: white;
  color: #5D5D5D;
}

.transparent:hover{
    background-color: rgb(76, 175, 80); /* Green */
    color: white;
}
</style>

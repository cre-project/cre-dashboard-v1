<template>
    <div>
        <navigation-header selected="unit-mix"></navigation-header>
        <div class="wrapper">
            <h1>Unit Mix</h1>
            <table>
                <thead>
                    <tr>
                        <th>Unit Type</th>
                        <th>Square Feet</th>
                        <th>Current Rent/Mo.</th>
                        <th>Potential Rent/Mo.</th>
                    </tr>
                </thead>
                <tbody>
                    <unit v-for="unit in units" :key="unit.id" :unit="unit"></unit>
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

// generate a semi-random uuid
function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default {
  data () {
    return {
      units: [],
      currentUnit: ''
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
    created () {
      this.units = this.$store.state.valuations.selectedValuation.units
    }
  },
  components: {
    Unit: Unit
  }
}
</script>

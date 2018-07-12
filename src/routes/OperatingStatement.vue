<template>
    <div>
        <navigation-header selected="operating-statement"></navigation-header>
        <div class="two-columns">
            <h1 id="tc-header">Operating Statement</h1>
            <main>
                <table id="os">
                    <thead>
                        <tr>
                            <th class="sub-section l-align bolder" colspan="2">Income</th>
                            <th class="sub-section">Current</th>
                            <th class="sub-section">Pro Forma</th>
                        </tr>
                    </thead>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">GROSS POTENTIAL RENT</td>
                        <td>$<span id="gpr-current">{{ grossRentCurrent }}</span></td>
                        <td>$<span id="gpr-future">{{ grossRentPotential }}</span></td>
                    </tr>
                    <tr>
                        <td>Less: Vacancy/Deduction</td>
                        <td class="setting">
                            <button class="percent" @click="increase('vacancy')">+</button>
                            <span id="vacancy">  {{ vacancy }}% </span>
                            <button class="percent" @click="decrease('vacancy')">-</button>
                        </td>
                        <td>- $<span id="vacancy-current">{{ currentVacancy }}</span></td>
                        <td>- $<span id="vacancy-future">{{ potentialVacancy }}</span></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">EFFECTIVE RENTAL INCOME</td>
                        <td>${{ currentRent }}</td>
                        <td>${{ potentialRent }}</td>
                    </tr>
                    <tr>
                        <td class="sub-section l-align bolder" span="4">Expenses</td>
                    </tr>
                    <tr>
                        <td class="l-align">Real Estate Taxes</td>
                        <td class="setting">
                            <button class="percent" @click="increase('taxes')">+</button>
                            <span id="taxes">  {{ taxes }}% </span>
                            <button class="percent" @click="decrease('taxes')">-</button>
                        </td>
                        <td id="taxes-current">{{ current.expenses.taxes }}</td>
                        <td id="taxes-future">{{ potential.expenses.taxes }}</td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Insurance</td>
                        <td><input class="inline-edit" v-model="current.expenses.insurance"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.insurance"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Utilities - Electric</td>
                        <td><input class="inline-edit" v-model="current.expenses.electric"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.electric"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Utilities - Water & Sewer</td>
                        <td><input class="inline-edit" v-model="current.expenses.water"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.water"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Garbage</td>
                        <td><input class="inline-edit" v-model="current.expenses.garbage"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.garbage"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Repairs & Maintenance</td>
                        <td><input class="inline-edit" v-model="current.expenses.maintenance"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.maintenance"></td>
                    </tr>
                    <tr>
                        <td class="l-align">Management Fee</td>
                        <td class="setting">
                            <button class="percent" @click="increase('mgmtFee')">+</button>
                            <span id="mgmtFee">  {{ mgmtFee }}% </span>
                            <button class="percent" @click="decrease('mgmtFee')">-</button>
                        </td>
                        <td id="mgmt-fee-current">{{ current.expenses.mgmtFee }}</td>
                        <td id="mgmt-fee-future">{{ potential.expenses.mgmtFee }}</td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Landscaping</td>
                        <td><input class="inline-edit" v-model="current.expenses.landscaping"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.landscaping"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Other Expenses</td>
                        <td><input class="inline-edit" v-model="current.expenses.other"></td>
                        <td><input class="inline-edit" v-model="potential.expenses.other"></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">TOTAL EXPENSES</td>
                        <td>{{ current.expenses.total }}</td>
                        <td>{{ potential.expenses.total }}</td>
                    </tr>
                    <tr>
                        <td class="l-align bold" colspan="2">Net Operating Income</td>
                        <td class="bold">{{ current.netOperatingIncome }}</td>
                        <td class="bold">{{ potential.netOperatingIncome }}</td>
                    </tr>
                </table>
                <button class="save" id="operating-statement" type="submit" @click="save">Save & Next</button>
            </main>
            <side-form></side-form>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '../router/index'
import SideForm from '@/components/SideForm'

export default {
  data () {
    return {
      current: {},
      potential: {},
      vacancy: 5,
      mgmtFee: 5,
      taxes: 5
    }
  },
  computed: {
    ...mapGetters('valuations', ['grossRentCurrent', 'grossRentPotential']),
    currentVacancy () {
      return (this.grossRentCurrent / 100) * this.vacancy
    },
    potentialVacancy () {
      return (this.grossRentPotential / 100) * this.vacancy
    },
    currentRent () {
      return this.grossRentCurrent - this.currentVacancy
    },
    potentialRent () {
      return this.grossRentPotential - this.potentialVacancy
    }
  },
  components: {
    SideForm: SideForm
  },
  methods: {
    ...mapActions('valuations', ['setWipOS', 'persist']),
    save () {
      // TODO set percentage values (vacancy, mgmtFee, taxes) in Wip (selectedVacancy)
      this.current.grossRent = this.grossRentCurrent
      this.current.totalRent = this.currentRent
      this.potential.grossRent = this.grossRentPotential
      this.potential.totalRent = this.potentialRent
      this.setWipOS({current: this.current, potential: this.potential})
      this.persist()
      router.push('./sales-comparables')
    },
    increase (prop) {
      this.$data[prop]++
    },
    decrease (prop) {
      this.$data[prop]--
    }
  },
  created () {
    // fill up the local user object
    this.current = this.$store.state.valuations.selectedValuation.statementCurrent
    this.potential = this.$store.state.valuations.selectedValuation.statementPotential
  }
}
</script>
<style>
h1, main {
  padding: 2em;
}
</style>

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
                        <td>$<span id="gpr-current">{{ formatPrice (grossRentCurrent) }}</span></td>
                        <td>$<span id="gpr-future">{{ formatPrice (grossRentPotential) }}</span></td>
                    </tr>
                    <tr>
                        <td>Less: Vacancy/Deduction</td>
                        <td class="setting">
                            <button class="percent" @click="decrease('vacancy')">-</button>
                            <span id="vacancy">  {{ selectedValuation.vacancy || 0 }}% </span>
                            <button class="percent" @click="increase('vacancy')">+</button>
                        </td>
                        <td>- <span id="vacancy-current">{{ formatPrice (currentVacancy) }}</span></td>
                        <td>- <span id="vacancy-future">{{ formatPrice (potentialVacancy) }}</span></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">EFFECTIVE RENTAL INCOME</td>
                        <td>${{ formatPrice (currentEffectiveRent) }}</td>
                        <td>${{ formatPrice (potentiaEffectiveRent) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Total Other Income</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.otherIncome"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.otherIncome"></vue-numeric></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">EFFECTIVE GROSS INCOME</td>
                        <td>${{ formatPrice (effectiveGrossIncome) }}</td>
                        <td>${{ formatPrice (potentialGrossIncome) }}</td>
                    </tr>
                    <tr>
                        <td class="sub-section l-align bolder" span="4">Expenses</td>
                    </tr>
                    <tr>
                        <td class="l-align">Real Estate Taxes</td>
                        <td class="setting">
                            <vue-numeric input class="inline-edit" v-bind:precision="4" v-model.number="selectedValuation.taxes"></vue-numeric>%
                        </td>
                        <!-- ONLY ONE TAX VALUE - NO DISTINCTION BETWEEN CURRENT AND POTENTIAL -->
                        <td id="taxes-current">{{ formatPrice (taxes) }}</td>
                        <td id="taxes-future">{{ formatPrice (taxes) }}</td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Insurance</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.insurance"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.insurance"></vue-numeric></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Utilities - Electric</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.electric"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.electric"></vue-numeric></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Utilities - Water & Sewer</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.water"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.water"></vue-numeric></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Garbage</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.garbage"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.garbage"></vue-numeric></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Repairs & Maintenance</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.maintenance"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.maintenance"></vue-numeric></td>
                    </tr>
                    <tr>
                        <!-- PERCENTAGE OF EFFECTIVE GROSS INCOME -->
                        <td class="l-align">Management Fee</td>
                        <td class="setting">
                            <button class="percent" @click="decrease('mgmtFee')">-</button>
                            <span id="mgmtFee">  {{ selectedValuation.mgmtFee || 0 }}% </span>
                            <button class="percent" @click="increase('mgmtFee')">+</button>
                        </td>
                        <td id="mgmt-fee-current">{{ formatPrice (currentMgmtFee) }}</td>
                        <td id="mgmt-fee-future">{{ formatPrice (potentialMgmtFee) }}</td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Landscaping</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.landscaping"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.landscaping"></vue-numeric></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Other Expenses</td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="current.expenses.other"></vue-numeric></td>
                        <td><vue-numeric input class="inline-edit" separator="," v-model.number="potential.expenses.other"></vue-numeric></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">TOTAL EXPENSES</td>
                        <td>${{ formatPrice (totalExpensesCurrent) }}</td>
                        <td>${{ formatPrice (totalExpensesPotential) }}</td>
                    </tr>
                    <tr>
                        <!-- effective gross income minus total expenses -->
                        <td class="l-align bold" colspan="2">Net Operating Income</td>
                        <td class="bold">${{ formatPrice (currentNetOperatingIncome) }}</td>
                        <td class="bold">${{ formatPrice (potentialNetOperatingIncome) }}</td>
                    </tr>
                </table>
                <button class="save" id="operating-statement" type="submit" @click="save">Save & Next</button>
            </main>
            <side-form :stats="stats"></side-form>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import router from '../router/index'
import SideForm from '@/components/SideForm'

export default {
  data () {
    return {
      current: {},
      potential: {}
    }
  },
  computed: {
    ...mapState({
      selectedValuation: state => state.valuations.selectedValuation
    }),
    ...mapGetters('valuations', ['grossRentCurrent', 'grossRentPotential']),
    currentVacancy () {
      return ((this.grossRentCurrent / 100) * this.selectedValuation.vacancy).toFixed(0)
    },
    /* INCOME  */
    potentialVacancy () {
      return ((this.grossRentPotential / 100) * this.selectedValuation.vacancy).toFixed(0)
    },
    // actual income coming from rent
    currentEffectiveRent () {
      return (this.grossRentCurrent - this.currentVacancy).toFixed(0)
    },
    potentiaEffectiveRent () {
      return (this.grossRentPotential - this.potentialVacancy).toFixed(0)
    },
    // effective rental income + other income
    effectiveGrossIncome () {
      return (Number(this.currentEffectiveRent) + (Number(this.current.otherIncome) || 0)).toFixed(0)
    },
    potentialGrossIncome () {
      return (Number(this.potentiaEffectiveRent) + (Number(this.potential.otherIncome) || 0)).toFixed(0)
    },
    /* EXPENSES  */
    taxes () {
      return ((this.selectedValuation.price / 100) * this.selectedValuation.taxes).toFixed(0)
    },
    currentMgmtFee () {
      return ((this.effectiveGrossIncome / 100) * this.selectedValuation.mgmtFee).toFixed(0)
    },
    potentialMgmtFee () {
      return ((this.potentialGrossIncome / 100) * this.selectedValuation.mgmtFee).toFixed(0)
    },
    // sum of all expenses
    totalExpensesCurrent () {
      return this.sum(this.current.expenses) + Number(this.currentMgmtFee)
    },
    totalExpensesPotential () {
      return this.sum(this.potential.expenses) + Number(this.potentialMgmtFee)
    },
    /* TOTAL */
    // effective gross income minus total expenses
    currentNetOperatingIncome () {
      return this.effectiveGrossIncome - this.totalExpensesCurrent
    },
    potentialNetOperatingIncome () {
      return this.potentialGrossIncome - this.totalExpensesPotential
    },
    currentCapRate () {
      console.log(this.currentNetOperatingIncome)
      console.log(this.selectedValuation.price)
      return (Number(this.currentNetOperatingIncome) / (Number(this.selectedValuation.price) || 1)).toFixed(2)
    },
    potentialCapRate () {
      return (Number(this.potentialNetOperatingIncome) / (Number(this.selectedValuation.price) || 1)).toFixed(2)
    },
    currentGrm () {
      return (Number(this.selectedValuation.price) / (this.grossRentCurrent || 1)).toFixed(2)
    },
    potentialGrm () {
      return (Number(this.selectedValuation.price) / (this.grossRentPotential || 1)).toFixed(2)
    },
    // stats for side form
    stats () {
      return {currentCapRate: this.currentCapRate, potentialCapRate: this.potentialCapRate, currentGrm: this.currentGrm, potentialGrm: this.potentialGrm}
    }
  },
  components: {
    SideForm: SideForm
  },
  methods: {
    ...mapActions('valuations', ['setWip', 'setWipOS', 'persist']),
    save () {
      this.current.vacancy = this.currentVacancy
      this.current.effectiveRent = this.currentEffectiveRent || 0
      this.current.effectiveGrossIncome = this.effectiveGrossIncome
      this.current.mgmtFee = this.currentMgmtFee
      this.current.totalExpenses = this.totalExpensesCurrent
      this.current.netOperatingIncome = this.currentNetOperatingIncome
      this.current.capRate = this.currentCapRate
      this.current.grm = this.currentGrm
      console.log(this.current)

      this.potential.vacancy = this.potentialVacancy
      this.potential.effectiveRent = this.potentialEffectiveRent
      this.potential.effectiveGrossIncome = this.potentialGrossIncome
      this.potential.mgmtFee = this.potentialMgmtFee
      this.potential.totalExpenses = this.totalExpensesPotential
      this.potential.netOperatingIncome = this.potentialNetOperatingIncome
      this.potential.capRate = this.potentialCapRate
      this.potential.grm = this.potentialGrm

      console.log('POTential')
      console.log(this.potential)

      // TODO set percentage values (vacancy, mgmtFee, taxes) in Wip (selectedVacancy)
      this.setWip({val: this.selectedValuation, id: this.selectedValuation.id})
      this.setWipOS({current: this.current, potential: this.potential})
      this.persist()
      router.push('./sales-comparables')
    },
    increase (prop) {
      console.log('PROP: ', prop)
      if (!this.selectedValuation[prop] || this.selectedValuation[prop].isNaN || this.selectedValuation[prop] === 'NaN') {
        this.selectedValuation[prop] = 1
        // this.set(this.selectedValuation[prop], 1)
      } else this.selectedValuation[prop]++
    },
    decrease (prop) {
      if (!this.selectedValuation[prop] || this.selectedValuation[prop].isNaN || this.selectedValuation[prop] === 'NaN') {
        // this.set(this.selectedValuation[prop], 0)
        this.selectedValuation[prop] = 0
      } else this.selectedValuation[prop]--
    },
    formatPrice (value) {
      let val = (value / 1).toFixed().replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatPercentage (value) {
      let val = (value / 10).toFixed(1).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ',')
    },
    sum (expenses) {
      return Object.keys(expenses).reduce((acc, key) => acc + expenses[key], 0) + Number(this.taxes)
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

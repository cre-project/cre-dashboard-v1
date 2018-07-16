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
                            <span id="vacancy">  {{ selectedValuation.vacancy }}% </span>
                            <button class="percent" @click="decrease('vacancy')">-</button>
                        </td>
                        <td>- $<span id="vacancy-current">{{ currentVacancy }}</span></td>
                        <td>- $<span id="vacancy-future">{{ potentialVacancy }}</span></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">EFFECTIVE RENTAL INCOME</td>
                        <td>${{ currentEffectiveRent }}</td>
                        <td>${{ potentiaEffectiveRent }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Total Other Income</td>
                        <td>$<input class="inline-edit" v-model.number="currentOtherIncome"></td>
                        <td>$<input class="inline-edit" v-model.number="potentialOtherIncome"></td>
                        <td></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">EFFECTIVE GROSS INCOME</td>
                        <td>${{ effectiveGrossIncome }}</td>
                        <td>${{ potentialGrossIncome }}</td>
                    </tr>
                    <tr>
                        <td class="sub-section l-align bolder" span="4">Expenses</td>
                    </tr>
                    <tr>
                        <td class="l-align">Real Estate Taxes</td>
                        <td class="setting">
                            <button class="percent" @click="increase('taxes')">+</button>
                            <!-- percentage of PRICE -->
                            <span id="taxes">  {{ selectedValuation.taxes }}% </span>
                            <button class="percent" @click="decrease('taxes')">-</button>
                        </td>
                        <!-- ONLY ONE TAXES VALUE - NO DISTINCTION BETWEEN CURRENT AND POTENTIAL -->
                        <td id="taxes-current">{{ taxes }}</td>
                        <td id="taxes-future">{{ taxes }}</td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Insurance</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.insurance"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.insurance"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Utilities - Electric</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.electric"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.electric"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Utilities - Water & Sewer</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.water"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.water"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Garbage</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.garbage"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.garbage"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Repairs & Maintenance</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.maintenance"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.maintenance"></td>
                    </tr>
                    <tr>
                        <!-- PERCENTAGE OF EFFECTIVE GROSS INCOME -->
                        <td class="l-align">Management Fee</td>
                        <td class="setting">
                            <button class="percent" @click="increase('mgmtFee')">+</button>
                            <span id="mgmtFee">  {{ selectedValuation.mgmtFee }}% </span>
                            <button class="percent" @click="decrease('mgmtFee')">-</button>
                        </td>
                        <td id="mgmt-fee-current">{{ currentMgmtFee }}</td>
                        <td id="mgmt-fee-future">{{ potentialMgmtFee }}</td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Landscaping</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.landscaping"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.landscaping"></td>
                    </tr>
                    <tr>
                        <td class="l-align" colspan="2">Other Expenses</td>
                        <td><input class="inline-edit" v-model.number="current.expenses.other"></td>
                        <td><input class="inline-edit" v-model.number="potential.expenses.other"></td>
                    </tr>
                    <tr class="total">
                        <td class="l-align bold" colspan="2">TOTAL EXPENSES</td>
                        <td>{{ current.expenses.total }}</td>
                        <td>{{ potential.expenses.total }}</td>
                    </tr>
                    <tr>
                        <!-- effective gross income minus total expenses -->
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
import { mapActions, mapGetters, mapState } from 'vuex'
import router from '../router/index'
import SideForm from '@/components/SideForm'

export default {
  data () {
    return {
      current: {},
      potential: {},
      currentOtherIncome: 0,
      potentialOtherIncome: 0
    }
  },
  computed: {
    ...mapState({
      selectedValuation: state => state.valuations.selectedValuation
    }),
    ...mapGetters('valuations', ['grossRentCurrent', 'grossRentPotential']),
    taxes () {
      return ((this.selectedValuation.price / 100) * this.selectedValuation.taxes).toFixed(2)
    },
    currentVacancy () {
      return ((this.grossRentCurrent / 100) * this.selectedValuation.vacancy).toFixed(2)
    },
    potentialVacancy () {
      return ((this.grossRentPotential / 100) * this.selectedValuation.vacancy).toFixed(2)
    },
    currentEffectiveRent () {
      return (this.grossRentCurrent - this.currentVacancy).toFixed(2)
    },
    potentiaEffectiveRent () {
      return (this.grossRentPotential - this.potentialVacancy).toFixed(2)
    },
    // effective rental income + other income
    effectiveGrossIncome () {
      return (Number(this.currentEffectiveRent) + this.currentOtherIncome).toFixed(2)
    },
    potentialGrossIncome () {
      return (Number(this.potentiaEffectiveRent) + Number(this.potentialOtherIncome)).toFixed(2)
    },
    currentMgmtFee () {
      return ((this.effectiveGrossIncome / 100) * this.selectedValuation.mgmtFee).toFixed(2)
    },
    potentialMgmtFee () {
      return ((this.potentialGrossIncome / 100) * this.selectedValuation.mgmtFee).toFixed(2)
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
      this.current.totalRent = this.currentEffectiveRent
      this.potential.grossRent = this.grossRentPotential
      this.potential.totalRent = this.potentiaEffectiveRent
      this.setWipOS({current: this.current, potential: this.potential})
      this.persist()
      router.push('./sales-comparables')
    },
    increase (prop) {
      this.selectedValuation[prop]++
    },
    decrease (prop) {
      this.selectedValuation[prop]--
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

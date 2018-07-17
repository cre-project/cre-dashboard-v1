<template>
  <aside class="total">
    <div class="side-form">
      <div class="bold l-align">Price</div>
      <input id="os-right" v-model.number="localPrice">
      <!-- price per unit/ sf - units & sf from unit mix -->
      <p class="bold l-align">Price/Unit: <span>${{ pricePerUnit }}</span><br>Price/SF: <span>${{ pricePerSf }}</span></p>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Current</th>
          <th>Pro Forma</th>
        </tr>
      </thead>
      <tr>
        <td>CAP Rate</td>
        <td>{{ current.stats.capRate }}</td>
        <td>{{ potential.stats.capRate }}</td>
      </tr>
      <tr>
        <td>GRM</td>
        <td>{{ current.stats.grm }}</td>
        <td>{{ potential.stats.grm }}</td>
      </tr>
    </table>
  </aside>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      current: state => state.valuations.selectedValuation.statementCurrent,
      potential: state => state.valuations.selectedValuation.statementPotential,
      price: state => state.valuations.selectedValuation.price
    }),
    ...mapGetters('valuations', ['pricePerUnit', 'pricePerSf']),
    localPrice: {
      get () {
        return this.price
      },
      set (value) {
        this.setPrice(value)
      }
    }
  },
  methods: {
    ...mapActions('valuations', ['setPrice'])
  }
}
</script>

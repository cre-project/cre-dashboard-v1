<template>
  <aside class="total">
    <div class="side-form">
      <div class="bold l-align">Price</div>
      <input type="text" id="os-right" v-bind="price">
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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      current: state => state.valuations.selectedValuation.statementCurrent,
      potential: state => state.valuations.selectedValuation.statementPotential,
      price: state => state.valuations.selectedValuation.price,
      pricePerUnit: state => state.valuations.selectedValuation.pricePerUnit,
      pricePerSf: state => state.valuations.selectedValuation.pricePerSf
    })
  }
}
</script>

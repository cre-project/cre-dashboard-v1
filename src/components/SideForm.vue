<template>
  <aside class="total">
    <div class="side-form">
      <div class="bold l-align">Price</div>
      <vue-numeric input id="os-right" currency="$" separator="," v-model.number="localPrice"></vue-numeric>
      <!-- price per unit/ sf - units & sf from unit mix -->
      <p class="bold l-align">
      Price/Unit: {{ pricePerUnit | money }}
      <br>
      Price/SF: {{ pricePerSf | money }}
      </p>
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
        <td>{{ stats.currentCapRate }}%</td>
        <td>{{ stats.potentialCapRate }}%</td>
      </tr>
      <tr>
        <td>GRM</td>
        <td>{{ stats.currentGrm }}</td>
        <td>{{ stats.potentialGrm }}</td>
      </tr>
    </table>
  </aside>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
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

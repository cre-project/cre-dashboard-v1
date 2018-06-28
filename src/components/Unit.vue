<template>
  <tr class="editable">
      <td>
          <select class="buttonize down-arrow">
              <option>1 Bedroom & 1 Bathroom</option>
              <option>1 Bedroom & 2 Bathroom</option>
              <option>2 Bedroom & 1 Bathroom</option>
          </select>
      </td>
      <td><input class="inline-edit" disabled v-model="unit.squareFeet" value="3650"></td>
      <td>$<input class="inline-edit" disabled v-model="unit.currentRent" value="2000"></td>
      <td>$<input class="inline-edit" disabled v-model="unit.potentialRent" value="3000"></td>
  </tr>
</template>
<script>
// import { mapActions, mapState } from 'vuex'
// import router from '../router/index'

export default {
  props: {
    unit: {
      type: Object,
      required: true
    }
  //   id: {
  //     type: String,
  //     required: true
  //   }
  // },
  // computed: {
  //   ...mapState({
  //     current: state => state.valuations.currentId,
  //     wip: state => state.valuations.wip,
  //     isEditing: state => state.valuations.isEditing
  //   })
  // },
  // methods: {
  //   ...mapActions('valuations', ['setWip', 'toggleEditing']),
  //   editValuation () {
  //     this.setWip({valuation: this.valuation, id: this.id})
  //     this.toggleEditing()
  //     router.push('/property-info')
  //   }
  }
}
</script>
<style scoped>
</style>

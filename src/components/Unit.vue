<template>
  <tr class="editable">
      <td>
          <select class="buttonize down-arrow">
              <option>1 Bedroom & 1 Bathroom</option>
              <option>1 Bedroom & 2 Bathroom</option>
              <option>2 Bedroom & 1 Bathroom</option>
          </select>
      </td>
      <td><input class="inline-edit" v-model="unit.squareFeet" value=""></td>
      <td>$<input class="inline-edit" v-model="unit.currentRent" value=""></td>
      <td>$<input class="inline-edit" v-model="unit.potentialRent" value=""></td>
  </tr>
</template>
<script>

export default {
  props: {
    unit: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
</style>

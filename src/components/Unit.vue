<template>
  <tr class="editable">
      <td>
          <select class="buttonize down-arrow" v-model="unit.type">
              <option disabled value="">Please select one</option>
              <option>Studio</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
          </select>
      </td>
      <td>
          <select class="buttonize down-arrow" v-model="unit.bathroom">
              <option disabled value="">Please select one</option>
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
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

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
                    <unit v-for="unit in units" :key="unit" :unit="unit"></unit>
                </tbody>
            </table>
            <div id="add-more">
                <div class="add-more-content" id="plus">+</div>
                <span class="add-more-content">Add Another Unit</span>
            </div>
            <button class="save" type="submit" @click="save">Save & Next</button>
        </div>
    </div>
</template>
<script>
import router from '../router/index'
import Unit from '@/components/Unit'

export default {
  data () {
    return {
      units: []
    }
  },
  methods: {
    save () {
      router.push('/operating-statement')
    }
  },
  components: {
    Unit: Unit
  }
}
</script>

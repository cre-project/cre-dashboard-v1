<template>
    <div class="preview-box" @click="editValuation">
        <div class="preview-title">{{ valuation.property.name || "New Valuation" }}</div>
        <div class="preview-content">
            {{ valuation.property.address }}
            <br><br>
            Created on     {{ valuation.createdOn.toDate().toUTCString() }}
            <br><br><br><br>
            <span v-show="valuation.capRate && valuation.PPSF">
                Cap Rate     {{ valuation.capRate }}%
                <br>
                PPSF   ${{ valuation.PPSF }}
            </span>
            <span id="price" v-show="valuation.price">${{ valuation.price }}</span>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import router from '../router/index'

export default {
  props: {
    valuation: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('valuations', ['setWip', 'toggleEditing']),
    editValuation () {
      this.setWip({valuation: this.valuation, id: this.id})
      this.toggleEditing()
      router.push('/property-info')
    }
  }
}
</script>
<style scoped>
</style>

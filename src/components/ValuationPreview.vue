<template>
    <div class="preview-box" @click="editValuation">
        <div class="preview-title">{{ valuation.property.address || "New Valuation" }}</div>
        <div class="preview-content">
            {{ valuation.property.city }}
            <br><br>
            Created on     {{ date }}
            <br><br><br><br>
            <span v-show="valuation.capRate && valuation.PPSF">
                Cap Rate     {{ valuation.capRate }}%
                <br>
                PPSF   ${{ valuation.PPSF }}
            </span>
            <span id="price" v-show="valuation.price">${{ formatPrice (valuation.price) }}</span>
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
    },
    formatPrice (value) {
      let val = (value / 1).toFixed().replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    date () {
      let createdOn = this.valuation.createdOn
      if (createdOn instanceof Date) {
        return createdOn.toUTCString()
      } else {
        return createdOn.toDate().toUTCString()
      }
    }
  }
}
</script>
<style scoped>
</style>

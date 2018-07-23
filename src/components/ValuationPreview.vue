<template>
    <div class="preview-box" @click="editValuation">
        <div class="preview-title">{{ valuation.property.address || "New Valuation" }}, {{ valuation.property.city }}</div>
        <div class="preview-content">
            APN {{ valuation.property.apn }}
            <br><br>
            Created on     {{ date }}
            <br><br><br>
            <span id="price" v-show="valuation.price">Price    ${{ formatPrice (valuation.price) }}</span>
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

<template>
    <div class="preview-box" @click="editValuation">
        <div class="preview-title">{{ valuation.property.name }}</div>
        <div class="preview-content">
            {{ valuation.property.address }}
            <br><br>
            Created on     {{ valuation.createdOn.toDate().toUTCString() }}
            <br><br><br><br>
            <span>
                Cap Rate     {{ valuation.capRate }}%
                <br>
                PPSF   ${{ valuation.PPSF }}
            </span>
            <span id="price">${{ valuation.price }}</span>
            <!-- <div>{{ JSON.stringify(valuation) }}</div> -->
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import router from '../router/index'
import store from '../store/index'

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
  computed: {
    ...mapState({
      current: state => state.valuations.current,
      wip: state => state.valuations.wip
    })
  },
  methods: {
    ...mapActions({
      setCurrent: state => state.valuations.setCurrent
    }),
    editValuation () {
      store.dispatch('valuations/setCurrent', this.id, { root: true })
      store.dispatch('valuations/toggleWip', null, { root: true })
      router.push('/property-info')
    }
  }
}
</script>
<style scoped>
</style>

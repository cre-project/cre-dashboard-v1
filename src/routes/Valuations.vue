<template>
    <div>
        <header id="large-sub-header">
            <div id="index">All Valuations</div>
            <router-link id="header-button" to="/property-info" tag="button" @click.native="setWip">Add New Valuation</router-link>
        </header>
        <div class="home">
            <valuation-preview v-for="id in valuationIds" :key="id" :id="id" :valuation="valuations[id]"></valuation-preview>
        </div>
    </div>
</template>
<script>
import ValuationPreview from '@/components/ValuationPreview'
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      valuations: state => state.valuations.all,
      valuationIds: state => state.valuations.allIds
    })
  },
  methods: {
    ...mapActions('valuations', ['setWip'])
  },
  components: {
    ValuationPreview: ValuationPreview
  },
  created () {
    if (!this.valuationIds.length) this.$store.dispatch('valuations/fetchAll')
  }
}
</script>

<template>
    <div>
        <header id="large-sub-header">
            <div id="index">All Valuations</div>
            <router-link id="header-button" to="/property-info" tag="button">New Valuations</router-link>
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
  data () {
    return {
      vals: []
    }
  },
  computed: {
    ...mapState({
      valuations: state => state.valuations.all,
      valuationIds: state => state.valuations.allIds
    }),
    ...mapActions(['addValuations'])
  },
  components: {
    ValuationPreview: ValuationPreview
  }
}
</script>

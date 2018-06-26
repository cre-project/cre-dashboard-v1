<template>
    <div>
        <header id="large-sub-header">
            <div id="index">All Valuations</div>
            <router-link id="header-button" to="/property-info" tag="button">New Valuations</router-link>
        </header>
        <div class="home">
            <valuation-preview v-for="valuation in valuations" :key="valuation"></valuation-preview>
        </div>
    </div>
</template>
<script>
import ValuationPreview from '@/components/ValuationPreview'
// import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    valuations () {
      return this.$store.getters.valuations
    }
  },
  methods: {
    // ...mapGetters({vals: 'valuations'}),
    // xxx () {
    //   console.log('xxx')
    // },
    // ...mapActions('saveValuation')
  },
  components: {
    ValuationPreview: ValuationPreview
  }
}
</script>

<template>
    <div>
        <header id="large-sub-header">
            <div id="index">All Valuations</div>
            <router-link id="header-button" to="/property-info" tag="button" @click.native="startNew">Add New Valuation</router-link>
        </header>
        <div class="home">
            <valuation-preview v-for="id in valuationIds" :key="id" :id="id" :valuation="valuations[id]"></valuation-preview>
        </div>
    </div>
</template>
<script>
import ValuationPreview from '@/components/ValuationPreview'
import { eb } from '../main'
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      userId: state => state.users.currentId,
      valuations: state => state.valuations.all,
      valuationIds: state => Object.keys(state.valuations.all)
    })
  },
  methods: {
    ...mapActions('valuations', ['newWip']),
    startNew () {
      eb.$emit('newValuation')
      this.newWip()
    }
  },
  components: {
    ValuationPreview: ValuationPreview
  },
  created () {
    eb.$on('loadUserData', (userId) => {
      this.$store.dispatch('valuations/fetchAll', this.userId)
    })
  }
}
</script>

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
    ...mapActions('valuations', ['resetWip']),
    startNew () {
      eb.$emit('newValuation')
      this.resetWip()
    }
  },
  components: {
    ValuationPreview: ValuationPreview
  },
  created () {
    eb.$on('loadUserData', (userId) => {
      if (this.valuationIds.length === 0) {
        this.$store.dispatch('valuations/fetchAll', this.userId).then(() => {
          this.$store.dispatch('valuations/resetWip')
        })
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // access to component instance via `vm`
      vm.$store.dispatch('valuations/resetWip')
      // load valuations if there are none
      if (vm.valuationIds.length === 0 && vm.userId) {
        vm.$store.dispatch('valuations/fetchAll', vm.userId)
      }
    })
  }
}
</script>
<style scoped>
@import "../assets/css/main.css";
</style>

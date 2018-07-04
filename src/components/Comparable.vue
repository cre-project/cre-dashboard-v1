<template>
    <div id="add-more" v-bind:class="{expanded: expanded}">
        <span class="add-more-content" v-show="!expanded">Add Another Unit</span>
        <div class="add-more-content" id="plus" v-show="!expanded" @click="expand">+</div>
        <span class="add-more-content text ita bold" v-show="expanded">Property Information</span>
        <span class="add-more-content text ita bold" id="right" v-show="expanded">Rent Information</span>
        <div class="popup-form" v-show="expanded">
            <!-- part 1 of the form -->
            <form id="form-1">
                <label>
                    <div>Property Name</div>
                    <input v-model="comp.name">
                </label>
                <label>
                    <div>Property Address</div>
                    <input v-model="comp.address">
                </label>
                <label>
                    <div>City</div>
                    <input v-model="comp.city">
                </label>
            </form>
            <!-- part 2 of the form -->
            <form id="form-2">
                <label class="half-size">
                    <div class="half-size">State</div>
                    <input  class="half-size" v-model="comp.state">
                </label>
                <label class="half-size">
                    <div class="half-size">ZIP</div>
                    <input class="half-size" v-model="comp.zip">
                </label>
                <label class="half-size">
                    <div class="half-size">Year built</div>
                    <input class="half-size" v-model="comp.yearBuilt">
                </label>
            </form>
            <!-- part 3 of the form -->
            <form id="form-5">
                <label class="half-size">
                    <div class="half-size more-padding">Unit Type # Bedrooms</div>
                    <select class="buttonize down-arrow" v-model="comp.bedrooms">
                        <option disabled value="">Please select one</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </label>
                <label class="half-size">
                    <div class="half-size more-padding">Unit Type # Bathrooms</div>
                    <select class="buttonize down-arrow more-padding" v-model="comp.bathrooms">
                        <option disabled value="">Please select one</option>
                        <option>1</option>
                        <option>1.5</option>
                        <option>2</option>
                        <option>2.5</option>
                        <option>3</option>
                    </select>
                </label>
                <label class="half-size l-margin">
                    <div class="half-size more-padding">Current Rent/Mo.</div>
                    <input class="half-size" v-model="comp.rent">
                </label>
            </form>
            <button class="add" v-show="expanded" @click="add">Add</button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { emptyComparable } from '@/store/tools/templates'

export default {
  data () {
    return {
      expanded: false,
      comp: {}
    }
  },
  props: {
    compType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      comparables: state => state.valuations.comparables
    })
  },
  methods: {
    ...mapActions('valuations', ['addComparable']),
    add () {
      this.addComparable({comparable: this.comp, compType: this.compType})
      this.reset()
      this.$emit('toggleSaveButton')
    },
    expand () {
      this.expanded = true
      this.$emit('toggleSaveButton')
    },
    reset () {
      this.comp = Object.assign({}, emptyComparable)
      this.expanded = false
    }
  },
  created () {
    this.reset()
  }
}
</script>
<style scoped>
input {
  width: 15em;
}
.down-arrow {
 margin-bottom: 2em;
}
#form-1 {
  margin-left: 3em;
}
#form-5 {
  margin-left: 9em;
}
#plus {
  cursor: pointer;
}
</style>

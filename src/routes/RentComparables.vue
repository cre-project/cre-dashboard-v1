<template>
  <div>
    <navigation-header selected="rent-comparables"></navigation-header>
    <div class="cre-content">
      <h1 class="title m-l-0 m-b-2">Rent Comparables</h1>

      <div v-if="comparables.length > 0" class="float-right">
        <a class="button buttonize">Add a new comparable</a>
      </div>

      <b-table
          :data="comparables"
          detailed
          detail-key="id"
          style="min-height: 40vh;"
      >

          <template slot-scope="props">
              <b-table-column label="Address" class="p-t-1-3" sortable centered>
                  {{ props.row.address }}
              </b-table-column>

              <b-table-column label="Year Built" class="p-t-1-3" width="150" sortable centered numeric>
                  {{ props.row.year_built }}
              </b-table-column>

              <b-table-column  label="Bedrooms" class="p-t-1-3" width="150" sortable centered numeric>
                  {{ props.row.bedrooms }}
              </b-table-column>

              <b-table-column field="date" class="p-t-1-3" label="Bathrooms" width="150" sortable centered numeric>
                  {{ props.row.bathrooms }}
              </b-table-column>

              <b-table-column label="Rent" class="p-t-1-3" sortable centered numeric>
                  {{ props.row.rent | money }}
              </b-table-column>

              <b-table-column width="150" centered>
                  <i class="material-icons">edit</i>
                  <i class="material-icons" @click="deleteComparable({compId: props.row.id, compType: 'rent'})">delete_forever</i>
              </b-table-column>
          </template>

          <template slot="detail" slot-scope="props">
              <article class="media">
                  <figure class="media-left">
                      <p class="image is-64x64">
                          <img src="/static/img/placeholder-128x128.png">
                      </p>
                  </figure>
                  <div class="media-content">
                      <div class="content">
                          <p>
                              <strong>{{ props.row.address }}</strong>
                              <small>31m</small>
                              <br>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                              Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                          </p>
                      </div>
                  </div>
              </article>
          </template>

          <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>This valuation has no comparables yet.</p>
                        <a class="button buttonize m-t-1">Add a new comparable</a>
                    </div>
                </section>
            </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import Comparable from '@/components/Comparable'
import router from '../router/index'
import accounting from 'accounting'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      showButton: true
    }
  },
  components: {
    newComparable: Comparable
  },
  computed: {
    ...mapState({
      comparables: state => state.valuations.selectedValuation.rentComps
    })
  },
  methods: {
    ...mapActions('valuations', ['persist', 'deleteComparable']),
    save () {
      this.persist()
      router.push('./preview')
    },
    toggle () {
      this.showButton = !this.showButton
    },
    format (number) {
      return accounting.formatMoney(number)
    }
  }
}
</script>
<style scoped>
.float-right {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3em;
}

.buttonize {
  max-height: 2.5em;
  padding: 5px 20px;
  border-radius: 100px;
  color: white;
  font-size: 1.1em;
  background-color: var(--button-blue);
}

.p-t-1-3 {
  padding-top: 1.3em;
}

.m-l-0 {
  margin-left: 0;
}

.m-b-2 {
  margin-bottom: 2em;
}

.m-t-1 {
  margin-top: 1em;
}
</style>

<template>
  <nav class="navbar sub-header" role="navigation">
    <ul class="navbar-menu">
      <li class="navbar-item is-hoverable" v-for="route in r" :key="route.name" v-if="route.meta && route.meta.isNav">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { routes } from '@/router/index.js'

export default {
  data () {
    return {
      r: routes
    }
  }
}
</script>

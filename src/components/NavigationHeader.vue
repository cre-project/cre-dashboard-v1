<template>
  <header id="sub-header">
    <nav>
      <ul>
        <li v-for="route in r" :key="route.name" v-if="route.meta && route.meta.isNav">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import { routes } from '@/router/index.js'

export default {
  props: ['selected'],
  data () {
    return {
      r: routes
    }
  }
}
</script>
<style scoped>
@import "../assets/css/main.css";
</style>

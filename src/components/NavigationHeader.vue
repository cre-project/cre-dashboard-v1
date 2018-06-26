<template>
  <header id="sub-header">
    <nav>
      <ul>
        <li v-for="route in r" :key="route.name" v-if="route.name != 'Login' && route.name != 'Sign Up'">
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

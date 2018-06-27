<template>
  <div id="app">
    <main-header></main-header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('valuations/get')
  }
}
</script>

<style >
@import '/assets/css/main.css';
</style>

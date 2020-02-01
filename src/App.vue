<template>
  <div id="app">
    <SearchContainer />
  </div>
</template>

<script>
import SearchContainer from './components/SearchContainer.vue'

export default {
  name: 'app',
  components: {
    SearchContainer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color : #f2f5f7;
}
</style>

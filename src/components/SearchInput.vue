
<template>
  <div>
    <input v-model="search" type="text">
    <ul>
      <li v-for="country in displayedCountries" v-bind:key="country.area" >{{country.name}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            initialCountries: [],
            displayedCountries : [],
            search : "",
        }
    },
    mounted () {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.initialCountries = response.data;
          this.displayedCountries = response.data;
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

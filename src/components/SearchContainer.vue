
<template>
  <div class="search-container">
      <label for="search-country">
          Pays
      </label>
    <div>
      <input v-model="search" id="search-country" type="text">
      <ul class="countries-list">
        <li v-for="country in displayedCountries" :key="country.numericCode" >
          <div class="country-img">
            <img width="100%" :src="country.flag" />
          </div>
          {{country.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            initialCountries: [],
            displayedCountries : [],
            search : null,
        }
    },
    mounted () {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.initialCountries = response.data;
          this.displayedCountries = response.data;
        });
  },
  // computed: {
  //   displayedCountries : function(){
  //      return this.initialCountries.filter(country => country.name ==="France")
  //   }
  // }
}
</script>

<style scoped lang="scss">
  .search-container {

    label {
      font-size: 12px;
      color: #94bbdc;
    }

    .countries-list {
      width: 300px;
      max-height: 130px;
      overflow: scroll;
      margin: 0 auto;
    }
    
    .country-img {
      width: 48px;
    }
  }

</style>


<template>
  <div class="search-container">
    <div class="border-teal-500" >
      <label class="block" for="search-country">
          Pays
      </label>
      <input v-model="search" id="search-country" type="text">
      <ul class="countries-list">
        <li class="flex items-center mt-2" v-for="country in displayedCountries" :key="country.numericCode" >
          <div class="country-img mr-2">
            <img width="100%" :src="country.flag" />
          </div>
          <span>{{country.name}}</span>
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
    width : 300px;
    padding: 25px;
    margin: 0 auto;
    background-color : #f2f5f7;
    label {
      font-size: 12px;
      color: #94bbdc;
    }

    .countries-list {
      max-height: 130px;
      overflow: scroll;
      margin: 0 auto;
    }
    
    .country-img {
      width: 24px;
    }
  }

</style>

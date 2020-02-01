
<template>
  <div class="search-container mt-6">
    <label class="block search-label" for="search-country">
        Pays
    </label>
    <input v-model="search" class="border-none search-input" id="search-country" type="text">
    <ul class="countries-list">
      <li class="flex items-center mt-2" v-for="country in displayedCountries" :key="country.numericCode" >
        <div class="country-img mr-2">
          <img width="100%" :src="country.flag" />
        </div>
        <span>{{country.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            initialCountries: [],
            search: "",
        }
    },
    mounted () {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.initialCountries = response.data;
        });
  },
  computed: {
    displayedCountries : function() {
       return this.search === "" 
        ? this.initialCountries 
        : this.initialCountries.filter(country => country.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0)
    }
  }
}
</script>

<style scoped lang="scss">
  .search-container {
    width : 300px;
    padding: 25px;
    background: white;
    margin : 0 auto;

    .search-label {
      font-size: 12px;
      color: #94bbdc;
    }

    .search-input {
      border-bottom : 1px solid #94bbdc;
      font-size : 16px;
    }

    .countries-list {
      max-height: 130px;
      overflow-y: scroll;
      margin: 0 auto;
    }
    
    .country-img {
      width: 24px;
    }
  }

</style>

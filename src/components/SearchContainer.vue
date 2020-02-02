
<template>
  <div class="search-container mt-6">
    <label class="block search-label" for="search-country">
        Pays
    </label>
    <input v-model="search" autocomplete="off" @click="clickOnField" class="border-none search-input" id="search-country" type="text">
    <ul v-if="countriesListOpen" class="countries-list shadow-lg">
      <li @click="clickOnCountry(country)" class="flex items-center mt-2" v-for="country in displayedCountries" :key="country.numericCode" >
        <div class="country-img mr-2">
          <img width="100%" :src="country.flag" />
        </div>
        <span>{{country.name | bodify}}</span>
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
            selectedCountry: null,
            countriesListOpen : false,
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
          : this.initialCountries.filter(this.filterCountries)
      }
    },
    filters : {
      bodify: function(val) {
        return val
      }
    },
    methods: {
      filterCountries(country) {
        return country.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0
      },
      clickOnCountry: function(country){
        this.search = country.name;
        this.countriesListOpen = false;
      },
      clickOnField: function (){
        this.countriesListOpen = true;
      }
    },
}
</script>

<style scoped lang="scss">
  .search-container {
    position: relative;
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
      position: absolute;
      background: white;
      padding: 15px;
      max-height: 130px;
      overflow-y: scroll;
      margin: 0 auto;
    }
    
    .country-img {
      width: 18px;
    }
  }

</style>

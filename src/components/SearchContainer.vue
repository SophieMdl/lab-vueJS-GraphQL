
<template>
  <div class="page" @click.self="clickOutside(displayedCountries)">
    <div class="search-container mt-6">
      <label class="block search-label" for="search-country">Pays</label>
      <input
        v-model="search"
        autocomplete="off"
        @click="clickOnField"
        class="border-none search-input"
        id="search-country"
        type="text"
      />
      <ul v-if="countriesListOpen" class="countries-list shadow-lg">
        <li
          @click="clickOnCountry(country)"
          class="flex items-center mt-2 countries-list-item cursor-pointer"
          v-for="country in displayedCountries"
          :key="country.numericCode"
        >
          <div class="country-img mr-2">
            <img class="w-full" :src="country.flag" />
          </div>
          <div v-for="(char, index) in country.name" :key="index">
            <span :class="{'font-bold' : index < search.length}">{{char}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      initialCountries: [],
      search: "",
      selectedCountryCode: null,
      countriesListOpen: false
    };
  },
  mounted() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.initialCountries = response.data;
    });
  },
  computed: {
    displayedCountries: function() {
      const searchedCountries =
        this.search === ""
          ? this.initialCountries
          : this.initialCountries.filter(this.filterCountries);

      this.countriesListOpen = searchedCountries.length !== 0;
      return searchedCountries;
    }
  },
  methods: {
    filterCountries(country) {
      return (
        country.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0
      );
    },
    clickOnCountry: function(country) {
      this.search = country.name;
      this.selectedCountryCode = country.alpha2Code;
      this.countriesListOpen = false;
    },
    clickOnField: function() {
      this.countriesListOpen = true;
    },
    clickOutside: function(displayedCountries) {
      this.countriesListOpen = false;
      if (!displayedCountries.some(country => country.name === this.search))
        this.search = "";
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
}
.search-container {
  position: relative;
  width: 300px;
  padding: 25px;
  background: white;
  margin: 0 auto;

  .search-label {
    font-size: 12px;
    color: #94bbdc;
  }

  .search-input {
    border-bottom: 1px solid #94bbdc;
    font-size: 16px;
  }

  .countries-list {
    position: absolute;
    background: white;
    padding: 15px;
    max-height: 130px;
    overflow-y: scroll;
    margin: 0 auto;

    &-item {
      &:hover {
        cursor: pointer;
        background-color: #94bbdc;
        color: white;
      }
    }
    .country-img {
      width: 18px;
    }
  }
}
</style>

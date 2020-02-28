<template>
  <div class="page" @click.self="clickOutside()">
    <div class="search-container mt-6">
      <label class="block search-label" for="search-country">Pays</label>
      <div>
        <input
          v-model="search"
          autocomplete="off"
          @click="countriesListOpen = true"
          class="border-none search-input"
          id="search-country"
          type="text"
        />
        <ul v-if="countriesListOpen && countries.length > 0" class="countries-list shadow-lg">
          <li
            @click="clickOnCountry(country)"
            class="flex items-center mt-2 countries-list-item cursor-pointer"
            v-for="country in countries"
            :key="country.numericCode"
          >
            <div class="country-img mr-2">
              <img :alt="`${country.name}-flag`" class="w-full" :src="country.flag" />
            </div>
            <span>{{ country.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { searchCountry } from "../services/api.js";
import gql from "graphql-tag";

const getCountries = () => gql`
  query allCountries {
    countries {
      name
      flag
      alpha2Code
      numericCode
    }
  }
`;

export default {
  data() {
    return {
      search: "",
      countriesListOpen: false,
      selectedCountryCode: null,
      countries: []
    };
  },
  apollo: {
    countries: getCountries()
  },
  watch: {
    selectedCountryCode: function() {
      this.$emit("input", this.selectedCountryCode);
    },
    search: function() {
      if (this.search === "") return;
      this.getSearchedCountries();
    }
  },

  methods: {
    getSearchedCountries: function() {
      searchCountry(this.search)
        .then(response => {
          this.countriesListOpen = true;
          this.countries = response.data;
        })
        .catch(() => {
          this.countriesListOpen = false;
        });
    },
    clickOnCountry: function(country) {
      this.search = country.name;
      this.selectedCountryCode = country.alpha2Code;
      this.countriesListOpen = false;
    },
    clickOutside: function() {
      this.countriesListOpen = false;
      const countryFound = this.countries.find(
        country => country.name === this.search
      );
      if (countryFound) {
        this.selectedCountryCode = countryFound.alpha2Code;
      } else {
        this.search = "";
      }
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

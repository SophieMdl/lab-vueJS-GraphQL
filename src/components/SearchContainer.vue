<template>
  <div class="page" @click.self="clickOutside()">
    <div class="search-container mt-6">
      <label class="block search-label" for="search-country">Pays</label>
      <!------- FOR MOBILE ONLY ------>
      <select
        class="max-w-full bg-white border border-gray-400 shadow"
        v-if="isSmallWith"
        name="search-country"
        v-model="selectedCountryCode"
        id="search-country"
      >
        <option
          @click="clickOnCountry(country)"
          v-for="country in initialCountries"
          :key="country.numericCode"
          :value="country.alpha2Code"
        >{{ country.name }}</option>
      </select>
      <!------- FOR LARGE SCREEN ONLY ------>
      <div v-else>
        <input
          v-model="search"
          autocomplete="off"
          @click="countriesListOpen = true"
          class="border-none search-input"
          id="search-country"
          type="text"
        />
        <ul
          v-if="countriesListOpen && displayedCountries.length > 0"
          class="countries-list shadow-lg"
        >
          <li
            @click="clickOnCountry(country)"
            class="flex items-center mt-2 countries-list-item cursor-pointer"
            v-for="country in displayedCountries"
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
import axios from "axios";

export default {
  data() {
    return {
      initialCountries: [],
      search: "",
      countriesListOpen: false,
      isSmallWith: screen.width < 780,
      selectedCountryCode: null,
      displayedCountries: []
    };
  },
  watch: {
    selectedCountryCode: function() {
      this.$emit("input", this.selectedCountryCode);
    },
    search: function() {
      if (this.search === "") {
        this.initialCountries = this.initialCountries;
      }
      this.getSearchedCountries();
    }
  },
  mounted() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.initialCountries = response.data;
    });
  },
  methods: {
    getSearchedCountries: function() {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${this.search}`)
        .then(response => {
          this.displayedCountries = response.data;
        })
        .catch(() => (this.displayedCountries = []));
    },
    clickOnCountry: function(country) {
      this.search = country.name;
      this.selectedCountryCode = country.alpha2Code;
      this.countriesListOpen = false;
    },
    clickOutside: function() {
      this.countriesListOpen = false;
      const countryFound = this.displayedCountries.find(
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

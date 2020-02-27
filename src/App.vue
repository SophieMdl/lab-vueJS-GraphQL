<template>
  <div id="app">
    <SearchContainer v-model="countryCode" />
  </div>
</template>

<script>
import SearchContainer from "./components/SearchContainer.vue";
import Vue from "vue";
import gql from "graphql-tag";

export default {
  data() {
    return { countryCode: "" };
  },
  name: "app",
  components: {
    SearchContainer
  },
  apollo: {
    allCountries: gql`
      query allCountries {
        countries {
          name
          flag
          alpha2Code
          numericCode
        }
      }
    `
  }
};
</script>

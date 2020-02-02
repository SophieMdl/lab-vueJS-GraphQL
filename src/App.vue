<template>
  <div id="app">
    <SearchContainer v-model="countryCode" />
  </div>
</template>

<script>
import SearchContainer from "./components/SearchContainer.vue";

export default {
  data() {
    return { countryCode: "" };
  },
  name: "app",
  components: {
    SearchContainer
  }
};
</script>

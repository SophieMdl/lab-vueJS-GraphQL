import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import "./assets/main.scss";

import { apolloClient } from "./services/apolloClientInstance.js";

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  render: h => h(App),
  apolloProvider
}).$mount("#app");

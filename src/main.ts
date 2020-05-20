import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Touch Events
import Vue2TouchEvents from "vue2-touch-events";

// Vuetify
import vuetify from "./plugins/vuetify";
Vue.use(Vue2TouchEvents);

// Time Ago
import VueTimeago from "vue-timeago";
Vue.use(VueTimeago, {
  name: "Timeago", // Component name
  locale: "en",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

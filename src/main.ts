import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Vue2TouchEvents from "vue2-touch-events";
import vuetify from './plugins/vuetify';
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");

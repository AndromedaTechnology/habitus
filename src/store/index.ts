import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { RootState } from "./types";
import { user } from "./user/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0",
  },
  modules: {
    user,
  },
};

export default new Vuex.Store<RootState>(store);

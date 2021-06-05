import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { RootState } from "./types";
import { note } from "./note/index";
import { user } from "./user/index";
import { habit } from "./habit/index";
import { emotion } from "./emotion/index";
import { impact } from "./impact/index";
import { activity } from "./activity/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0",
  },
  modules: {
    user,
    emotion,
    habit,
    note,
    impact,
    activity,
  },
};

export default new Vuex.Store<RootState>(store);

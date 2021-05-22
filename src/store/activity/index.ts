import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../types";
import { mutations } from "./mutations";
import { ActivityState } from "./types";

export const state: ActivityState = {
  activities: [],
};

const namespaced = true;

export const activity: Module<ActivityState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

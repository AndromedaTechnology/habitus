import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ActivityState, Activity } from "./types";
import { RootState } from "../types";

export const state: ActivityState = {
  activities: {},
};

const namespaced = true;

export const activity: Module<ActivityState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

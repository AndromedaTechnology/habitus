import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { HabitState, Habit } from "./types";
import { RootState } from "../types";

export const state: HabitState = {
  habits: Array<Habit>(),
};

const namespaced = true;

export const habit: Module<HabitState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

import { MutationTree } from "vuex";
import { HabitState, Habit } from "./types";

export const mutations: MutationTree<HabitState> = {
  setHabits(state, payload: Array<Habit>) {
    state.habits = payload;
  },
};

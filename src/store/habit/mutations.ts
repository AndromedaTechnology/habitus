import { MutationTree } from "vuex";
import { HabitState, Habit } from "./types";

export const mutations: MutationTree<HabitState> = {
  isLoading(state, payload = false) {
    state.isLoading = payload;
  },
  setHabits(state, payload: Array<Habit>) {
    state.habits = payload;
  },
  addHabit(state, payload: Habit) {
    state.habits = [...state.habits, payload];
  },
  pushHabits(state, payload: Array<Habit>) {
    state.habits = [...state.habits, ...payload];
  },
  updateHabit(state, payload: { habitId: string; data: any }) {
    state.habits = state.habits?.map((el: Habit) => {
      if (el._id === payload.habitId) {
        el = {
          ...el,
          ...payload.data,
        };
      }
      return el;
    });
  },
  removeHabit(state, habitId: string) {
    state.habits = state.habits?.filter((el: Habit) => {
      return el._id !== habitId;
    });
  },
};

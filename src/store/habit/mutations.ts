import { MutationTree } from "vuex";
import { HabitState, Habit } from "./types";

export const mutations: MutationTree<HabitState> = {
  updateHabit(state, payload: { habit: Habit; data: any }) {
    const habits = state.habits?.map((element: Habit) => {
      if (element._id === payload.habit._id) {
        element = {
          ...element,
          ...payload.data,
        };
      }
      return element;
    });

    state.habits = habits;
  },
  setHabits(state, payload: Array<Habit>) {
    state.habits = payload;
  },
};

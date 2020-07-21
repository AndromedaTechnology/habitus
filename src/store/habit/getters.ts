import { GetterTree } from "vuex";
import { HabitState, Habit } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<HabitState, RootState> = {
  habits(state): Array<Habit> | undefined {
    const { habits } = state;
    return habits;
  },
  getHabit: (state) => (habitId: string): Habit | null => {
    const { habits } = state;
    if (!habits) return null;

    const habit = habits.find((element: Habit) => {
      return element._id === habitId;
    });

    return habit ? habit : null;
  },
};

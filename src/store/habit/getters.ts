import { GetterTree } from "vuex";
import { HabitState, Habit } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<HabitState, RootState> = {
  habits(state): Array<Habit> | undefined {
    const { habits } = state;
    return habits;
  },
};

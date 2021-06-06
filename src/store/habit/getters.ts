import { GetterTree } from "vuex";
import { RootState } from "../types";
import { HabitState, Habit } from "./types";

export const getters: GetterTree<HabitState, RootState> = {
  habits(state): Array<Habit> | undefined {
    const { habits } = state;
    return habits;
  },
  userHabits(state): Array<Habit> | undefined {
    const { habits } = state;
    return habits?.filter(item => {
      return item.userId ? true : false;
    });
  },
  globalHabits(state): Array<Habit> | undefined {
    const { habits } = state;
    return habits?.filter(item => {
      return !item.userId ? true : false;
    });
  },
  getHabit: (state) => (habitId: string): Habit | undefined => {
    const { habits } = state;
    return habits?.find((item: Habit) => {
      return item._id === habitId;
    });
  },
};

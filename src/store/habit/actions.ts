import { ActionTree } from "vuex";
import { HabitState, Habit } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<HabitState, RootState> = {
  fetchHabits({ commit }): Promise<Array<Habit> | null> {
    return new Promise((resolve, reject) => {
      // Fetch from Localstorage

      const habitsLocalStorage:
        | string
        | null
        | undefined = localStorage.getItem("habits");

      const habits: Array<Habit> = habitsLocalStorage
        ? JSON.parse(habitsLocalStorage)
        : [];

      commit("setHabits", habits);
      resolve(habits);
    });
  },
  updateHabit(
    { state, getters, commit },
    payload: { habit: Habit; data: any }
  ): any {
    commit("updateHabit", payload);

    // Save
    const habits = getters["habits"];
    localStorage.setItem("habits", JSON.stringify(habits));
  },
  persistHabit({ state, getters, commit }, habit: Habit): Promise<Habit> {
    return new Promise((resolve, reject) => {
      habit._id =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);

      // Append
      const habits = getters["habits"];
      habits.push(habit);

      // Persist
      localStorage.setItem("habits", JSON.stringify(habits));

      // Resolve
      resolve(habit);
    });
  },
  deleteHabits({ commit }): any {
    // Delete from Localstorage

    localStorage.removeItem("habits");
  },
  deleteHabit({ getters, commit }, habit: Habit): any {
    // Find
    const habits = getters["habits"];
    const habitIndex: number = habits.findIndex(
      (element: Habit) => element._id === habit._id
    );

    // Remove
    habits.splice(habitIndex, 1);

    // Persist
    commit("setHabits", habits);
    localStorage.setItem("habits", JSON.stringify(habits));
  },
};

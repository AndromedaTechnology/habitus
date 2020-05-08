import { ActionTree } from "vuex";
import { HabitState, Habit } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<HabitState, RootState> = {
  fetchHabits({ commit }): any {
    // Fetch from Localstorage

    const habitsLocalStorage: string | null | undefined = localStorage.getItem(
      "habits"
    );
    console.log("ola", habitsLocalStorage);

    const habits: Array<Habit> = habitsLocalStorage
      ? JSON.parse(habitsLocalStorage)
      : [];

    commit("setHabits", habits);
  },
  persistHabit({ state, getters, commit }, habit: Habit): any {
    // Add _id to habit
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

    // Save
    localStorage.setItem("habits", JSON.stringify(habits));
  },
  deleteHabits({ commit }): any {
    // Delete from Localstorage

    localStorage.removeItem("habits");
  },
};

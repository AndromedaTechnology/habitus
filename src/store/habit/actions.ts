import { ActionTree } from "vuex";
import { RootState } from "../types";
import { HabitState, Habit } from "./types";
import { UserHabitHelpers } from "./userHelpers";
import { GlobalHabitHelpers } from "./globalHelpers";

export const actions: ActionTree<HabitState, RootState> = {
  async fetchHabits({ commit }): Promise<Array<Habit>> {
    commit("setHabits", []);
    // Cached: User-created Habits
    const itemsCached = UserHabitHelpers.fetchUserHabits();
    commit("pushHabits", itemsCached);
    // Api
    commit("isLoading", true);
    const itemsApi = await GlobalHabitHelpers.fetchGlobalHabits();
    commit("pushHabits", itemsApi);
    commit("isLoading", false);
    // Return
    return Promise.resolve([...itemsCached, ...itemsApi]);
  },
  updateHabit(
    { state, getters, commit },
    payload: { habit: Habit; data: any }
  ): any {
    commit("updateHabit", {
      habitId: payload.habit._id,
      data: payload.data,
    });
    UserHabitHelpers.persistUserHabits(getters["userHabits"]);
  },
  persistHabit({ state, getters, commit }, habit: Habit): Promise<Habit> {
    return new Promise((resolve, reject) => {
      // Generate ID, Add
      habit._id =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      commit("addHabit", habit);
      UserHabitHelpers.persistUserHabits(getters["userHabits"]);
      resolve(habit);
    });
  },
  deleteHabit({ getters, commit }, habit: Habit): any {
    commit("removeHabit", habit._id);
    UserHabitHelpers.persistUserHabits(getters["userHabits"]);
  },
  deleteHabits({ commit }): any {
    UserHabitHelpers.persistUserHabits([]);
  },
};
